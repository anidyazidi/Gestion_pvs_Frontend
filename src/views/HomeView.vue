<template>
  <div class="bg">
      <Navbar />
    <v-main class="ma-6">
      <router-view />
      
    </v-main>
  <v-snackbar
      :value="snackbar.value"
      :timeout="snackbar.timeout"
      top
      height="60"
      class="mt-12"
      dark
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }" >
        <v-btn
         color="red"
          text
          v-bind="attrs"
          @click="fermer()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { mapGetters, mapMutations ,mapActions} from 'vuex'
  export default {
    components: {
            Navbar  
      },
      data(){
        return{
          closee:"problem"
        }
      },
      computed:{
        ...mapGetters(["getsnackbar"]),
        snackbar(){
          return this.getsnackbar;
        }
      },
      methods:{
        ...mapMutations(["closeSnackbar"]),
        ...mapActions(["getall_serv_data","getviceProc","servall_pvs"]),
        fermer(){
          this.closeSnackbar();
        }
      },
      created(){
        
        this.getall_serv_data();
        this.servall_pvs();
        this.getviceProc();
      }
  }
</script>
<style>
.bg{background: repeating-radial-gradient(circle, transparent, transparent 5.6px, #eae8e4 5.6px, #eae8e4 7.2px), repeating-radial-gradient(circle, transparent, transparent 5.6px, #eae8e4 5.6px, #eae8e4 7.2px), #f0f0f0;
background-size: 32px 32px;
background-position: 0 0, 16px 16px, 32px 16px;
background-color: #f0f0f0;
}
.act{
  background: #c1eaf4 !important; 
background: -webkit-linear-gradient(to right, #cde0f9, #c4ebf8) !important; 
background: linear-gradient(to rigsht, #bae8f2, #e9eff0) !important; 
}

/* .nvbar{
   background: rgb(2,0,36);
background: linear-gradient(120deg, rgba(2,0,36,0.8799894957983193) 2%,rgba(2,0,36,0.8799894957983193) 2%, rgba(49,159,175,0.958420868347339) 48%, rgba(2,0,36,0.8127626050420168) 97%);
} */
.nvbar{
background: rgb(0,238,248);
background: linear-gradient(131deg, rgba(0,238,248,1) 0%, rgba(41,71,229,1) 100%);

}

/* .nvbar{background: rgb(0,9,13);
background: -moz-linear-gradient(0deg, rgba(0,9,13,1) 5%, rgba(203,234,248,1) 6%, rgba(200,234,249,1) 28%, rgba(182,226,247,1) 82%);
background: -webkit-linear-gradient(0deg, rgba(0,9,13,1) 5%, rgba(203,234,248,1) 6%, rgba(200,234,249,1) 28%, rgba(182,226,247,1) 82%);
background: linear-gradient(0deg, rgba(0,9,13,1) 5%, rgba(203,234,248,1) 6%, rgba(200,234,249,1) 28%, rgba(182,226,247,1) 82%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00090d",endColorstr="#b6e2f7",GradientType=1);
} */
</style>
