<template>
    <div>
        <v-row justify="space-between" no-gutters>
            <v-col cols="12" sm="4">
        <v-card
    class="mx-5 mt-10 elevation-10"
    color="green lighten-1"
    dark
    style="max-width: 5000px;"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="8">
        <v-card-title>
          <div>
            <div class="text-h6 mt-6">
              الشكايات المعالجة
            </div>
          </div>
        </v-card-title>
      </v-col>
      <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-check</v-icon>
    </v-row>
    <v-divider dark class="mt-2"></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ traite }})
      </span>
      
    </v-card-actions>
  </v-card></v-col>
  
  <v-col cols="12" sm="4">
  <v-card
    class="mx-15 mt-15 elevation-10"
    color="orange lighten-1"
    dark
    style="max-width: 300px;"
  >
    <v-row justify="space-between">
      <v-col cols="8">
        <v-card-title>
          <div>
            <div class="text-h6">
              الشكايات
              في طور
             المعالجة
            </div>
          </div>
        </v-card-title>
      </v-col>
      <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-alert</v-icon>
    </v-row>
    <v-divider dark></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{  nontraite }})
      </span>
      
    </v-card-actions>
  </v-card></v-col>
  <v-col cols="12" sm="4">
  <v-card
    class="mx-15 mt-15 elevation-10"
    color="red lighten-1"
    dark
    style="max-width: 300px;"
  >
    <v-row justify="space-between">
      <v-col cols="8">
        <v-card-title>
          <div>
            <div class="text-h6">
             الشكايات 
            &nbsp; &nbsp;غير&nbsp;
             المعالجة
            </div>
          </div>
        </v-card-title>
      </v-col>
      <v-icon
        class="shrink ma-2"
        contain
        size="35px"
        style="flex-basis: 65px"
      >mdi-progress-close</v-icon>
    </v-row>
    <v-divider dark></v-divider>
    <v-card-actions class="text-h6 pa-4">
      العدد الاجمالي
      <v-spacer></v-spacer>
      <span class="text-h6 ml-10">
        ({{ traite }})
      </span>
      
    </v-card-actions>
  </v-card></v-col>
  </v-row>
  <v-card class="mt-5">
  <div>
    <v-data-table
    :headers="headers"
    :items="plaint" no-data-text="معلومات غير متاحة"
     class="elevation-1 font-weight-black"
    hide-default-footer
    :loading="table_vide"
     loading-text="إنتظر قليلا"
    >
    </v-data-table>
  </div>
  <div class="text-center">
    <v-pagination
    v-model="pagination.current"
    :length="pagination.total"
    @input="onPageChange"
></v-pagination>
    </div>
    
     </v-card>
    
    </div>
</template>

<script>
  export default {
    data: () => ({
      traite: 4,
      nontraite: 10,
      encoretrt: 6,
    

    traiteds:{},
    load:false,
          table_vide:true,
        headers: [
          { text: 'نوع الشكاية', value: 'TypePlaintID' },
          { text: 'مصدر الشكاية', value: 'SourcePlaintID' },
          { text: 'تاريخ تسجيل الشكاية', value: 'dateEnregPlaints' },
          { text: 'موضوع الشكاية', value: 'sujetPlaints' },
          { text: 'معالجة؟', value: 'trait' },
        ],
        plaint: [],
        cherchant:"100",
            pagination: {
                current: 1,
                total: 0
            }
    }),
  }
</script>
