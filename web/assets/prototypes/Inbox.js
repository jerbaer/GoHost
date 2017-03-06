/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Inbox() {
    this.ownerid = 0;
    this.owner;
    this.notifications = [];
    this.coreUrl= "http://143.44.67.0:13774/GoHost/api/";
    this.notification1 = null;
    
    this.create = function (ownerid) {
        this.ownerid = ownerid;
        this.owner = new User();
        this.owner.create(ownerid);
    }
    //This either grabs notifications by the id of the user that they were sent
    //to in the case of normal notifications or by whether they are reports 
    //(status == 3) in the case of report notifications
    //This means that the iduser will contain the id of the user being reported
    //in case of a report
    this.getNotifications = function () {
        if(!this.owner.getIsAdmin()) {
            var url = this.coreUrl + "notification/iduser?iduser=" + this.ownerid;
            $.ajax({
                dataType: "json",
                url: url,
                context: this,
                success: this.getNotificationsFollowUp
            });
        }else {
            var url = this.coreUrl + "notification/status?satus=3";
            $.ajax({
                dataType: "json",
                url: url,
                context: this,
                success: this.getNotificationsFollowUp
            });
        }
    };
    
    this.getNotificationsFollowUp = function(data){
        this.notifications = new Array();
        for(var i=0;i<data.length;i++){
            var notification1 = new Notification();
            notification1.createFromDB(data[i].idnotification);
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
