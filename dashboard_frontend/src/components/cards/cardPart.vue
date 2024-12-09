<template>
  <v-card
    max-width="400"
    height="170"
    color="#3175D3">
    <v-card-text with="400">
       
        <p class="text-h5" style="width: fit-content; color: white; padding: 10px; ">
       {{ title }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
props:[
    "title"
]
}
</script>

<style>

</style>
