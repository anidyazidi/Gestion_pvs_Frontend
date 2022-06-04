<template>
<div class="chercher_plaint">
<h2 class="subheading grey--text">بحث عن محضر</h2>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app></v-toolbar>
    <v-form class="px-5">
          <v-row>
       <v-col
      cols="12"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text">تاريخ تسجيل المحضر من</div>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="date1"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cherchant.de"
            prepend-icon="mdi-calendar"
            readonly dense
            v-bind="attrs"
            v-on="on"
            outlined 
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cherchant.de"
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
            @click="$refs.menu1.save(cherchant.de)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

     <v-col
      cols="12"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text">إلى</div>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="cherchant.a"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cherchant.a"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on" dense
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cherchant.a"
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
            @click="$refs.menu2.save(cherchant.a)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="4">
            <div class="font-weight-bold darkgrey--text mx-15">نوع محضر</div>
            <v-select
            class="py-0 mx-15"
            v-model="cherchant.id_type"
            :items="type"
            item-text="nom"
            item-value="id"
            outlined dense
            >
            </v-select>
          </v-col>
         <v-card-actions>
              <v-btn
                text
               @click="chercher_pl"
              dark
              class="my-2 blue"
              elevation="2"
               :loading="load"
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
    </v-row>
    </v-form>
     </v-card>
     <v-card>
     <v-data-table
     v-show="cherche"
    :headers="headers"
    :items="pvs" no-data-text="معلومات غير متاحة"
     class="elevation-1 font-weight-black"
    hide-default-footer
    >
    </v-data-table>
     </v-card>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters,mapMutations } from 'vuex'
export default {
    data(){
        return {
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu2: false, modal2: false,
        cherchant:{
          id_type:null,
          de: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          a:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
         },
          headers: [
          { text: 'نوع المحضر', value: 'typepvsID' },
          { text: ' تاريخ التسجيل', value: 'dateEnregPvs' },
          { text: '  رقم الإرسالية', value: 'numEnvoi' },
          { text: 'موضوع المحضر', value: 'sujetpvs' },
          ],
         pvs:[],
         cherche:false,
         load:false
        }
    },
    computed:{
      ...mapGetters(["getServ_pvs"]),
      type(){
            return this.getServ_pvs[2];
      }
    },
    methods:{
      ...mapMutations(["openSnackbar"]),
      chercher_pl(){
          this.load=true;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/pvs/cherche_pv',{
              cher:this.cherchant
            },{
              headers:  
               {Authorization: `Bearer ${token}`}

          }).then(response => {
                  this.load=false;  let pvv= response.data;
                  
                  for(let i=0;i<pvv.length;i++){
                    pvv[i].TypeSourcePvsID = pvv[i].typesourcepvs.nom;
                    pvv[i].typepvsID = pvv[i].typepvs.nom;
                    pvv[i].typePoliceJudicID = pvv[i].typepolicejudiciaire.nom;
                  }
                  
                  this.pvs=pvv;
                    this.cherche=true;    this.load=false;

                  return response;
                });
        }
    }
}

</script>
