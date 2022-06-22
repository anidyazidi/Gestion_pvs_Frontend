<template>
<div class="ajout">
<p class="subheading dark--text mb-0 mt-0">إضافة شكاية</p>
  <v-spacer></v-spacer>
     <v-card elevation="2" 
  outlined  class="mx-auto my-auto justify-center"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
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
          <v-col cols="12" sm="3" class="ml-2">
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
          
          <v-col cols="12" sm="3" class="ml-2">
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
           <v-col cols="12" sm="3" class="ml-2">
          <v-text-field 
            dense
            v-model="plaint.referencePlaints"
            outlined   :rules="rules.name"
            required 
            label="مرجع الشكاية"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3" class="ml-2">
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
   <v-card elevation="2"
  outlined  class="mx-auto my-4"
  
     >
        <v-form>
         <v-data-table
    :headers="headers"
    :items="datapartie_tab"
    class="elevation-1 font-weight-black"
    hide-default-footer  no-data-text="معلومات غير متاحة"           
  >
  
    <template v-slot:top>
      <v-toolbar dark class="nvbar mb-3" flat height="32" app><v-icon right>mdi-account-multiple-plus</v-icon>
        <v-toolbar-title class="darkgrey--text text-h6">أطراف الشكاية</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       
            <v-btn
            @click="enableform"
             dark small
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
   <v-card-actions>
              <v-btn
               text
              @click="ajoutplaint"
              dark
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
          dark
              class="my-2 red"
              elevation="2"
        >
          إلغاء
        </v-btn>
        <v-spacer></v-spacer>
              </v-card-actions></v-row>
          </v-form>
  </v-card>

  <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">هل تريد حذف هذا الطرف</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red darken-1" dark text @click="closeDelete">إلغاء</v-btn>
              <v-btn class="blue darken-3"
               dark text @click="deleteItemConfirm">نعم</v-btn>
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
        { text: 'صفته', value: 'PersonneMoraleID', sortable: false},
        { text: 'نوعه', value: 'genreID',sortable: false },
        { text: ' رقم بطاقة التعريف', value: 'NumCarte', sortable: false},
        
        { text: 'تغيير', value: 'action', sortable: false },
      ],
      data_partie:[],
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


      enableform(){
        this.show_form();
      },

      async ajoutplaint(){
         this.load =true;
         let resp = await this.addplaint(this.plaint);
                   this.load=false;
         if(resp.status==201 || resp.status==200){
           this.openSnackbar("لقد تم تسجيل الشكاية بنجاح");
           //vide.vider_plaint(this.plaint);
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
    },
    
    created(){
      this.servall_plaint();
    }
  
}

</script>
