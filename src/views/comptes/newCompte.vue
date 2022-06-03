<template>
 <div>
     <v-card>
     <v-toolbar dark class="nvbar mb-3" flat height="45px" app>
       <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">
         إنشاء حساب جديد 
         </v-toolbar-title>
     </v-toolbar>
     <v-col cols="12" sm="4">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  
    <v-text-field
      v-model="user.nom"
      :rules="nameRules"
      label="الإسم الكامل "
      required
    ></v-text-field>
   
    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="البريد الإلكتروني"
      required
    ></v-text-field>
        <v-text-field
          v-model="user.numUser"
          :rules="numberRules"
          label=" رقم الهاتف"
          required
        ></v-text-field>
  
    <v-select
      v-model="user.idRole"
      :items="items"
      item-text="nom"
      item-value="id"
      :rules="[v => !!v || 'Item is required']"
      label="دوره"
      required
    ></v-select>
 
    <v-row>
        <v-col cols="12" sm="5" class="ml-6">
            <v-text-field
            type="password"
          v-model="user.password"
          label="كلمة السر"
          required
        ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
        <v-text-field
        ref="password"
          v-model="password"
          type="password"
          label="تأكيد كلمة السر "
          :rules="[
              () => !!password || ' required',
              () => password == this.user.password || 'mismatch',
              
            ]"
          required
        ></v-text-field>
        </v-col>
    </v-row>

    <v-checkbox
      v-model="user.active"
      label="نشط"
      :value="!user.active"

    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      :loading="loadValid"
      @click="validate"
    >
      إنشاء
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
       إلغاء
    </v-btn>

  </v-form>
   </v-col>
   </v-card>
  </div>
</template>
<script>
import axios from 'axios';
  export default {
    data: () => ({
      valid: true,
      loadValid:false,
      user:{
          nom:'',
          email:'',
          password:'',
          active:false,
          numUser:'',
          idRole:null
      },
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
         v =>  /.+@.+\..+/.test(v) || 'شكل غير صحيح',
      ],
      numberRules: [
        v => !!v || 'number is required' ,
        v => /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(v) || 'عشرأرقام فما فوق',
      ],

      items: [],
    }),

    methods: {
      async validate () {
          this.$refs.form.validate();
          //this.loadValid = true
          let token = localStorage.getItem("token");
       await axios.post('http://127.0.0.1:8000/api/users/store',{
             users:this.user
         },{headers: { Authorization:`Bearer ${token}`} 
        }).then(reponse=>{
             this.reset();
        }).catch(er =>{
          console.log(er);
           return er;
          });
       
      },
      reset () {
        this.$refs.form.reset()
      },
      
    },
    created(){
        var token = localStorage.getItem("token");
        axios.get('http://127.0.0.1:8000/api/users/role/index',{
            headers:{Authorization:`Bearer ${token}`}
        }).then(res => {
            this.items = res.data;
        })
    }
  }
</script>
