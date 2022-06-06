<template>
<div class="chercher_plaint">
<h2 class="subheading dark--text mb-4">بحث عن محضر</h2>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto mb-2"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app></v-toolbar>
    <v-form class="px-5">
          <v-row  dense justify align-content-center>
       <v-col
      cols="12"
      sm="4"
    >
          <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="cherchant.de"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cherchant.de"
            prepend-icon="mdi-calendar"
            readonly dense
            label="تاريخ تسجيل المحضر من"
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
            readonly dense
            label=" إلى"
            v-bind="attrs"
            v-on="on"
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
          </v-col>
          
         <v-card-actions>
              <v-btn
                text
               @click="chercher_pvs"
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
    :headers="headers"
    :loading="!cherche"    
    loading-text="إنتظر قليلا"
    :items="pvs" no-data-text="معلومات غير متاحة"
     class="elevation-1 font-weight-black mb-4"
    hide-default-footer
    >
    </v-data-table>
    <div class="text-center">
    <v-pagination
    v-model="pagination.current"
    :length="pagination.total"
    @input="onPageChange"
    v-show="cherche"
     ></v-pagination>
    </div>
     </v-card>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters,mapMutations } from 'vuex'
export default {
    data(){
        return {
        pagination: {
                current: 1,
                total: 0
            },

            pvs:[],
         load:false,
         cherche:false,

        menu1: false, modal1: false, menu2: false, modal2: false,
        cherchant:{
          de: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          a:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
         },
          headers: [
          { text: 'نوع المحضر', value: 'typepvsID' },
          { text: ' تاريخ التسجيل', value: 'dateEnregPvs' },
          { text: '  رقم الإرسالية', value: 'numEnvoi' },
          { text: 'موضوع المحضر', value: 'sujetpvs' },
          ],
         
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
      async getPlaint() {
        let token = localStorage.getItem("token");
            await axios.post('http://127.0.0.1:8000/api/pvs/mission_pvs?page=' + this.pagination.current,{},
            { headers:{ Authorization: `Bearer ${token}` }
          })
                .then(response => {
                  let pvv= response.data.data;
                  for(let i=0;i<pvv.length;i++){
                    pvv[i].TypeSourcePvsID = pvv[i].typesourcepvs.nom;
                    pvv[i].typepvsID = pvv[i].typepvs.nom;
                    pvv[i].typePoliceJudicID = pvv[i].typepolicejudiciaire.nom;
                  }
                  
                  this.pvs=pvv;    this.load=false; this.cherche=true;
                  
                    this.pagination.current = response.data.current_page;
                    this.pagination.total = response.data.last_page;
                });
        },
        onPageChange() {
            this.getPlaint();
        },
        chercher_pvs(){
          this.load=true;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/pvs/mission_pvs',{
              cher_pv:this.cherchant
            },{
              headers:  
               {Authorization: `Bearer ${token}`}

          }).then(response => {
                  let pvv= response.data;
                  for(let i=0;i<pvv.length;i++){
                    pvv[i].TypeSourcePvsID = pvv[i].typesourcepvs.nom;
                    pvv[i].typepvsID = pvv[i].typepvs.nom;
                    pvv[i].typePoliceJudicID = pvv[i].typepolicejudiciaire.nom;
                  }    
                  this.pvs = pvv;
                  this.load=false;
                   this.pagination.current=0;
                  return response;
                }).catch(err=>{
                  this.load=false;
                  return err;
                })
        }
    },
    mounted(){
      this.getPlaint();
    }
}

</script>
