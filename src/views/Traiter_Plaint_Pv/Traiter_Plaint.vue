<template>
<div class="traiter_plaint">
 <v-spacer></v-spacer>
 <v-tabs
      v-model="tab"
    >
      <v-tab
      class="font-weight-black text-h6 mx-15"
      >
      تدبير الشكايات
      </v-tab>
       <v-tab
      class="font-weight-black text-h6 mx-15"
      id="vieww"
      >
       وضعية الشكايات  
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
      >

     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar light class="nvbar mb-3" flat height="34px" app>بحث</v-toolbar>
    <v-form class="px-5">
          <v-row  dense justify align-content-center no-gutters>
       <v-col
      cols="12"
      sm="4"
    >
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="date_cher"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="date_cher"
            class="mt-3 ml-3"
            prepend-icon="mdi-calendar"
            readonly
            label="تاريخ تسجيل الشكاية"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date_cher"
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
            @click="$refs.menu1.save(date_cher)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col>
      <v-card-actions>
              <v-btn
                text
               @click="chercher_plaint"
              light
              class="my-2 blue font-weight-bold"
              elevation="2"
              :loading="load"
              height="30px"
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
    </v-col>


    </v-row >
    <v-card flat class="ma-2" v-show="active"><form>
    <v-data-table
    v-model="selected"
    :headers="headers"
    :items="plaint"
    item-key="id" 
    no-data-text="معلومات غير متاحة"
    show-select hide-default-footer
    class="elevation-1 mb-10"

  >
  </v-data-table>

  <v-row  dense justify align-content-center no-gutters><v-col cols="12" sm="3">
          <v-autocomplete
            v-model="userhasplaint.userID"
            :rules="[() => !!viceProc || 'المرجوا ملأ هذا الحقل']"
            :items="viceProc"
            item-text="nom"
            item-value="id"
            placeholder="مساعدة في البحث"
            no-data-text="لا يوجد"
            label="ممثل النيابة"
            
            required 
            outlined dense
          ></v-autocomplete></v-col>
          <v-col cols="12" sm="4" class="mr-6">
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        :return-value.sync="userhasplaint.dateMission"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="userhasplaint.dateMission"
            prepend-inner-icon="mdi-calendar"
            
            readonly
            label="تاريخ الاحالة"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="userhasplaint.dateMission"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu3=false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu3.save(userhasplaint.dateMission)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      </v-col>
      </v-row>
      <v-row no-gutters  class="ma-0 pa-0">
       <v-col cols="13" sm="4"></v-col>
           <v-card-actions  class="ma-0 pa-0">
              <v-btn
                text
               @click="affecter_plaints"
              light
              class="my-2 green lighten-1"
              elevation="2"
              :loading="load2"
              height="30px"
            >
            <v-icon right >mdi-note-check-outline</v-icon>             
              إضافة
              </v-btn>
              
              </v-card-actions>
      </v-row>
  </form> </v-card>
    </v-form>
     </v-card>
     </v-tab-item> 

<v-tab-item>
      <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar  class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class="darkgrey--text text-h6">تاريخ إحالة الشكاية</v-toolbar-title></v-toolbar>
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
        :return-value.sync="cher_userhasplaint.de"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="cher_userhasplaint.de"
            class="mt-3 ml-3"
            prepend-icon="mdi-calendar"
            readonly
            label="من"
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cher_userhasplaint.de"
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
            @click="$refs.menu11.save(cher_userhasplaint.de)"
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
        :return-value.sync="cher_userhasplaint.a"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="cher_userhasplaint.a"
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
          v-model="cher_userhasplaint.a"
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
            @click="$refs.menu12.save(cher_userhasplaint.a)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu></v-col>
      <v-card-actions class="ma-0 pa-0">
              <v-btn
                text
               @click="chercher_plaint_viceproc"
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
    :items="plaint_status"
    no-data-text="معلومات غير متاحة"
    hide-default-footer
    class="elevation-1 my-10"
  >
  <template v-slot:[`item.action`]="{ item }">
      <v-chip
      :color="status_plaint(item.traitID)"
        lighten
        x-small
      >
      </v-chip>
      </template>

  </v-data-table>
         </v-card>
         
     </v-tab-item>

     </v-tabs-items>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
    data(){
        return {
          tab:null,
          load:false,
          load2:false,
        selected: [],
         viceProc: this.$store.state.viceProc,
        active: false,

          userhasplaint:{
          userID:[],
          plaintID:null,
          traitID:1,
       dateMission:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
        
        date_cher: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu3: false, modal2: false,
         

        headers: [
          {text: 'مرجع الشكاية',align: 'start',sortable: false,value: 'referencePlaints'},
          { text: 'نوع الشكاية', value: 'type_plaint.nom',sortable: false, },
          { text: 'مصدر الشكاية', value: 'source_plaint.nom', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'dateEnregPlaints', sortable: false,},
          { text: 'موضوع الشكاية', value: 'sujetPlaints' ,sortable: false,},
        ],
        headers_m: [
          {text: 'مرجع الشكاية',align: 'start',sortable: false,value: 'plaint.referencePlaints'},
          { text: 'مصدر الشكاية', value: 'plaint.source_plaint.nom', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'plaint.dateEnregPlaints', sortable: false,},
          { text: 'موضوع الشكاية', value: 'plaint.sujetPlaints' ,sortable: false,},
          { text: ' ممثل النيابة', value: 'user.nom' ,sortable: false,},
          { text: 'وضعية الشكاية', value: 'action', sortable: false },
        ],
        plaint: [],
        // pour afficher les status du plaint

        plaint_status:[],//table de plaint avec viceproc

        show:false,// afficher le tableau de plaint avec vice proc
        cher_userhasplaint:{ //chercher sur plaint avec vice proc
          de:null,
          a:null
        },
        load_cher:false,
       }},
      
       
       methods:{
         ...mapMutations(["openSnackbar"]),
         
         status_plaint(traite){
        if(traite == 1) return 'green lighten-3'
        else return 'blue darken-2';
          },
         async chercher_plaint(load_value=true){
          this.load=load_value;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/plaint/Bydate',{
               dateEnrg:this.date_cher
            },{
              headers:  
               {Authorization: `Bearer ${token}`}

          }).then(response => {
                     this.plaint = response.data;
                  this.load=false;
                  this.active=true;
                  return response;
                }).catch(err=>{
                  this.load=false;
                  this.active=true;
                  return err;
                })
        },
        async affecter_plaints(){
          this.load2=true;
          let IDs=[];
         for(let i=0;i<this.selected.length;i++){
           IDs.push(this.selected[i].id);
            console.log(this.selected[i].id);
        }   this.userhasplaint.plaintID=IDs;

          let token = localStorage.getItem("token");
           await axios.post('http://127.0.0.1:8000/api/users/hasplaints/store',{
              userhasplaint:this.userhasplaint
            },{ headers:{Authorization: `Bearer ${token}`}

           }).then(async response => {
                  this.selected = [];
                  await this.chercher_plaint(false);
                  this.openSnackbar("تمت الإحالة بنجاح");

                  this.load2=false;
                  return response;
                }).catch(err=>{
                  this.load2=false;
                  this.openSnackbar("تأكد من صحة المعلومات");
                  return err;
                })
        },
        async chercher_plaint_viceproc(){
          this.load_cher = true;
          let token = localStorage.getItem("token");
           await axios.post('http://127.0.0.1:8000/api/users/hasplaints/index',{
              userhasplaint:this.cher_userhasplaint
            },{ headers:{Authorization: `Bearer ${token}`}

           }).then(async response => {
                  this.plaint_status = response.data;
                  this.show = true;
                  this.load_cher = false;
                });
                this.load_cher = false;
        }
       }
       
    }

</script>


