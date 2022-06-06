<template>
<div class="chercher_plaint">
<h2 class="subheading dark--text mb-4">بحث عن شكاية</h2>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">بحث</v-toolbar-title></v-toolbar>
    <v-form class="px-5">
          <v-row  dense justify align-content-center>
     <v-col cols="12" sm="4">
        <div class=" mx-15">مرجع الشكاية</div>
          <v-text-field 
          v-model="cherchant"
            single-line 
            outlined dense
          ></v-text-field>
        </v-col>
         <v-card-actions>
              <v-btn
                text
               @click="chercher_pl"
              dark
              class="my-2 blue"
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
     class="elevation-1 font-weight-black"
    hide-default-footer
    :loading="table_vide"
     loading-text="إنتظر قليلا"
    >
    </v-data-table>
  </div>
  <div class="text-center">
    <v-pagination
    v-model="pagination.current"
    :length="pagination.total"
    @input="onPageChange"
></v-pagination>
    </div>
    
     </v-card>
    

</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
          load:false,
          table_vide:true,
        headers: [
          { text: 'نوع الشكاية', value: 'TypePlaintID' },
          { text: 'مصدر الشكاية', value: 'SourcePlaintID' },
          { text: 'تاريخ تسجيل الشكاية', value: 'dateEnregPlaints' },
          { text: 'موضوع الشكاية', value: 'sujetPlaints' },
        ],
        plaint: [],
        cherchant:"100",
            pagination: {
                current: 1,
                total: 0
            }
        }
    },
    methods:{
      async getPlaint() {
        this.table_vide=true;
        let token = localStorage.getItem("token");
             await axios.get('http://127.0.0.1:8000/api/plaint/index?page=' + this.pagination.current,{
              headers:  
               { Authorization: `Bearer ${token}` }
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
                });
                this.table_vide=false;
        },
        onPageChange() {
            this.getPlaint();
        },
        chercher_pl(){
          this.load=true;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/plaint/reference',{
              reference:this.cherchant
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
                  return response;
                }).catch(err=>{
                  this.load=false;
                  return err;
                })
        }
    },
    mounted(){
      this.getPlaint();
    }
}

</script>
