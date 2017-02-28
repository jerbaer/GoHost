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

var peopleNames;
var peoplePictures;
var peopleDescriptions;
var peopleIDs;

//Still don't know where to call this
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
    getCategories();
    getLocations();

    //Call function to display the event based on the relation of the
    //userto that event. Host, Attendee, neither
    getEvent();
    isHost = event1.isAccessorHost();
    isAttendee = event1.isUserInEvent();
    canJoin = (event1.canUserJoin() && !event1.isUserInEvent());
    canSee = event1.canUserSee();

    //eventDetails, joinEvent, hostOnly
    if (isHost) {
        $('#request').hide();
        $('#joinEvent').hide();
        $('#leaveEvent').hide();
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', getFriends);
    } else if (isAttendee) {
        $('#request').hide();
        $('#joinEvent').hide();
        $('#hostOnly').hide();
        $('#invite').on('click', getFriends);
        $('#leaveEvent').on('click', leaveEvent);
    } else if (canJoin) {
        $('#request').hide();
        $('#inviteSpan').hide();
        $('#leaveEvent').hide();
        $('#hostOnly').hide();
        $('#joinEvent').on('click', joinEvent);
    } else if (canSee) {
        $('#joinEvent').hide();
        $('#leaveEvent').hide();
        $('#inviteSpan').hide();
        $('#hostOnly').hide();
        $('#request').on('click', requestToJoinEvent);
    } else {
        $('#eventDetails').hide();
        $('#joinEvent').hide();
        $('#leaveEvent').hide();
        $('#inviteSpan').hide();
        $('#hostOnly').hide();
        // Make error div for can't see
    }
}
function requestToJoinEvent() {
    notification = new Notification();
    notification.create(event1.getHost().getID(), user.getID(), event1.getID(), new Date(), 0, 1)
}

function getCategories() {
    var url = "http://143.44.67.0:13774/GoHost/api/category/all";
    $.getJSON(url).done(categoriesFollowUp);
}

function getLocations() {
    var url = "http://143.44.67.0:13774/GoHost/api/location/all";
    $.getJSON(url).done(locationsFollowUp);
}

function categoriesFollowUp(data) {
    eventsCat = $('#eventCat');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idcategory).text(data[i].name);
        eventsCat.append(newHr);
    }
}

function locationsFollowUp(data) {
    eventsLoc = $('#eventLoc');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idcategory).text(data[i].name);
        eventsLoc.append(newHr);
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
    newH6 = $('<div>');
    newHr = $('<hr>');

    for (i = 0; i < eventAttendees.length; i++) {
        newH7 = $('<div>').addClass("alert alert-info alert-dismissable");
        url = "../profile/index.html#" + attendeeIDs[i];
        newA = $('<a>').attr('href', url).text(eventAttendees[i]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        newA.addClass("alert-link close");
        newA.attr('data-dismiss', alert);
        newA.attr('aria-label', close);
        newH7.append(newA);
        newH6.append(newH7);
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
    var today = new Date();
    var startDate;
    var endDate;
    if ($('#eventStart').val() !== '') {
        startDate = new Date($('#eventStart').val());
    } else {
        startDate = event1.getEventStart();
    }
    if ($('eventEnd').val() !== '') {
        endDate = new Date($('#eventEnd').val());
    } else {
        endDate = event1.getEventEnd();
    }
    if (startDate < today) {
        $('#invTimeModal').modal('show');
    } else if (startDate > endDate) {
        $('#invTimeModal').modal('show');
    } else {
        var category = new Category($('#eventCat').val());
        var location = new Location($('#eventLoc').val() + 1);
        //This will get all the input from the edit form and use it call all the
        //edit functions on the event object. After that, it will call the function
        //that flushes all the changes to the database
        if ($('#eventTitle').val() !== '') {
            event1.editTitle($('#eventTitle').val());
        }
        //Need to make sure these two have proper values
        event1.editStartTime(startDate);
        event1.editEndTime(endDate);
        //These two need to be creating objects on the other end
        if ($('#eventCat').val() !== '') {
            event1.editCategory(category);
        }
        if ($('#eventLoc').val() !== '') {
            event1.editLocation(location);
        }
        //These two need to be converted to 0,1,2
        if ($('#eventVis').val() !== '') {
            event1.editVisibility($('#eventVis').val());
        }
        if ($('#eventAcc').val() !== '') {
            event1.editAccessiblity($('#eventAcc').val());
        }
        if ($('#maxAttendees').val() !== '') {
            event1.editMax($('#maxAttendees').val());
        }
        if ($('#description').val() !== '') {
            event1.editDescription($('#description').val());
        }
        //Flushes everything to the database
        event1.refreshEdits();
        window.location.reload();
    }
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

function getFriends() {
    var friends = null;
    $('#friends').empty();
    if (friends !== null)
        friends = null;
    user.createPeopleList();
    friends = user.getPeopleList();
    peopleNames = null;
    peoplePictures = null;
    peopleDescriptions = null;
    peopleIDs = null;
    getStringsFromPeople(friends);
    var newH, newA, peopleList;
    var n, url;
    // this part might need to change/be more specific with bootstrap classes
    peopleList = $('#friends');
    for (n = friends.getSize() - 1; n > -1; n--) {
        url = "../profile/index.html#" + peopleUserIDs[n];
        newA = $('<a>').attr('href', url).text(peopleNames[n]).on('click', function () {
            window.locaton.href = url;
            window.location.reload(true);
            //double check this session storage part
            sessionStorage.setItem('peopleid'), peopleIDs[n];
        });
        newH = $('<p>').append(newA);
        // figure out how to do picture

        peopleList.append(newH);
    }
    // if(peopleNames.empty()){ // or something like that
    // $('#noMoreFriends').show();
    $('#friends').show();
}

function getStringsFromPeople(PeopleList) {
    PeopleList.getFriends();
    list = PeopleList.getFriendsList();
    peopleNames = new Array(list.length);
    peoplePictures = new Array(list.length);
    peopleDescriptions = new Array(list.length);
    peopleIDs = new Array(list.length);
    peopleUserIDs = new Array(list.length);
    for (var i = 0; i < list.length; i++) {
        if (!event1.isUserInEvent(list[i])) {
            list[i].createProfile();
            peopleNames[i] = list[i].getName();
            peoplePictures[i] = list[i].getPicture();
            peopleDescriptions[i] = list[i].getDescription();
            peopleIDs[i] = list[i].getProfileID();
            peopleUserIDs[i] = list[i].getID();
        }
    }
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

