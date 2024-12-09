<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-5">
        <!-- inicio card info user -->
        <card-info-user />
      </div>
      <!-- fim card info user -->
      <div class="col-7">
        <!-- <two-line-chart />: -->
        <filter-scale />

      </div>
    </div>
    <div class="row">
      <card-progress-scale-mbss> </card-progress-scale-mbss>
      <!-- <bar-chart/> -->
    </div>
  </div>
</template>

<script>
import CardInfoUser from "../components/cards/cardInfoUser.vue";
import CardProgressScaleMbss from "../components/cards/cardProgressScaleMbss.vue";

import TwoLineChart from "../components/charts/twoLineChart.vue";
import FilterScale from "../components/cards/cardFilterScale.vue";

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
      categories: ["Questão 1", "Questão 2", "Questão 3"]
      },
      graphData: [],
      graphCategories: []
    };
  },
  computed: {
    ...mapGetters("scaleViewMbss", ["getScaleParts"]),
    ...mapState("scaleMbss", ["scoreHistoryGraphDataMbss", "partsScaleSelectedMbss"]),

    _scoreHistory() {
      return this.scoreHistoryGraphData;
    },
    _scaleParts() {
      return this.getScaleParts;
    },
    _partsScaleSelected() {
      return this.partsScaleSelected;
    }
  },
  methods: {
    ...mapActions("scaleMbss", ["getScoreScaleMbss"]),
    loadScoreHistoryGraph() {
      //debugger
      this.twoLineChartProps.series.data = this.scoreHistoryGraphDataMbss.data;
      this.twoLineChartProps.categories = this.scoreHistoryGraphDataMbss.categories;
      this.loadPartsGraph();
    },
    loadPartsGraph() {
      this.barChartProps.series.data = this.partsAssessSelected.data;
    }
  },
  components: {
    CardInfoUser,
    TwoLineChart,
    FilterScale,
    BarChart,
    CardPart,
    CardProgressScaleMbss
  },
  async created() {
    //this.loadScoreHistoryGraph()
    //this.showGraphHistory = ''
  }
};
</script>