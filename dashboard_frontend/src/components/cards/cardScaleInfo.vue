<template>
  <v-card
    class="card-scale-info"
    :height="card_height"
  >
    <v-card-title
      class="title-card"
    >
     Configurações do Gráfico
    </v-card-title>
      <v-card-text class="card-text"> 
        <div class="min-height" style="display: flex; flex-basis: 100%">
          <h5 class="texto">Escala:</h5>
          <v-select 
            :items="scales"
            item-text="title"
            item-value="id"
            v-model="scaleValue"
            :height="bar_height"
            label=""
            dense
            filled
            rounded
            solo
          />
        </div>
        <div class="min-height" style="display: flex; flex-basis: 100%">
          <h5 class="texto">Grupo:</h5>
          <v-select 
            :items="groups"
            item-text="name"
            v-model="groupValue"
            :height="bar_height"
            label=""
            dense 
            filled 
            rounded 
            solo
          />
        </div>
        <div class="min-height" style="display: flex; flex-basis: 100%;">
          <h5 class="texto">Condição:</h5>
            <v-select
              :items="stimulus"
              item-text="name"
              item-value="id"
              v-model="stimulusValue"
              :height="bar_height"
              label=""
              dense 
              filled 
              rounded 
              solo
            />
        </div>
      </v-card-text>
    <v-card-actions style="justify-content: right;">
      <v-btn
        @click="clickCard()"
        filled 
        rounded 
        solo
        outlined 
        color="" 
        class="" 
        text
      >
        Visualizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import apiConfig from "../../config/api.js";
  const url = `${apiConfig.baseUrl}:${apiConfig.port}`;
export default {
  data() {
    return {
      scaleValue: "",
      groupValue: "",
      stimulusValue: "",
      scale: null,
      group: null,
      stimulus: 0,
      loader: 1,
      // todo - REVISAR TRADUCAO
      card_height: "",
      scales: [],
      groups: [
        {
          "name": "Grupo de Controle"
        },
        {
          "name": "Grupo Experimental"
        }
      ],
      stimulus: [
        {
          "name": "",
          "id": ""
        },
        {
          "name": "com e sem estímulo",
          "id": "Todos"
        },
        {
          "name": "sem estímulo",
          "id": "0"
        },
        {
          "name": "com estímulo",
          "id": "1"
        }
      ]
    };
  },
  async mounted() {
    await fetch(`${url}/scales/1`)
      .then(function(response) {
        return response.json();
      }).then((data) => {
        
        this.scales = [];

        let arrScales = [];

        data.map(function(row){
          arrScales.push({
            'title': row.titulo,
            'id': row.id,
            'description': row.descricao
          }); 
        });

        this.scales = arrScales;

      });
  },
  methods: {
    clickCard: function() {

      let graphType = this.groupValue;
      let stimulus = this.stimulusValue;
      let scaleValue = this.scaleValue;
      let titleScale = '';

      this.$emit('scale', this.scaleValue);
      this.$emit('group', this.groupValue);
      this.$emit('stimulus', this.stimulusValue);
      this.$emit('loader', true);

      this.scales.map(function(row){
        if(scaleValue == row.id)
          titleScale = row.title;

      });

      this.$emit('titleScale', titleScale);

      this.stimulus.map(function(row){
        if(stimulus == row.id)
          graphType += ' '+ row.name;
      });

      this.$emit('graphType', graphType);
    }
  },
  created() {
    this.card_height = window.innerHeight - 780;
    this.bar_height = 0;
  }
};
</script>

<style lang="scss">
  .card-scale-info {
    border-radius: 19px !important;
  }
  .card-button {
    margin-bottom: 5px;
    text-align: left;
  }
  .title-card{
    padding-top: 1px;
    font-size: medium;
    justify-content: center;
  }

  .texto {
    margin-top: 7px;
    margin-bottom: 8px;
    padding-right: 17px;
    font-size: small;
  }

  .small {
    margin-top: 60px !important;
  }

  .card-text{
    padding: 20px;
  }
  .min-height{
    height: 38px;
  }
  .v-text-field--filled.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--filled.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--filled.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot {
    min-height: 27px !important;
  }
  .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 5px;
  }

</style>

