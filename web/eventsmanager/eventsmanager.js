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
    //This needs to
    //1. Populate the catgory dropdown with categories from DB
    //2. Populate the visibility dropdown
    //3. Populate the location dropdown
    //4. Populate the accessibility dropdown
}

function getEvents() {
    user = User;
    user.create(id);
    eventsHosted = user.getEventsHosting();
    eventsAttending = user.getEventsAttending();
    getHostStrings();
    getAttendingStrings();
}

function getStringsFromEvents(eventList) {
    eventTitles = new Array(eventList.getSize());
    eventHosts = new Array(eventList.getSize());
    eventStartTimes = new Array(eventList.getSize());
    eventEndTimes = new Array(eventList.getSize());
    eventCategories = new Array(eventList.getSize());
    eventIDs = new Array(eventList.getSize());
    for (i = 0; i < eventList.getSize(); i++) {
        eventTitles[i] = eventList.getEventsList()[i].getTitle();
        eventHosts [i] = eventList.getEventsList()[i].getHost().getName();
        //var t = eventList.getEventsList()[i].getEventStart().split(/[- T :]/);
        var d = new Date(eventList.getEventsList()[i].getEventStart());      
        eventStartTimes[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        var x = new Date(eventList.getEventsList()[i].getEventEnd())
        eventEndTimes[i] = x.toString().replace("GMT-0600 (Central Standard Time)", "");
        eventCategories[i] = eventList.getEventsList()[i].getCategory().getName();
        eventIDs[i] = eventList.getEventsList()[i].getID();
}
}

function getHostStrings() {
    getStringsFromEvents(eventsHosted);
}

function getAttendingStrings() {
    getStringsFromEvents(eventsAttending);
}


function createEvent() {
    eventTitle = $('#eventTitle').val();
    eventCat = $('#eventCat').val();
    eventStart = $('#eventStart').val();
    eventEnd = $('#eventEnd').val();
    eventLoc = $('#eventLoc').val();
    eventVis = $('#eventVis').val();
    eventAcc = $('#eventAcc').val();
    maxAttendees = $('#maxAttendees').val();
    description = $('#description').val();
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
