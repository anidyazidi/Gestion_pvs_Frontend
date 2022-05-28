<template>
  <div class="home">
      <Navbar />
    <v-main class="ma-6">
      <router-view />
      
    </v-main>
  <v-snackbar
      :value="snackbar.value"
      :timeout="snackbar.timeout"
      top
      height="80"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
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
        ...mapActions(["getall_serv_data","getviceProc"]),
        fermer(){
          this.closeSnackbar();
        }
      },
      created(){
        
        this.getall_serv_data();
        this.getviceProc();
      }
  }
</script>
