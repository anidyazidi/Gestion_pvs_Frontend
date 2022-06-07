<template>
<div class="chercher_plaint">
 <v-spacer></v-spacer>
 <v-tabs
      v-model="tab"
    >
      <v-tab
      class="font-weight-black text-h6 mx-15"
      >
      <v-icon right>mdi-police-badge-outline</v-icon>
        المحاضر
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
  outlined  class="mx-auto my-auto mb-2"
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
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="cherchant.de"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cherchant.de"
            prepend-icon="mdi-calendar"
            readonly dense
            label="تاريخ تسجيل المحضر من"
            v-bind="attrs"
            v-on="on"
            outlined 
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cherchant.de"
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
            @click="$refs.menu1.save(cherchant.de)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

     <v-col
      cols="12"
      sm="4"
    >
     <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="cherchant.a"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="cherchant.a"
            prepend-icon="mdi-calendar"
            readonly dense
            label=" إلى"
            v-bind="attrs"
            v-on="on"
            outlined 
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="cherchant.a"
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
            @click="$refs.menu2.save(cherchant.a)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="4">
          </v-col>
          
         <v-card-actions>
              <v-btn
                text
               @click="chercher_pvs"
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

     <v-card>
     <v-data-table
    :headers="headers"
    :loading="!cherche"    
    loading-text="إنتظر قليلا"
    :items="pvs" no-data-text="معلومات غير متاحة"
     class="elevation-1 font-weight-black mb-4"
    hide-default-footer
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
    <div class="text-center">
    <v-pagination
    v-model="pagination.current"
    :length="pagination.total"
    @input="onPageChange"
    v-show="cherche"
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
            no-data-text="لا يوجد أطراف"
            :items="datapartie"
            class="elevation-1"
            hide-default-footer
            
            ></v-data-table>
      </v-card>
      <v-card>
         <v-card-title class="blue lighten-5">االمرفقات</v-card-title>
         <v-data-table
            :headers="headfichiers" 
            no-data-text=" لا توجد مرفقات "
            :items="fichiers"
            class="elevation-1"
            hide-default-footer>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn 
             @click="download(item)"
              color="primary"
              dark
            >
            <v-icon>mdi-download</v-icon>
              تحميل
            </v-btn>
    </template>
            </v-data-table>
      </v-card>

    </v-tab-item>
     </v-tabs-items>
      <v-dialog v-model="dialogTraite" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">  هل تم معالجة هذا المحضر  </v-card-title>
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
import { mapGetters,mapMutations } from 'vuex'
export default {
    data(){
        return {
          
        pagination: {
                current: 1,
                total: 0
            },

            pvs:[],
         load:false,
         cherche:false,

        menu1: false, modal1: false, menu2: false, modal2: false,
        cherchant:{
          de: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          a:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
         },
          headers: [
          { text: 'نوع المحضر', value: 'typepvsID' },
          { text: ' تاريخ التسجيل', value: 'dateEnregPvs' },
          { text: '  رقم الإرسالية', value: 'numEnvoi' },
          { text: 'موضوع المحضر', value: 'sujetpvs' },
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
      headfichiers:[
         { text: ' إسم الملف', value: 'name' },
          { text: ' تحميل الملف', value: 'action', sortable: false },
      ],
          showInfo:false,
           tab:null,
           fichiers:[],
           datapartie:[],
           traitedItem:{},
       dialogTraite:false,
        }
    },
    computed:{
      ...mapGetters(["getServ_pvs"]),
      type(){
            return this.getServ_pvs[2];
      }
    },
    methods:{
      ...mapMutations(["openSnackbar"]),
      async getPvs() {
        let token = localStorage.getItem("token");
            await axios.post('http://127.0.0.1:8000/api/pvs/mission_pvs?page=' + this.pagination.current,{},
            { headers:{ Authorization: `Bearer ${token}` }
          })
                .then(response => {
                  let pvv= response.data.data;
                  for(let i=0;i<pvv.length;i++){
                    pvv[i].TypeSourcePvsID = pvv[i].typesourcepvs.nom;
                    pvv[i].typepvsID = pvv[i].typepvs.nom;
                    pvv[i].typePoliceJudicID = pvv[i].typepolicejudiciaire.nom;
                  }
                  
                  this.pvs=pvv;    this.load=false; this.cherche=true;
                  
                    this.pagination.current = response.data.current_page;
                    this.pagination.total = response.data.last_page;
                });
        },
        onPageChange() {
            this.getPvs();
        },
        chercher_pvs(){
          this.load=true;
          let token = localStorage.getItem("token");
            axios.post('http://127.0.0.1:8000/api/pvs/mission_pvs',{
              cher_pv:this.cherchant
            },{
              headers:  
               {Authorization: `Bearer ${token}`}

          }).then(response => {
                  let pvv= response.data;
                  for(let i=0;i<pvv.length;i++){
                    pvv[i].TypeSourcePvsID = pvv[i].typesourcepvs.nom;
                    pvv[i].typepvsID = pvv[i].typepvs.nom;
                    pvv[i].typePoliceJudicID = pvv[i].typepolicejudiciaire.nom;
                  }    
                  this.pvs = pvv;
                  this.load=false;
                   this.pagination.current=0;
                  return response;
                }).catch(err=>{
                  this.load=false;
                  return err;
                })
        },
        async ViewItem(item){
          try{
            let token = localStorage.getItem("token");
          let pv = await axios.post(`http://127.0.0.1:8000/api/dataparties/index/${item.id}`,
          {type:'pvs'},
          {headers:{ Authorization:`Bearer ${token}`} });
          let pvfiles = await axios.get(`http://127.0.0.1:8000/api/pvs/File_index/${item.id}`,
          { 
            headers:{ Authorization:`Bearer ${token}`} });
            console.log(item.id)
         console.log(pvfiles.data);
          this.fichiers = pvfiles.data; 
          this.datapartie = pv.data;
          document.getElementById("vieww").click();
          this.showInfo=true;
          }catch(er){
             this.openSnackbar("هناك خطأ حاول مرة اخرى");
             return er;
          }
          
        },
        async download(item){
          let token = localStorage.getItem("token");
         await axios.post("http://127.0.0.1:8000/api/pvs/File_download",{lien:item.lien},{
         responseType: "blob",
          headers:{ Authorization:`Bearer ${token}`}
        }).then((response) => {
       var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', item.name);
       document.body.appendChild(fileLink);
       fileLink.click();
                });;


        },

        traiterItem(item){
          this.dialogTraite = true;
          this.traitedItem = Object.assign({},item);
        },
        validtraited(){
          let token = localStorage.getItem("token");
          axios.put(`http://127.0.0.1:8000/api/users/haspvs/update/${this.traitedItem.id}`,
          {
            userhaspvs:{traitID:true}
          },{headers:{ Authorization:`Bearer ${token}`} 
          }).then(reponser=>{
            this.getPvs();
            this.dialogTraite = false
          })
          
          },
    },
    mounted(){
      this.getPvs();
    }
}

</script>
