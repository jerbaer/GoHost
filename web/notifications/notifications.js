/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 0;
var notifications = null;
var notificationsFeed = null;
var isSetUp = false;
coreUrl = "http://143.44.67.0:13774/GoHost/api/";

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    getNotifications();
}
String.prototype.mysqlToDate = String.prototype.mysqlToDate || function () {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
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
        if (notifications[i].from.getID() == 0) {
            //This is a system notification that doesn't require input from the user. This will probably not be implemented soon
            createSystemNotification(notifications[i]);
        } else {
            //This is a request that requires input from the user
            if (notifications[i].status < 3){//this checks if it's a report or not
                if (notifications[i].status == 0) {
                    //this is an event invite
                    createEventInvite(notifications[i]);
                } else if (notifications[i].status == 1) {
                    //this is an event request
                    createEventRequest(notifications[i]);
                } else if (notifications[i].status == 2) {
                    //this is a friend request
                    createFriendRequest(notifications[i]);
                }
            } else if (notifications[i].status == 3) {
                createEventReport(notifications[i]);
            }  else if (notifications[i].status == 4) {
                createUserReport(notifications[i]);
            }
        }
    }
}
//Self explanatory
function createEventReport(notification) {
    var newH, newH1, newH2, newH3, newH4, newH5;
    newH = $('<hr>');
    newH1 = $('<p>').text("User " + notification.from.getName() + " has reported " +
            "the event " + notification.event.getTitle() + ".");
    newH2 = $('<p>').text(notification.event.getDescription())
    newH3 = $('<button>').text("Delete Event").on('click', function () {
        if (isSetUp == true) {
            notification.event.deleteEvent();
            notification.deleteNotification();
        }
    });
    newH4 = $('<button>').text("Reject Report").on('click', function () {
        if (isSetUp == true) {
            notification.deleteNotification();
        }
    });
    newH3.addClass("btn btn-info");
    newH4.addClass("btn btn-warning");
    newH5 = $('<div>').addClass("btn-toolbar");
    newH5.append(newH3);
    newH5.append(newH4);
    notificationsFeed.append(newH1);
    notificationsFeed.append(newH2);
    notificationsFeed.append(newH5);
    notificationsFeed.append(newH);
    isSetUp = true;
}
//This is not important for now. Not complete.
function createUserReport(notification) {
    var newH, newH1, newH2, newH3, newH4;
    newH = $('<hr>');
    newH1 = $('<p>').text("User " + notification.from.getName() + " has reported user " +
            notification.user.getName() + ".");
    newH2 = $('<button>').text("Delete User").on('click', function () {
        if (isSetUp == true) {
            //This is very low priority now. If we have time, we would have to
            //delete all trace of that user from the SuD.
            notification.deleteNotification();
        }
    });
    newH3 = $('<button>').text("Reject").on('click', function () {
        if (isSetUp == true) {
            notification.deleteNotification();
        }
    });
    newH2.addClass("btn btn-info");
    newH3.addClass("btn btn-warning");
    newH4 = $('<div>').addClass("btn-toolbar");
    newH4.append(newH2);
    newH4.append(newH3);
    notificationsFeed.append(newH1);
    notificationsFeed.append(newH4);
    notificationsFeed.append(newH);
    //What is this for???
    isSetUp = true;
}
//This will not require action from the user. All it will have is dismiss
//notification button that deletes the notification
function createSystemNotification(notification) {

}
//This will just have a button that allows the user to join the event
function createEventInvite(notification) {
    var newH, newH1, newH2, newH3, newH4;
    newH = $('<hr>');
    newH1 = $('<p>').text("User " + notification.from.getName() + " has invited you to join " +
            "their event " + notification.event.getTitle() + ".");
    newH2 = $('<button>').text("Accept").on('click', function () {
        if (isSetUp == true) {
            var user = {iduser: id, idevent: notification.event.getID()}
            $.ajax({
                url: coreUrl + "attendee",
                type: 'POST',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: 'application/json'

            })
            notification.deleteNotification();
        }
    });
    newH3 = $('<button>').text("Reject").on('click', function () {
        if (isSetUp == true) {
            notification.deleteNotification();
        }
    });
    newH2.addClass("btn btn-info");
    newH3.addClass("btn btn-warning");
    newH4 = $('<div>').addClass("btn-toolbar");
    newH4.append(newH2);
    newH4.append(newH3);
    notificationsFeed.append(newH1);
    notificationsFeed.append(newH4);
    notificationsFeed.append(newH);
    //What is this for???
    isSetUp = true;

}
function createFriendRequest(notification) {
    var newH, newH1, newH2, newH3, newH4;
    newH = $('<hr>');
    newH1 = $('<p>').text("User " + notification.from.getName() + " has requested to be your friend.");
    newH2 = $('<button>').text("Accept").on('click', function () {
        if (isSetUp == true) {
            var user = {iduser1: id, iduser2: notification.from.getID()}
            $.ajax({
                url: coreUrl + "friend",
                type: 'POST',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: 'application/json'

            })
            var user2 = {iduser1: notification.from.getID(), iduser2: id}
            $.ajax({
                url: coreUrl + "friend",
                type: 'POST',
                data: JSON.stringify(user2),
                dataType: 'json',
                contentType: 'application/json'

            })
            notification.deleteNotification();
        }
    });
    newH3 = $('<button>').text("Reject").on('click', function () {
        if (isSetUp == true) {
            notification.deleteNotification();
        }
    });
    newH2.addClass("btn btn-info");
    newH3.addClass("btn btn-warning");
    newH4 = $('<div>').addClass("btn-toolbar");
    newH4.append(newH2);
    newH4.append(newH3);
    notificationsFeed.append(newH1);
    notificationsFeed.append(newH4);
    notificationsFeed.append(newH);
    //What is this for???
    isSetUp = true;


}

function createEventRequest(notification) {
    var newH, newH1, newH2, newH3;
    newH = $('<hr>');
    newH1 = $('<p>').text("User " + notification.from.getName() + " has requested to join " +
            "your event " + notification.event.getTitle() + ".");
    newH2 = $('<button>').text("Accept").on('click', function () {
        if (isSetUp == true) {
            var user = {iduser: notification.from.getID(), idevent: notification.event.getID()}
            $.ajax({
                url: coreUrl + "attendee",
                type: 'POST',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: 'application/json'

            })
            notification.deleteNotification();
        }
    });
    newH3 = $('<button>').text("Reject").on('click', function () {
        if (isSetUp == true) {
            notification.deleteNotification();
        }
    });
    newH2.addClass("btn btn-info");
    newH3.addClass("btn btn-warning");
    newH4 = $('<div>').addClass("btn-toolbar");
    newH4.append(newH2);
    newH4.append(newH3);
    notificationsFeed.append(newH1);
    notificationsFeed.append(newH4);
    notificationsFeed.append(newH);
    //What is this for???
    isSetUp = true;
}

function acceptEventRequest() {
    //adds the this.from user to the list of attendees for this.event
    //This does not have to have the post request here. It should just call
    //add user to event function on the event object
    //Then deletes the notification
}

function rejectEventRequest(notification) {
    if (isSetUp == true) {
        notification.deleteNotification();
    }
}

//This creates the html associated with the friend request notification
//Very similar to the create event request function


$(document).ready(setUpComponents);

