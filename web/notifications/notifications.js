/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 0;
var notifications = null;
var notificationsFeed = null;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    getNotifications();
}
String.prototype.mysqlToDate = String.prototype.mysqlToDate || function() {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1]-1, t[2], t[3]||0, t[4]||0, t[5]||0);
}

//This will go through the list of notifications, checking what type of notification
//it is all
function getNotifications(inbox) {
    inbox = new Inbox();
    inbox.create(id);
    inbox.getNotifications();
    notificationsFeed = $('#notifications');
    notifications = new Array();
    for (var i = 0; i < inbox.getSize(); i++) {
        notifications.push(inbox.getNotificationsList()[i]);
        //logic for checking what kind of notification it is goes here now
        if(notifications[i].from.getID() ==0){
            //This is a system notification that doesn't require input from the user. This will probably not be implemented soon
            createSystemNotification(notifications[i]);
        } else {
            //This is a request that requires input from the user
            if (notifications[i].status == 0){
                //this is an event invite
                createEventInvite(notifications[i]);
            } else if (notifications[i].status == 1){
                //this is an event request
                createEventRequest(notifications[i]);
            } else if (notifications[i].status == 2){
                //this is a friend request
                createFriendRequest(notifications[i]);
            }
        }
    }
}
//This will not require action from the user. All it will have is dismiss
//notification button that deletes the notification
function createSystemNotification(notification){
        
}
//This will just have a button that allows the user to join the event
function createEventInvite(notification) {
         
}
     
function createEventRequest(notification){
    var newH, newH1, newH2, newH3;
    newH = $('<hr>');
    newH1 = $('<p>').text("User " + notification.from.getName() + " has requested to join "+
        "your event " + notification.event.getTitle() + ".");
    newH2 = $('<button>').text("Accept").on('click', acceptEventRequest(notification));
    newH3 = $('<button>').text("Reject").on('click', rejectEventRequest(notification));
    notificationsFeed.append(newH1);
    notificationsFeed.append(newH2);
    notificationsFeed.append(newH3);
    notificationsFeed.append(newH);
    //What is this for???
    //this.isSetUp = true;
}

function acceptEventRequest(notification){
    //adds the this.from user to the list of attendees for this.event
    //This does not have to have the post request here. It should just call
    //add user to event function on the event object
    //Then deletes the notification
}
    
function rejectEventRequest(notification){
    //if(this.isSetUp == true)
    notification.deleteNotification();
        
}
     
//This creates the html associated with the friend request notification
//Very similar to the create event request function
function createFriendRequest(notification){
         
}

$(document).ready(setUpComponents);

