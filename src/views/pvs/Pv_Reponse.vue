<template>
<div class="chercher_plaint">

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar light class="nvbar mb-3" flat height="34px" app>
       <v-toolbar-title  class=" lightgrey--text text-h6"> بحث عن محضر</v-toolbar-title></v-toolbar>
    <v-form class="px-5">
          <v-row  dense justify align-content-center  no-gutters class="mt-6">
    <v-col cols="12" sm="4">
            <v-select
            class="py-0 ml-15"
            label="نوع المحضر"
            :items="type"
            outlined dense
            >
            </v-select>
          </v-col>
           <v-col cols="12" sm="4">
          <v-text-field
            outlined dense
            label="الرقم"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          
          </v-col>
          </v-row>
          <v-row no-gutters dense>
            <v-col cols="11" sm="4"></v-col>
         <v-card-actions class="ma-0 pa-0">
              <v-btn
                text
               @click="save"
              light
              class="mb-2 blue pl-3"
              height="30px"
              elevation="2"
               
            >
            <v-icon left >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
    </v-row>
    </v-form>
     </v-card>
</div>
</template>

<script>
export default {
    data(){
        return {
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu2: false, modal2: false,
        }
    }
}

</script>
