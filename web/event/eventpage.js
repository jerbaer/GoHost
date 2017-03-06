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
var peopleList = null;
var count;

//Global variables for event chat
var eventChat = null;
var chatLog;
var senders;
var messages;
var times;
var messageIDs;

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
    getMessages();

    //Call function to display the event based on the relation of the
    //userto that event. Host, Attendee, neither
    getEvent();
    isHost = event1.isAccessorHost();
    isAttendee = event1.isUserInEvent();
    canJoin = (event1.canUserJoin() && !event1.isUserInEvent());
    canSee = event1.canUserSee();

    //eventDetails, joinEvent, hostOnly
    if (isHost) {
        $('#delete').removeClass('hidden');
        $('#edit').removeClass('hidden');
        $('#invite').removeClass('hidden');
        $('#sendMessage').removeClass('hidden');
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', getFriends);
        $('#sendMessage').on('click', sendMessage);
    } else if (isAttendee) {
        $('#invite').removeClass('hidden');
        $('#leaveEvent').removeClass('hidden');
        $('#sendMessage').removeClass('hidden');
        $('#invite').on('click', getFriends);
        $('#leaveEvent').on('click', leaveEvent);
        $('#sendMessage').on('click', sendMessage);
    } else if (canJoin) {
        $('#joinEvent').removeClass('hidden');
        $('#joinEvent').on('click', joinEvent);
    } else if (canSee) {
        $('#request').removeClass('hidden');
        $('#request').on('click', requestToJoinEvent);
        // Make error div for can't see
    }
}

//Next two functions migrated from eventChat. Will need to make sure it is 
//connecting to the right div that Jerry is going to make
function getMessages() {
    $('#chat').empty();
    eventChat = new EventChat();
    eventChat.create(eventid);
    setTimeout(getMessageStrings(eventChat), 10000);
    var newH, newA, newHr, newH1, chat;
    var n, url;
    chat = $('#chat');
    //This might not look nice but it should work. Go back and fix the how
    //it looks later.
    for (n = eventChat.getSize() - 1; n > -1; n--) {
        url = "../profile/index.html#" + senders[n].getID();
        newA = $('<a>').attr('href', url).text(senders[n] + ": ").on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        newH = $('<p>').append(newA);
        newH1 = $('<p>').text(messages[n]);
        newHr = $('<hr>');

        chat.append(newH);
        chat.append(newH1);
        chat.append(newHr);
    }
}
//I'm keeping track of all the times and the ids in case we need them for the purpose of deleting
//messages and soritng by timesent although I am not showing these
function getMessageStrings(eventChat) {
    chatLog = eventChat.getChatLog();
    senders = new Array(chatLog.length);
    messages = new Array(chatLog.length);
    times = new Array(chatLog.length);
    messageIDs = new Array(chatLog.length);
    for (i = 0; i < chatLog.length; i++) {
        senders[i] = chatLog[i].getUser();
        messages[i] = chatLog[i].getText();
        var d = chatLog[i].getTime().mysqlToDate();
        times[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        messageIDs[i] = chatLog[i].getID();
    }
}

function sendMessage() {
    
}


function requestToJoinEvent() {
    notification = new Notification();
    notification.create(event1.getHost().getID(), user.getID(), event1.getID(), new Date(), 0, 1);
}

function inviteToEvent(iduser) {
    notification = new Notification();
    notification.create(iduser, event1.getHost().getID(), event1.getID(), new Date(), 0, 0);
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

    for (var i = 0; i < eventAttendees.length; i++) {
        makeAttendeeAlert(attendeeIDs[i], i);
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

function makeAttendeeAlert(iduser, i) {
    newH7 = $('<div>').addClass("alert alert-info alert-dismissable").on('close.bs.alert', function () {
        var n = iduser;
        inviteToEvent(n);
    });
    url = "../profile/index.html#" + iduser;
    newA = $('<a>').addClass("alert-link").attr('href', url).text(eventAttendees[i]).on('click', function () {
        window.location.href = url;
        window.location.reload(true);
    });
    newA2 = $('<button>').attr('href', "#").addClass("close").attr('data-dismiss', "alert").attr('aria-label', "close").html("&times;").attr('id', "hostOnly");
    if (event1.getHostID() !== iduser) {
        newH7.append(newA2);
    }
    newH7.append(newA);
    newH6.append(newH7);
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
    eventStartTimes = d.toString().substring(0,21);
    var x = event1.getEventEnd().mysqlToDate();
    eventEndTime = x.toString().substring(0,21);
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
    var newH, newA;
    var n, url;
    // this part might need to change/be more specific with bootstrap classes
    peopleList = $('#friends');
    for (var n = friends.getSize() - 1; n > -1; n--) {
        if (peopleUserIDs[n] !== undefined) {
            makeFriendAlert(peopleUserIDs[n], n);
        }
    }
    // if(peopleNames.empty()){ // or something like that
    // $('#noMoreFriends').show();
    $('#friends').show();
}

function makeFriendAlert(iduser, n) {
    newH7 = $('<div>').addClass("alert alert-info alert-dismissable").on('close.bs.alert', function () {
        var n = iduser;
        event1.inviteUser(n);
    });
    url = "../profile/index.html#" + iduser;
    newA = $('<a>').addClass("alert-link").attr('href', url).text(peopleNames[n]).on('click', function () {
        window.locaton.href = url;
        window.location.reload(true);
        //double check this session storage part
        sessionStorage.setItem('peopleid'), peopleIDs[n];
    });
    newA2 = $('<button>').attr('href', "#").addClass("close").attr('data-dismiss', "alert").attr('aria-label', "close").attr('id', "hostOnly");
    newI = $('<i>').addClass("fa fa-envelope-o").attr('aria-hidden', "true");
    newA2.append(newI);
    newH7.append(newA2).append(newA);
    peopleList.append(newH7);
}

function getStringsFromPeople(PeopleList) {
    PeopleList.getFriends();
    list = PeopleList.getFriendsList();
    peopleNames = new Array(list.length);
    peoplePictures = new Array(list.length);
    peopleDescriptions = new Array(list.length);
    peopleIDs = new Array(list.length);
    peopleUserIDs = new Array(list.length);
    count = 0;
    for (var i = 0; i < list.length; i++) {
        if (!event1.isAccessorInEvent(list[i])) {
            list[i].createProfile();
            peopleNames[i] = list[i].getName();
            peoplePictures[i] = list[i].getPicture();
            peopleDescriptions[i] = list[i].getDescription();
            peopleIDs[i] = list[i].getProfileID();
            peopleUserIDs[i] = list[i].getID();
            count++;
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

