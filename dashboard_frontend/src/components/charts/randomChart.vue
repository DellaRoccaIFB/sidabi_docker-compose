<template>
  
  <!-- <div class="small"> -->
    
    <div id="chart">
      <apexchart type="line" height="250" v-if="loaded" :options="chartOptions" :series="series"></apexchart>
    </div>
    <!-- <line-chart ref="chart" v-if="loaded" :chartdata="datacollection" :options="datacollection.options"></line-chart> -->
  <!-- </div> -->
</template>

<script>
  import apiConfig from "../../config/api.js";
  const url = `${apiConfig.baseUrl}:${apiConfig.port}`;

  // import LineChart from './Chart.vue'

  export default {
    props: {
      scaleValue: Number,
      titleScale: String,
      groupValue: String,
      stimulusValue: String,
      loader: {
        type: Boolean,
        default: false
      }
    },
    
    // components: {
    //   LineChart
    // },
    data() {
      return {
        // datacollection: null,
        labels: [],
        // score: [],
        scoreWithStimulus: [],
        scoreWithoutStimulus: [],
        loaded: false,
        load: null,
        series: [],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
          },
          dataLabels: {
            enabled: false
          },
          
          title: {
            text: this.titleScale,
            align: 'center'
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: [],
          },
          grid: {
            borderColor: '#f1f1f1',
          }
        },
        max: 0,
        average: 0,
        min: 0,
      }
    },
    methods: {
      
      fillData () {
        
        this.datacollection = {
            labels: this.labels,
            datasets: [
              {
                label: 'Score',
                backgroundColor: '#33FFFF',
                data: this.score,
                borderWidth: 4,
                borderColor: 'rgba(77,166,253,0.85)',
                fill: false
              },
            ],
            options: {
              responsive: true,
              maintainAspectRatio: false,
                  onClick: function(event, elementsAtEvent) {
                  debugger
                  //console.log("event",event, elementsAtEvent, this);
                  //debugger into the code plan directly
                  //console.log("element", this.getElementsAtEvent(event))
                  let valueX = null, valueY = null;
                  for (let scaleName in this.scales) {
                    let scale = this.scales[scaleName];
                    if (scale.isHorizontal()) {
                      valueX = scale.getValueForPixel(event.offsetX);
                    } else {
                      valueY = scale.getValueForPixel(event.offsetY);
                    }
                  }
                  //console.log(event.offsetX, valueX, null, event.offsetY, valueY);
                }
            }
        }
        
      },

      async updateData() {

        this.loaded = false;
        await fetch(`${url}/scales/scale/1/${this.scaleValue}/${this.groupValue}/todos`)
        .then(function (response) {
          return response.json();
        }).then((data) => {
          this.labels = data.result.pacientes;

          if(this.stimulusValue == 'Todos'){
            this.max = data.result.max
            this.average = data.result.media
            this.min = data.result.min
          }

        });

        this.scoreWithStimulus = [];

        if(this.stimulusValue == 'Todos' || this.stimulusValue == '1'){
          await fetch(`${url}/scales/scale/1/${this.scaleValue}/${this.groupValue}/1`)
          .then(function(response) {
            return response.json();
          }).then((data) => {

            if(this.stimulusValue == '1'){
              this.max = data.result.max
              this.average = data.result.media
              this.min = data.result.min
            }

            this.scoreWithStimulus = this.labels.map((label, index) => {
              const patientIndex = data.result.pacientes.findIndex(patient => patient === label);
              return patientIndex !== -1 ? data.result.score[patientIndex] : null;
            });

            // this.scoreWithStimulus = data.result.score;
          });

        }

        this.scoreWithoutStimulus = [];

        if(this.stimulusValue == 'Todos' || this.stimulusValue == '0'){

          await fetch(`${url}/scales/scale/1/${this.scaleValue}/${this.groupValue}/0`)
          .then(function(response) {
            return response.json();
          }).then((data) => {

            if(this.stimulusValue == '0'){
              this.max = data.result.max
              this.average = data.result.media
              this.min = data.result.min
            }

            this.scoreWithoutStimulus = this.labels.map((label, index) => {
              const patientIndex = data.result.pacientes.findIndex(patient => patient === label);
              return patientIndex !== -1 ? data.result.score[patientIndex] : null;
            });
          });
        }

        this.chartOptions = {
          title: {
            text: this.titleScale,
            align: 'center',
            style: {
              fontFamily: 'Lato, sans-serif',
              fontSize: '20'
            }
          },
          xaxis: {
            categories: this.labels,
            labels: {
              rotate: -45,
              rotateAlways: true,
            },
            title: {
              text:"Pacientes",
              align:"center",
              style: {
                fontFamily: 'Lato, sans-serif',
                fontSize: '18',
              }
            }
          },
          stroke: {
            curve: 'straight',
            dashArray: [8, 0]
          },
          
        };

        this.series = [
          {
            name: 'Sem Estímulo',
            data: this.scoreWithoutStimulus,
            color: "#ff0000"
          },
          {
            name: 'Com Estímulo',
            data: this.scoreWithStimulus,
            color: "#49b5c5"
          }
        ]

        

        this.loaded = true;
  
        this.$emit('loader', false);
        this.$emit('max', this.max);
        this.$emit('average', this.average);
        this.$emit('min', this.min);
        
      }
    },
    watch: {
      loader(loader) {
        if(loader){
          setTimeout(() => {
            this.updateData();
          }, 1000);
        }
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
    margin-top: 0px;
  }
</style>
