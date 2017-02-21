/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Category = {
    idcategory : 0,
    name : "",
    coreUrl : "http://143.44.67.0:13774/GoHost/api/",
    create: function(idcategory1){
               Category.idcategory = idcategory1;
               Category.retrieveName();
    },
    retrieveName: function(){
        //get the name of the category from the database
        var url = Category.coreUrl + "category/"+Category.idcategory;
        $.getJSON(url).done(Category.nameFollowUp);
    },
    //Don't know if this chain of functions will work. Need to learn to do
    //things in the same function for this
    nameFollowUp : function(data){
        Category.name = data.name;
    },
    getName: function(){
        return Category.name;
    },

    getID: function(){
        return Category.idcategory;
    }
};
