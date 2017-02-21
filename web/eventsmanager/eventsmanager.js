var eventsHosted = null;
var eventsAttending = null;
var visibleEvents = null;
var user = null;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;


//Global variables go under here
var id;


function setUpComponents() {
    jQuery.ajaxSetup({async:false});
    $('#createEvent').on('click', createEvent);
    id = parseInt(sessionStorage.getItem('id'));
    getEvents();
}

function getEvents() {
    user = User;
    user.create(id);
    eventsHosted = user.getEventsHosting();
    eventsHosted.create(id,0);
    eventsAttending = user.getEventsAttending();
    eventsHosted.create(id,1);
}

function getStringsFromEvents(EventsList) {
    eventTitles = new Array(EventsList.getSize);
    eventHosts = new Array(EventsList.getSize);
    eventStartTimes = new Array(EventsList.getSize);
    eventEndTimes = new Array(EventsList.getSize);
    eventCategories = new Array(EventsList.getSize);
    eventIDs = new Array(EventsList.getSize);
    for (i = 0; i < EventsList.getSize(); i++) {
        eventTitles[i] = EventsList.getEventsList()[i].getTitle();
        eventHosts [i] = EventsList.getEventsList()[i].getHost();
        eventStartTimes[i] = EventsList.getEventsList()[i].getStartTime();
        eventEndTimes[i] = EventsList.getEventsList()[i].getEndTime();
        eventCategories[i] = EventsList.getEventsList()[i].getCategory();
        eventIDs[i] = EventsList.getEventsList()[i].getID();
    }
}

function getHostStrings() {
    getStringsFromEvents(eventsHosted);
}

function getAttendingStrings() {
    getStringsFromEvents(eventsAttending);
}


function createEvent() {
    eventTitle = $('#eventTitle').val;
    eventCat = $('#eventCat').val;
    eventStart = $('#eventStart').val;
    eventEnd = $('#eventEnd').val;
    eventLoc = $('#eventLoc').val;
    eventVis = $('#eventVis').val;
    eventAcc = $('#eventAcc').val;
    maxAttendees = $('#maxAttendees').val;
    description = $('#description').val;
    event = Event;
    event.create(user.getID(), eventCat, eventStart, eventEnd, description, eventTitle, eventVis, eventAcc, eventLoc);
}

$.wait = function (ms) {
    var defer = $.Deferred();
    setTimeout(function () {
        defer.resolve();
    }, ms);
    return defer;
}

function refresh() {
    window.location.href = window.location.href;
    window.location.reload(true);
};

$(window).load(setUpComponents);
