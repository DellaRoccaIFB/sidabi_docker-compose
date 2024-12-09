<template>
  <div id="tela-lista">
    <div class="row">
      <h3 class="pt-4">
        {{ _pageTitle }}
      </h3>
    </div>
    <hr />
    <v-card class="mt-2 row m0">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="_labelSearch"
          single-line
          small
          hide-details
          class="search-text-field"
        ></v-text-field>
      </v-card-title>
      <v-divider class="mr-4  "></v-divider>
      <v-card-text style="margin: 0px !important; padding: 0 !important; ">
        <v-data-table
          :headers="_tableHeaders"
          :items="patients"
          :items-per-page="5"
          class="elevation-1"
          :search="search"
          style="margin: 0px !important;"
          :footer-props="_tableFooterProps"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="handleLoadStatistcs(item)">
              mdi-chart-line
            </v-icon>
          </template>

          <template slot="no-data">
            {{ _labelNoData }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [],
      patients: [],
      isUPDRSPatients: false
      //    patientsList:[],
    };
  },
  computed: {
    ...mapState("patients", ["patientsList"]),
    ...mapState("session", ["token", "loginId"]),
    ...mapGetters("patientsListView", [
      "getHeadersTablePatients",
      "getPageTitle",
      "getTableFooterProps",
      "getTableLabelSearch",
      "getTableLabelNoData"
    ]),
    _tableFooterProps() {
      const { itensPerPage } = this.getTableFooterProps;
      return {
        showFirstLastPage: true,
        "items-per-page-text": itensPerPage
      };
    },
    _labelNoData() {
      return this.getTableLabelNoData;
    },
    _labelSearch() {
      return this.getTableLabelSearch;
    },
    _pageTitle() {
      return this.getPageTitle;
    },
    _loginId() {
      return this.loginId;
    },
    _token() {
      return this.token;
    },
    _patients() {
      return this.patientsList;
    },
    _tableHeaders() {
      const {
        name,
        age,
        gender,
        dateOfBirth,
        actions
      } = this.getHeadersTablePatients;
      return [
        {
          text: name,
          align: "start",
          sortable: false,
          value: "patient_name"
        },
        {
          text: age,
          value: "age",
          sortable: true
        },
        {
          text: dateOfBirth,
          value: "date_of_birth"
        },
        {
          text: actions,
          value: "actions",
          sortable: false
        }
      ];
    }
  },
  methods: {
    ...mapActions("patients", [
      "getUPDRSPatientsList",
      "getSensorPatientsList",
      "getScalePatientsList",
      "selectPatient"
    ]),
    ...mapActions("results", ["getScoreHistory"]),
    ...mapActions("scale", ["getScoreScale"]),
    ...mapActions("scaleSam", ["getScoreScaleSam"]),
    ...mapActions("scaleMca", ["getScoreScaleMca"]),
    ...mapActions("scaleAes", ["getScoreScaleAes"]),
    ...mapActions("scaleMbss", ["getScoreScaleMbss"]),
    ...mapActions("scaleSfss", ["getScoreScaleSfss"]),
    ...mapActions("scaleStai", ["getScoreScaleStai"]),
    async loadPatientsList() {
      if (this.isUPDRSPatients) {
        await this.getUPDRSPatientsList({
          token: this._token,
          loginId: this._loginId
        });
      } else if (this.isSensorPatients) {
        await this.getSensorPatientsList({
          token: this._token,
          loginId: this._loginId
        });
      } else{
        await this.getScalePatientsList({
          token: this._token,
          loginId: this._loginId
        });
      }
    },
    async handlePaitentslist() {
      await this.loadPatientsList();
      this.patients = this._patients;
    },
    async handleLoadStatistcs(patient) {
      this.selectPatient(patient);
      if (this.isUPDRSPatients) {
        await this.getScoreHistory();
        this.$router.push("/patients/updrs");
      } else if (this.isSensorPatients) {
        this.$router.push("/patients/sensor");
      } else {
        let scaleId;
        
        switch (this.$router.currentRoute.name) {
          case 'cma':
            scaleId = 7;
            await this.getScoreScaleMca(scaleId, this.$router.currentRoute.name);
            console.log('>>>>>>>>>>>>');
            this.$router.push("/patients/scale/cma");
            break;
          case 'sfss':
            scaleId = 8;
            await this.getScoreScaleSfss(scaleId, this.$router.currentRoute.name);
            console.log('>>>>>>>>>>>>');
            this.$router.push("/patients/scale/sfss");
            break;
          case 'aes':
            scaleId = 9;
            await this.getScoreScaleAes(scaleId, this.$router.currentRoute.name);
            console.log('>>>>>>>>>>>>');
            this.$router.push("/patients/scale/aes");
            break;
          case 'mbss':
            scaleId = 10;
            await this.getScoreScaleMbss(scaleId, this.$router.currentRoute.name);
            console.log('>>>>>>>>>>>>');
            this.$router.push("/patients/scale/mbss");
            break;
          case 'stai':
            scaleId = 11;
            await this.getScoreScaleStai(scaleId, this.$router.currentRoute.name);
            console.log('>>>>>>>>>>>>');
            this.$router.push("/patients/scale/stai");
            break;
          case 'sam':
            scaleId = 12;
            await this.getScoreScaleSam(scaleId, this.$router.currentRoute.name);
            // console.log('>>>>>>>>>>>>');
            this.$router.push("/patients/scale/sam");
            break;
          default:
            break;
        }
        // await this.getScoreScale(this.$router.currentRoute.name);
        
      }
    }
  },
  async created() {
    if (this.$router.currentRoute.name == "updrs_patients") {
      this.isUPDRSPatients = true;
      this.isSensorPatients = false;
    } else if (this.$router.currentRoute.name == "sensor_patients") {
      this.isUPDRSPatients = false;
      this.isSensorPatients = true;
    } else{
      this.isUPDRSPatients = false;
      this.isSensorPatients = false;
    }
    
    await this.handlePaitentslist();
  }
};
</script>

<style lang="scss">
#tela-lista {
  width: 100% !important;
  .v-card {
    .v-card__text {
      border: none;
      .v-data-table {
        .v-data-table__wrapper {
          height: 400px;
        }
      }
      .theme--light.v-table tbody tr:not(:last-child) {
        border-bottom: none !important;
      }
    }
  }
}
.elevation-1 {
  margin-left: 4%;
  margin-right: 4%;
}
h1 {
  padding: 4%;
}
.search-text-field {
  margin-left: 85%;
  max-width: 15% !important;
}
.m0 {
  padding: 0;
  margin: 0;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
}
</style>