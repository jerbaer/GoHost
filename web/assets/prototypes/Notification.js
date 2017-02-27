/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//read: this will be a field that denotes sth completely different
//This will denote whether the notitification is a request or not
//(0: request, 1: not request)
//status: This is a dummy field that I don't really need rn
//I will be defaulting this to 0. I can use this for sth else 
//If I need to
//from: this will have the id of the user who sent the notification
//it will be 0 if the notification is from the system.
function Notification(){
    this.idnotification = 0;
    this.iduser = 0;
    this.from = 0;
    this.idevent = 0;
    this.status = 0;
    this.read = null;
    this.timestamp = 0;
    this.coreUrl= "http://143.44.67.0:13774/GoHost/api/";
    
    //Need to make sure that the facade actually supports this request
    this.creatFromDB = function (iduser){
        var url = this.coreUrl + "notification/" + iduser;
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.createFromDBFollowUp
        });
    };
    
    this.createFromDBFollowUp = function (data){
        this.idnotification = data.idnotification;
        this.iduser = data.iduser;
        this.from = data.from;
        this.idevent = data.idevent;
        this.status = data.status;
        this.read = data.read;
        this.timestamp = data.timestamp;
    };
    
    //Need to decide what values read and status can take. What 0,1, and 2 mean
    //Make sure vars are parsed properly
    //Go to the entity page that the id is optional = true and @notNull is not there
    this.create = function (iduser, from, idevent, timestamp, read) {
        var event = {iduser: iduser, from: from, idevent: idevent, status: 0, read: read, timestamp: timestamp};
        $.ajax({
            url: this.coreUrl + "event",
            type: 'post',
            data: JSON.stringify(event),
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            success: this.createFollowUp
        });
    };
    
    
    
    this.createFollowUp = function (data){
        //Is this what the database actually sends back??
        this.idnotification = data;
    };
    
    this.getRead = function (){
        return this.read;
    };
    this.getStatus = function () {
        return this.status;
    };
    this.editRead = function (read) {
        this.read = read;
        this.refreshEdits();
    };
    
    this.editStatus = function(status){
        this.status = status;
        this.refreshEdits();
    };
    
    
    //Copied this from event. Change everything to fit notification
    //Also, this hasn't been debugged in event so it could be incorrect
    this.refreshEdits = function () {
        var event = {read: this.read, status: this.status};
        $.ajax({
            url: coreUrl + 'event',
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}
