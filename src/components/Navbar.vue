<template>
<nav>
    <v-app-bar flat dense clipped-right class="nvbar" app height="52px"
    >
        <v-app-bar-nav-icon 
           @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
        <v-toolbar-title>
            <v-icon>mdi-gavel</v-icon>
            <span class=" text-h6"> نظام تدبير القضايا الزجرية</span>         
        </v-toolbar-title>
        <v-spacer/>
         <img  height="45px" style="border-radius:5px;"  :src="require('../assets/taj.png')"/>
         <v-spacer/>
        
    <v-btn text @click="logout" class="text-h8">
            <span>تسجيل الخروج</span>
            <v-icon right>mdi-logout</v-icon>
        </v-btn> 
      
        
    </v-app-bar>
    
    <v-navigation-drawer clipped right  v-model="drawer" app class="ma-4 rounded-lg">

     <v-card flat class="pa-0 ma-0 ">
    <router-link to="/Compte" style="text-decoration:none;" class="pa-0 ma-0">
      <v-icon size="60px"  color="grey darken-3" class="mx-16 pr-6">
       mdi-account-circle-outline
       </v-icon>
       </router-link>        
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
        <template v-slot:activator>
           <v-list-item-content>
        <v-list-item-title   class="font-weight-bold darkgrey--text text-h6" v-text="item.title">
         </v-list-item-title>
           </v-list-item-content> 
        </template>
        <v-list-item  dense 
          v-for="child in item.items"
          :key="child.title"
          :prepend-icon="child.icon" 
          router :to="child.route"
        >
            <v-list-title-action>
              <v-icon right>{{ child.icon }}</v-icon>
            </v-list-title-action>
          <v-list-item-content>
           <v-list-item-title
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
              <v-btn class="red darken-1" dark text @click="dialoglogout=false">إلغاء</v-btn>
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
          {icon: 'mdi-account-edit', title: 'إنشاء حساب' ,route:'/newCompte'},

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
          affich:this.$store.state.showNavBar_role.dash_vie,//pour le test
        }
      ],
        }
    },

    methods:{
      logout(){
      this.dialoglogout=false;
      window.history.go(-(window.history.length-1));
       window.location.href="http://localhost:8080/";
       localStorage.removeItem(token);
       
      // window.history.back();
      //window.location.replace('');
   }
    }
}
</script>

<style scoped>
/* 
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
background: rgb(0,255,239);
background: radial-gradient(circle, rgba(0,255,239,1) 0%, rgba(1,240,246,1) 0%, rgba(0,197,247,1) 99%, rgba(0,255,247,1) 100%, rgba(46,33,145,1) 100%);
}
.act{
  background: #c1eaf4 !important; 
background: -webkit-linear-gradient(to right, #cde0f9, #c4ebf8) !important; 
background: linear-gradient(to rigsht, #bae8f2, #e9eff0) !important; 
}

.drawer{
background: rgb(0,226,248);
background: linear-gradient(131deg, rgba(0,226,248,1) 0%, rgba(255,255,255,1) 100%, rgba(165,243,255,1) 100%);
} */
</style>