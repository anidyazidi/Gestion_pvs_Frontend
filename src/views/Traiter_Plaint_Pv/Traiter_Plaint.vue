<template>
<div class="traiter_plaint">
<h2 class="subheading grey--text">تدبير شكاية</h2>


 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="45px" app></v-toolbar>
    <v-form class="px-5">
          <v-row>
       <v-col
      cols="12"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ تسجيل الشكاية</div>
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
            prepend-icon="mdi-calendar"
            readonly
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
<v-col cols="12" sm="2"></v-col>
           <v-card-actions>
              <v-btn
                text
               @click="chercher_plaint"
              dark
              class="my-2 blue font-weight-bold"
              elevation="2"
              :loading="load"
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
              
    </v-row>
    <v-card flat class="ma-2" v-show="active"><form>
    <v-data-table
    v-model="selected"
    :headers="headers"
    :items="plaint"
    item-key="id" 
    no-data-text="معلومات غير متاحة"
    show-select hide-default-footer
    class="elevation-1 mb-4"

  >
  </v-data-table>

  <v-row><v-col cols="12" sm="3">
   <div class="font-weight-bold darkgrey--text mx-15">ممثل النيابة</div>
          <v-autocomplete
            ref="ممثل النيابة"
            v-model="userhasplaint.userID"
            :rules="[() => !!viceProc || 'المرجوا ملأ هذا الحقل']"
            :items="viceProc"
            item-text="nom"
            item-value="id"
            placeholder="مساعدة في البحث"
            required single-line
            outlined dense
          ></v-autocomplete></v-col>
          <v-col cols="12" sm="4">
           <div class="font-weight-bold darkgrey--text mx-15">تاريخ الاحالة</div>
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
            prepend-icon="mdi-calendar"
            readonly
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
            @click="menu3 = false"
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
       <v-col cols="12" sm="6"></v-col>
           <v-card-actions>
              <v-btn
                text
               @click="affecter_plaints"
              dark
              class="my-2 green darken-1 font-weight-black"
              elevation="2"
              :loading="load2"
            >
            <v-icon right >mdi-note-check-outline</v-icon>             
              إضافة
              </v-btn>
              
              </v-card-actions>
      </v-row>
  </form> </v-card>
    </v-form>
     </v-card>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
    data(){
        return {
          load:false,
          load2:false,
        selected: [],
         viceProc: this.$store.state.viceProc,
        active: false,

          userhasplaint:{
          userID:[],
          plaintID:1,
          traitID:false,
       dateMission:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
        
        date_cher: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu2: false, modal2: false,
         

        headers: [
          {text: 'مرجع الشكاية',align: 'start',sortable: false,value: 'referencePlaints'},

          { text: 'نوع الشكاية', value: 'TypePlaintID',sortable: false, },
          { text: 'مصدر الشكاية', value: 'SourcePlaintID', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'dateEnregPlaints', sortable: false,},
          { text: 'موضوع الشكاية', value: 'sujetPlaints' ,sortable: false,},
        ],
        plaint: [],
        
       }},
       methods:{
         ...mapMutations(["openSnackbar"]),

         async chercher_plaint(load_value=true){
          this.load=load_value;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/plaint/Bydate',{
               dateEnrg:this.date_cher
            },{
              headers:  
               {Authorization: `Bearer ${token}`}

          }).then(response => {
                  let plnt = response.data;
                  for(let i=0;i<plnt.length;i++){
                    plnt[i].TypePlaintID = plnt[i].type_source_plaint.nom;
                    plnt[i].SourcePlaintID = plnt[i].source_plaint.nom;
                  }     this.plaint = plnt;
                  this.load=false;
                  this.active=true;
                  return response;
                }).catch(err=>{
                  this.load=false;
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
        }
       }
       
    }

</script>


