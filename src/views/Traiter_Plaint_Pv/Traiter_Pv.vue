<template>
<div class="traiter_plaint">
<h2 class="subheading grey--text">تدبير المحضر</h2>


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
    <div class="font-weight-bold darkgrey--text mx-15">تاريخ تسجيل المحضر من</div>
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

     <v-col
      cols="12"
      sm="4"
    >
    <div class="font-weight-bold darkgrey--text mx-15">إلى</div>
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
          <v-text-field dense
            v-model="date2"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
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
     <v-col cols="12" sm="4">
            <div class="font-weight-bold darkgrey--text mx-15">نوع المحضر</div>
            <v-select
            class="py-0 mx-15"
            :items="type"
            outlined dense
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6"></v-col>
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
    </v-form>
    
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
  </form> </v-card></v-card>
</div>
</template>

<script>

export default {
    data(){
        return {
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false, modal1: false, menu2: false, modal2: false,menu3: false, modal3: false,
        singleSelect: false,
        selected: [],
         represantant: ['rep1', '2rep','r1ep','ts1','t5'],
        active: false,
        headers: [
          {
            text: 'رقم المحضر',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'نوع المحضر', value: 'type_pv',sortable: false, },
          { text: 'رقم محضر الضابطة القضائية', value: 'type_pv', sortable: false,},
          { text: 'تاريخ التسجيل', value: 'date_enreg', sortable: false,},
          { text: 'موضوع المحضر', value: 'sujet_pv' ,sortable: false,},
          { text: 'المصدر', value: 'source_pv' ,sortable: false,},
        ],
        pvs: [
          {
            name: '2015/880/2021',
            num_pv: 10,
            type_pv: 'plaint',
            num_pv_police_judi: 'police',
            date_enreg: '12/05/2021',
            sujet_pv: 'arson',
            source_pv: 'local'
          },
        ],
      }
    },
    }

</script>

<style scoped>


</style>