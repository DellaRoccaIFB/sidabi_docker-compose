<template>
    <v-card class="card-progress-scale-mca" outlined :width="graph_width" :height="170">
        <v-card-title class="m0 p0 pl-2">
            <p style="  font-size: 19px;
                        font-weight: bold;
                        font-family: 'Lato';
                        margin-left: auto;
                        margin-right: auto;">
                Modelo Circumplexo de Afeto
            </p>
        </v-card-title>
        <v-card-text class="card-progress-scale-text">
            <div v-for="part in data_parts" v-bind:key="part.label" class="line-progress-part">

                <span class="legend" style="min-width: 6% !important;">
                    {{ part.label }}
                </span>

                <v-progress-linear :value="part.value * 10" :height="18" class="progress_bar pb-0 mb-0" rounded />


                <span class="legend pl-4 pb-2" style="min-width: 6% !important;">
                    {{ part.value }}
                </span>
            </div>
        </v-card-text>
        <div class="container-cards">
        <v-card class="card-total" max-width="400" height="120" width="185" color="#3175D3">
            <v-card-text class="card-total-text" width="100%">
                <p class="text-h5" style="width: fit-content; color: white; font-size: 26px !important; padding: 10px; margin-left: 46px">
                    Total
                </p>
                <div class="row parts">
                    <div>
                        <p class="text-h5" style="width: fit-content; color: white; font-size: 25px !important; padding: 10px; margin-left: 65px;">
                            {{ soma }}
                        </p>
                    </div>
                </div>
            </v-card-text>
        </v-card>
        <v-card class="card-info" max-width="400" height="120" width="185" color="#3175D3">
                <p class="text-h9" style="width: fit-content; color: white; font-size: 14px !important; padding: 10px; margin-left: 33px; margin-top: 0px; text-align: center;">
                    Pontuação
                    <br>
                    1 - 3 = Energia
                    <br>
                    4 - 6 = Calma
                    <br>
                    7 - 9 = Cansaço
                    <br>
                    10 - 12 = Tensão
                </p>
        </v-card>
        </div>
    </v-card>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import eventBus from '../../events/EventBus'

export default {
    //props: ["data"],
    data() {
        return {
            window_width: '',
            graph_width: '',
            //partsAssessSelected: [2, 3, 4, 6]
            patternTotalScore: [52, 52, 128, 24],
            data_parts: [
            ],
            date: ''
        }

    },
    computed: {


        ...mapGetters("scaleViewMca", ["getScaleParts", "getScalePartsNamesMca"]),

        ...mapState("scale", ["partsScaleSelected"]),
        ...mapState("scaleMca", ["partsScaleSelectedMca"]),


    },
    methods: {
        handleUpdateValues({ parts, date }) {
            const score = parts
            const pp = this.patternTotalScore
            const newScores = []
            console.log('>>>>>>>>>>>>>');
            console.log(this.getScalePartsNamesMca);
            console.log('>>>>>>>>>>>>>');

            for (let i = 0; i < this.patternTotalScore.length; i++) {
                const percentage = (score[i] / pp[i]) * 100;
                newScores.push(Math.ceil(percentage))

            }
            this.data_parts = [
                { label: this.getScalePartsNamesMca[0], value: newScores[0] },]
            this.date = date
        },
        loadDataParts() {
            const score = this.partsScaleSelectedMca.data
            const soma = score.reduce((acumulado, atual) => acumulado + atual);
            this.soma = soma;
            this.data_parts = [
                { label: this.getScalePartsNamesMca[0], value: score[0] },]

        },
        handleComponentSize() {
            this.window_width = window.innerWidth
            this.graph_width = this.window_width - 300
        }
    },
    destroyed() {
        window.removeEventListener("resize", this.handleComponentSize);
    },
    created() {
        window.addEventListener("resize", this.handleComponentSize);
        this.loadDataParts()
        eventBus.$on('change_parts_chat_options', this.handleUpdateValues)
    }
}
</script>
<style lang='scss'>
.card-progress-scale-mca {

    padding: 0.5%;
    border: 1px solid #E8E8E8 !important; //TODO - add color variables sass file
    border-radius: 20px !important;

    .card-progress-scale-text {
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

.parts {
    color: #E8E8E8;
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    padding-top: 2%;

    div {
        max-width: 24%;
        border-radius: 25px !important;
    }
}

.card-total {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 25px !important;
}

.card-info {
    margin-top: 15px !important;
    margin-right: 300px !important;
    border-radius: 25px !important;
}

.card-total-text {
    justify-content: center;

    margin-left: auto;
    margin-right: auto;
}

.container-cards {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
}
</style>