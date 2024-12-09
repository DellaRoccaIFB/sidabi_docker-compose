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
    class="card"
    v-else-if="!_isLoading && !isEmpty"
    :height="cardHeight"
    outlined
  >
    <v-card-text>
      <apexchart
        :height="cardHeight - 20"
        :options="chartOptions"
        :series="chartSeries"
      >
      </apexchart>
    </v-card-text>
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
      isEmpty: false
    };
  },
  props: {
    chartOptions: Object,
    chartSeries: Array,
    cardHeight: Number
  },
  computed: {
    ...mapState("sensor", ["isChartDataLoading", "tremor", "tremorLevelData"]),
    ...mapGetters("sensorView", ["getGeneric"]),
    _loading() {
      const { loading } = this.getGeneric;
      return loading;
    },
    _empty() {
      const { empty } = this.getGeneric;
      return empty;
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
    isTremorEmpty() {
      return JSON.stringify(this._tremor) === "{}";
    }
  },
  created() {
    this.isEmpty = this.isTremorEmpty();
  },
  updated() {
    this.isEmpty = this.isTremorEmpty();
  }
};
</script>
<style>
.card {
  border: 1px solid #e8e8e8 !important;
  border-radius: 20px !important;
}
</style>
