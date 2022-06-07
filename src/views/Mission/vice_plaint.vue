<template>
  <div class="traiter_plaint">
 <v-spacer></v-spacer>
 <v-tabs
      v-model="tab"
      
    >
      <v-tab
      class="font-weight-black text-h6 mx-15"
      >
      <v-icon right>mdi-police-badge-outline</v-icon>
        الشكايات
      </v-tab>
       <v-tab
      class="font-weight-black text-h6 mx-15"
      v-show="showInfo"
      id="vieww"
      >
      <v-icon right>mdi-note-multiple-outline</v-icon>
       المعلومات  
      </v-tab>
    </v-tabs>

     <v-tabs-items v-model="tab">
      <v-tab-item
      >
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title>بحث</v-toolbar-title>
     </v-toolbar>
    <v-form class="px-5">
          <v-row  dense justify align-content-center>
       <v-col
      cols="12"
      sm="4"
    >
    
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateErg"
            label="تاريخ تسجيل الشكاية"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateErg"
           no-title
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="2"></v-col>
           <v-card-actions>
              <v-btn
                text
               @click="chercher_pl"
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
    
    </v-form>
     </v-card>
<v-card class="mt-5">
  <div>
    <v-data-table
    :headers="headers"
    :items="plaint" no-data-text="معلومات غير متاحة"
     class="elevation-1 font-weight-black mb-4"
    hide-default-footer
    :loading="!table_show"
    loading-text="إنتظر قليلا"
    >
    <template v-slot:[`item.action`]="{ item }">
     
            <v-btn
             @click="ViewItem(item)"
              color="primary"
              fab
              x-small
              dark
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
     
      <v-icon
        small
        class="mr-2"
        @click="traiterItem(item)"
      >
        mdi-wrench <!-- traiter -->
      </v-icon>
    </template>

    </v-data-table>
  </div>
  <div class="text-center">
    <v-pagination
    v-model="pagination.current"
    :length="pagination.total"
    v-show="table_show"
    @input="onPageChange"
></v-pagination>
    </div>
    
     </v-card>
    </v-tab-item> 

    <v-tab-item>
      <v-card>
        <v-card-title class="blue lighten-5" >
          الأطراف
        </v-card-title>
        <v-data-table
            :headers="headersPartie" 
            no-data-text="شكاية ضد مجهول"
            :items="datapartie"
            class="elevation-1"
            hide-default-footer
            
            ></v-data-table>
      </v-card>
    </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="dialogTraite" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"> هل تم معالجة هذه الشكاية   </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red darken-1" dark text @click="dialogTraite = false">إلغاء</v-btn>
              <v-btn class="blue darken-3"
               dark text @click="validtraited">نعم</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, Mutation } from 'vuex';
export default {
    data(){
        return {
          load:false,
          tab:null,
          
          table_show:false,
        headers: [
          { text: 'نوع الشكاية', value: 'type_plaint.nom' },
          { text: 'مصدر الشكاية', value: 'source_plaint.nom' },
          { text: 'تاريخ تسجيل الشكاية', value: 'dateEnregPlaints' },
          { text: 'موضوع الشكاية', value: 'sujetPlaints' },
          { text: 'تغيير', value: 'action', sortable: false }
        ],
        headersPartie: [
        { text: 'الإسم الشخصي ', align: 'start',sortable: false,value: 'prenom'},
        { text: 'الإسم العائلي', value: 'nom', sortable: false},
        { text: 'صفته', value: 'personne_morales.nom', sortable: false},
        { text: 'نوعه', value: 'genre.nom',sortable: false },
        { text: ' رقم بطاقة التعريف', value: 'NumCarte', sortable: false},
        { text: 'المقاطعة', value: 'provinces.nom', sortable: false}
      ],
        plaint: [],
        dateErg:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        pagination: {
                current: 1,
                total: 0
            },
       showInfo:false,
       datapartie:[],
       traitedItem:{},
       dialogTraite:false,
            
        }
    },
    methods:{
      ...mapMutations(["openSnackbar"]),
      getPlaint() {
        let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/plaint/mission_plaint?page=' + this.pagination.current,{},
            { headers:{ Authorization: `Bearer ${token}` }
          })
                .then(response => {
                  
                    this.plaint =response.data.data;
                    this.pagination.current = response.data.current_page;
                    this.pagination.total = response.data.last_page;
                    this.table_show = true;
                });
        },
        onPageChange() {
            this.getPlaint();
        },
        chercher_pl(){
          this.load=true;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/plaint/mission_plaint',{
              dateEnrg:this.dateErg
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
                   this.pagination.current=0;
                    this.table_show = true;
                  return response;
                  
                }).catch(err=>{
                  this.load=false;
                  this.openSnackbar("تأكد من صحة المعلومات");
                  return err;
                })
        },
         ViewItem(item){
           let token = localStorage.getItem("token");
          axios.post(`http://127.0.0.1:8000/api/dataparties/index/${item.id}`,
          {type:'plaint'},
          {
            headers:{ Authorization:`Bearer ${token}`}
        }).then(rep =>{
          this.datapartie = rep.data;
          document.getElementById("vieww").click();
          this.showInfo=true;
        })
        },
        traiterItem(item){
          this.dialogTraite = true;
          this.traitedItem = Object.assign({},item);
        },
        validtraited(){
          let token = localStorage.getItem("token");
          axios.put(`http://127.0.0.1:8000/api/users/hasplaints/update/${this.traitedItem.id}`,{
            userhasplaint:{traitID:true}
          },{headers:{ Authorization:`Bearer ${token}`} 
          }).then(reponser=>{
            this.getPlaint();
            this.dialogTraite = false
          })
          
          },
       
        
    },
    mounted(){
      this.getPlaint();
    }
}

</script>
