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
    this.user = 0;
    this.from = 0;
    this.event = 0;
    this.status = 0;
    this.read = null;
    this.timestamp = 0;
    this.coreUrl= "http://143.44.67.0:13774/GoHost/api/";
    
    //Need to make sure that the facade actually supports this request
    this.createFromDB = function (idnotification){
        var url = this.coreUrl + "notification/" + idnotification;
        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: url,
            context: this,
            success: this.createFromDBFollowUp,
            async : false
        });
    };
    
    this.createFromDBFollowUp = function (data){
        this.idnotification = data.idnotification;
        this.user = new User();
        this.user.create(data.iduser)
        this.from = new User();
        this.from.create(data.sender);
        if(data.idevent!= null){
        this.event = new Event();
        this.event.createFromDB(data.idevent, this.user);
    }
        this.status = data.notificationstatus;
        this.read = data.isread;
        this.timestamp = data.timesent;
    };
    
    //Need to decide what values read and status can take. What 0,1, and 2 mean
    //Make sure vars are parsed properly
    //Go to the entity page that the id is optional = true and @notNull is not there
    this.create = function (iduser, from, idevent, timestamp, read) {
        var event = {iduser: iduser, sender: from, idevent: idevent, notificationstatus: status, isread: 0, timesent: timestamp};
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
    
    //This gets called each time the user interacts with a notification
    //Does this delete every trace of the notification from the db?
    this.deleteNotification = function () {
        $.ajax({
            url: this.coreUrl + 'notification/' + this.idnotification,
            type: 'DELETE',
            async:false
        });
        this.refresh();
    };
    
    
    
    
    this.refresh = function() {
    window.location.href = window.location.href;
    window.location.reload(true);
    };
    
}
