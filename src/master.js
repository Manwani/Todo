 const Master = (function(){
 const masterArray = [];

 function addToMaster(project){
    masterArray.push(project);
 }

 function removeFromMaster(id){
    masterArray.splice(id,1);
 }

 function getMaster(){
    return masterArray;
 }

 return{
    addToMaster,
    removeFromMaster,
    getMaster,
 }

})();

export default Master;