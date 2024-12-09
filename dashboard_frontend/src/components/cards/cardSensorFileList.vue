<template>
  <v-card class="card" v-if="isLoading" :height="cardHeight" outlined>
    <v-container class="fill-height">
      <v-row class=" fill-height" align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          {{ _loading }}
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="blue"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card v-else class="card" :height="cardHeight" outlined>
    <div class="card-container">
      <v-card-title ref="cardTitle">
        {{ _title }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="_search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <div class="list-container">
        <v-data-table
          class="table"
          :items="fileList"
          :height="tableHeight"
          overflow-y-auto
          hide-default-footer
          :headers="headers"
          :search="search"
        >
          <template v-if="_isChartLoading" v-slot:item.actions>
            <v-icon disabled color="blue" small class="mr-2">
              mdi-eye
            </v-icon>
          </template>
          <template v-else v-slot:item.actions="{ item }">
            <v-icon
              color="blue"
              small
              class="mr-2"
              @click="handleFileClick(item)"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import eventBus from "../../events/EventBus";

export default {
  props: {
    fileList: Array,
    cardHeight: Number,
    headers: Array,
    isLoading: Boolean
  },
  data: () => ({
    search: "",
    tableHeight: "",
    outlierColor: "#ce8a3c",
    normalColor: "#3175d3"
  }),
  updated() {
    if (!this._isChartLoading) {
      this.tableHeight = this.cardHeight - this.$refs.cardTitle.clientHeight;
    }
  },
  computed: {
    ...mapState("session", ["token"]),
    ...mapState("sensor", [
      "isChartDataLoading",
      "fileSelected",
      "tremor",
      "tremorLevelData"
    ]),
    ...mapGetters("sensorView", [
      "getCardFileList",
      "getGeneric",
      "getCardColumnChart"
    ]),
    _title() {
      const { title } = this.getCardFileList;
      return title;
    },
    _search() {
      const { search } = this.getCardFileList;
      return search;
    },
    _loading() {
      const { loading } = this.getGeneric;
      return loading;
    },
    _yaxisLabel() {
      const { yaxis } = this.getCardColumnChart;
      return yaxis;
    },
    _T1() {
      const { T1 } = this.getCardColumnChart;
      return T1;
    },
    _T2() {
      const { T2 } = this.getCardColumnChart;
      return T2;
    },
    _T3() {
      const { T3 } = this.getCardColumnChart;
      return T3;
    },
    _chartLabels() {
      const { T1, T2, T3, T4, T5 } = this.getCardColumnChart;
      return [T1, T2, T3, T4, T5];
    },
    _T4() {
      const { T4 } = this.getCardColumnChart;
      return T4;
    },
    _T5() {
      const { T5 } = this.getCardColumnChart;
      return T5;
    },
    _token() {
      return this.token;
    },
    _isChartLoading() {
      return this.isChartDataLoading;
    },
    _fileSelected() {
      return this.fileSelected;
    },
    _tremor() {
      return this.tremor;
    },
    _tremorLevelData() {
      return this.tremorLevelData;
    }
  },
  methods: {
    ...mapActions("sensor", [
      "selectFile",
      "loadHistogramData",
      "setChartLoading",
      "setTremorLevelData"
    ]),
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    },
    setFileData(tremor) {
      let tremorCopy = {
        ...tremor
      };
      let result = {
        outliers: [],
        yaxis: [],
        outlierReference: "",
        normalReference: "",
        isOutlierChart: false,
        colors: []
      };
      delete tremorCopy["metrics"];
      result.outlierReference = this.setSeriesName(
        this.getKeyByValue(tremorCopy, Math.max(...Object.values(tremorCopy)))
      );
      for (let i = 0; i < 5; i++) {
        const min = Math.min(...Object.values(tremorCopy));
        const max = Math.max(...Object.values(tremorCopy));
        if (max * 0.01 > min) {
          result.isOutlierChart = true;
          let maxKey = this.getKeyByValue(tremor, max);
          result.outliers.push(maxKey);
          delete tremorCopy[maxKey];
        } else {
          result.normalReference = this.setSeriesName(
            this.getKeyByValue(
              tremorCopy,
              Math.max(...Object.values(tremorCopy))
            )
          );
          result.colors = this.setColors(result.outliers);
          break;
        }
      }
      result.outliers.forEach((outlier, index) => {
        result.outliers[index] = this.setSeriesName(outlier);
      });
      result.outliers.forEach((outlier, index) => {
        if ((outlier = result.outlierReference)) {
          result.outliers.splice(index, 1);
        }
      });
      this._chartLabels.forEach(label => {
        if (label == result.outlierReference) {
          result.yaxis.push({
            seriesName: result.outlierReference,
            title: { text: this._yaxisLabel },
            axisTicks: { show: true, color: this.outlierColor },
            axisBorder: { show: true, color: this.outlierColor },
            decimalsInFloat: 2
          });
        } else if (label == result.normalReference) {
          result.yaxis.push({
            seriesName: result.normalReference,
            opposite: true,
            axisTicks: { show: true, color: this.normalColor },
            axisBorder: { show: true, color: this.normalColor },
            decimalsInFloat: 2
          });
        } else {
          if (result.outliers.length) {
            result.outliers.forEach((outlier, index) => {
              if (label == outlier) {
                result.yaxis.push({
                  seriesName: result.outlierReference,
                  show: false
                });
                result.outliers.splice(index, 1);
                return;
              } else {
                result.yaxis.push({
                  seriesName: result.normalReference,
                  show: false
                });
              }
            });
          } else {
            result.yaxis.push({
              seriesName: result.normalReference,
              show: false
            });
          }
        }
      });
      return result;
    },
    setSeriesName(reference) {
      switch (reference) {
        case "T1":
          return this._T1;
        case "T2":
          return this._T2;
        case "T3":
          return this._T3;
        case "T4":
          return this._T4;
        case "T5":
          return this._T5;
      }
    },
    setColors(outliers) {
      const tremorCopy = {
        ...this._tremor
      };
      let colors = [];
      Object.keys(tremorCopy).forEach(key => {
        if (outliers.includes(key)) {
          colors.push(this.outlierColor);
        } else {
          colors.push(this.normalColor);
        }
      });
      return colors;
    },
    async handleFileClick(file) {
      if (file.nome == this._fileSelected.nome) {
        return;
      }
      this.selectFile(file);
      this.setChartLoading(true);
      await this.loadHistogramData({ token: this._token, filename: file.nome });
      this.setTremorLevelData(this.setFileData(this._tremor));
      this.outlierName = this.setSeriesName(
        this._tremorLevelData.outlierReference
      );
      this.normalName = this.setSeriesName(
        this._tremorLevelData.minimumReference
      );
      this.setChartLoading(false);
    },
    whenCreate() {
      this.setChartLoading(false);
    }
  },
  mounted() {
    eventBus.$on("language-change", () => {
      this.setTremorLevelData(this.setFileData(this._tremor));
      this.outlierName = this.setSeriesName(
        this._tremorLevelData.outlierReference
      );
      this.normalName = this.setSeriesName(
        this._tremorLevelData.minimumReference
      );
    });
  },
  created() {
    this.whenCreate();
  }
};
</script>
<style>
.list-container {
  display: flex;
  align-items: flex-start;
  padding-left: 16px;
}

.card {
  overflow: hidden;
  border: 1px solid #e8e8e8 !important;
  border-radius: 20px !important;
}

.table {
  width: 90%;
}
</style>
