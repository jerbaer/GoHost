/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Inbox() {
    this.owner = null;
    this.notifications = [];
    this.coreUrl= "http://143.44.67.0:13774/GoHost/api/";
    this.notification1 = null;

    this.getNotifications = function () {
        var url = this.coreUrl + "notification/iduser?iduser=" + this.owner.iduser;
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.getNotificationsFollowUp
        });
    };
    
    this.getNotificationsFollowUp = function(data){
        this.notifications = new Array();
        for(var i=0;i<data.length;i++){
            this.notification1 = new Notification();
            notification1.createFromDB(data[i].idevent);
            this.notifications.push(notification1);
        }
    };
    
    this.getNotificationsList= function () {
        return this.notifications;
    },
    this.getSize= function(){
        return this.notifications.length;
    };
    
    
    
    
    //These should be in the notifications js
    this.displayNotifications = function () {
        // for each n in notifications {
            // n.displayNotification()
    };
    this.eventInvite = function () {
        //Initializes an EventInvite object and pushes it to the db
    };
    
    this.eventRequest = function () {
        //Initializes an EventRequest object and pushes to the db
    };
    
    this.friendRequest = function () {
        //Initializes a FriendRequest object and pushes to the db
    }
};
