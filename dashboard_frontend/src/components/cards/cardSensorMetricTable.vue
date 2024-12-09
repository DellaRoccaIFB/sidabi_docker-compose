<template>
  <v-card class="card" v-if="_isLoading" :height="cardHeight" outlined>
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

  <v-card
    :height="cardHeight"
    v-else-if="!_isLoading && !isEmpty"
    overflow-y-auto
    class="card-metric"
    outlined
  >
    <div class="card-metric-container">
      <v-card-title ref="cardTitle">
        {{ _title }}
      </v-card-title>
      <v-card-text>
        <v-simple-table :height="tableHeight">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ _metric }}
                </th>
                <th class="text-left">
                  {{ _value }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(metric, key, index) in fileSelected.metrics"
                :key="metric.name"
              >
                <td>{{ _keys[index] }}</td>
                <td>{{ metric }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </div>
  </v-card>

  <v-card class="card" v-else-if="isEmpty" :height="cardHeight" outlined>
    <v-container class="fill-height">
      <v-row class=" fill-height" align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          {{ _empty }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      tableHeight: 0,
      isEmpty: false
    };
  },
  computed: {
    ...mapState("sensor", ["isChartDataLoading", "tremor", "tremorLevelData"]),
    ...mapGetters("sensorView", ["getCardMetricTable", "getGeneric"]),
    _title() {
      const { title } = this.getCardMetricTable;
      return title;
    },
    _loading() {
      const { loading } = this.getGeneric;
      return loading;
    },
    _empty() {
      const { empty } = this.getGeneric;
      return empty;
    },
    _metric() {
      const { metric } = this.getCardMetricTable;
      return metric;
    },
    _value() {
      const { value } = this.getCardMetricTable;
      return value;
    },
    _keys() {
      const {
        firstQuarter,
        secondQuarter,
        thirdQuarter,
        count,
        max,
        mean,
        min,
        std
      } = this.getCardMetricTable;
      let keys = [];
      keys.push(
        firstQuarter,
        secondQuarter,
        thirdQuarter,
        count,
        max,
        mean,
        min,
        std
      );
      return keys;
    },
    _isLoading() {
      return this.isChartDataLoading;
    },
    _tremor() {
      return this.tremor;
    },
    _tremorLevelData() {
      return this.tremorLevelData;
    }
  },
  methods: {
    isTremorDataEmpty() {
      return Object.keys(this._tremor).length === 0;
    }
  },
  props: { fileSelected: Object, cardHeight: Number },
  created() {
    this.isEmpty = true;
    this.tableHeight = this.cardHeight * 0.75;
  },
  updated() {
    this.isEmpty = this.isTremorDataEmpty();
  }
};
</script>
<style>
.card-metric {
  width: auto;
  overflow: hidden;
  border: 1px solid #e8e8e8 !important;
  border-radius: 20px !important;
  align-items: center;
}

.card-metric-container {
  padding: 20px;
}

.card-title {
  font-size: 36px;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: white;
  text-align: center;
}

.card-text {
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  color: white;
}
</style>
