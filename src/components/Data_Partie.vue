<template>
<div class="data_partie">
    <v-card class="mt-3">
      <v-toolbar
        flat dark class="nvbar mb-3" height="34px" app
      ><v-icon right>mdi-account-plus</v-icon>
       <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">طرف الشكاية</v-toolbar-title></v-toolbar>
      <v-row>
        <v-col cols="12" sm="6">
        <v-radio-group
        v-model="datap.soi"
        
      row
    >
      <v-radio
        label="شخص ذاتي" class="font-weight-black ma-4"
        :value="tru"
      ></v-radio>
      <v-radio
        label="شخص معنوي" class="font-weight-black ma-4"
        :value="!tru"
      ></v-radio>
    </v-radio-group>
    </v-col>
    <v-col cols="12" sm="5">
            <div class="font-weight-black py-0 mx-5">صفته</div>
            
            <v-select
            v-model="datap.PersonneMoraleID"
            :items="data_part[0]"
            item-text="nom"
            item-value="id"
            class="py-0 px-4"
            outlined dense
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
        <v-radio-group
      v-model="datap.genreID"
      row
    >
      <v-radio
        label="السيد" class="font-weight-black"
        value="1"
      ></v-radio>
      <v-radio
        label="السيدة" class="font-weight-black"
        value="2"
      ></v-radio>
    </v-radio-group>
    </v-col>
     <v-col cols="12" sm="9">
            <v-checkbox
            v-model="datap.minor"
            :value="tru"
            label="حدث"
            color="red darken-4"
            class="font-weight-black"
            >
            </v-checkbox>
           </v-col>
          <v-col cols="12" sm="3">

            <div class="font-weight-black mx-5">الاسم العائلي</div>
            <v-text-field
            v-model="datap.nom"
            single-line dense
            class="py-0 px-4" outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">الاسم الشخصي</div>
            <v-text-field
            v-model="datap.prenom"
            single-line dense
            class="py-0 px-4" outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black py-0 mx-5">نوع وثيقة التعريف</div>
            
            <v-select
            v-model="datap.TypeCarteIdentsID"
            :items="data_part[1]"
            item-text="nom"
            item-value="id"
             dense
            class="py-0 px-4" outlined
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">رقم وثيقة التعريف</div>
            <v-text-field
            v-model="datap.NumCarte"
            single-line outlined dense
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">اسم الأب</div>
            <v-text-field dense
            v-model="datap.NomDePere"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>

           <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">إبن</div>
            <v-text-field dense
            v-model="datap.FilsDe"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
           <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">اسم الأم</div>
            <v-text-field dense
            v-model="datap.NomDeMere"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">بنت</div>
            <v-text-field dense
             v-model="datap.FilleDe"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
           <v-col cols="12" sm="3">
            <div class="font-weight-black py-0 mx-5">الحالة العائلية</div>
            
            <v-select
            v-model="datap.SituationFamillID"
            :items="data_part[2]"
            item-text="nom"
            item-value="id"
             outlined
            class="py-0 px-4" dense
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">المهنة</div>
            <v-text-field dense
             v-model="datap.Profession"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <!-- <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">المهنة</div>
            <v-text-field dense
             v-model="datap.Profession"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>-->
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">مقر العمل</div>
            <v-text-field dense
             v-model="datap.LieuDeTravail"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">الرقم المالي</div>
            <v-text-field dense
             v-model="datap.NumFinan"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          
           <v-col cols="12" sm="3"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ الإزدياد</div>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="datap.DateNaiss"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="datap.DateNaiss"
            prepend-icon="mdi-calendar"
            readonly outlined
            v-bind="attrs"
            v-on="on"
            class="py-0 mr-12"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datap.DateNaiss"
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
            @click="$refs.menu.save(datap.DateNaiss)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

   <v-col cols="12" sm="3">
            <div class="font-weight-black py-0 mx-5">مدينة الإزدياد</div>
            
            <v-select
            v-model="datap.VilleDeNaissID"
            :items="data_part[3]" 
            item-text="nom"
            item-value="id"
             dense
            class="py-0 px-4" outlined
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black mx-5">مكان الإزدياد</div>
            <v-text-field dense
            v-model="datap.LieuNaiss"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black py-0 mx-5">الجنسية</div>
            
            <v-select dense
            v-model="datap.nationaliteID"
            :items="data_part[4]" 
            item-text="nom"
            item-value="id"
             outlined
            class="py-0 px-4"
            >
            </v-select>
          </v-col>
        <v-col cols="12" sm="3">
            <div class="font-weight-black py-0 mx-5">البلد</div>
            
            <v-select dense
           v-model="datap.paysID"
            :items="data_part[5]" 
            item-text="nom"
            item-value="id" outlined
            class="py-0 px-4"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="font-weight-black py-0 mx-5">(العمالة) المدينة</div>
            
            <v-select dense
            v-model="datap.ProvinceID"
            :items="data_part[6]" 
            item-text="nom"
            item-value="id" outlined
            class="py-0 px-4"
            >
            </v-select>
          </v-col>
         <v-col cols="12" sm="6">
            <div class="font-weight-black mx-5">العنوان</div>
            <v-text-field dense
            v-model="datap.address"
            single-line outlined
            class="py-0 px-4">
            </v-text-field>
          </v-col>
  </v-row>
  <v-card-actions>
              <v-btn
                text
               @click="add_data_to_store"
              dark
              class="my-2 blue"
              elevation="2" 
            >
            <v-icon left >mdi-plus</v-icon>
                حفظ
              </v-btn>
              <v-btn
                text
                @click="close"
                class="my-2 red"
              >
              <v-icon left>mdi-close</v-icon>
               إلغاء
              </v-btn>
            </v-card-actions>
    </v-card>
</div>
</template>


<script>
import { mapActions,mapGetters,mapMutations } from 'vuex'
import vide from '../store/vider_form'
export default{
    data(){
    return {
      DateNaiss:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

      show:"true",
      tru:true,
      
      
    }

  },

  computed:{
    ...mapGetters(["get_serv_data"]),
    data_part(){
      return this.get_serv_data;
    },
    datap(){
      return this.$store.state.datap;
    }

  },

    methods:{
      ...mapMutations(["add_data"]),
      ...mapActions(["getall_serv_data"]),

       add_data_to_store(){
         this.add_data(this.datap);
        this.$store.state.showForm=false;
        vide.vider_data(this.datap);
      },
      
      close(){
              vide.vider_data(this.datap);
              this.$store.state.showForm=false;

      }

      
    }
}
</script>