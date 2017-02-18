/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function  Category (idcategory1){
    this.idcategory = idcategory1;
    this.name = ""
    coreUrl = "http://" + window.location.host + "/GoHost/api/";
    function retrieveName(){
        //get the name of the category from the database
        var url = coreUrl + "category?idcategory="+idcategory;
        $.getJSON(url).done(nameFollowUp);
    }
    //Don't know if this chain of functions will work. Need to learn to do
    //things in the same function for this
    function nameFollowUp(data){
        name = data.getName();
    }
    function getName(){
        retrieveName();
        return name;
    }

    function getID(){
        return idcategory;
    }
};
