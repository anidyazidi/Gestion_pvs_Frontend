<template>

  <v-data-table
    :headers="headers"
    :items="user" no-data-text="معلومات غير متاحة"
    sort-by="numUser"
    class="elevation-1 font-weight-black text-h7"
     hide-default-footer
     :loading="table_vide"
     loading-text="إنتظر قليلا"
  >
   
    <template v-slot:top>
      <v-toolbar  flat>
        <v-toolbar-title>المستخدمين</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5"> edit data</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nom"
                      label="nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.numUser"
                      label="numUser"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <v-select
                    v-model="editedItem.idRole"
                    :items="Role"
                    item-value="id"
                    item-text="nom"
                    label="Role"
                    dense
                  ></v-select>
                    
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              dark
              class="red lighten-3"
                text
                @click="close"
              >
                إلغاء
              </v-btn>
              <v-btn
              class="blue darken-2"
              dark
                text
                @click="save"
                :loading="load_pop_edit"
              >
                تأكيد
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">هل ان متأكد من هذه العملية</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red darken-1" dark text @click="closeDelete">إلغاء</v-btn>
              <v-btn class="blue darken-3"
              :loading="load_pop_delete"
               dark text @click="deleteItemConfirm">نعم</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:[`item.action`]="{ item }">
      <v-chip
        :color="getColor(item.numUser)"
        dark
      >   
      </v-chip>

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
</template>
<script>
import axios from 'axios'
import { mapMutations, Mutation } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      table_vide:true,
      load_pop_edit:false,
      load_pop_delete:false,
      Role:[],
      headers: [
        { text: 'إسم المستخدم', align: 'start', sortable: false, value: 'nom', },
        { text: 'رقمه', value: 'numUser' },
        { text: 'البريد الالكتروني', value: 'email' },
        { text: 'دوره', value: 'idRole' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      user:[],
      editedItem: {
        id:null,
        nom: '',
        numUser: 0,
        email: 0,
        idRole: 0,
        
      },
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    

    methods: {
      ...mapMutations(["openSnackbar"]),
         getColor (numUser) {
        if (numUser > 400){ numUser="dis"; return 'red'}
        else return 'green'
      },
      
      editItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
       close () {
        this.dialog = false
      },
       async save () {
         this.load_pop_edit=true;
         var token = localStorage.getItem("token");
        if (this.editedIndex > -1) {
          //Object.assign(this.user[this.editedIndex], this.editedItem)
          await axios.put('http://127.0.0.1:8000/api/users/update/'+this.editedItem.id,{
            users:this.editedItem
          },{headers:{ Authorization:`Bearer ${token}` }
         }).then(async res => {
           this.table_vide=true;
           await this.getUser();
           this.table_vide=false;
           this.load_pop_edit=false;
           return res;
         });
        }

        this.close()
      },

      
      
      deleteItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      closeDelete () {
        this.dialogDelete = false
        
      },
      async deleteItemConfirm(){
        this.load_pop_delete=true;
        var token = localStorage.getItem("token");
      console.log( this.editedItem.id)
        await axios.delete('http://127.0.0.1:8000/api/users/delete/'+this.editedItem.id,
        {headers:{ Authorization:`Bearer ${token}` }
         }).then(async res => {
           this.table_vide=true;
           await this.getUser();
           this.table_vide=false;
           this.load_pop_delete=false;
           return res;
         }).catch(er =>{
           this.openSnackbar("هذا المستخدم لم يكمل مهامه بعد");
            this.load_pop_delete=false;
         });
         this.closeDelete();
      },

     async getUser () {
        
        var token = localStorage.getItem("token");
         await axios.get('http://127.0.0.1:8000/api/users/index',{
            headers:{
               Authorization:`Bearer ${token}`
              }
         }).then(res => {
           this.user = res.data;
           this.table_vide=false;
           return res;
         });
      },

    },

    created () {
      this.getUser();
      var token = localStorage.getItem("token");
          axios.get('http://127.0.0.1:8000/api/users/role/index',{
            headers:{
               Authorization:`Bearer ${token}`
              }
         }).then(res => {
           this.Role = res.data;
           console.log(res.data);
           return res;
         });
    },
  }
</script>