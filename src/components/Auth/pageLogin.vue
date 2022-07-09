<template>
<div>
  <v-card
    class="overflow-hidden mx-auto mt-15"
    color="grey lighten-5"
    max-width="50%"
    elevation="2"
  outlined 
  >
    <v-toolbar 
      flat
      color="cssgrad"
      class="py-200"
      
    >
      <v-icon right>mdi-account</v-icon>
      <v-toolbar-title >تسجيل الدخول
      </v-toolbar-title>
      
    </v-toolbar>

    <v-card-text>
      <v-text-field
        dense
        prepend-inner-icon="mdi-email"
        label="البريد الإلكتروني"
        v-model="email" outlined 
      ></v-text-field>

      <v-text-field
        type="password"
        prepend-inner-icon="mdi-lock"
        label="كلمة السر" dense
        v-model="pass" outlined
      ></v-text-field>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      
      <v-btn
        :loading="loading"
         class="cssgrad"
        @click="login" light 
        width="100px"
      >
        دخول
      </v-btn>
    </v-card-actions>

    <v-snackbar
      v-model="hasSaved"
      :timeout="3000"
      absolute
      bottom
      right class="m"
    >
     {{message}}
    </v-snackbar>
  </v-card>
  </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default({
    data () {
      return {
        hasSaved: false,
        model: null,
        email:"admin@gmail.com",
        pass:"admin",
        message:"" ,
        loading:false
      }
    },

    methods: {
        login () {
          this.loading=true;
        axios.post('http://127.0.0.1:8000/api/users/login',{
            email:this.email,
            password:this.pass
        })
    .then(response => {
        if(response.data){
            this.hasSaved = true;
              console.log(response.data);
              localStorage.setItem("token",response.data.access_token);
              this.loading=false;

                   switch(response.data.user.role.nom) {
                    case "user": { this.profile(true,true,false,false,false,false);
                                  this.$router.push('Plaint/Ajout'); 
                                  break;
                                  }

                   case "vice_admin": { this.profile(false,false,false,true,false,true);
                                        this.$router.push('vicePvs');
                                          break;
                                          }

                   case "admin": { this.profile(true,true,true,true,true,false);
                                  this.$router.push('stat/pv');  
                                  break;
                                  }
                   
                     }
                   
         }
    })
     .catch(error => {
          console.log(error);
              this.message=" password or email is incorrect!"
              this.loading=false;
              this.hasSaved = true;

        });
    },
    profile(pl,pv,mis,sta,com,vice){
      this.$store.state.showNavBar_role.plaints = pl;
      this.$store.state.showNavBar_role.pvs = pv;
      this.$store.state.showNavBar_role.mission = mis;
      this.$store.state.showNavBar_role.statistique = sta;
      this.$store.state.showNavBar_role.comptes = com;
      this.$store.state.showNavBar_role.dash_vie = vice;
      console.log("plaint : "+ this.$store.state.showNavBar_role.plaints );
    },
},
  mounted() {
    if(localStorage.getItem("ttoken")){
            this.$router.push('/');
    }
  }
});
</script>
<style>
.cssgrad{
background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(123,239,255,1) 0%);
}
</style>