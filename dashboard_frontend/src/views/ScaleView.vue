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
        <card-progress-scale-aes> </card-progress-scale-aes>
        <!-- <bar-chart/> -->
      </div>
      <div class="row parts">
        <div v-for="part in _scaleParts" v-bind:key="part">
          <card-part :title="part"> </card-part>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CardInfoUser from "../components/cards/cardInfoUser.vue";
  import CardProgressScaleAes from "../components/cards/cardProgressScaleAes.vue";
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
        categories: ["Questão 1", "Questão 2", "Questão 3"]
        },
        graphData: [],
        graphCategories: []
      };
    },
    computed: {
      ...mapGetters("scaleViewAes", ["getScaleParts"]),
      ...mapState("scaleAes", ["scoreHistoryGraphDataAes", "partsScaleSelectedAes"]),
      _scoreHistory() {
        return this.scoreHistoryAesGraphData;
      },
      _scaleParts() {
        return this.getScaleParts;
      },
      _partsScaleSelected() {
        return this.partsScaleSelectedAes;
      }
    },
    methods: {
      ...mapActions("scaleAes", ["getScoreScaleAes"]),
      loadScoreHistoryGraph() {
        //debugger
        this.twoLineChartProps.series.data = this.scoreHistoryGraphDataAes.data;
        this.twoLineChartProps.categories = this.scoreHistoryGraphDataAes.categories;
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
      CardProgressScaleAes
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