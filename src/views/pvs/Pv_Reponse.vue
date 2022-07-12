<template>
<div class="chercher_plaint">

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto pa-0"
     >
     <v-toolbar light class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class=" lightgrey--text text-h6"> بحث عن محضر</v-toolbar-title>
     </v-toolbar>

    <v-form class="px-5">
          <v-row  dense justify align-content-center  no-gutters class="mt-6">
          
          <v-col cols="12" sm="4">
            <v-select
            v-model="choix"
            @click:prepend-inner="plainte()"
            class="py-0 ml-15"
            label="مصدر المحضر"
            :items="type"
            outlined dense
            >
            </v-select>
          </v-col>
          
          <v-col cols="12" sm="4" v-show="plaint">
           <v-text-field
            outlined dense
            v-model="num"
            label="مرجع الشكاية"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" v-show="pv">
           <v-text-field
           v-model="num"
            outlined dense
            label="رقم الإرسالية"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          </v-col> 

          </v-row>

          <v-row no-gutters dense>

          <v-col cols="11" sm="4"></v-col>

         <v-card-actions class="ma-0 pa-0">
            <v-btn
                text
                :loading="load"
               @click="chercher_pv"
              light
              class="mb-2 blue pl-3"
              height="30px"
              elevation="2"  
            >
            <v-icon left >mdi-magnify</v-icon>             
               بحث
            </v-btn>
              
          </v-card-actions>
    </v-row>
    </v-form>

    <v-data-table v-show="affiche_pv"
    v-model="selected"
    :headers="headers_pv"
    :items="pvs"
    item-key="id" no-data-text="معلومات غير متاحة"
     single-select 
     show-select hide-default-footer
    class="elevation-1 mb-8"
  >
  </v-data-table>
  <v-data-table v-show="affiche_pl"
    v-model="selected"
    @click="selected_add(selected)"
    :headers="headers_plaint"
    :items="pvs"
    item-key="id" no-data-text="معلومات غير متاحة"
     single-select
     show-select hide-default-footer
    class="elevation-1 mb-8"
  >
  </v-data-table>
       
<!--    
<v-row no-gutters dense>
          <v-col cols="11" sm="4"></v-col>
            <v-btn text
               @click="add_pv"
              light v-show="affiche_btn"
              class="mb-2 green lighten-1 pl-3"
              height="30px"
              elevation="1"  
            > <v-icon left >mdi-magnify</v-icon>             
               إضافة
            </v-btn>
        </v-row>
-->

  </v-card>
<Ajout_PvsVue v-show="show_pvs" :text_p="false" :pvsid="value_pvsid" :plaintid="value_plaintid"/>

</div>
</template>

<script>
import axios from 'axios'
import { mapGetters,mapMutations } from 'vuex'
import Ajout_PvsVue from './Ajout_Pvs.vue'
export default {
  components:{
    Ajout_PvsVue
  },
    data(){
        return {
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        type:["شكاية","محضر"],
        choix:"",   
        plaint:false,
        pv:false,
        affiche_pv:false, affiche_pl:false, affiche_btn:false,
        headers_pv: [
          { text: 'نوع المحضر', value: 'typepvs.nom' },
          { text: ' تاريخ التسجيل', value: 'dateEnregPvs' },
          { text: '  رقم الإرسالية', value: 'numEnvoi' },
          { text: 'موضوع المحضر', value: 'sujetpvs' },
          ],
          headers_plaint: [
          {text: 'مرجع الشكاية',align: 'start',sortable: false,value: 'referencePlaints'},
          { text: 'نوع الشكاية', value: 'type_plaint.nom',sortable: false, },
          { text: 'مصدر الشكاية', value: 'source_plaint.nom', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'dateEnregPlaints', sortable: false,},
          { text: 'موضوع الشكاية', value: 'sujetPlaints' ,sortable: false,},
        ],
          pvs:[],
          num:"",
          load:false,
          selected:[],
          show_pvs:false,

          value_pvsid:null,
          value_plaintid:null,
          chemin:""
        }
    },
    watch:{
      choix:function() {
        if(this.choix == "شكاية") 
        { this.plaint=true; this.pv=false;}
        else 
        { this.pv=true; this.plaint=false;}
      },
       selected:function(){
        if(this.selected == [] )
               {
                this.show_pvs = false; 
                this.value_plaintid = null;
                 this.value_pvsid = null
               }
          else {
            this.show_pvs = true;
            if(this.chemin == "plaint/reference"){
              this.value_plaintid = this.selected[0].id;
              this.value_pvsid = null
            }
             else {
              this.value_pvsid = this.selected[0].id;
               this.value_plaintid = null;
             } 
             this.show_pvs = true;
          }
             
        }  
    },
    methods:{
      ...mapMutations(["openSnackbar"]),
      
      chercher_pv(){
          this.load=true;
          let token = localStorage.getItem("token");
          if(this.choix == "محضر") {this.chemin = "pvs/cherche_bynumEnvoi";}
          else{this.chemin = "plaint/reference";}

            axios.post(`http://127.0.0.1:8000/api/${this.chemin}`,{
              numEnvoi:this.num,
              reference:this.num
            },{headers: {Authorization: `Bearer ${token}`}
          }).then(response => { this.load=false;
               this.pvs= response.data;
                     this.load=false; 
            if(this.choix == "محضر")
           {this.affiche_pv=true; this.affiche_pl=false; this.affiche_btn=true;}
          else 
          {this.affiche_pl=true; this.affiche_pv=false; this.affiche_btn=true;}
                });
        }
    }
}

</script>
