/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function  Location (idlocation1){
    this.idlocation = idlocation1;
    this.name = this.getName();
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    this.getName = function(){
        //get the name of the category from the database
        var url = this.coreUrl + "location?idlocation="+this.idlocation;
        $.getJSON(url).done(this.nameFollowUp);
    };
    this.nameFollowUp = function(data){
        return data.name;
    };
    this.getID = function(){
        return this.idlocation;
    };
}
