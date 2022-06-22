<template>
<div class="data_partie">
    <v-card class="mt-3" flat>
      <v-toolbar
        flat dark class="nvbar mb-3" height="34px" app
      ><v-icon right>mdi-account-plus</v-icon>
       <v-toolbar-title  class=" darkgrey--text text-h6">طرف الشكاية</v-toolbar-title></v-toolbar>
      
      <v-row  dense justify align-content-center no-gutters class="ma-0 pa-0">
        <v-col cols="12" sm="6">
        <v-radio-group
        v-model="datap.soi"
        class=""
      row
    >
      <v-radio
        label="شخص ذاتي" 
        :value="tru"
      ></v-radio>
      <v-radio
        label="شخص معنوي" 
        :value="!tru"
      ></v-radio>
    </v-radio-group>
    </v-col>
   
    
    <v-col cols="12" sm="3">
            
            <v-select
            v-model="datap.PersonneMoraleID.id"
            :items="data_part[0]"
            item-text="nom"
            item-value="id"
            class="py-0 mt-3"
            outlined dense
            label="صفته"
            >
            </v-select>
          </v-col>
 </v-row>
          <v-row no-gutters>
          <v-col cols="12" sm="3">
        <v-radio-group
      v-model="datap.genreID.id"
      row
    >
      <v-radio
        label="السيد"
        value="1"
        class="mt-0"
      ></v-radio>
      <v-radio
        label="السيدة"
        value="2"
        class="mt-0"
      ></v-radio>
    </v-radio-group>
    </v-col>
     <v-col cols="12" sm="9">
            <v-checkbox
            v-model="datap.minor"
            :value="tru"
            label="حدث"
            color="red darken-4"
            >
            </v-checkbox>
           </v-col>
          <v-col cols="12" sm="3">

            <v-text-field
            v-model="datap.nom"
             dense
            class="py-0 px-4" 
            outlined
            label="الاسم العائلي"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
            v-model="datap.prenom"
             dense
            class="py-0 px-4" outlined
            label="الاسم الشخصي"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            
            <v-select
            v-model="datap.TypeCarteIdentsID"
            :items="data_part[1]"
            item-text="nom"
            item-value="id"
             dense
             label="نوع وثيقةالتعريف"
            class="py-0 px-4" outlined
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
            v-model="datap.NumCarte"
             outlined dense
            label="رقم وثيقةالتعريف"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field dense
            v-model="datap.NomDePere"
             outlined
            label="اسم الأب"
            class="py-0 px-4">
            </v-text-field>
          </v-col>

           <v-col cols="12" sm="3">
            <v-text-field dense
            v-model="datap.FilsDe"
             outlined
            label="إبن"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
           <v-col cols="12" sm="3">
            <v-text-field dense
            v-model="datap.NomDeMere"
             outlined
            label="اسم الأم"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field dense
             v-model="datap.FilleDe"
             outlined
            label="بنت"
            class="py-0 px-4">
            </v-text-field>
          </v-col>

           <v-col cols="12" sm="3">
            <v-select
            v-model="datap.SituationFamillID"
            :items="data_part[2]"
            item-text="nom"
            item-value="id"
             outlined
             label="الحالةالعائلية"
            class="py-0 px-4" dense
            >
            </v-select>

          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field dense
             v-model="datap.Profession"
             outlined
            label="المهنة"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
         
          <v-col cols="12" sm="3">
            <v-text-field dense
             v-model="datap.LieuDeTravail"
             outlined
            label="مقرالعمل"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field dense
             v-model="datap.NumFinan"
             outlined
            label="الرقم المالي"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          
           <v-col cols="12" sm="3"
    >
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
            prepend-inner-icon="mdi-calendar"
            readonly outlined
            label="تاريخ الإزدياد"
            v-bind="attrs"
            v-on="on"
            class="py-0 pl-4 mr-4"
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
            <v-text-field dense
            v-model="datap.LieuNaiss"
             outlined
            label="مكانالإزدياد"
            class="py-0 px-4">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            
            <v-select dense
            v-model="datap.nationaliteID"
            :items="data_part[4]"
            item-text="nom"
            item-value="id"
            label="الجنسية"
             outlined
            class="py-0 px-4"
            >
            </v-select>
          </v-col>
        <v-col cols="12" sm="3">
            
            <v-select dense
           v-model="datap.paysID"
            :items="data_part[5]"
            label="البلد"
            item-text="nom"
            item-value="id" outlined
            class="py-0 px-4"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3">
            
            <v-select dense
            v-model="datap.ProvinceID"
            :items="data_part[6]" 
            label="المدينة (العمالة)"
            item-text="nom"
            item-value="id" outlined
            class="py-0 px-4"
            >
            </v-select>
          </v-col>
         <v-col cols="12" sm="6">
            <v-text-field dense
            v-model="datap.address"
            label="العنوان"
             outlined
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