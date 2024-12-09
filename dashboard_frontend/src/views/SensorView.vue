<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-5">
        <card-info-user />
      </div>
      <div class="col-7">
        <card-sensor-file-list
          :fileList="files"
          :cardHeight="cardHeight"
          :headers="_tableHeaders"
          :isLoading="_isFileListLoading"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <card-sensor-column-chart
          :chartOptions="
            _tremorLevelData.isOutlierChart
              ? _chartOptionsWithOutlier
              : _chartOptionsWithoutOutlier
          "
          :chartSeries="_series"
          :cardHeight="cardHeight"
        />
      </div>
      <div class="col-4">
        <card-sensor-metric-table
          :cardHeight="cardHeight"
          :fileSelected="_tremor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardInfoUser from "../components/cards/cardInfoUser.vue";
import CardSensorFileList from "../components/cards/cardSensorFileList.vue";
import CardSensorColumnChart from "../components/cards/cardSensorColumnChart.vue";
import CardSensorMetricTable from "../components/cards/cardSensorMetricTable.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    //Column chart data
    titleFontFamily: "Lato, sans-serif",
    titleFontWeight: 700,
    outlierColor: "#ce8a3c",
    normalColor: "#3175d3",
    //cards Height
    cardHeight: 0,
    // Props card-sensor-file-list
    files: []
  }),
  components: {
    CardInfoUser,
    CardSensorFileList,
    CardSensorColumnChart,
    CardSensorMetricTable
  },
  computed: {
    ...mapState("sensor", [
      "fileList",
      "fileSelected",
      "tremor",
      "isFileListDataLoading",
      "tremorLevelData"
    ]),
    ...mapState("session", ["token", "loginId"]),
    ...mapState("patients", ["patientSelected"]),
    ...mapGetters("sensorView", [
      "getCardFileList",
      "getCardColumnChart",
      "getGeneric"
    ]),

    _tableHeaders() {
      const { name, date, actions } = this.getCardFileList;
      return [
        {
          text: name,
          align: "start",
          sortable: false,
          filterable: true,
          value: "grupo_estudo"
        },
        {
          text: date,
          value: "data",
          sortable: true,
          filterable: false
        },
        {
          text: actions,
          align: "center",
          value: "actions",
          filterable: false,
          sortable: false
        }
      ];
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
    _T4() {
      const { T4 } = this.getCardColumnChart;
      return T4;
    },
    _T5() {
      const { T5 } = this.getCardColumnChart;
      return T5;
    },
    _time() {
      const { timeTooltip } = this.getGeneric;
      return timeTooltip;
    },
    _xaxisLabel() {
      const { xaxis } = this.getCardColumnChart;
      return xaxis;
    },
    _yaxisLabel() {
      const { yaxis } = this.getCardColumnChart;
      return yaxis;
    },
    _fileList() {
      return this.fileList;
    },
    _fileSelected() {
      return this.fileSelected;
    },
    _tremor() {
      return this.tremor;
    },
    _tremorLevelData() {
      return this.tremorLevelData;
    },
    _loginId() {
      return this.loginId;
    },
    _token() {
      return this.token;
    },
    _id() {
      return this.patientSelected.id;
    },
    _isFileListLoading() {
      return this.isFileListDataLoading;
    },

    //Props card-sensor-column-chart
    _chartOptionsWithOutlier() {
      return {
        chart: {
          type: "bar"
        },
        title: {
          text: this._fileSelected.grupo_estudo,
          align: "left"
        },
        subtitle: {
          text: this._fileSelected.data,
          align: "left",
          style: {
            fontSize: "12px",
            fontWeight: "normal",
            fontFamily: "Lato",
            color: "#9699a2"
          }
        },
        xaxis: {
          categories: [this._time, "T2", "T3", "T4", "T5"],
          labels: {
            show: false,
            rotate: -45,
            rotateAlways: true,
            style: {
              fontFamily: "Lato",
              fontWeight: 700
            }
          },
          title: {
            text: this._xaxisLabel,
            offsetY: -25,
            style: {
              fontSize: "14px",
              fontFamily: "Lato",
              fontWeight: 700
            }
          }
        },
        yaxis: this._tremorLevelData.yaxis,
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "90%"
          }
        },
        colors: this._tremorLevelData.colors,
        dataLabels: {
          enabled: false
        }
      };
    },
    _chartOptionsWithoutOutlier() {
      return {
        chart: {
          type: "bar"
        },
        title: {
          text: this._fileSelected.grupo_estudo,
          align: "left"
        },
        subtitle: {
          text: this._fileSelected.data,
          align: "left",
          style: {
            fontSize: "12px",
            fontWeight: "normal",
            fontFamily: "Lato",
            color: "#9699a2"
          }
        },
        xaxis: {
          categories: [this._time, "T2", "T3", "T4", "T5"],
          labels: {
            show: false,
            rotate: -45,
            rotateAlways: true,
            style: {
              fontFamily: "Lato",
              fontWeight: 700
            }
          },
          title: {
            text: this._xaxisLabel,
            offsetY: -25,
            style: {
              fontSize: "14px",
              fontFamily: "Lato",
              fontWeight: 700
            }
          }
        },
        yaxis: {
          title: {
            text: this._yaxisLabel
          },
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "90%"
          }
        },
        colors: this.barColors,
        dataLabels: {
          enabled: false
        }
      };
    },
    _series() {
      return [
        {
          name: this._T1,
          data: [this._tremor.T1]
        },
        {
          name: this._T2,
          data: [this._tremor.T2]
        },
        {
          name: this._T3,
          data: [this._tremor.T3]
        },
        {
          name: this._T4,
          data: [this._tremor.T4]
        },
        {
          name: this._T5,
          data: [this._tremor.T5]
        }
      ];
    }
  },
  methods: {
    ...mapActions("sensor", [
      "getFileList",
      "setFileListLoading",
      "setChartLoading",
      "setTremor",
      "setTremorLevelData",
      "selectFile"
    ]),
    // Methods card-sensor-file-list
    async loadFileList() {
      await this.getFileList({
        token: this._token,
        loginId: this._loginId,
        id: this._id
      });
    },
    async handleFileList() {
      this.setFileListLoading(true);
      await this.loadFileList();
      this.files = this._fileList;
      this.setFileListLoading(false);
    }
  },
  async created() {
    this.cardHeight = window.innerHeight - 580;
    this.setTremor({});
    this.selectFile({});
    this.setTremorLevelData({});
    await this.handleFileList();
  }
};
</script>

<style lang="scss"></style>
