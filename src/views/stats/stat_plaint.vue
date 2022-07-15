<template>
<div class="chercher_plaint">
<p class="ma-0">إحصائيات التقديم</p>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar lighten class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class=" lightengrey--text text-h6">
         تاريخ تسجيل الشكاية
         </v-toolbar-title>
         </v-toolbar>
    <v-form class="px-5">
          <v-row  class="mt-5"
          dense justify align-content-center no-gutters>
       <v-col
      cols="12"
      sm="4" class="mx-4"
    >
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="cher.de"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cher.de"
            prepend-icon="mdi-calendar"
            readonly dense
            label="من"
            v-bind="attrs"
            v-on="on"
            outlined 
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cher.de"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu1 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu1.save(cher.de)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

     <v-col
      cols="12"
      sm="4" class="mx-4"
    >
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="cher.a"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cher.a"
            prepend-icon="mdi-calendar"
            readonly
            label="إلى"
            v-bind="attrs"
            v-on="on"
            outlined dense
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cher.a"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu2.save(cher.a)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    </v-row>
          <v-row no-gutters class="ma-0 pa-0">
            <v-col cols="12" sm="4" ></v-col>
         <v-card-actions class="ma-0 pa-0">
              <v-btn
                text
               @click="stat"
              lighten
              class="mb-2 blue pr-3 pl-4"
              elevation="2"
              height="30px"
              :loading="loading"
               
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
             
              
              </v-card-actions>
              </v-row>
    
    </v-form>
     </v-card>
     
     
     <!-- <app-statpl v-show="display"></app-statpl> -->
       <v-row class="mt-5" v-show="display">
   <v-col cols="13" sm="4">
    <v-card class="elevation-1"
    color="green lighten-3">
      <v-card-title class="text-h6"> الشكايات المعالجة
        <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-check</v-icon>
      </v-card-title>
      
      <v-divider lighten class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ statistic.Traiter }})
      </span>
      
    </v-card-actions>
    </v-card>
   </v-col>

    <v-col cols="13" sm="4">
    <v-card class="elevation-1" 
    color="orange lighten-3"
    >
      <v-card-title class="text-h6">   الشكايات
              في طور
             المعالجة 
        <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-alert</v-icon>
      </v-card-title>
      
      <v-divider lighten class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ statistic.enCours }})
      </span>
      
    </v-card-actions>
    </v-card>
   </v-col>

   <!--- fin stat-->
    <v-col cols="13" sm="4">
    <v-card class="elevation-1"
    color="red lighten-2"
   >
      <v-card-title class="text-h6"> الشكايات 
            غير
             المعالجة
        <v-icon
        class="shrink ma-2"
        contain
        size="30px"
      >mdi-progress-close</v-icon>
      </v-card-title>
      
      <v-divider lighten class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ statistic.NonTraiter }})
      </span>
      
    </v-card-actions>
    </v-card>
   </v-col>
  </v-row> 
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';
export default {
    data(){
        return {
        display: false,
        loading:false,
        cher:{
          de:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          a:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },

        statistic:{}

      }
    },

    methods:{
      ...mapMutations['openSnackbar'],
      stat(){
        this.loading=true;
        let token = localStorage.getItem("token");
              axios.post('http://127.0.0.1:8000/api/plaint/statistique',{
                cher:this.cher
              },{
              headers:  { Authorization: `Bearer ${token}` }
          }).then(response => {
            this.statistic = response.data;
            this.loading=false;
            this.display=true;
          }).catch(er=>{
                  this.openSnackbar("حاول مرة أخرى");
              this.loading=false; 
            });
      }
    },

}

</script>
