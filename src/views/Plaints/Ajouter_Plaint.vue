<template>
<div class="ajout">

    
<h2 class="subheading dark--text mb-4">إضافة شكاية</h2>
  <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar  class="nvbar mb-3" flat height="34px" app>
  <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">معطيات الشكاية</v-toolbar-title>
  </v-toolbar>
        <v-form class="px-5">
          <v-row>
            <v-col cols="12" sm="8">
            <v-checkbox
            v-model="plaint.contreInconnu" 
            :value="!plaint.contreInconnu"
            label="ضد شخص مجهول"
            color="red darken-4"
            class="font-weight-black mx-2"
            >
            </v-checkbox>
           </v-col>
          <v-col cols="12" sm="5" class="mx-5">
            <div class="font-weight-bold darkgrey--text mx-15">نوع الشكاية</div>
            <v-select
            v-model="plaint.TypePlaintID"
            class="py-0 mx-15" 
            :items="serv_plaint[1]" 
            item-text="nom"
            item-value="id" 
            :rules="[() => !!slct || 'المرجوا ملأ هذا الحقل']"
            required 
             dense 
            outlined
            placeholder="نوع الشكاية"
            >
            </v-select>
          </v-col>
          
          <v-col cols="12" sm="5" class="mx-5">
            <div class="font-weight-bold darkgrey--text mx-15">مصدر الشكاية</div>
            <v-select
            v-model="plaint.SourcePlaintID"
            class="py-0 mx-15"
            :items="serv_plaint[0]"
            item-text="nom" 
            item-value="id" 
            dense 
            :rules="[() => !!slct || 'المرجوا ملأ هذا الحقل']"
            required 
            outlined
            placeholder="مصدر الشكاية"
            >
            </v-select>
          </v-col>
           <v-col cols="12" sm="5" class="mx-5">
        <div class="font-weight-bold darkgrey--text mx-15">مرجع الشكاية</div>
          <v-text-field 
          class="py-0 mx-15"
            single-line dense
            v-model="plaint.referencePlaints"
            outlined   :rules="rules.name"
            required 
            placeholder="مرجع الشكاية"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" class="mx-5">
        <div class="font-weight-bold darkgrey--text mx-15">مكان الوقائع</div>
          <v-text-field 
          class="py-0 mx-15"
            single-line dense
            v-model="plaint.EmplaceFaits"
            outlined :rules="rules.name"
            required 
            placeholder="مكان الوقائع"
          ></v-text-field>
        </v-col>
          <v-col
      cols="12"
      sm="3"
      class="mx-4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ الشكاية</div>
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
            prepend-icon="mdi-calendar"
            readonly :rules="rules.name"
            v-bind="attrs" dense
            v-on="on"
            class="py-0 mr-12"
            outlined required 
            placeholder="تاريخ الشكاية"
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
      sm="3"
      class="mx-4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تسجيل الشكاية</div>
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
            prepend-icon="mdi-calendar"
            readonly :rules="rules.name"
            v-bind="attrs"
            v-on="on" required 
            placeholder="تسجيل الشكاية"
            class="py-0 mx-10"
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
      class="mx-4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ الوقائع</div>
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
            prepend-icon="mdi-calendar"
            readonly :rules="rules.name"
            v-bind="attrs"
            v-on="on" required 
            placeholder="تاريخ الوقائع"
            outlined
            class="py-0 mx-10"
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
    <v-col cols="12" sm="10" class="mr-5">
    <v-textarea
    clearable
    value="" dense
    v-model="plaint.sujetPlaints"
    label="موضوع الشكاية"
    class="font-weight-black mx-15"
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
      <v-toolbar
        flat  class="nvbar mb-3" height="40px" app
      ><v-icon right>mdi-account-multiple-plus</v-icon>
        <v-toolbar-title>أطراف الشكاية</v-toolbar-title>
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
  <v-row><v-col cols="12" sm="6"></v-col>
   <v-card-actions>
              <v-btn
               text
              @click="ajoutplaint"
              dark
              class="my-2 blue font-weight-black"
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
              class="my-2 red font-weight-black"
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
            <v-card-title class="text-h5">هل ان متأكد من هذه العملية</v-card-title>
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
           vide.vider_plaint(this.plaint);
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
        this.$refs.plaint.reset()
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