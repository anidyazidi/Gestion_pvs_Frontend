class vide { 
    static vider_data(datap){
      {
          datap.PersonneMoraleID= {id:null,nom:""};
          datap.TypeCarteIdentsID= null;
          datap.SituationFamillID= null;
          datap.VilleDeNaissID= null;
          datap.paysID= null;
          datap.ProvinceID= null;
          datap.nationaliteID= null;
  
          datap.soi= true;
          datap.morale= true;
          datap.genreID= {id:null,nom:""};
          datap.minor=false;
          datap.nom= "";
          datap.prenom= "";
          datap.NumCarte= "";
          datap.NomDePere= "";
          datap.FilsDe= "";
          datap.NomDeMere= "";
          datap.FilleDe= "";
  
          datap.LieuNaiss= "";
          datap.address= "";
  
          datap.Profession= "";
          datap.LieuDeTravail= "";
          datap.NumFinan= "";
          datap.DateNaiss= ""
        }
  }
   static vider_plaint(plaint){
          plaint.contreInconnu=false;
          plaint.TypePlaintID=0;
          plaint.SourcePlaintID= 0;
          plaint.referencePlaints="";
          plaint.datePlaints="";
          plaint.dateEnregPlaints="";
          plaint.dateFaits="";
          plaint.EmplaceFaits="";
          plaint.sujetPlaints="";
  }

  static vider_pv(pv){
        
      pv.typepvsID= null,
      pv.sujetpvs= "",
      pv.dateEnregPvs= "",
      pv.policeJudics= "",

      pv.TypeSourcePvsID= null,
      pv.typePoliceJudicID=null,
      pv.numEnvoi="",
      pv.datePvs="",
      pv.heureRealisation="",
      pv.contreInnconue=false
  }
  }
  export default vide
  