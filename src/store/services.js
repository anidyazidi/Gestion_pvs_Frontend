function nomOf(id,arrayObjet){
    let i;
    for(i=0;i<arrayObjet.length;i++){
        if(arrayObjet[i].id == id){
            return arrayObjet[i].nom;
        }
    }
}
function ExtraireIdFromObjet(){

}
export default nomOf;
