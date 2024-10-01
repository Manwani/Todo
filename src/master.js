 const Master = (function(){
 const masterArray = [];
 let currentMasterElement;

 function addToMaster(project){
    masterArray.push(project);
 }

 function removeFromMaster(id){
    masterArray.splice(id,1);
 }

 function getMaster(){
    return masterArray;
 }

 function setCurrentMasterElement(id){
   currentMasterElement = masterArray[id];
 }

 function getCurrentMasterElement(){
   if(!currentMasterElement){
      return masterArray[0];
   }
   return currentMasterElement;
 }

 return{
    addToMaster,
    removeFromMaster,
    getMaster,
    setCurrentMasterElement,
    getCurrentMasterElement,
 }

})();

export default Master;