<template>
    <v-container>
      <v-row class="mb-4">
        <v-col>
          <p class="text-h4 text-center font-weight-bold">Escolha uma escala</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          v-for="(card, index) in cardsData"
          :key="index"
          cols="0"
          md="0"
          lg="2"
          xl="0"
        >
          <v-card
            min-height="120"
            min-width="50"
            outlined
            :title="card.message"
            class="pa-3 mx-2 my-8 rounded-lg"
            style="background: linear-gradient(rgba(49, 117, 211, 1), rgba(85, 144, 224, 1))"
            @click="handleCardClick(card)"
          >
            <v-img
              contain
              :src="getImgUrl(card.img)"
              :height="imgHeight"
              v-resize="calculateHeight"
            ></v-img>
            <v-card-title
              class="justify-center pt-10 font-weight-bold white--text text-h5"
            >
              {{ card.title }}
            </v-card-title>
          </v-card>
        </v-col>
        <v-btn
          @click="reachScaleView()"
          filled 
          rounded 
          solo
          width="300" 
          class="btn-scale" 
          style="background: linear-gradient(rgba(49, 117, 211, 1), rgba(85, 144, 224, 1)); color: white;"
        >
          Dados Gerais
        </v-btn>
      </v-row>
      <v-btn
          filled 
          rounded 
          solo
          width="135" 
          class="btn-guia" 
          style="background: linear-gradient(rgba(49, 117, 211, 1), rgba(85, 144, 224, 1)); color: white;"
        >
        <a href='https://www.canva.com/design/DAFj2eO7uAE/0OjJqgiD8A0SHhqxke7egw/edit?utm_content=DAFj2eO7uAE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' target="blank" id="meulink">GUIA DE USO</a>
      </v-btn>
    </v-container>
  </template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      cardsData: [
        {
          title: "AES",
          id: 9,
          img: "aes_img",
          message: "Escala para Avaliação da Atividade (A&S)"
        },
        {
          title: "MBSS",
          id: 10,
          img: "boredom_img",
          message: "Escala Multidimensional do Estado de Tédio"
        },
        {
          title: "CMA",
          id: 7,
          img: "cma_img",
          message: "Modelo Circumplexo de Afeto"
        },
        {
          title: "SAM",
          id: 12,
          img: "sam_img",
          message: "Manequim de Auto-Avaliação"
        },
        {
          title: "SFSS",
          id: 8,
          img: "sfss_img",
          message: "Escala Curta de Fluxo"
        },
        {
          title: "STAI",
          id: 11,
          img: "stai_img",
          message: "Inventário de Ansiedade Traço-Estado"
        }
      ],
      pageHeight: null,
      routeName: ""
    };
  },

  computed: {
    ...mapState("session", ["token", "loginId"]),
    ...mapGetters("cardSelectionView", ["getTitle"]),
    _title() {
      return this.getTitle;
    },

    _loginId() {
      return this.loginId;
    },
    _token() {
      return this.token;
    },
    imgHeight: function() {
      var offset = 320;
      return this.pageHeight - offset;
    },
    mounted: function() {
      return this.calculateHeight();
    }
  },
  methods: {
    handleCardClick: function(card) {
      console.log(card)
      switch (card.title) {
        case "AES":
          return this.$router.push("scale_patients/aes");
        case "MBSS":
          return this.$router.push("scale_patients/mbss");
        case "CMA":
          return this.$router.push("scale_patients/cma");
        case "SAM":
          return this.$router.push("scale_patients/sam");
        case "SFSS":
          return this.$router.push("scale_patients/sfss");
        case "STAI":
          return this.$router.push("scale_patients/stai");
      }
    },
    reachScaleView: function() {
      this.$router.push({name:"general_data_scale"});
    },
    getImgUrl: function(img) {
      var images = require.context("../assets/", false, /\.svg$/);
      return images("./" + img + ".svg");
    },
    calculateHeight: function() {
      var body = document.body;
      var html = document.documentElement;

      this.pageHeight = Math.max(
        body.offsetHeight * 0.7,
        html.clientHeight * 0.7,
        html.offsetHeight * 0.7
      );
    }
  }
};
</script>

<style lang="scss">
 .btn-scale{
  font-family: 'Lato';
  color: #3175D3;
  font-weight: bolder;
  margin-left: 15px;
 }

 .btn-guia{
    font-family: 'Lato';
    color: #fff;
    text-decoration: none;
    text-decoration-color: white;
    font-weight: bolder;
    float: left;
    margin-top: 70px;
    margin-left: 515px;
 }

 a {
    text-decoration: none;
    color: #fff;
  }
#meulink { color: #fff; }
</style>

