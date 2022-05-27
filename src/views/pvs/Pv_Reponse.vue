<template>
<div class="chercher_plaint">
<h2 class="subheading grey--text">بحث عن محضر</h2>

 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar dark class="blue-grey darken-1 mb-3" flat height="45px" app>بحث</v-toolbar>
    <v-form class="px-5">
          <v-row>
    <v-col cols="12" sm="4">
            <div class="font-weight-bold darkgrey--text mx-15">نوع المحضر</div>
            <v-select
            class="py-0 mx-15"
            :items="type"
            outlined dense
            >
            </v-select>
          </v-col>
           <v-col cols="12" sm="4">
            <div class="font-weight-bold darkgrey--text mx-15">الرقم</div>
          <v-text-field
            outlined dense
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          </v-col>
         <v-card-actions>
              <v-col cols="12" sm="5" class="mr-15">
              <v-btn
                text
               @click="save"
              dark
              class="my-2 blue"
              elevation="2"
               
            >
            <v-icon left >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              </v-col>
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
