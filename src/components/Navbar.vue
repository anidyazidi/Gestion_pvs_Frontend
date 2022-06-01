<template>
<nav>
    <v-app-bar flat dense clipped-right color="dark"  class="nvbar" app height="60px"
    tile>
        <v-app-bar-nav-icon 
           @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
        <v-toolbar-title>
            <v-icon>mdi-gavel</v-icon>
            <span class="font-weight-black text-h5"> نظام تدبير القضايا الزجرية</span>         
        </v-toolbar-title>
        <v-spacer />
         <img  height="45px" style="border-radius:5px;" class="grey lighten-2" :src="require('../assets/mr.png')"/>
         <v-spacer />
        
          <v-spacer></v-spacer>
        <v-btn text @click="logout" class="font-weight-bold text-h8">
            <span>تسجيل الخروج</span>
            <v-icon right>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    
    <v-navigation-drawer clipped right  v-model="drawer" app class="ma-4">
     <v-card flat class="mb-3">
  <v-card-title>
    <v-icon size="75px" class="mx-15">mdi-account-circle-outline</v-icon>
  </v-card-title>
         <v-btn  block
        outlined light active-class="act"
         x-large router to="/compte" 
          class="font-weight-black text-h5"  text>حسابي</v-btn>
  </v-card>
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
          active-class="activ"
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

<style scoped>

.act{
  background: #c1eaf4 !important; 
background: -webkit-linear-gradient(to right, #cde0f9, #c4ebf8) !important; 
background: linear-gradient(to rigsht, #bae8f2, #e9eff0) !important; 
}

.active{
  background: #a3e7f6 !important; 
background: -webkit-linear-gradient(to right, #aceaf5, #6cc7c9) !important; 
background: linear-gradient(to right, #a0d9eb, #78c1d1) !important; 

}
.activ{
  background: #f9c9bc !important; 
background: -webkit-linear-gradient(to right, #fbe5dd, #c4ebf8) !important; 
background: linear-gradient(to rigsht, #cdeef5, #f8f9fa) !important; 
}
.nvbar{

  
background: rgb(0,9,13);
background: -moz-linear-gradient(0deg, rgba(0,9,13,1) 5%, rgba(203,234,248,1) 6%, rgba(190,227,245,1) 28%, rgba(145,212,243,1) 82%);
background: -webkit-linear-gradient(0deg, rgba(0,9,13,1) 5%, rgba(203,234,248,1) 6%, rgba(190,227,245,1) 28%, rgba(145,212,243,1) 82%);
background: linear-gradient(0deg, rgba(0,9,13,1) 5%, rgba(203,234,248,1) 6%, rgba(190,227,245,1) 28%, rgba(145,212,243,1) 82%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00090d",endColorstr="#91d4f3",GradientType=1);

}
.act{
  background: #c1eaf4 !important; 
background: -webkit-linear-gradient(to right, #cde0f9, #c4ebf8) !important; 
background: linear-gradient(to rigsht, #bae8f2, #e9eff0) !important; 
}
</style>