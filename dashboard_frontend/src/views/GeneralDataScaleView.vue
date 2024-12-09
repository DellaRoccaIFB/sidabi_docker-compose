<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-6">
        <!-- inicio card scale info -->
        <card-scale-info
          @scale="getScaleValue"
          @group="getGroupValue"
          @stimulus="getStimulusValue"
          @loader="checkParamValue"
          @titleScale="getTitleScale"
          @graphType="getGraphType"
        />
      </div>
      <!-- fim card scale info -->
      <div class="col-6">
        <card-info-chart
          :graphType="graphType"
        />
      </div>
      
    </div>
    
    <div class="row">
      <div v-if="loader" class="col-12">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g transform="rotate(0 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(30 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(60 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(90 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(120 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(150 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(180 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(210 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(240 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(270 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(300 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(330 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
          </g>
        </svg>
      </div>
      <div class="col-12">
        <random-chart
        @loader="checkParamValue"
        :scaleValue="scaleValue"
        :groupValue="groupValue"
        :titleScale="titleScale"
        :stimulusValue="stimulusValue"
        :loader="loader"
        @average="getAverage"
        @max="getMax"
        @min="getMin"
        /> 
      </div>
    </div>
    
    
    <div class="row">
      <div class="col-4">
        <v-card class="rounded-25" max-width="280" color="#3175D3">
          <v-card-body class="text-center">
            <p class="text-h5 text-center" style="color: white; padding-top: 5px; margin-bottom: 0px;">
              {{ averageLabel }}
            </p>
            <p class="text-h5" style="color: white;">{{ average }}</p>
          </v-card-body>
        </v-card>
      </div>
      <div class="col-4">
        <v-card class="rounded-25" max-width="280" color="#3175D3">
          <v-card-body class="text-center">
            <p class="text-h5 text-center" style="color: white; padding-top: 5px; margin-bottom: 0px;">
              {{ maxLabel }}
            </p>
            <p class="text-h5" style="color: white;">{{ max }}</p>
          </v-card-body>
        </v-card>
      </div>
      <div class="col-4">
        <v-card class="rounded-25" max-width="280" color="#3175D3">
          <v-card-body class="text-center">
            <p class="text-h5" style="color: white; padding-top: 5px; margin-bottom: 0px;">
              {{ minLabel }}
            </p>
            <p class="text-h5" style="color: white;">{{ min }}</p>
          </v-card-body>
        </v-card>
      </div>
    </div>

  </div>
</template>

<script>
import CardInfoChart from "../components/cards/cardInfoChart.vue";
import CardScaleInfo from "../components/cards/cardScaleInfo.vue";
// import CardPartMiAverage from "../components/cards/cardPart.vue";

// import TwoLineChart from "../components/charts/twoLineChart.vue";
import RandomChart from "../components/charts/randomChart.vue";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      scaleValue: null,
      groupValue: null,
      averageLabel: 'Média',
      maxLabel: 'Máximo',
      minLabel: 'Mínimo',
      average: null,
      max: null,
      min: null,
      graphType: null,
      stimulusValue: null,
      titleScale: '',
      aleatoryParam: null,
      loader: false,
    };
  },
  computed: {
    ...mapGetters("scaleView", [""]),
    ...mapState("scales", [""]),

    _scale() {
      return this.score;
    }
  },
  methods: {
    getScaleValue: function(payload){
      this.scaleValue = payload;
    },
    getGroupValue: function(payload){
      this.groupValue = payload;
    },
    getStimulusValue: function(payload){
      this.stimulusValue = payload;
    },
    checkParamValue: function(payload){
      this.loader = payload;
      // setTimeout(() => {
      //   this.loader = false;
      // }, 300)
    },
    getTitleScale: function(payload){
      this.titleScale = payload;
    },
    getGraphType: function(payload){
      this.graphType = payload;
    },
    getAverage: function(payload){
      this.average = payload;
    },
    getMax: function(payload){
      this.max = payload;
    },
    getMin: function(payload){
      this.min = payload;
    },
  },
  components: {
    CardInfoChart,
    CardScaleInfo,
    // TwoLineChart,
    RandomChart,
  },
};
</script>

<style lang="scss">
  .rounded-25{
    border-radius: 25px !important;
  }
</style>

