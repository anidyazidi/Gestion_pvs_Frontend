<template>
    <v-app id="bg">

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
<style>
@import url(https://fonts.googleapis.com/earlyaccess/droidarabicnaskh.css); 
/* font-family: 'Droid Arabic Naskh',Arial, Helvetica,  sans-serif; */

@import url(https://fonts.googleapis.com/earlyaccess/amiri.css);
  
#bg{background: repeating-radial-gradient(circle, transparent, transparent 5.6px, #eae8e4 5.6px, #eae8e4 7.2px), repeating-radial-gradient(circle, transparent, transparent 5.6px, #eae8e4 5.6px, #eae8e4 7.2px), #f0f0f0;
background-size: 32px 32px;
background-position: 0 0, 16px 16px, 32px 16px;
background-color: #f0f0f0;
font-family: 'Droid Arabic Naskh','Amiri',Arial, Helvetica,  sans-serif;

font-size:18px;line-height:28px;
text-decoration:none; color: black;
}

 /* .smallnavbar{
   
  background: rgb(47,69,73);
background: -moz-linear-gradient(20deg, rgba(47,69,73,0.87718837535014) 41%, rgba(33,109,115,0.87718837535014) 62%);
background: -webkit-linear-gradient(20deg, rgba(47,69,73,0.87718837535014) 41%, rgba(33,109,115,0.87718837535014) 62%);
background: linear-gradient(20deg, rgba(47,69,73,0.87718837535014) 41%, rgba(33,109,115,0.87718837535014) 62%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2f4549",endColorstr="#216d73",GradientType=1);

} */
</style>