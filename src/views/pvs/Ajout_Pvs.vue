<template>
<div id="ajoutPv">
    <p class="ma-0" v-show="text_p">إضافة محضر</p>
    <v-spacer/>
     <v-card>
    <v-tabs
      v-model="tab"
       active-class="active1"
       height="35px"
    >
      <v-tab
      class="text-h7 mx-10"
      
      >
      <v-icon right>mdi-police-badge-outline</v-icon>
        الاجراءات
      </v-tab>
       <v-tab
      class="text-h6 mx-10"
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
     <v-toolbar light class="nvbar mb-3" flat height="34px" app>
  <v-toolbar-title  class="lightgrey--text text-h6">المرجع</v-toolbar-title>
  </v-toolbar>
        <v-form class="px-5" ref="pv1">
          <v-row  dense justify align-content-center no-gutters>
          <v-col cols="12" sm="3" class="ml-6">
            <v-select dense
            :items="serv_pvs[0]" v-model="pv.TypeSourcePvsID"
            item-text="nom"
            item-value="id"
            outlined 
            required label="نوع المصدر"
            >
            </v-select>
          </v-col>

           <v-col cols="12" sm="3" class="ml-6" >
           
            <v-select v-model="pv.typePoliceJudicID"
            outlined dense  
            required label="صنف الضابطة القضائية"
            class="pa-0"
            item-text="nom"
            item-value="id" :items="serv_pvs[1]"
            >
            </v-select>
          </v-col>
           <v-col cols="12" sm="3" class="ml-6">
          <v-text-field 
            v-model="pv.policeJudics"
            outlined dense 
            required label="الضابطة القضائية"
          ></v-text-field>
        </v-col>
        </v-row>

        <v-row no-gutters>
         <v-col cols="12" sm="3" class="ml-6">
          <v-text-field 
            v-model="pv.numEnvoi"
            outlined dense 
            required label="رقم الارسالية"
          ></v-text-field>
        </v-col>
        <v-col
      cols="12"
      sm="3"
      class="ml-6"
    >
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
            prepend-inner-icon="mdi-calendar"
            readonly dense
            v-bind="attrs"
            v-on="on"
            outlined 
            required label="تاريخ المحضر"
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
      sm="3"
      class="ml-6"
    >
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
            prepend-inner-icon="mdi-clock-time-four-outline"
            readonly outlined
            v-bind="attrs"
            required label="ساعة الانجاز"
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

              </v-row>
              </v-form></v-card>
              
     <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-5"
     >
     <v-toolbar light class="nvbar mb-3" flat height="34px" app>
  <v-toolbar-title  class="lightgrey--text text-h6">النيابة العامة</v-toolbar-title>
  </v-toolbar>
        <v-form class="px-5" ref="pv">
          <v-row  dense justify align-content-center>
               
          <v-col cols="12" sm="3" class="ml-6">
            <v-select
            :items="serv_pvs[2]" v-model="pv.typepvsID"
            outlined dense item-text="nom"
            item-value="id"
            required label="نوع المحضر"
            >
            </v-select>
          </v-col>

        <v-col
      cols="12"
      sm="3" class="ml-6" 
    >
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
            prepend-inner-icon="mdi-calendar"
            readonly dense 
            required label="تاريخ التسجيل"
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
    </v-row>

    <v-row no-gutters>
  <v-col cols="12" sm="10">
    <v-textarea
    clearable
    value="" dense
    label="موضوع المحضر"
    class="font-weight-black"
    rows="1" v-model="pv.sujetpvs"
    outlined 
            required 
    no-resize
    >
    </v-textarea>
    </v-col>
              </v-row></v-form></v-card>
               <v-card 
  outlined  class="mx-auto my-4" flat
     >
        <v-form>
         
         <v-data-table
    :headers="headers" 
    no-data-text="معلومات غير متاحة"
    :items="datapartie_tab"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar
         flat class="nvbar mb-3" height="40px" app
      >
        <v-toolbar-title>  <v-checkbox
         v-model="pv.contreInnconue" 
            :value="!pv.contreInnconue"
            label="ضد شخص مجهول"
            class="mt-4  mr-8"
            light
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
             light small
              class="my-2 blue font-weight-black"
              elevation="2" :disabled="pv.contreInnconue" 
            >
            <v-icon left>mdi-plus</v-icon>
              طرف جديد
            </v-btn>
      </v-toolbar>
    </template>
   <template v-slot:[`item.action`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>

  <DataPartie v-show="enable"></DataPartie>
    <v-row  dense justify align-content-center><v-col cols="12" sm="4"></v-col>
  <v-card-actions class="mx-12">
              <v-btn
                text
               @click="ajoutpv"
              light
              class="my-2 blue"
              elevation="2"
              :loading="load"  :disabled="!formIsValid"
            >
            <v-icon right >mdi-notebook-plus-outline</v-icon>             
               إضافة محضر
              </v-btn>    
               <v-btn
                text
          @click="resetForm"
          light
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
          <v-form><v-row  dense justify align-content-center><v-col cols="12" sm="4">
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
        light
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--lighten-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input></v-col><v-col cols="12" sm="4">
     <v-card-actions>
              <v-btn
              hidden
              text
              light
              class="my-2 green lighten-1"
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
     <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">هل تريد حذف هذا الطرف</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red lighten-1" light text @click="closeDelete">إلغاء</v-btn>
              <v-btn class="blue lighten-3"
               light text @click="deleteItemConfirm">نعم</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
 import DataPartie from '../../components/Data_Partie.vue'
  import vide from '../../store/vider_form'
 import axios from 'axios'
export default {
  components:{
    DataPartie
  },
  props:{
        pvsid: {
          default: null
        },
        plaintid : {
          default:null
        },
        text_p:{
          default:true
        }
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
          files:[],
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
        { text: 'اسم الطرف', align: 'start',sortable: false,value: 'nom'},
        { text: 'صفته', value: 'PersonneMoraleID.nom', sortable: false},
        { text: 'نوعه', value: 'genreID.nom',sortable: false },
        { text: ' رقم بطاقة التعريف', value: 'NumCarte', sortable: false},
        
        { text: 'تغيير', value: 'action', sortable: false },
      ],
      data_partie: [],


      editedIndex:-1,
         editedItem:{},
         dialogDelete:false,
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
      ...mapMutations(["openSnackbar","show_form","delete_one_data"]),

      async addFile(idpv){
           let token = localStorage.getItem("token");
           let formData = new FormData();

          for( var i = 0; i < this.files.length; i++ ){
                    let file = this.files[i];
                    console.log(file);
                    formData.append('files[' + i + ']', file);
                   }
               await axios.post(`http://127.0.0.1:8000/api/pvs/File_store/${idpv}`,
                 formData, 
                 {headers: {   Authorization: `Bearer ${token}`,
                               'Content-Type': 'multipart/form-data'
                           }
                    });
      },


       enableform(){
        this.show_form();
      },
      editItem (item) {
        this.$store.state.editedIndex = this.datapartie_tab.indexOf(item)
        this.$store.state.datap = Object.assign({}, item)
        this.$store.state.showForm = true;

        },
        deleteItem (item) {
        this.$store.state.editedIndex = this.datapartie_tab.indexOf(item)
       this.$store.state.datap = Object.assign({}, item)
        this.dialogDelete = true
      },
      closeDelete(){
         this.dialogDelete = false
      },
      deleteItemConfirm () {
        this.delete_one_data();
        this.closeDelete()
      },

     async ajoutpv(){
        this.load =true;
        try{
          let obj={ pv:this.pv,  pvsid:this.pvsid,  plaintid:this.plaintid}
         var  resp = await this.addpv(obj);
         if(this.files[0] != null){
          await this.addFile(resp.data);
         }
                   this.load=false;
                   this.files=[];
        }catch(err){
          resp.status=500;
        }
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
        this.$refs.pv1.reset()
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