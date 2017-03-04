/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ChatLine () {
    this.parent = null;
    this.user = null;
    this.text = "";
    this.time = "";
    
    this.create = function () {
        
    };
    
    this.createFollowUp = function (data){
        
    };
    
    this.createFromDB = function (idmessage, user){
        var url = this.coreUrl + "event/" + idmessage;
        this.user = user;
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.createFollowUp
        });
    };
    
    this.createFromDBFollowUp = function (data) {
        this.parent = new Event();
        this.parent.createFromDB(data.idevent);
        this.text = data.content;
        this.time = data.timesent;
    };
    
    this.getParent = function () {
        return this.parent;
    };
    
    this.getUser = function () {
        return this.user;
    };
    
    this.getText = function () {
        return this.text;
    };
    
    this.getTime = function () {
        return this.time;
    };
    
    
}
