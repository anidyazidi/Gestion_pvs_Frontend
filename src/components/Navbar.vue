<template>
<nav>
    <v-app-bar flat dense clipped-right dark  class="aliceblue" app height="60px"
    tile>
        <v-app-bar-nav-icon class="font-weight-bold"
           @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
        <v-toolbar-title>
            <v-icon>mdi-gavel</v-icon>
            <span class="font-weight-light text--darken-4"> نظام تدبير القضايا الزجرية</span>         
        </v-toolbar-title>
        <v-spacer />
         <img  height="45px" style="border-radius:5px;" class="grey lighten-2" :src="require('../assets/mr.png')"/>
         <v-spacer />
        <v-btn @click="logout" class="font-weight-bold">
            <span>تسجيل الخروج</span>
            <v-icon right>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    
    <v-navigation-drawer clipped right  v-model="drawer" app class="ma-4">
       <v-toolbar dark class="blue-grey darken-1 mb-3" flat app>
  </v-toolbar>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action active-class="active"
       v-show="item.affich" 
      >
        <template v-slot:activator >
           <v-list-item-content  >
        <v-list-item-title   class="font-weight-bold darkgrey--text text-h6" v-text="item.title">
         </v-list-item-title> 
           </v-list-item-content> 
        </template>
        <v-list-item  
          v-for="child in item.items"
          :key="child.title"
          :prepend-icon="child.icon" 

          router :to="child.route"
        >
            <v-list-title-action>
              <v-icon right>{{ child.icon }}</v-icon>
            </v-list-title-action>
          <v-list-item-content>
           <v-list-item-title class="font-weight-bold darkgrey--text text-h7"
         v-text="child.title">
        </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>


    <v-dialog v-model="dialoglogout" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">هل ان متأكد من هذه العملية</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="red darken-1" dark text @click="closelogout">إلغاء</v-btn>
              <v-btn class="blue darken-3"
              :loading="load_pop_delete"
               dark text @click="logoutConfirm">نعم</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
</nav>

</template>
<script>
export default{
    data() {
        return {
            drawer: false,
            dialoglogout:false,
            items: [
        {
          action: 'mdi-scale-balance',
          active: true,
          items: [
                  {icon: 'mdi-note-plus',title: 'إضافة شكاية',route:'/Plaint/Ajout' },               
                  {icon: 'mdi-note-search', title: 'بحث عن شكاية' ,route:'/Plaint/Chercher'},
                 ],
          title: 'شكاية',
          affich:this.$store.state.showNavBar_role.plaints,
        },
        {
          action: 'mdi-bank-plus',
          items: [
            {icon: 'mdi-plus', title: 'إضافة محضر',route:'/Pv/Ajout' },
            {icon: 'mdi-magnify', title: 'بحث عن محضر' ,route:'/Pv/Cherche'},
            {icon: 'mdi-directions-fork', title: 'المحاضر الجوابية' ,route:'/Pv/PvReponse' },
           
          ],
          title: 'المحاضر',
          affich:this.$store.state.showNavBar_role.pvs,

        },
        {
          action: 'mdi-cog-sync',
          items: [
             {icon: 'mdi-cog-sync-outline', title: 'تدبير الشكايات' ,route:'/Traite/TraiterPlaint'},
            {icon: 'mdi-cog-sync-outline', title: 'تدبير المحاضر' ,route:'/Traite/TraiterPv'},
           
          ],
          title: 'الإحالات',
           affich:this.$store.state.showNavBar_role.mission,         

        },
        {
          action: 'mdi-poll',
          items: [
             {icon: 'mdi-archive-sync', title: 'الشكايات' ,route:'/stat/plaint'},
            {icon: 'mdi-archive-search-outline', title: 'المحاضر' ,route:'/stat/pv'},
           
          ],
          title: 'إحصائيات',
           affich:this.$store.state.showNavBar_role.statistique,
        },
        {
          action: 'mdi-account-cog',
           items: [
          {icon: 'mdi-account-edit', title: 'نشاطات' ,route:'/gestUser'},
          ],
          title: 'الحسابات',
           affich:this.$store.state.showNavBar_role.comptes,
        },
        {
          action: 'mdi-shield-star',
           items: [
              {icon: 'mdi-account-edit', title: 'المحاضر' ,route:'/vicePvs'},
              {icon: 'mdi-account-edit', title: 'الشكايات' ,route:'/vicePlaint'},
         
          ],
          title: 'الانابات',
          affich:this.$store.state.showNavBar_role.statistique,//pour le test
        }
      ],
        }
    },

    methods:{
      logout(){
      this.dialoglogout=false;
       window.history.back();
      window.location.replace('http://192.168.43.119:8082/');
    
   }
    }
}
</script>

<style>
.active{
  background: #00d2ff !important; 
background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff) !important; 
background: linear-gradient(to right, #3a7bd5, #00d2ff) !important; 

}
.nvbar{


background: rgb(52,52,54);
background: -moz-linear-gradient(139deg, rgba(52,52,54,1) 0%, rgba(106,94,80,1) 99%);
background: -webkit-linear-gradient(139deg, rgba(52,52,54,1) 0%, rgba(106,94,80,1) 99%);
background: linear-gradient(139deg, rgba(52,52,54,1) 0%, rgba(106,94,80,1) 99%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#343436",endColorstr="#6a5e50",GradientType=1);


}

</style>
