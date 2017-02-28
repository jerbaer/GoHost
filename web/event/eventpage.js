// Global Variables go under here if they are needed
var id = 0;
var eventid = 0;
var event1 = null;
var user = null;
var isHost = false;
var isAttendee = false;
var canJoin = false;
var canSee = false;
var eventAttendees = [];
var attendeeIDs = [];
var eventTitle;
var eventHost;
var eventStartTime;
var eventEndTime;
var eventCategory;
var eventLocation;
var eventIDs;

String.prototype.mysqlToDate = String.prototype.mysqlToDate || function () {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
};

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    eventid = (window.location.href.split('#'))[1];
    user = new User();
    user.create(id);

    //Call function to display the event based on the relation of the
    //userto that event. Host, Attendee, neither
    getEvent();
    isHost = event1.isAccessorHost();
    isAttendee = event1.isUserInEvent();
    canJoin = (event1.canUserJoin() && !event1.isUserInEvent());
    canSee = event1.canUserSee();
    //eventDetails, joinEvent, hostOnly
    if (isHost) {
        $('#joinEvent').hide();
        $('#leaveEvent').hide();
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', inviteFriends);
    } else if (isAttendee) {
        $('#joinEvent').hide();
        $('#hostOnly').hide();
        $('#invite').on('click', inviteFriends);
        $('#leaveEvent').on('click', leaveEvent);
    } else if (canJoin) {
        $('#inviteSpan').hide();
        $('#leaveEvent').hide();
        $('#hostOnly').hide();
        $('#joinEvent').on('click', joinEvent);
    } else if (canSee) {
        $('#joinEvent').hide();
        $('#leaveEvent').hide();
        $('#inviteSpan').hide();
        $('#hostOnly').hide();
    } else {
        $('#eventDetails').hide();
        $('#joinEvent').hide();
        $('#leaveEvent').hide();
        $('#inviteSpan').hide();
        $('#hostOnly').hide();
        // Make error div for can't see
    }
}

function getEvent() {
    event1 = new Event();
    event1.createFromDB(eventid, user);
    getStringsFromEvent(event1);
    // Create the event in the html
    // Can implement links that allow edits to be made from the page
    eventDetails = $('#eventDetails');
    newH = $('<h3>').text(eventTitle);
    newH1 = $('<p>').text(eventStartTime);
    newH2 = $('<p>').text(eventEndTime);
    newH3 = $('<p>').text(eventCategory);
    newH4 = $('<p>').text(eventLocation);
    newH5 = $('<p>').text("Event Attendees:");
    newH6 = $('<div>').addClass("well");
    newHr = $('<hr>');

    for (i = 0; i < eventAttendees.length; i++) {
        newH7 = $('<p>').text(eventAttendees[i]);
        url = "../profile/index.html#" + attendeeIDs[i];
        newA = $('<a>').attr('href', url).text(eventAttendees[i]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        newH6.append(newA);
        newH6.append('<br/>');
    }

    eventDetails.append(newH);
    eventDetails.append(newHr);
    eventDetails.append(newH1);
    eventDetails.append(newH2);
    eventDetails.append(newH3);
    eventDetails.append(newH4);
    eventDetails.append(newH5);
    eventDetails.append(newH6);
    eventDetails.append('<br />');
}

function deleteEvent() {
    event1.deleteEvent();
    location.href = "../home";
}

function editEvent() {
    //This will get all the input from the edit form and use it call all the
    //edit functions on the event object. After that, it will call the function
    //that flushes all the changes to the database
    event1.editDescription($('#description').val());
    event1.editTitle($('#eventTitle').val());
    //Need to make sure these two have proper values
    event1.editStartTime($('#eventStart').val());
    event1.editEndTime($('#eventEnd').val());
    //These two need to be creating objects on the other end
    event1.editCategory($('#eventCat').val());
    event1.editLocation($('#eventLoc').val());
    //These two need to be converted to 0,1,2
    event1.editAccessiblity($('#eventAcc').val());
    event1.editVisibility($('#eventVis').val());
    //Flushes everything to the database
    event1.refreshEdits();
    window.location.reload();
}

function inviteFriends() {
    //This will pull up a list of the user's friends and then the other button
    //would actually allow you to invite people?
    window.location.reload();
}

function joinEvent() {
    if (event1.isOpenEvent) {
        event1.addUserToEvent(id);
        window.location.reload();
    } else {
        //send request to join event
    }
}

function leaveEvent() {
    event1.removeUserFromEvent(id);
    location.href = "../home";
}

function getStringsFromEvent(event1) {
    eventTitle = event1.getTitle();
    //eventHost = event.getHost(); don't need to display this
    var d = event1.getEventStart().mysqlToDate();
    eventStartTime = d.toString().replace("GMT-0600 (Central Standard Time)", "");
    var x = event1.getEventEnd().mysqlToDate();
    eventEndTime = x.toString().replace("GMT-0600 (Central Standard Time)", "");
    eventCategory = event1.getCategory();
    eventLocation = event1.getLocation();
    //Goes through and fills out eventAttendees
    for (i = 0; i < event1.getListofAttendees().length; i++) {
        eventAttendees.push(event1.getListofAttendees()[i].getName());
    }
    for (i = 0; i < event1.getListofAttendees().length; i++) {
        attendeeIDs.push(event1.getListofAttendees()[i].getID());
    }
    //eventID = event.getID(); or this
}

//This will be coded in iteration 2.0?? hehe ecks dee
function chat() {

}

$.wait = function (ms) {
    var defer = $.Deferred();
    setTimeout(function () {
        defer.resolve();
    }, ms);
    return defer;
};

function refresh() {
    //window.location.href = window.location.href; // this is weird
    window.location.reload(true);
}

$(window).load(setUpComponents);

