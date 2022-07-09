<template>
<div class="chercher_plaint">
<p class="pa-0 ma-0">إحصائيات التقديم</p>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar lighten class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class=" lightengrey--text text-h6">
         تاريخ تسجيل المحضر</v-toolbar-title></v-toolbar>
    <v-form class="px-5">
          <v-row class="mt-4" dense justify align-content-center no-gutters>
       <v-col
      cols="12"
      sm="4" class="mx-4"
    >
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="date1"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date1"
            prepend-icon="mdi-calendar"
            readonly dense
            label="من"
            v-bind="attrs"
            v-on="on"
            outlined 
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date1"
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
            @click="$refs.menu1.save(date1)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

     <v-col
      cols="12"
      sm="4" class="mx-4"
    >
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="date2"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date2"
            prepend-icon="mdi-calendar"
            readonly
            label="إلى"
            v-bind="attrs"
            v-on="on"
            outlined dense
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date2"
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
            @click="$refs.menu2.save(date2)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
          </v-row>
          <v-row class="ma-0 pa-0" no-gutters>
            <v-col cols="12" sm="4"></v-col>
         <v-card-actions class="ma-0 pa-0">
              <v-btn
                text
               @click="display = !display"
              lighten
              class="mb-2 blue"
              elevation="2"
              height="30px"
               
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              
              </v-card-actions>
               </v-row>
  
    </v-form>
     </v-card>
     <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
    <!-- <app-stpv v-show="display"></app-stpv> --> 


      <v-row class="mt-5" v-show="!loading">
   <v-col cols="13" sm="4">
    <v-card class="elevation-1"
    color="green lighten-3">
      <v-card-title class="text-h6"> المحاضر المعالجة
        <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-check</v-icon>
      </v-card-title>
      
      <v-divider lighten class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ 3 }})
      </span>
      
    </v-card-actions>
    </v-card>
   </v-col>

    <v-col cols="13" sm="4">
    <v-card class="elevation-1" 
    color="orange lighten-3"
    >
      <v-card-title class="text-h6">   المحاضر
              في طور
             المعالجة 
        <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-alert</v-icon>
      </v-card-title>
      
      <v-divider lighten class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ 3 }})
      </span>
      
    </v-card-actions>
    </v-card>
   </v-col>

   <!--- fin stat-->
    <v-col cols="13" sm="4">
    <v-card class="elevation-1"
    color="red lighten-2"
   >
      <v-card-title class="text-h6"> المحاضر 
            غير
             المعالجة
        <v-icon
        class="shrink ma-2"
        contain
        size="30px"
      >mdi-progress-close</v-icon>
      </v-card-title>
      
      <v-divider lighten class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ 9 }})
      </span>
      
    </v-card-actions>
    </v-card>
   </v-col>
  </v-row> 

</div>
</template>

<script>
import statPv from '../../components/stats/statsPv.vue'
export default {
    data(){
        return {
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu2: false, modal2: false,
        display: true,
        loading:false
         
        }
    },

    components:{
      'app-stpv': statPv
    },

    watch: {
      loading () {
        if (this.loading) return  setTimeout(() => (this.loading = false), 2000);
      },
    },

    created(){
      this.loading = true;
    }
}

</script>
