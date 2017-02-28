/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 0;
var notifications = null;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    getNotifications();
}
String.prototype.mysqlToDate = String.prototype.mysqlToDate || function() {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1]-1, t[2], t[3]||0, t[4]||0, t[5]||0);
};

function getNotifications() {
    inbox = new Inbox();
    inbox.create(id);
    inbox.getNotifications();

    setTimeout(getHTMLFromNotifications(inbox), 10000);
    //this is where it connects with HTML to print the feed in objects
    
    //The way I have this set up, I would only need to append the shit
    //inside the notifications array into the notifications div
    
    notificationsFeed = $('#notifications');
    for (var n = inbox.getSize() - 1; n > -1; n--) {
        notificationsFeed.append(notifications[n]);
    }
}
//This will go through all the different notifications, calling getHTML on them
//Which calls createHTML inside the notification object. It stores all the div
//objects returned into a singule array. This way, I will only have to append
//the divs in this one array; notifications
function getHTMLFromNotifications(inbox) {
    notifications = new Array();
    for (var i = 0; i < inbox.getSize(); i++) {
        notifications.push(inbox.getNotificationsList()[i].getHTML());
    }
}

//I have those functions inside the notification prototype. Keeping those empty
//functions here in case they actually need to be here.
function eventInvite() {
        //Initializes an EventInvite object and pushes it to the db
}
    
function eventRequest() {
        //Initializes an EventRequest object and pushes to the db
}
    
function friendRequest() {
        //Initializes a FriendRequest object and pushes to the db
}



$(document).ready(setUpComponents);

