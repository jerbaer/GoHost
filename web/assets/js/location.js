/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function  Location (idlocation1){
    this.idlocation = idlocation1;
    this.name = this.getName();
    coreUrl = "http://" + window.location.host + "/GoHost/api/";
    function getName(){
        //get the name of the category from the database
        var url = coreUrl + "location?idlocation="+idlocation;
        $.getJSON(url).done(nameFollowUp);
    }
    function nameFollowUp(data){
        return data.name;
    }
    function getID(){
        return idlocation;
    }
};
