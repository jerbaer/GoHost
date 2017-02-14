var eventsHosted = null;
var eventsAttending = null;
var visibleEvents = null;
var user = null;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;
//Classes I will be interacting with here: eventList, user, (?event?)


//Global variables go under here
var id;
function setUpComponents() {
    // Link some buttons to certain functions
    $('#delete').on('click', deleteEvent);
    $('#edit').on('click', editEvent);
    $('#invite').on('click', inviteFriends);
    //Call function to display the event based on the relation of the
    //accessor to that event. Host, Attendee, neither
    id = parseInt(sessionStorage.getItem('id'));
    getEvents(id);
    //Show and hide all the divs in the html under here
        
}

function setUpComponents() {
    $('button#createEvent').on('click', createEvent);
}

function getEvents() {
    userID = parseInt(SessionStorage.getItem('id'));
    user = new User();
    user.create(userID);
    eventsHosted = user.getEventsHosted();
    eventsAttending = user.getEventsAttending();
    visibleEvents = user.getVisibleEvents();
function getEvents(){
userID = parseInt(SessionStorage.getItem('id'));
user = new User();
user.create(userID);
eventsHosted = user.getEventsHosted();
eventsAttending = user.getEventsAttending();

}
function getStringsFromEvents(EventsList){
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
function getVisibleStrings() {
    getStringsFromEvents(visibleEvents);
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
    var event = new Event(user.getID(), eventCat, eventStart, eventEnd, description, eventTitle, eventVis, eventAcc, eventLoc);

}

//What is this??
//To make the call wait. Might need this later
$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
};

function refresh() {
    window.location.href = window.location.href; window.location.reload(true); 
};

$(window).load(setUpComponents);
