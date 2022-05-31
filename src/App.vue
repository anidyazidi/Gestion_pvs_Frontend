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
      this.$router.push('login');
    }
};
</script>

<style scoped>
.act{
  background: #c1eaf4 !important; 
background: -webkit-linear-gradient(to right, #cde0f9, #c4ebf8) !important; 
background: linear-gradient(to rigsht, #bae8f2, #e9eff0) !important; 
}
</style>