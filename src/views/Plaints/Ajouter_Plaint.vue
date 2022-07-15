<template>
<div class="ajout">
<p class="subheading dark--text mb-0 mt-0">إضافة شكاية</p>
  <v-spacer></v-spacer>
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
  outlined  class="mx-auto my-auto justify-center"
     >
     <v-toolbar class="nvbar mb-3" flat height="34px" app>
  <v-toolbar-title  class=" darkgrey--text text-h6">معطيات الشكاية</v-toolbar-title>
  </v-toolbar>
        <v-form 
        dense
         ref="form"
        class="ma-0 pa-0 px-2">
          <v-row  dense no-gutters>
            <v-checkbox
            v-model="plaint.contreInconnu" 
            :value="!plaint.contreInconnu"
            label="ضد شخص مجهول"
            color="red darken-4"
            class=" mx-1"
            >
            </v-checkbox>
         
           </v-row>

           <v-row no-gutters dense >
          <v-col cols="12" sm="4" class="ml-2">
            <v-select
            v-model="plaint.TypePlaintID"
            class="blue-lighten-6" 
            :items="serv_plaint[1]" 
            item-text="nom"
            item-value="id"
            label="نوع الشكاية" 
            :rules="rules.select2"
             dense
              
            outlined
            >
            </v-select>
          </v-col>
          
          <v-col cols="12" sm="4" class="ml-2">
            <v-select
            v-model="plaint.SourcePlaintID"
            :items="serv_plaint[0]"
            item-text="nom" 
            item-value="id" 
            label="مصدر الشكاية"
            dense 
            :rules="[() => !!slct || '']"
            required 
            outlined
           
            >
            </v-select>
          </v-col>
          </v-row>
          <v-row  dense no-gutters>
           <v-col cols="12" sm="4" class="ml-2">
          <v-text-field 
            dense
            v-model="plaint.referencePlaints"
            outlined   :rules="rules.name"
            required 
            label="مرجع الشكاية"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" class="ml-2">
          <v-text-field dense 
            single-line 
            v-model="plaint.EmplaceFaits"
            outlined :rules="rules.name"
            required 
            label="مكان الوقائع"
          ></v-text-field>
        </v-col>
</v-row>
<v-row no-gutters dense>
          <v-col
      cols="12"
      sm="3" class="ml-2"
    >

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="plaint.datePlaints"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="plaint.datePlaints"
            prepend-inner-icon="mdi-calendar"
            readonly :rules="rules.name"
            v-bind="attrs" dense
            v-on="on"
            outlined required 
            label="تاريخ الشكاية"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="plaint.datePlaints"
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
            @click="$refs.menu.save(plaint.datePlaints)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
        <v-col
      cols="12"
      sm="3" class="ml-2"
    >

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
            v-model="plaint.dateEnregPlaints" dense
            prepend-inner-icon="mdi-calendar"
            readonly :rules="rules.name"
            v-bind="attrs"
            v-on="on" required 
            label="تسجيل الشكاية"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="plaint.dateEnregPlaints"
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
            outlined
            color="primary"
            @click="$refs.menu1.save(plaint.dateEnregPlaints)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
     <v-col
      cols="12"
      sm="3"
      class="ml-2"
    >
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="date2"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="plaint.dateFaits" dense
           prepend-inner-icon="mdi-calendar"
            readonly :rules="rules.name"
            v-bind="attrs"
            v-on="on" required 
            label="تاريخ الوقائع"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="plaint.dateFaits"
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
            @click="$refs.menu2.save(plaint.dateFaits)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    </v-row>
    <v-row no-gutters dense>
    <v-col cols="12" sm="9" class="ml-2">
    <v-textarea
    clearable
    value="" dense
    v-model="plaint.sujetPlaints"
    label="موضوع الشكاية"
    class="font-weight-black"
    rows="1"
    outlined
    no-resize
    >
    </v-textarea>
    </v-col>
        </v-row>
        </v-form>

   </v-card>
   <v-card 
  outlined  class="mx-auto my-4"
  flat
  
     >
        <v-form>
         <v-data-table 
    :headers="headers"
    :items="datapartie_tab"
    class="elevation-1 font-weight-black"
    hide-default-footer  no-data-text="معلومات غير متاحة"           
  >
  
    <template v-slot:top>
      <v-toolbar  class="nvbar mb-3" flat height="32" app><v-icon right>mdi-account-multiple-plus</v-icon>
        <v-toolbar-title class="darkgrey--text text-h6">أطراف الشكاية</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       
            <v-btn
            @click="enableform"
              small
              class="my-2 blue"
              elevation="2"
              :disabled="plaint.contreInconnu" 
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
  
  <v-spacer></v-spacer>

  <v-row>
    <v-col cols="12" sm="4"></v-col>
   <v-card-actions class="mt-4">
              <v-btn
               text
              @click="ajoutplaint"
              height="30px"
              class="my-2 blue"
              elevation="2" 
              :loading="load"
               :disabled="!formIsValid"
            >
            <v-icon left >mdi-notebook-plus-outline</v-icon>             
               تسجيل الشكاية
              </v-btn>
              <v-btn
          text
          @click="resetForm"
          height="30px"
              class="my-2 red"
              elevation="2"
        >
          إلغاء
        </v-btn>
        <v-spacer></v-spacer>
              </v-card-actions></v-row>
          </v-form>
  </v-card>
  </v-tab-item>
  <v-tab-item
      >
        <template><v-card flat  class="mt-9 mr-4">
          <v-form><v-row  dense justify align-content-center><v-col cols="12" sm="4">
 <v-file-input
    color="blue accent-4"
    v-model="files"
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

  <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">هل تريد حذف هذا الطرف</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red darken-1"  text @click="closeDelete">إلغاء</v-btn>
              <v-btn class="blue darken-3"
                text @click="deleteItemConfirm">نعم</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
</div>

</template>
 
 
<script>
import { mapMutations ,mapActions, mapGetters } from 'vuex'
 import DataPartie from '../../components/Data_Partie.vue'
 import vide from '../../store/vider_form'
 import axios from 'axios'
export default {
  components:{
    DataPartie
  },
   data () {
     const defaultForm = Object.freeze({
         contreInconnu:false,
        TypePlaintID:null,
        SourcePlaintID: null,
        referencePlaints:"",
        datePlaints:"",
        dateEnregPlaints:"",
        dateFaits:"",
        EmplaceFaits: "",
        sujetPlaints:""
      })
       return {
         plaint: Object.assign({}, defaultForm),
         slct: null,
         rules: {
            name: [val => (val || '').length > 0 || 'المرجوا ملأ هذا الحقل'],
      select: [(v) => !!v || 'المرجوا ملأ هذا الحقل'],
      select2: [(v) =>  v.length>0 || ''],
      
    },
    tab:null,
        snackbar: false,
         load:false,

         editedIndex:-1,
         editedItem:{},
         dialogDelete:false,
        plaint:{
        contreInconnu:false,
        TypePlaintID:null,
        SourcePlaintID: null,
        referencePlaints:"",
        datePlaints:"",
        dateEnregPlaints:"",
        dateFaits:"",
        EmplaceFaits: "",
        sujetPlaints:""
        },
        defaultForm,
        datePlaints: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateEnregPlaints: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFaits: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false, modal: false,menu1: false, modal1: false, menu2: false, modal2: false,
        
      headers: [
        { text: 'اسم الطرف', align: 'start',sortable: false,value: 'nom'},
        { text: 'صفته', value: 'PersonneMoraleID.nom', sortable: false},
        { text: 'نوعه', value: 'genreID.nom',sortable: false },
        { text: ' رقم بطاقة التعريف', value: 'NumCarte', sortable: false},
        
        { text: 'تغيير', value: 'action', sortable: false },
      ],
      data_partie:[],
      files:[]
       }
       },
    computed: {
      ...mapGetters(["getServ_plaint",
                     "getalldata","get_show_form"]),


      serv_plaint(){
        return this.getServ_plaint;
      },

      datapartie_tab(){
        return this.getalldata;
      },
      enable(){
        return this.get_show_form;
      },
       formIsValid () {
        return (
        this.plaint.TypePlaintID &&
        this.plaint.SourcePlaintID &&
       this.plaint.referencePlaints &&
        this.plaint.datePlaints &&
        this.plaint.dateEnregPlaints &&
        this.plaint.dateFaits &&
        this.plaint.EmplaceFaits 
        )
      },
    },
      
    
    methods: {
      ...mapActions(["addplaint","servall_plaint",
                    "add_datapart","getall_serv_data"]),
      ...mapMutations(["show_form","openSnackbar","delete_one_data"]),

      editItem (item) {
        this.$store.state.editedIndex = this.datapartie_tab.indexOf(item)
        this.$store.state.datap = Object.assign({}, item)
        this.$store.state.showForm = true;

        },

        async addFile(idpv){
           let token = localStorage.getItem("token");
           let formData = new FormData();

          for( var i = 0; i < this.files.length; i++ ){
                    let file = this.files[i];
                    formData.append('files[' + i + ']', file);
                   }
               await axios.post(`http://127.0.0.1:8000/api/plaint/File_store/${idpv}`,
                 formData, 
                 {headers: {   Authorization: `Bearer ${token}`,
                               'Content-Type': 'multipart/form-data'
                           }
                    });
      },

      enableform(){
        this.show_form();
      },

      async ajoutplaint(){
        let resp;
         this.load =true;
         try{
          resp = await this.addplaint(this.plaint);

         if(this.files[0] != null){
          await this.addFile(resp.data);
         }
         
         }catch(err){
          resp.status = 500;
         }
         this.load=false;
         
                   
         if(resp.status==201 || resp.status==200){
           this.openSnackbar("لقد تم تسجيل الشكاية بنجاح");
           //vide.vider_plaint(this.plaint);
           this.files=[];
           this.resetForm();
           let last = this.$store.state.datapartie.length - 1;
           
           this.$store.state.datapartielocal = [];
           vide.vider_data(this.$store.state.datapartie[last]);
           this.$store.state.datapartie = [];

        }else{ 
          this.openSnackbar(" تاكد من جميع المعلومات !!");
            }
        
      },
    resetForm () {
        this.plaint = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      
      submit () {
        this.resetForm()
      },

      deleteItem (item) {
        this.$store.state.editedIndex = this.datapartie_tab.indexOf(item)
        // this.$store.state.datap = Object.assign({}, item)
        this.dialogDelete = true
      },

      closeDelete(){
         this.dialogDelete = false
      },
      deleteItemConfirm () {
        this.delete_one_data();
        this.closeDelete()
      },
    },
    
    created(){
      this.servall_plaint();
    }
  
}

</script>
