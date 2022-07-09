<template>
<div class="traiter_plaint">
 <v-spacer></v-spacer>
 <v-tabs
      v-model="tab"
    >
      <v-tab
      class="font-weight-black text-h6 mx-15"
      >
      تدبير المحاضر
      </v-tab>
       <v-tab
      class="font-weight-black text-h6 mx-15"
      id="vieww"
      >
       وضعية المحاضر  
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
      >
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar lighten class="nvbar mb-3" flat height="34px" app>بحث</v-toolbar>
    <v-form class="px-5 mt-5">
          <v-row  dense justify align-content-center no-gutters>
       <v-col
      cols="12"
      sm="3"
      class="ml-4"
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
          <v-text-field dense
            v-model="cher.de"
            prepend-icon="mdi-calendar"
            readonly
            label="تاريخ التسجيل  من"
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
      sm="3"
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
          <v-text-field dense
            v-model="cher.a"
            prepend-icon="mdi-calendar"
            readonly
            label="إلى"
            v-bind="attrs"
            v-on="on"
            outlined
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
     <v-col cols="12" sm="4">
            <v-select
            v-model="cher.id_type"
            class="py-0 mx-15"
            :items="type"
            label="نوع المحضر"
            item-text="nom"
            item-value="id"
             outlined dense
            >
            </v-select>
          </v-col> 
          </v-row>

          <v-row class="ma-0 pa-0" no-gutters>
            <v-col cols="12" sm="4"></v-col>
           <v-card-actions class="ma-0 pa-0">
              <v-btn
                text
               @click="chercher_pvs"
              lighten
              class="ma-0 pa-0 pr-3 pl-5 mb-3  blue font-weight-bold"
              elevation="2"
              :loading="load"
              height="30px"
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
          </v-row>
          
              
    
    </v-form>
    
    <v-card flat class="ma-2" v-show="active"><form>
    <v-data-table
    v-model="selected"
    :headers="headers"
    :items="pvs"
    item-key="id" no-data-text="معلومات غير متاحة"
     show-select hide-default-footer
    class="elevation-1 mb-8"
  >
  </v-data-table>
  <v-row  dense justify align-content-center><v-col cols="12" sm="3">
          <v-autocomplete
            ref="ممثل النيابة"
            v-model="userhaspvs.userID"
            :rules="[() => !!viceProc || 'المرجوا ملأ هذا الحقل']"
            :items="viceProc"
            item-text="nom"
            item-value="id"
            label="ممثل النيابة"
            placeholder="مساعدة في البحث"
            no-data-text="لا يوجد"
            required
            outlined dense
          ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" class="mr-6">
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        :return-value.sync="date3"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="date3"
            prepend-inner-icon="mdi-calendar"
            readonly
            label="تاريخ الاحالة"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date3"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu3 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu3.save(date3)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      </v-col> </v-row>

       <v-row no-gutters  class="ma-0 pa-0">
       <v-col cols="13" sm="4"></v-col>
           <v-card-actions  class="ma-0 pa-0">
              <v-btn
                text
               @click="affecter_pvs"
              lighten
              class="my-2 green lightenen-1 "
              elevation="2"
              :loading="load2"
            >
            <v-icon right >mdi-note-check-outline</v-icon>             
              إضافة
              </v-btn>
              
              </v-card-actions>
      </v-row>
              
       
  </form> </v-card></v-card>
   </v-tab-item> 

        <v-tab-item>
      <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar  class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class="darkgrey--text text-h6">تاريخ إحالة المحضر</v-toolbar-title></v-toolbar>
     <v-form class="px-5">
          <v-row  dense justify align-content-center no-gutters>
       <v-col
      cols="12"
      sm="4"
    >
      <v-menu
        ref="menu11"
        v-model="menu11"
        :close-on-content-click="false"
        :return-value.sync="cher_userhaspvs.de"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="cher_userhaspvs.de"
            class="mt-3 ml-3"
            prepend-icon="mdi-calendar"
            readonly
            label="تاريخ تسجيل المحضر من"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cher_userhaspvs.de"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu11 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu11.save(cher_userhaspvs.de)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col>
        <v-col
      cols="12"
      sm="6"
      class="pa-0 mt-0 mr-6"
    >
      <v-menu
        ref="menu12"
        v-model="menu12"
        :close-on-content-click="false"
        :return-value.sync="cher_userhaspvs.a"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="cher_userhaspvs.a"
            class="mt-3 ml-3"
            prepend-icon="mdi-calendar"
            readonly
            label="إلى"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cher_userhaspvs.a"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu12 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu12.save(cher_userhaspvs.a)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu></v-col>
      <v-card-actions>
              <v-btn
                text
               @click="chercher_pvs_viceproc"
              light
              class="my-2 blue font-weight-bold"
              elevation="2"
              :loading="load_cher"
              height="30px"
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
    </v-col>
    </v-row >
    </v-form>
    <v-data-table
    v-show="show"
    :headers="headers_m"
    :items="pvs_status"
    no-data-text="معلومات غير متاحة"
    hide-default-footer
    class="elevation-1 my-10"
  >
  <template v-slot:[`item.action`]="{ item }">
      <v-chip
      :color="status_pvs(item.traitID)"
        lighten
        small
      > {{ status }}
      </v-chip>
      </template>
  </v-data-table>
         </v-card> 
     </v-tab-item>
   </v-tabs-items>

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return {
          load:false, load2:false,
           cher:{
        id_type:1,
        de:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        a:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
       },
       userhaspvs:{
       userID:null,
       pvsID:[],
       traitID:1,
       dateMission:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
   },
        menu1: false, modal1: false, menu2: false, modal2: false,menu3: false, modal3: false,
        selected: [],
         viceProc: this.$store.state.viceProc,
        active: false,
        headers: [
          {text: 'نوع المحضر',align: 'start', sortable: false,  value: 'typepvsID'},
          { text: 'نوع المصدر', value: 'TypeSourcePvsID',sortable: false, },
          { text: 'الضابطة القضائية', value: 'policeJudics', sortable: false,},
          { text: 'تاريخ المحضر', value: 'datePvs', sortable: false,},
          { text: 'موضوع المحضر', value: 'sujetpvs' ,sortable: false,},
          { text: 'رقم الإرسالية', value: 'numEnvoi' ,sortable: false,},
        ],
        pvs: [],
        tab:null,

        headers_m: [
          {text: 'نوع المحضر',align: 'start', sortable: false,  value: 'pvs.typepvs.nom'},
          { text: '  الضابطة القضائية', value: 'pvs.policeJudics', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'pvs.datePvs', sortable: false,},
          { text: 'موضوع المحضر', value: 'pvs.sujetpvs' ,sortable: false,},
          { text: ' ممثل النيابة', value: 'user.nom' ,sortable: false,},
          { text: 'وضعية المحضر', value: 'action', sortable: false },
         
        ],
        pvs_status:[],//table de plaint avec viceproc
        status:"",// traiter ou non ...
        show:true,// afficher le tableau de plaint avec vice proc
        cher_userhaspvs:{ //chercher sur plaint avec vice proc
          de:null,
          a:null
        },
        load_cher:false,
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

       status_pvs(traite){
        if(traite == 1) return 'green lighten-3'
        else return 'blue darken-2';
          },

      chercher_pvs(load_value=true){
          this.load=load_value;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/pvs/cherche_pv',{
              cher:this.cher
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
                  
                  this.pvs=pvv;    this.load=false;
                          this.active=true;    

                  return response;
                });
        },

         async affecter_pvs(){
          this.load2=true;
          let IDs=[];
         for(let i=0;i<this.selected.length;i++){
           IDs.push(this.selected[i].id);
        }   this.userhaspvs.pvsID=IDs;

          let token = localStorage.getItem("token");
           await axios.post('http://127.0.0.1:8000/api/users/haspvs/store',{
              userhaspvs:this.userhaspvs
            },{ headers: { Authorization: `Bearer ${token}` }

          }).then(async response => {
                    this.selected = [];
                    await  this.chercher_pvs(false);

                    this.openSnackbar("تمت الإحالة بنجاح");
                     this.load2=false;
                  return response;
                }).catch(err=>{
                  this.openSnackbar("تأكد من صحة المعلومات");
                    this.load2=false;
                  return err;
                })
        },

        async chercher_pvs_viceproc(){
          this.load_cher = true;
          let token = localStorage.getItem("token");
           await axios.post('http://127.0.0.1:8000/api/users/haspvs/index',{
              userhaspvs:this.cher_userhaspvs
            },{ headers:{Authorization: `Bearer ${token}`}

           }).then(async response => {
                  this.pvs_status = response.data;
                  this.show = true;
                  this.load_cher = false;
                });
                this.load_cher = false;
        }
    }
    }

</script>

<style scoped>


</style>