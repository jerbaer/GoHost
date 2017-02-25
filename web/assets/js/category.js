/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Category (idcategory1) {
    this.idcategory = idcategory1;
    this.name = "";
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    
    
    this.retrieveName = function(){
        //get the name of the category from the database
        var url = Category.coreUrl + "category/"+Category.idcategory;
        $.getJSON(url).done(Category.nameFollowUp);
    };
    //Don't know if this chain of functions will work. Need to learn to do
    //things in the same function for this
    this.nameFollowUp  = function(data){
        this.name = data.name;
    };
    this.getName = function(){
        return this.name;
    };

    this.getID = function(){
        return this.idcategory;
    };
    this.retrieveName();
}
