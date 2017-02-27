// Global Variables go under here if they are needed
var id = 0;
var eventid = 0;
var event1 = null;
var user = null;
var isHost = false;
var isAttendee = false;
var canJoin = false;
var canSee = false;

var eventTitle;
var eventHost;
var eventStartTime;
var eventEndTime;
var eventCategory;
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
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', inviteFriends);
    } else if (isAttendee) {
        $('#joinEvent').hide();
        $('#hostOnly').hide();
        $('#invite').on('click', inviteFriends);
    } else if (canJoin) {
        $('#inviteSpan').hide();
        $('#hostOnly').hide();
        $('#joinEvent').on('click', joinEvent);
    } else if (!canSee) {
        $('#eventDetails').hide();
        $('#joinEvent').hide();
        $('#inviteSpan').hide();
        $('#hostOnly').hide();
    }
    //Show and hide all the divs in the html under here 
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

    eventDetails.append(newH);
    eventDetails.append(newH1);
    eventDetails.append(newH2);
    eventDetails.append(newH3);
    eventDetails.append('<br />');
}

function deleteEvent() {
    event1.deleteEvent();
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
}

function inviteFriends() {
    //This will pull up a list of the user's friends and then the other button
    //would actually allow you to invite people?
}

function joinEvent() {
    // This adds the accessor to the attendee list of the event
}

function getStringsFromEvent(event1) {
    eventTitle = event1.getTitle();
    //eventHost = event.getHost(); don't need to display this
    var d = event1.getEventStart().mysqlToDate();
    eventStartTime = d.toString().replace("GMT-0600 (Central Standard Time)", "");
    var x = event1.getEventEnd().mysqlToDate();
    eventEndTime = x.toString().replace("GMT-0600 (Central Standard Time)", "");
    eventCategory = event1.getCategory();
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
    window.location.href = window.location.href;
    window.location.reload(true);
}

$(window).load(setUpComponents);

