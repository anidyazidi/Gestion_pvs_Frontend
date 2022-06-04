<template>
<div id="ajoutPv">
    <h2>إضافة محضر</h2>
    <v-spacer/>
               <v-card>
    <v-tabs
      v-model="tab"
       active-class="active1" 
    >
      <v-tab
      class="font-weight-black text-h6 mx-15"
      >
      <v-icon right>mdi-police-badge-outline</v-icon>
        الاجراءات
      </v-tab>
       <v-tab
      class="font-weight-black text-h6 mx-15"
      >
      <v-icon right>mdi-note-multiple-outline</v-icon>
        إضافة المرفقات
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
      >
       <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
  <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">المرجع</v-toolbar-title>
  </v-toolbar>
        <v-form class="px-5" ref="pv">
          <v-row>
               
          <v-col cols="12" sm="4">
            <div class="font-weight-bold darkgrey--text mx-15">نوع المصدر</div>
            <v-select dense
            :items="serv_pvs[0]" v-model="pv.TypeSourcePvsID"
            item-text="nom"
            item-value="id"
            outlined :rules="rules.name"
            required placeholder="نوع المصدر"
            >
            </v-select>
          </v-col>

           <v-col cols="12" sm="3" >
            <div class="font-weight-bold darkgrey--text mx-10">صنف الضابطة القضائية</div>
            <v-select v-model="pv.typePoliceJudicID"
            outlined dense  :rules="rules.name"
            required placeholder="صنف الضابطة القضائية"
            item-text="nom"
            item-value="id" :items="serv_pvs[1]"
            >
            </v-select>
          </v-col>
           <v-col cols="12" sm="4">
        <div class="font-weight-bold darkgrey--text mx-15">الضابطة القضائية</div>
          <v-text-field 
            single-line v-model="pv.policeJudics"
            outlined dense :rules="rules.name"
            required placeholder="الضابطة القضائية"
          ></v-text-field>
        </v-col>
         <v-col cols="12" sm="3">
        <div class="font-weight-bold darkgrey--text mx-15">رقم الارسالية</div>
          <v-text-field 
            single-line v-model="pv.numEnvoi"
            outlined dense :rules="rules.name"
            required placeholder="رقم الارسالية"
          ></v-text-field>
        </v-col>
        <v-col
      cols="12"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ المحضر</div>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="pv.datePvs"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="pv.datePvs"
            prepend-icon="mdi-calendar"
            readonly dense
            v-bind="attrs"
            v-on="on"
            outlined :rules="rules.name"
            required placeholder="تاريخ المحضر"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="pv.datePvs"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(pv.datePvs)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

    <v-col
      cols="11"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">ساعة الانجاز</div>
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="pv.heureRealisation"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="pv.heureRealisation"
            prepend-icon="mdi-clock-time-four-outline"
            readonly outlined
            v-bind="attrs" :rules="rules.name"
            required placeholder="ساعة الانجاز"
            v-on="on" dense
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu3"
          v-model="pv.heureRealisation"
          full-width
          @click:minute="$refs.menu3.save(pv.heureRealisation)"
        ></v-time-picker>
      </v-menu>
    </v-col>

              </v-row></v-form></v-card>
              
     <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-5"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
  <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">النيابة العامة</v-toolbar-title>
  </v-toolbar>
        <v-form class="px-5">
          <v-row>
               
          <v-col cols="12" sm="4">
            <div class="font-weight-bold darkgrey--text mx-15">نوع المحضر</div>
            <v-select
            :items="serv_pvs[2]" v-model="pv.typepvsID"
            outlined dense item-text="nom"
            item-value="id" :rules="rules.name"
            required placeholder="نوع المحضر"
            >
            </v-select>
          </v-col>

        <v-col
      cols="12"
      sm="4" class="mx-8"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ التسجيل</div>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="pv.dateEnregPvs"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="pv.dateEnregPvs"
            prepend-icon="mdi-calendar"
            readonly dense :rules="rules.name"
            required placeholder="تاريخ التسجيل"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="pv.dateEnregPvs"
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
            @click="$refs.menu2.save(pv.dateEnregPvs)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  <v-col cols="12" sm="10" class="mr-5">
    <v-textarea
    clearable
    value="" dense
    label="موضوع المحضر"
    class="font-weight-black mx-15"
    rows="1" v-model="pv.sujetpvs"
    outlined :rules="rules.name"
            required 
    no-resize
    >
    </v-textarea>
    </v-col>
              </v-row></v-form></v-card>
               <v-card elevation="2"
  outlined  class="mx-auto my-4"
     >
        <v-form>
         
         <v-data-table
    :headers="headers" no-data-text="معلومات غير متاحة"
    :items="datapartie_tab"
    class="elevation-1"
    hide-default-footer
    
  >
    <template v-slot:top>
      <v-toolbar
         flat dark class="nvbar mb-3" height="34px" app
      > 
        <v-toolbar-title>  <v-checkbox
         v-model="pv.contreInnconue" 
            :value="!pv.contreInnconue"
            label="ضد شخص مجهول"
            color="red darken-4"
            class="font-weight-black text-h5 mt-4  mr-8"
            >
            </v-checkbox></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       
            <v-btn
            @click="enableform"
             dark small
              class="my-2 blue font-weight-black"
              elevation="2" :disabled="pv.contreInnconue" 
            >
            <v-icon left>mdi-plus</v-icon>
              طرف جديد
            </v-btn>
      </v-toolbar>
    </template>
   
    </v-data-table>
  <DataPartie v-show="enable"></DataPartie>
    <v-row><v-col cols="12" sm="4"></v-col>
  <v-card-actions class="mx-15">
              <v-btn
                text
               @click="ajoutpv"
              dark
              class="my-2 blue"
              elevation="2"
              :loading="load"  :disabled="!formIsValid"
            >
            <v-icon right >mdi-notebook-plus-outline</v-icon>             
               إضافة محضر
              </v-btn>     <v-btn
          text
          @click="resetForm"
          dark
              class="my-2 red font-weight-black"
              elevation="2"
        >
          إلغاء
        </v-btn>             
              </v-card-actions></v-row></v-form></v-card>
      </v-tab-item>
      <v-tab-item
      >
        <template><v-card flat  class="mt-9 mr-4">
          <v-form><v-row><v-col cols="12" sm="4">
 <v-file-input
    v-model="files"
    color="blue accent-4"
    counter class="mt-3"
    label="أضف المُرفق"
    multiple
    placeholder="أضف المُرفق"
    prepend-icon="mdi-file-plus"
    outlined dense
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="blue accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input></v-col><v-col cols="12" sm="4">
     <v-card-actions>
              <v-btn
                text
               @click="save"
              dark
              class="my-2 green darken-1"
              elevation="2"
            >
            <v-icon right >mdi-notebook-plus-outline</v-icon>             
              حفظ
              </v-btn>     
              </v-card-actions></v-col>
      </v-row></v-form></v-card>
</template>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
     
    </div>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
 import DataPartie from '../../components/Data_Partie.vue'
  import vide from '../../store/vider_form'

export default {
  components:{
    DataPartie
  },
   data () {
   const defaultForm = Object.freeze({
            typepvsID: null,
            sujetpvs: '',
            dateEnregPvs: '',
            policeJudics: '',

            TypeSourcePvsID: null,
            typePoliceJudicID:null,
            numEnvoi:"",
            datePvs:"",
            heureRealisation:"",
            contreInnconue:false
      })
       return {
          pv: Object.assign({}, defaultForm),
         rules: {
          name: [val => (val || '').length > 0 || 'المرجوا ملأ هذا الحقل'],
        },
         load:false,
         tab: null,
         enablee: false,
        dateEnregPvs: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        datePvs: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false, modal: false,menu1: false, modal1: false,menu2: false, modal2: false,
         time: null,
        menu3: false,
        modal3: false,
        defaultForm,
      headers: [
        { text: 'اسم الطرف', align: 'start',sortable: false,value: 'nom_data'},
        { text: 'صفته', value: 'type_data', sortable: false},
        { text: 'نوعه', value: 'genre',sortable: false },
        { text: 'محامو الطرف', value: 'avocat_partie', sortable: false},
        { text: 'الممثل القانوني', value: 'representant_legal', sortable: false},
        { text: 'نوع الممثل القانوني', value: 'type_representant_legal' ,sortable: false},
        { text: 'تغيير', value: 'actions', sortable: false },
      ],
      data_partie: [],
      
      pv:{
            typepvsID: null,
            sujetpvs: '',
            dateEnregPvs: '',
            policeJudics: '',

            TypeSourcePvsID: null,
            typePoliceJudicID:null,
            numEnvoi:"",
            datePvs:"",
            heureRealisation:"",
            contreInnconue:false
    },
      
      
       }
   },
   computed: {
      ...mapGetters(["getServ_pvs","get_show_form","getalldata"]),

      formTitle () {
        return this.data_partieEdit === -1 ? 'New Item' : 'Edit Item'
      },

      serv_pvs(){
        return this.getServ_pvs;
      },

      datapartie_tab(){
        return this.getalldata;
      },
      enable(){
        return this.get_show_form;
      },
       formIsValid () {
        return (
          this.pv.typepvsID &&
          this.pv.dateEnregPvs &&
          this.pv.policeJudics &&
          this.pv.TypeSourcePvsID &&
          this.pv.typePoliceJudicID &&
          this.pv.numEnvoi &&
          this.pv.datePvs &&
          this.pv.heureRealisation 
        )
      },
    },

    
    methods: {
      ...mapActions(["addpv"]),
      ...mapMutations(["openSnackbar","show_form"]),

       enableform(){
        this.show_form();
      },

     async ajoutpv(){
        this.load =true;
         let resp = await this.addpv(this.pv);
                   this.load=false;

         if(resp.status==201 || resp.status==200){
           this.openSnackbar("لقد تم تسجيل المحضر بنجاح");
           vide.vider_pv(this.pv);
           let last = this.$store.state.datapartie.length - 1;
           
           this.$store.state.datapartielocal = [];
           vide.vider_data(this.$store.state.datapartie[last]);
           this.$store.state.datapartie = [];

        }else{ 
          this.openSnackbar(" تاكد من جميع المعلومات !!");
    
            }
      },
     resetForm () {
        this.pv = Object.assign({}, this.defaultForm)
        this.$refs.pv.reset()
      },
      }
  } 
</script>
<style>
  .active1 {
       color: #222222 !important;
       background: -webkit-linear-gradient(to right, #4ca2cd, #67B26F) !important; 
       background: linear-gradient(to right, #4ca2cd, #67B26F) !important; 

    }
</style>