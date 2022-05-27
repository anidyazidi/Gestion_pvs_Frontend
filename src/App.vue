<template>
  <v-app style="background-color:aliceblue;">

      <router-view />

  </v-app>
</template>

<script>
import pageLogin from '@/components/Auth/pageLogin'
export default {
  components: {
            pageLogin  
      },
  methods: {
      changeRTL () {
        this.$vuetify.rtl = true
      },
    },
    mounted(){
      this.$router.push('/login');
    }
};
</script>

<style scoped>

</style>