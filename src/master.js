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

 function getMasterElement(id){
   return masterArray[id];
 }

 return{
    addToMaster,
    removeFromMaster,
    getMaster,
    getMasterElement,
 }

})();

export default Master;