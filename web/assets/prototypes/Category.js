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
        var url = this.coreUrl + "category/"+this.idcategory;
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.nameFollowUp
        });
    };
    this.nameFollowUp  = function(data){
        this.name = data.name;
    };

    this.getID = function(){
        return this.idcategory;
    };
    
    this.getName = function(){
        return this.name;
    };
}
