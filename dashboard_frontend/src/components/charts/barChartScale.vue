<template>
    <div>
        <v-card outlined class="chart-bar-container">
            <div>
                <apexchart
                    height="275"
                    :options="options"
                    :series="series"
                ></apexchart>
            </div>
        </v-card>
    </div>
</template>

<script>
  import apiConfig from "../../config/api.js";
  const url = `${apiConfig.baseUrl}:${apiConfig.port}`;
    import { mapState } from 'vuex'

    export default {

        data() {
            return {
                options: {
                    chart: {
                        id: 'barchart',
                        type: 'bar',
                        border: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            borderRadius: 25,
                            barHeight: '58%',
                            dataLabels: {
                                position: 'top',
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            colors: ['#000'],
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 'bold',
                        },
                        offsetX: 1000
                    },
                    line:{
                        width: 11
                    },
                    xaxis: {
                        type: "category",
                        categories: [],
                        labels: {
                            show: false,
                        }
                        
                    },
                    tooltip: {
                        custom: function({series, seriesIndex, dataPointIndex, w}) {
                            return  '<div class="apexcharts-tooltip-title">' + w.config.series[seriesIndex].data[dataPointIndex].x + '</div>' +
                                '<div class="apexcharts-tooltip-text">'+
                                    w.config.series[seriesIndex].data[dataPointIndex].name +
                                '</div>'
                        }
                    },
                    colors: ['#3175D3'],
                    
                },
                series: [],
            }
        },
        computed: {
            ...mapState("patients", ["patientSelected"])
        },
        methods: {
            async updateSeries() {
               
                let seriesData = [];
                let categories = [];

                await fetch(`${url}/scales/1/${this.$route.params.id}/${this.patientSelected.id}`)
                    .then(function(response){
                        return response.json();
                    }).then((response) => {

                        if(response.result.length == 0){

                            seriesData.push({
                                x: 'Sem Perguntas',
                                y: 0,
                                name: 'Sem Registros'
                            });

                            categories.push('Sem Perguntas');

                        } else{

                            let data = response.result[0];
                            
                            let text = '';

                            data.map(function(row, index){

                                text = 'Q'+ (index+1);
                                
                                seriesData.push({
                                    x: text,
                                    y: row.valor,
                                    name: row.titulo
                                });
                                
                                categories.push(text);
                                
                            });
                            
                            
                        }


                    });

                this.options = {
                    xaxis: {
                        categories: categories
                    }
                };

                this.series = [{data: seriesData}]

                // this.series = seriesData.map(function(value, index){
                //     return {
                //         name: nameData[index],
                //         data: [{
                //             x: 'Q'+ (index+1),
                //             y: value
                //         }]
                //     }
                // });

            }
        },
        created: function (){
            this.updateSeries();
        }
    }

</script>

<style lang="scss">

    .chart-bar-container {
        padding: 0.5%;
        border-color: #c8c8c8 !important; //TODO - add color variables sass file
        border-radius: 20px !important;
    }
    
</style>
