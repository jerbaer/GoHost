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
    
    this.create = function (owner) {
        this.owner = owner;
    }
    this.getNotifications = function () {
        var url = this.coreUrl + "notification/iduser?iduser=" + this.owner;
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
            var notification1 = new Notification();
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
    
};
