/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//from: this will have the id of the user who sent the notification
//it will be 0 if the notification is from the system. Basically,
//this will be a system notification if from is 0. Otherwise, it's a request.

//status: this will be used to distinguish the different types of requests
//(0: eventInvite, 1: eventRequest, 2: friendRequest)

//read: this will be used to distinguish the different types of system notifications
//however specific I want to get with those.
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
        var event = {iduser: iduser, from: from, idevent: idevent, status: status, read: 0, timestamp: timestamp};
        $.ajax({
            url: this.coreUrl + "notification",
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
            url: coreUrl + 'notification',
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}
