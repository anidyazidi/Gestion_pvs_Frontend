<template>
  <div class="traiter_plaint">
<h2 class="subheading dark--text mb-4"> الإحالات</h2>


 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app></v-toolbar>
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
    

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, Mutation } from 'vuex';
export default {
    data(){
        return {
          load:false,
          table_show:false,
        headers: [
          { text: 'نوع الشكاية', value: 'TypePlaintID' },
          { text: 'مصدر الشكاية', value: 'SourcePlaintID' },
          { text: 'تاريخ تسجيل الشكاية', value: 'dateEnregPlaints' },
          { text: 'موضوع الشكاية', value: 'sujetPlaints' },
        ],
        plaint: [],
        dateErg:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            pagination: {
                current: 1,
                total: 0
            }
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
                  let plnt = response.data.data;
                  for(let i=0;i<plnt.length;i++){
                    plnt[i].TypePlaintID = plnt[i].type_source_plaint.nom;
                    plnt[i].SourcePlaintID = plnt[i].source_plaint.nom;
                  }
                  
                    this.plaint =plnt ;
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
        }
    },
    mounted(){
      this.getPlaint();
    }
}

</script>
