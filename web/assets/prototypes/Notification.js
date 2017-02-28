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
    this.newH = $('<div>');
    this.newH1;
    this.newH2;
    this.newH3;
    this.newH4;
    this.text;
    this.idnotification = 0;
    this.user = 0;
    this.from = 0;
    this.event = 0;
    this.status = 0;
    this.read = null;
    this.timestamp = 0;
    this.coreUrl= "http://143.44.67.0:13774/GoHost/api/";
    this.isSetUp = false;
    
    //Need to make sure that the facade actually supports this request
    this.createFromDB = function (iduser){
        var url = this.coreUrl + "notification/" + iduser;
        $.ajax({
            dataType: "json",
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
        this.event = new Event();
        this.event.createFromDB(data.idevent, this.user);
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
    
    //returns a div populated according to the type of the notification
    this.getHTML = function (){
        this.createHTML();
        return this.newH;
    };
    
    //This is where the logic that checks what kind of notification it is
    //will be. Based on what kind of notification, it will call one of 
    //(four?) functions that will populate the div accordingly
    this.createHTML = function (){
        if(this.from.getID() ==0){
            //This is a system notification that doesn't require input from the user. This will probably not be implemented soon
            this.createSystemNotification();
        } else {
            //This is a request that requires input from the user
            if (this.status == 0){
                //this is an event invite
                this.createEventInvite();
            } else if (this.status == 1){
                //this is an event request
                this.createEventRequest();
            } else if (this.status == 2){
                //this is a friend request
                this.createFriendRequest();
            }
        }
    };
    
    //This will not require action from the user. All it will have is dismiss
    //notification button that deletes the notification
    this.createSystemNotification = function(){
        
    };
    //This will just have a button that allows the user to join the event
    this.createEventInvite = function() {
         
    };
     
    this.createEventRequest = function(){
        this.text = "User " + this.from.getName() + " has requested to join "+
                "your event " + this.event.getTitle() + ".";
        this.newH1 = $('<p>').text(this.text);
        this.newH2 = $('<button>').text("Accept").on('click', this.acceptEventRequest());
        this.newH3 = $('<button>').text("Reject").on('click', this.rejectEventRequest());
        this.newH.append(this.newH1);
        this.newH.append(this.newH2);
        this.newH.append(this.newH3);
        this.isSetUp = true;
        //Might need to come back and tweak the html if it doesn't look good
    };
    
    //Should these two functions be here in the first place??
    //Will these functions still be called even if they are being called
    //from a different js?
    this.acceptEventRequest = function(){
        //adds the this.from user to the list of attendees for this.event
        //This does not have to have the post request here. It should just call
        //add user to event function on the event object
        //Then deletes the notification
    };
    
    this.rejectEventRequest = function(){
        if(this.isSetUp == true)
        this.deleteNotification();
        
    };
     
    //This creates the html associated with the friend request notification
    //Very similar to the create event request function
    this.createFriendRequest = function(){
         
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
    this.refresh = function() {
    window.location.href = window.location.href;
    window.location.reload(true);
};
}
