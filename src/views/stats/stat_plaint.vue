<template>
<div class="chercher_plaint">
<h2 class="subheading dark--text mb-4">إحصائيات التقديم</h2>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">
         تاريخ تسجيل الشكاية</v-toolbar-title></v-toolbar>
    <v-form class="px-5">
          <v-row  dense justify align-content-center>
       <v-col
      cols="12"
      sm="4" class="mx-4"
    >
    <div class="font-weight-bold darkgrey--text">من</div>
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
    <div class="font-weight-bold darkgrey--text">إلى</div>
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
          <v-col cols="12" sm="5"></v-col>
         <v-card-actions>
              <v-btn
                text
               @click="display = !display"
              dark
              class="my-2 blue"
              elevation="2"
               
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
             
              
              </v-card-actions>
    </v-row>
    </v-form>
     </v-card>
     <app-statpl v-show="display"></app-statpl>
</div>
</template>

<script>
import statPl from '../../components/stats/statsPlaint.vue'
export default {
    data(){
        return {
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu2: false, modal2: false,
        display: false,
        }
    },
    components:{
      'app-statpl':statPl,
    }
}

</script>
