<template>
    <v-card class="espessura">
        <v-card-body>
          <table style="width: 100%;">
            <tr>
              <td style="width: 80%; text-align: right;">
                <h5>
                    Gráfico
                </h5>
              </td>
              <td rowspan="2">
                <svg width="101" height="60" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1628_586)">
                    <rect width="101" height="101" rx="50" fill="#95BAED"/>
                    <path d="M50.5 0C22.6096 0 0 22.6096 0 50.5C0 78.3904 22.6096 101 50.5 101C78.3904 101 101 78.3904 101 50.5C101 22.6096 78.3904 0 50.5 0ZM21.1382 28.2644H79.8617V72.7355H21.1382V28.2644ZM28.3569 35.4215V65.5785H72.6431V35.4215H28.3569ZM66.0346 37.8072L70.9971 40.6737L60.7332 58.4769L58.0207 63.1928L55.6658 58.2858L51.9979 50.6232L46.5978 59.0379L44.6313 62.1078L42.11 59.4632L38.8983 56.085L33.6708 60.4495L29.9967 56.048L37.2832 49.9636L39.3422 48.2437L41.1977 50.1855L43.7437 52.867L49.9453 43.201L52.7193 38.8796L54.9447 43.5153L58.4831 50.9005L66.0346 37.8072Z" fill="#3175D3"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1628_586">
                      <rect width="101" height="101" rx="50" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </td>
            </tr>
            <tr>
              <td style="width: 80%; text-align: right;">
                {{ graphType }}
              </td>
            </tr>
          </table>
        </v-card-body>
        <!-- <v-card-body> -->
        
        <!-- </v-card-body> -->
    </v-card>
</template>

<script>

export default {
  props: {
    graphType: String
  }
}

</script>

<style lang="scss">
  .graph{
    width: 70px !important;
    border-radius: 19px !important;
    margin-bottom: 7060px !important;
  }
  .espessura{
    border-radius: 19px !important;
    width: 80%;
    padding: 10px;
    border-radius: 24px !important;
    float: right;
    margin-right: 29px;
  }
  .cc-title{
    justify-content: right;
    margin-right: 115px;
    margin-bottom: 0px;
  }
  .card-t{
    padding-right: 45px !important;
  }
  .card-chart-image {
    float: right;
    padding-bottom: 100px;
  }
  .graph {
    height: 60px;
  }

  .graph-image {
    height: 100%;
    top: 0;
    right: 0;
  }
</style>