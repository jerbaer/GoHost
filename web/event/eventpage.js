// Global Variables go under here if they are needed
var id = 0;
var eventid = 0;
var event1 = null;
var user = null;
var isHost = false;
var isAttendee = false;
var canJoin = false;
var canSee = false;
var canFlag = true;
var canRequest = true;

var eventAttendees = [];
var attendeeIDs = [];
var eventTitle;
var eventHost;
var eventStartTime;
var eventEndTime;
var eventCategory;
var eventLocation;
var eventDescription;
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
var newMessage;

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
    getMessages();
    canFlagEvent();
    canEventRequest();
    isHost = event1.isAccessorHost();
    isAttendee = event1.isUserInEvent();
    canJoin = (event1.canUserJoin() && !event1.isUserInEvent());
    canSee = event1.canUserSee();
    inbox = new Inbox();
    inbox.create(id);
    inbox.getNotifications();
    if (inbox.areUnread()) {
        $('#bell').addClass('text-warning');
    }

    //This is out here because I want it to be visible to all users
    $('#report').on('click', reportEvent);
    //eventDetails, joinEvent, hostOnly
    if (isHost) {
        $('#inviteSpan').removeClass('hidden');
        $('#host').removeClass('hidden');
        $('#chatSpan').removeClass('hidden');
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', getFriends);
        $('#sendChat').on('click', sendMessage);
    } else if (isAttendee) {
        $('#inviteSpan').removeClass('hidden');
        $('#leaveEvent').removeClass('hidden');
        $('#chatSpan').removeClass('hidden');
        $('#invite').on('click', getFriends);
        $('#leaveEvent').on('click', leaveEvent);
        $('#sendChat').on('click', sendMessage);
    } else if (canJoin) {
        $('#joinEvent').removeClass('hidden');
        $('#joinEvent').on('click', joinEvent);
    } else if (canSee && canRequest) {
        $('#request').removeClass('hidden');
        $('#request').on('click', requestToJoinEvent);
        // Make error div for can't see
    }

    $('#reportModal').on('hidden.bs.modal', function () {
        window.location.reload();
    });
    
    $('#eventReqModal').on('hidden.bs.modal', function () {
        window.location.reload();
    });
}

//This should create a notification of status = 3 and idevent = this one
//Note: The iduser value doesn't change anything in this kind of notification
//It will not show up in any user's notification feed because of the logic I 
//added in notifications.getNotifications(). Defaulting it to 0 because why not.
function reportEvent() {
    if (canFlag) {
        notification = new Notification();
        notification.create(0, user.getID(), event1.getID(), new Date(), 0, 3);
        $('#reportModal').modal();
    } else {
        $('#reportedModal').modal();
    }
}

//Next two functions migrated from eventChat. Will need to make sure it is 
//connecting to the right div that Jerry is going to make
function getMessages() {
    $('#chatLines').empty();
    eventChat = new EventChat();
    eventChat.create(event1, user);
    getMessageStrings(eventChat);
    var newH, newA, newHr, newH1, chat;
    var n, url;
    chat = $('#chatLines');
    //This might not look nice but it should work. Go back and fix the how
    //it looks later.
    for (n = eventChat.getSize() - 1; n > -1; n--) {
        url = "../profile/index.html#" + senders[n].getID();
        newA = $('<a>').attr('href', url).text(senders[n].getName() + ": ").on('click', function () {
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
    for (var i = 0; i < chatLog.length; i++) {
        senders[i] = chatLog[i].getUser();
        messages[i] = chatLog[i].getText();
        var d = chatLog[i].getTime().mysqlToDate();
        times[i] = d.toString().substring(0, 21);
        messageIDs[i] = chatLog[i].getID();
    }
}

//Need to fill this in now
//This needs to refresh the event page after it sends the message
function sendMessage() {
    newMessage = $('#newMessage').val();
    chatLine = new ChatLine();
    chatLine.create(newMessage, id, eventid, new Date());
    refresh();
}

function requestToJoinEvent() {
    notification = new Notification();
    notification.create(event1.getHost().getID(), user.getID(), event1.getID(), new Date(), 0, 1);
    $('#eventReqModal').modal();
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

function canFlagEvent() {
    event1.hasFlag();
    canFlag = event1.canFlag;
}

function canEventRequest() {
    event1.hasEventRequest();
    canRequest = event1.canRequest;
}

function locationsFollowUp(data) {
    eventsLoc = $('#eventLoc');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idlocation).text(data[i].name);
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
    newH = $('<h3>').addClass('text-info').text(eventTitle);
    newH1 = $('<p>').text(eventStartTime);
    newH2 = $('<p>').text(eventEndTime);
    newH3 = $('<p>').text(eventCategory);
    newH4 = $('<p>').text(eventLocation);
    newH8 = $('<p>').text(eventDescription);
    newH5 = $('<h4>').text("Event Attendees:");
    newH6 = $('<div>');
    newDiv = $('<div>').addClass('well');

    for (var i = 0; i < eventAttendees.length; i++) {
        makeAttendeeAlert(attendeeIDs[i], i);
    }

    eventDetails.append(newH);
    newDiv.append(newH1);
    newDiv.append(newH2);
    newDiv.append(newH3);
    newDiv.append(newH4);
    newDiv.append('<hr>');
    newDiv.append(newH8);
    eventDetails.append(newDiv);
    eventDetails.append(newH5);
    eventDetails.append(newH6);
    eventDetails.append('<br />');
}

function getStringsFromEvent(event1) {
    eventTitle = event1.getTitle();
    //eventHost = event.getHost(); don't need to display this
    var d = event1.getEventStart().mysqlToDate();
    eventStartTime = d.toString().substring(0, 21);
    var x = event1.getEventEnd().mysqlToDate();
    eventEndTime = x.toString().substring(0, 21);
    eventCategory = event1.getCategory();
    eventLocation = event1.getLocation();
    //Goes through and fills out eventAttendees
    for (i = 0; i < event1.getListofAttendees().length; i++) {
        eventAttendees.push(event1.getListofAttendees()[i].getName());
    }
    for (i = 0; i < event1.getListofAttendees().length; i++) {
        attendeeIDs.push(event1.getListofAttendees()[i].getID());
    }
    eventDescription = event1.getDescription();
    //eventID = event.getID(); or this
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
    newA2 = $('<button>').attr('href', "#").addClass("close").attr('data-dismiss', "alert").attr('aria-label', "close").html("&times;").attr('id', "hostOnly").on('click', function () {
        removeUser(iduser);
    });
    if (event1.getHostID() !== iduser) {
        if (event1.isAccessorHost())
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
        if ($('#eventCat').val() > 0) {
            event1.editCategory(category);
        }
        if ($('#eventLoc').val() > 0) {
            event1.editLocation(location);
        }
        //These two need to be converted to 0,1,2
        if ($('#eventVis').val() > -1) {
            event1.editVisibility($('#eventVis').val());
        }
        if ($('#eventAcc').val() > -1) {
            event1.editAccessiblity($('#eventAcc').val());
        }
        if ($('#maxAttendees').val() > 0) {
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

function removeUser(iduser) {
    event1.removeUserFromEvent(iduser);
    window.location.reload();
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
            if (!event1.isUserInvited(peopleUserIDs[n]))
                makeFriendAlert(peopleUserIDs[n], n);
        }
    }
    // if(peopleNames.empty()){ // or something like that
    // $('#noMoreFriends').show();
    $('#friends').show();
}

function makeFriendAlert(iduser, n) {
    newH7 = $('<div>').addClass("alert alert-info alert-dismissable").on('close.bs.alert', function () {

    });
    url = "../profile/index.html#" + iduser;
    newA = $('<a>').addClass("alert-link").attr('href', url).text(peopleNames[n]).on('click', function () {
        window.locaton.href = url;
        window.location.reload(true);
        //double check this session storage part
        sessionStorage.setItem('peopleid'), peopleIDs[n];
    });
    newA2 = $('<button>').attr('href', "#").addClass("close").attr('data-dismiss', "alert").attr('aria-label', "close").attr('id', "hostOnly");
    newI = $('<i>').addClass("fa fa-envelope").attr('aria-hidden', "true").on('click', function () {
        event1.inviteUser(iduser);
        window.location.reload(true);
    });
    newA2.append(newI);
    if (!event1.isUserInvited(iduser)) {
        newH7.append(newA2).append(newA);
    }
    ;
    if (!event1.isUserInvited(iduser)) {
        peopleList.append(newH7);
    }
    ;
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

$.wait = function (ms) {
    var defer = $.Deferred();
    setTimeout(function () {
        defer.resolve();
    }, ms);
    return defer;
};
//Make sure this is actually working
function refresh() {
    //window.location.href = window.location.href; // this is weird
    window.location.reload(true);
}

$(window).load(setUpComponents);

