/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Notification(){
    this.idnotification = 0;
    this.iduser = 0;
    this.from = 0;
    this.idevent = 0;
    this.status = 0;
    this.read = null;
    this.timestamp = 0;
    
    //Need to make sure that the facade actually supports this request
    this.creatFromDB = function (iduser){
        var url = this.coreUrl + "notification/" + iduser;
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.createFollowUp
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
    this.create = function (iduser, from, idevent, timestamp) {
        //creates a user from the idhost, category from idcategory, visibility from idvisibility/idaccessibility, location from idlocation, all other fields are filled from parameters
        //if accessibility is 1, add all friends to invited list. Add the created object to the database.
        //Won't let me use this.
        var event = {iduser: iduser, from: from, idevent: idevent, status: 0, read: 0, timestamp: timestamp};
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
    }
    
    
    this.editRead = function (read) {
        this.read = read;
    };
    
    this.editStatus = function(status){
        this.status = status;
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
        //This will have a put request that updates the db with all the edits 
        //That might have happened to the event object. We will call this 
        //End-all function everytime an edit happens
    };
}
