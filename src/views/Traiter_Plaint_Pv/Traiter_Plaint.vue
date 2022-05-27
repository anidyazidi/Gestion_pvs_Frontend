<template>
<div class="traiter_plaint">
<h2 class="subheading grey--text">تدبير شكاية</h2>


 <v-spacer></v-spacer>
     <v-card elevation="2"
  outlined  class="mx-auto my-auto"
     >
     <v-toolbar class="blue-grey darken-1 mb-3" flat height="45px" app></v-toolbar>
    <v-form class="px-5">
          <v-row>
       <v-col
      cols="12"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ تسجيل الشكاية</div>
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
          <v-text-field dense
            v-model="date1"
            prepend-icon="mdi-calendar"
            readonly
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
<v-col cols="12" sm="2"></v-col>
           <v-card-actions>
              <v-btn
                text
               @click="active = !active"
              dark
              class="my-2 blue font-weight-bold"
              elevation="2"
            >
            <v-icon right >mdi-magnify</v-icon>             
               بحث
              </v-btn>
              
              </v-card-actions>
              
    </v-row>
    <v-card flat class="ma-2" v-show="active"><form>
    <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :single-select="singleSelect"
    item-key="name" no-data-text="معلومات غير متاحة"
    show-select hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="إختيار وحيد"
        class="pa-3"
      ></v-switch>
    </template>
  </v-data-table>
  <v-row><v-col cols="12" sm="3">
   <div class="font-weight-bold darkgrey--text mx-15">ممثل النيابة</div>
          <v-autocomplete
            ref="ممثل النيابة"
            v-model="represantant"
            :rules="[() => !!represantant || 'المرجوا ملأ هذا الحقل']"
            :items="represantant"
            label="represantant"
            placeholder="مساعدة في البحث"
            required single-line
            outlined dense
          ></v-autocomplete></v-col>
          <v-col cols="12" sm="4">
           <div class="font-weight-bold darkgrey--text mx-15">تاريخ الاحالة</div>
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        :return-value.sync="date3"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense
            v-model="date3"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date3"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu3 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu3.save(date3)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      </v-col>
       <v-col cols="12" sm="6"></v-col>
           <v-card-actions>
              <v-btn
                text
               @click="save"
              dark
              class="my-2 green darken-1 font-weight-black"
              elevation="2"
               
            >
            <v-icon right >mdi-note-check-outline</v-icon>             
              إضافة
              </v-btn>
              
              </v-card-actions>
      </v-row>
  </form> </v-card>
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
    singleSelect: false,
        selected: [],
         represantant: ['rep1', '2rep','r1ep','ts1','t5'],
        active: false,
        headers: [
          {
            text: 'مرجع الشكاية',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'نوع الشكاية', value: 'type_plaint',sortable: false, },
          { text: 'مصدر الشكاية', value: 'source_pl', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'date_enreg', sortable: false,},
          { text: 'موضوع المحضر', value: 'sujet_pl' ,sortable: false,},
        ],
        plaint: [
          {
            name: '320',
          type_plaint:'typ2',
          source_pl: 'src2',
          date_enreg:"2022-08-02",
          sujetPlaints:"sujet2"
          },
        ],
       }}}

</script>


