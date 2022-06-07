import  axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import nomOf from './services'
import vide from './vider_form'
//import axios from 'axios'

Vue.use(Vuex)

// Create a new store instance.
const store = new Vuex.Store({
  state () {
    return {
      datap:{
        PersonneMoraleID: null,
        TypeCarteIdentsID: null,
        SituationFamillID: null,
        VilleDeNaissID: null,
        paysID: null,
        ProvinceID: null,
        nationaliteID: null,

        soi: false,
        morale: false,
        genreID: null,
        minor:false,
        nom: "",
        prenom: "",
        NumCarte: "",
        NomDePere: "",
        FilsDe: "",
        NomDeMere: "",
        FilleDe: "",

        LieuNaiss: "",
        address: "",

        Profession: "",
        LieuDeTravail: "",
        NumFinan: "",
        DateNaiss: "",
      },
      //data of user 
      user : {},
      //vice proc pour le service des mission
      viceProc:[],
      //authentification
      showNavBar_role:{
        plaints:true,
        pvs:true,
        mission:true,
        statistique:true,
        comptes:true,
        dash_vie:true
      },
      // snackbar qu'est affiche tous les resultat
      snackbar:{   
        timeout:null, 
        value:false,
        text:"",
      },
      //data of services plaints
      serv_plaint:[],
      plaint:{},
      

      // data partie
        datapartie:[],
        editedIndex:-1,
        editedItem:{},
          // data parties qu'est stocker dans la base de donnee
      datapartielocal:[], //les done qui avoir user lorsque add datapartie
      serv_data:[],   //les donne de select pour data_partie
      showForm:false, //pour afficher components de datapartie

      //data of services pvs
      serv_pvs:[],
      pv:{},

    }
  },
  getters:{ 
    //snackbar
    getsnackbar:state=>{ return state.snackbar;},

    // getters pour service plaints
    getServ_plaint:state=>{ return state.serv_plaint; },

    // getters pour services data partie
    getalldata:state=>{
      //return state.datapartielocal;
      return state.datapartie;
      
    },
    get_serv_data:state=>{
      return state.serv_data;
    },
    get_show_form:state=>{return state.showForm;},

     //////-------------------PVs---------------------------\\\\\\\\\\\\\\\\
    getServ_pvs:state=>{
      return state.serv_pvs;
    }
  },

  mutations:{
    
    //snackbar
    openSnackbar:(state,msg,colors)=>{
      state.snackbar.value=true;
      state.snackbar.text = msg;
     
   },
      closeSnackbar:(state)=>{state.snackbar.value=false;},

    //mutation  plaint
   
      add_serv_plaint:(state,data_plaint)=>{
        state.serv_plaint.push(data_plaint);
      },

  // mutation of DATA PARTIE
     delete_one_data:(state)=>{state.datapartie.splice(state.editedIndex, 1);
                                 state.editedIndex = -1
                                 vide.vider_data(state.datap)},
      add_data:(state,data)=> {
        if(state.editedIndex > -1){
         Object.assign(state.datapartie[state.editedIndex],data)
         state.editedIndex = -1
        }else{
           state.datapartie.push(Object.assign({}, data));
           
        }
        
      },
      //show formulaire data partie
      show_form:state=>{state.showForm = !state.showForm},
      
  },
  actions:{
    async getviceProc(){
      var token = localStorage.getItem("token");
      const response = await axios.get('http://127.0.0.1:8000/api/users/viceProc',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });  
      this.state.viceProc = response.data;
      return response;
    },
    //********************** ACTION API POUR PLAINT **********************//
     // close snackbar
   
    // apis qui recuperer les donnee initial
    async servall_plaint({commit}){
      try{
        var token = localStorage.getItem("token");
      const response1 = await axios.get('http://127.0.0.1:8000/api/plaint/source/index',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });  commit('add_serv_plaint',response1.data);

      const response2 = await axios.get('http://127.0.0.1:8000/api/plaint/type/index',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });   commit('add_serv_plaint',response2.data);
    
    }catch(err){
      console.log(err);
    }
  },

    async addplaint({commit},newplaint){
      console.log(this.state.plaint)
      let token = localStorage.getItem("token");
      const response = await axios.post('http://127.0.0.1:8000/api/plaint/store',{
              plaint:newplaint,
              datapart:this.state.datapartie
         },{headers:
          { Authorization:`Bearer ${token}`} 
        }).catch(er =>{
          console.log(er);
           return er;
          });
          //this.state.datapartie.splice(0,this.state.datapartie.length);
          return response; 
    },

    //****************ACTION API POUR DATA PARTIE *****************//
    async getall_serv_data(){
      try{
        var token = localStorage.getItem("token");
      const morale = await axios.get('http://127.0.0.1:8000/api/dataparties/pMorale/index',{
            headers:{
               Authorization:`Bearer ${token}`
              }
         });
         this.state.serv_data.push(morale.data);
         const typecart = await axios.get('http://127.0.0.1:8000/api/dataparties/typecarte/index',{
          headers:{
            Authorization:`Bearer ${token}`
           }
      });
          this.state.serv_data.push(typecart.data);

         const sitfam = await axios.get('http://127.0.0.1:8000/api/dataparties/sitfamille/index',{
          headers:{
            Authorization:`Bearer ${token}`
           }
      });  this.state.serv_data.push(sitfam.data);

         const ville = await axios.get('http://127.0.0.1:8000/api/dataparties/ville/index',{
          headers:{
            Authorization:`Bearer ${token}`
           }
      }); this.state.serv_data.push(ville.data);

         const nation = await axios.get('http://127.0.0.1:8000/api/dataparties/nation/index',{
          headers:{
            Authorization:`Bearer ${token}`
           }
      }); this.state.serv_data.push(nation.data);

         const pays = await axios.get('http://127.0.0.1:8000/api/dataparties/pays/index',{
          headers:{
            Authorization:`Bearer ${token}`
           }
      }); this.state.serv_data.push(pays.data);

         const province = await axios.get('http://127.0.0.1:8000/api/dataparties/province/index',{
          headers:{
            Authorization:`Bearer ${token}`
           }
      }); this.state.serv_data.push(province.data);
         console.log('complete 200');
         return {status:200};
        }catch(err){
          console.log("errrr: "+err);
          return err.status;
        }
    },

      ////////////////////////---------------PVs-------------------------\\\\\\\\\\\\\\\
      async addpv({commit},newpv){
        let token = localStorage.getItem("token");
        const response = await axios.post('http://127.0.0.1:8000/api/pvs/store',{
          pv:newpv,
          datapart:this.state.datapartie
        },{headers:
          {Authorization: `Bearer ${token}`}
        }).catch(er=>{
          return er;
        })
           this.state.datapartie.splice(0,this.state.datapartie.length);
          return response;
      },

      async servall_pvs(){
        try{
          var token = localStorage.getItem("token");
          const alltype = await axios.get('http://127.0.0.1:8000/api/pvs/type/index',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          });  

           const alltypesource = await axios.get('http://127.0.0.1:8000/api/pvs/typesource/index',{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });    

        const alltypepolice = await axios.get('http://127.0.0.1:8000/api/pvs/typepolice/index',{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });  
        
        this.state.serv_pvs.push(alltypesource.data);
        this.state.serv_pvs.push(alltypepolice.data);
        this.state.serv_pvs.push(alltype.data);

        return alltypepolice;
          }catch(err){
            console.log("errrr: "+err);
            return err;
          }
        }
  }
});



export default store