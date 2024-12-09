<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-5">
        <!-- inicio card info user -->
        <card-info-user />
      </div>
      <!-- fim card info user -->
      <div class="col-7">
        <two-line-chart />
      </div>
    </div>
    <div class="row">
      <card-progress-parts> </card-progress-parts>
      <!-- <bar-chart/> -->
    </div>
    <div class="row parts">
      <div v-for="part in _updrsParts" v-bind:key="part">
        <card-part :title="part"> </card-part>
      </div>
    </div>
  </div>
</template>

<script>
import CardInfoUser from "../components/cards/cardInfoUser.vue";
import CardProgressParts from "../components/cards/cardProgressParts.vue";

import TwoLineChart from "../components/charts/twoLineChart.vue";
import BarChart from "../components/charts/barChart.vue";
import CardPart from "../components/cards/cardPart.vue";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showGraphHistory: "hidden",
      twoLineChartProps: {
        series: [
          {
            name: "Pontuação",
            data: [] // pontuacao
          }
        ],
        categories: []
      },
      barChartProps: {
        series: [
          {
            data: []
          }
        ],
        categories: ["PARTE 1", "PARTE 2", "PARTE 3", "PARTE 4"]
      },
      graphData: [],
      graphCategories: []
    };
  },
  computed: {
    ...mapGetters("resultsView", ["getUpdsParts"]),
    ...mapState("results", ["scoreHistoryGraphData", "partsAssessSelected"]),

    _scoreHistory() {
      return this.scoreHistoryGraphData;
    },
    _updrsParts() {
      return this.getUpdsParts;
    },
    _partsAssessSelected() {
      return this.partsAssessSelected;
    }
  },
  methods: {
    ...mapActions("results", ["getScoreHistory"]),
    loadScoreHistoryGraph() {
      //debugger
      this.twoLineChartProps.series.data = this.scoreHistoryGraphData.data;
      this.twoLineChartProps.categories = this.scoreHistoryGraphData.categories;
      this.loadPartsGraph();
    },
    loadPartsGraph() {
      this.barChartProps.series.data = this.partsAssessSelected.data;
    }
  },
  components: {
    CardInfoUser,
    TwoLineChart,
    BarChart,
    CardPart,
    CardProgressParts
  },
  async created() {
    //this.loadScoreHistoryGraph()
    //this.showGraphHistory = ''
  }
};
</script>

<style lang="scss">
.parts {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  padding-top: 2%;

  div {
    max-width: 24%;
    border-radius: 25px !important;
  }
}
</style>
