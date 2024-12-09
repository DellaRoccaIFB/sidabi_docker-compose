<template>
    <v-card class="card-progress-parts" 
        outlined 
        :width="graph_width"
        :height="170">
        <v-card-title class="m0 p0 pl-2">
            <p style="  font-size: 15px;
                    font-weight: bold;
                    font-family: 'Lato';">

            {{ date }}
            </p>
        </v-card-title>
        <v-card-text class="card-progress-parts-text">
            <div 
                v-for="part in data_parts" v-bind:key="part.label" class="line-progress-part">
                
                <span class="legend" style="min-width: 6% !important;">
                        {{ part.label }}
                    </span>
            
                <v-progress-linear 
                    :value="part.value" 
                    :height="18"
                    class="progress_bar pb-0 mb-0"
                    rounded/> 
                    
                
                    <span class="legend pl-4 pb-2" style="min-width: 6% !important;">
                        {{ part.value }} %
                    </span>
            </div>
        </v-card-text>
    </v-card>
   

</template>
<script>
import {mapGetters, mapState} from 'vuex'
import eventBus from '../../events/EventBus'

export default {
    //props: ["data"],
    data() {
        return {
            window_width: '',
            graph_width: '',
            //partsAssessSelected: [2, 3, 4, 6]
            patternTotalScore : [52,52,128,24],
            data_parts : [
            ],
            date: ''
        }
        
    },
    computed:{

    ...mapGetters("resultsView", ["getUpdsParts", "getUpdsPartsNames"]),

    ...mapState("results", ["partsAssessSelected"]),
 
    },
    methods: {
        handleUpdateValues({parts , date}) {
            const score = parts
            const pp = this.patternTotalScore
            const newScores = []

            for (let i = 0; i < this.patternTotalScore.length; i++) {
                const percentage = ( score[i] / pp[i]) * 100;
                newScores.push( Math.ceil(percentage))
                
            }   
            this.data_parts = [
                { label: this.getUpdsPartsNames[0], value: newScores[0] },
                { label: this.getUpdsPartsNames[1], value: newScores[1] },
                { label: this.getUpdsPartsNames[2], value: newScores[2] },
                { label: this.getUpdsPartsNames[3], value: newScores[3] },]
            this.date = date
        },
        loadDataParts(){
            const score =  this.partsAssessSelected.data
            this.data_parts = [
                { label: this.getUpdsPartsNames[0], value: score[0] },
                { label: this.getUpdsPartsNames[1], value: score[1] },
                { label: this.getUpdsPartsNames[2], value: score[2] },
                { label: this.getUpdsPartsNames[3], value: score[3] },]
            
        },
        handleComponentSize(){
            this.window_width = window.innerWidth
            this.graph_width = this.window_width - 300
        }
    },
    destroyed() {
    window.removeEventListener("resize", this.handleComponentSize);
    },
    created(){
        window.addEventListener("resize", this.handleComponentSize);
        this.loadDataParts()
        eventBus.$on('change_parts_chat_options', this.handleUpdateValues )
    }
}
</script>
<style lang='scss'>
    .card-progress-parts {
        
        padding: 0.5%;
        margin-top: 1.5% ;
        border: 1px solid #E8E8E8 !important; //TODO - add color variables sass file
        border-radius: 20px !important;

        .card-progress-parts-text {
            display: flex;
            flex-direction: column;
            height: 140px;
            justify-content: space-around;
            .line-progress-part {
                display: flex;
                justify-content: space-around;
                .legend {
                    font-size: 16px;
                    font-weight: bold;
                    font-family: 'Lato';
                }

                .progress_bar {
                    min-width: 600px !important;
                    max-width: 80% !important;

                }
            }
            
            .progress-linear-border-radius {
                border-radius: 35px !important;
            }
            .v-progress-linear--rounded {

                border-radius: 35px !important;
            }
        }
    }
</style>
