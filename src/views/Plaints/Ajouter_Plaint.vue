<template>
<div class="ajout">

    
<h2 class="subheading dark--text mb-4">إضافة شكاية</h2>
  <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="blue-grey darken-1 mb-3" flat height="34px" app>
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
             dense
            outlined
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
            outlined
            >
            </v-select>
          </v-col>
           <v-col cols="12" sm="5" class="mx-5">
        <div class="font-weight-bold darkgrey--text mx-15">مرجع الشكاية</div>
          <v-text-field 
          class="py-0 mx-15"
            single-line dense
            v-model="plaint.referencePlaints"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" class="mx-5">
        <div class="font-weight-bold darkgrey--text mx-15">مكان الوقائع</div>
          <v-text-field 
          class="py-0 mx-15"
            single-line dense
            v-model="plaint.EmplaceFaits"
            outlined
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
            readonly
            v-bind="attrs" dense
            v-on="on"
            class="py-0 mr-12"
            outlined
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
            readonly
            v-bind="attrs"
            v-on="on"
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
            readonly
            v-bind="attrs"
            v-on="on"
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
    hide-default-footer             
  >
  
    <template v-slot:top>
      <v-toolbar
        flat dark class="blue-grey darken-1 mb-3" height="40px" app
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
   
    </v-data-table>
    
  <DataPartie v-show="enable"></DataPartie>
  
  <v-spacer></v-spacer>

   <v-card-actions>
              <v-btn
               text
              @click="ajoutplaint"
              dark
              class="my-2 blue font-weight-black"
              elevation="2" 
              :loading="load"
            >
            <v-icon left >mdi-notebook-plus-outline</v-icon>             
               تسجيل الشكاية
              </v-btn>
              
              </v-card-actions>
          </v-form>
  </v-card>
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
       return {
         load:false,
        plaint:{
        contreInconnu:false,
        TypePlaintID:null,
        SourcePlaintID: null,
        referencePlaints:"problem",
        datePlaints:"2022-04-20",
        dateEnregPlaints:"2022-04-25",
        dateFaits:"2022-04-30",
        EmplaceFaits: "bm",
        sujetPlaints:"!!!سرقة"
        },

        datePlaints: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateEnregPlaints: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFaits: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false, modal: false,menu1: false, modal1: false, menu2: false, modal2: false,
        
      headers: [
        { text: 'اسم الطرف', align: 'start',sortable: false,value: 'nom_data'},
        { text: 'صفته', value: 'type_data', sortable: false},
        { text: 'نوعه', value: 'genre',sortable: false },
        { text: 'محامو الطرف', value: 'avocat_partie', sortable: false},
        { text: 'الممثل القانوني', value: 'representant_legal', sortable: false},
        { text: 'نوع الممثل القانوني', value: 'type_representant_legal' ,sortable: false},
        { text: 'تغيير', value: 'actions', sortable: false },
      ],
      data_partie:[],
      data_partieEdit: -1,
      edited_data_partie: {
        nom_data_partie: '',
        type: '',
        genre: '',
        avocat_partie: '',
        representant_legal: '',
        type_representant_legal: '',
      },
      defaultItem: {
        nom_data_partie: '',
        type: '',
        genre: '',
        avocat_partie: '',
        representant_legal: '',
        type_representant_legal: '',
      }
       }
       },
    computed: {
      ...mapGetters(["getServ_plaint",
                     "getalldata","get_show_form"]),

      formTitle () {
        return this.data_partieEdit === -1 ? 'New Item' : 'Edit Item'
      },

      serv_plaint(){
        return this.getServ_plaint;
      },

      datapartie_tab(){
        return this.getalldata;
      },
      enable(){
        return this.get_show_form;
      }
    },
      
    
    methods: {
      ...mapActions(["addplaint","servall_plaint",
                    "add_datapart","getall_serv_data"]),
      ...mapMutations(["show_form","openSnackbar"]),

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

    },
    
    created(){
      this.servall_plaint();
    }
  
}

</script>