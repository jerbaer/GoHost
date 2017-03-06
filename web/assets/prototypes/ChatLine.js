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
    this.messageID = 0;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    
    this.create = function (content, iduser, idevent, timesent) {
        var event = {content: content, iduser: iduser, idevent: idevent, timesent: timesent};
        $.ajax({
            url: this.coreUrl + "event",
            type: 'post',
            data: JSON.stringify(event),
            contentType: 'application/json',
            dataType: 'json',
            context: this,
            async: false,
            success: this.createFollowUp2
        });
    };
    
    this.createFollowUp = function (data){
        this.messageID = parseInt(data.idevent);
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
        this.messageID = data.idmessage;
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
    
    this.getID = function () {
        return this.messageID;
    }
}
