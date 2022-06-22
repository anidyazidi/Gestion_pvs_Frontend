
function rempli_nom(data,serv_data){
    var moraleID = serv_data[0];
   
    var i;
    for(i=0;i<moraleID.length;i++){
        if(data.PersonneMoraleID.id == moraleID[i].id)
        data.PersonneMoraleID.nom = moraleID[i].nom;
    }
    if(data.genreID.id == 1){ data.genreID.nom = "سيد" }
    if(data.genreID.id == 2){ data.genreID.nom = "سيدة" }

    return data;
       /* TypeCarteIdentsID
        SituationFamillID
        VilleDeNaissID
        paysID
        ProvinceID
        nationaliteID
        genreID*/
   
}
export default rempli_nom;