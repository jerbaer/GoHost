//Global variables go under here
var eventsHosted = null;
var eventsAttending = null;
var visibleEvents = null;
var user = null;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;
var eventLocations;
var id;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    $('#createEvent').on('click', createEvent);
    $('#attendingtab').on('click', getAttendingStrings);
    $('#hostingtab').on('click', getHostStrings);
    id = parseInt(sessionStorage.getItem('id'));
    getEvents();
    getCategories();
}

function getCategories() {
    var url = "http://143.44.67.0:13774/GoHost/api/category/all";
    $.getJSON(url).done(categoriesFollowUp);
}

function categoriesFollowUp(data) {
    eventsCat = $('#eventCat');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idcategory).text(data[i].name);
        eventsCat.append(newHr);
    }
}

function getEvents() {
    user = new User();
    user.create(id);
    getHostStrings();
}

function getStringsFromEvents(eventList) {
    eventTitles = new Array(eventList.getSize());
    eventHosts = new Array(eventList.getSize());
    eventStartTimes = new Array(eventList.getSize());
    eventEndTimes = new Array(eventList.getSize());
    eventCategories = new Array(eventList.getSize());
    eventLocations = new Array(eventList.getSize());
    eventIDs = new Array(eventList.getSize());
    for (i = 0; i < eventList.getSize(); i++) {
        eventTitles[i] = eventList.getEventsList()[i].getTitle();
        eventHosts [i] = eventList.getEventsList()[i].getHost().getName();
        //var t = eventList.getEventsList()[i].getEventStart().split(/[- T :]/);
        var d = new Date(eventList.getEventsList()[i].getEventStart());
        eventStartTimes[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        var x = new Date(eventList.getEventsList()[i].getEventEnd())
        eventEndTimes[i] = x.toString().replace("GMT-0600 (Central Standard Time)", "");
        eventCategories[i] = eventList.getEventsList()[i].getCategory();
        eventLocations[i] = eventList.getEventsList()[i].getLocation();
        eventIDs[i] = eventList.getEventsList()[i].getID();
    }
}

function getHostStrings() {
    $('#attend').hide();
    $('#attend').empty();
    $('#host').empty();
    if (eventsHosted != null) {
        eventsHosted = null;
    }
    if (eventsAttending != null) {
        eventsAttending = null;
    }
    user.createHostedEventsList();
    eventsHosted = user.getEventsHosting();
    eventTitles = null;
    eventHosts = null;
    eventStartTimes = null;
    eventEndTimes = null;
    eventCategories = null;
    eventLocations = null;
    getStringsFromEvents(eventsHosted);
    var newH, newA, newHr, newH1, newH2, newH3, newH4, newH5, eventsFeed;
    var n, url;
    eventsFeed = $('#host');
    eventsFeed.append('<br />');
    for (n = eventsHosted.getSize() - 1; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n];
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
            sessionStorage.setItem('eventid', eventIDs[n]);
        });
        newH1 = $('<p>').text(eventHosts[n]);
        newH2 = $('<p>').text(eventStartTimes[n]);
        newH3 = $('<p>').text(eventEndTimes[n]);
        newH4 = $('<p>').text(eventCategories[n]);
        newH5 = $('<p>').text(eventLocations[n]);
        newH = $('<p>').append(newA);
        newHr = $('<hr>');
        
        eventsFeed.append(newH);
        eventsFeed.append(newH1);
        eventsFeed.append(newH2);
        eventsFeed.append(newH3);
        eventsFeed.append(newH4);
        eventsFeed.append(newH5);
        eventsFeed.append(newHr);
    }
    $('#host').show();
}

function getAttendingStrings() {
    $('#host').hide();
    $('#host').empty();
    $('#attend').empty();
    if (eventsAttending != null) {
        eventsAttending = null;
    }
    if (eventsHosted != null) {
        eventsHosted = null;
    }
    user.createEventsAttendingList();
    eventsAttending = user.getEventsAttending();
    eventTitles = null;
    eventHosts = null;
    eventStartTimes = null;
    eventEndTimes = null;
    eventCategories = null;
    eventLocations = null;
    getStringsFromEvents(eventsAttending);
    var newH, newA, newHr, newH1, newH2, newH3, newH4, newH5, eventsFeed;
    var n, url;
    eventsFeed = $('#attend');
    eventsFeed.append('<br />');
    for (n = eventsAttending.getSize() -1 ; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n]"
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
            sessionStorage.setItem('eventid', eventIDs[n]);
        });
        newH1 = $('<p>').text(eventHosts[n]);
        newH2 = $('<p>').text(eventStartTimes[n]);
        newH3 = $('<p>').text(eventEndTimes[n]);
        newH4 = $('<p>').text(eventCategories[n]);
        newH4 = $('<p>').text(eventLocations[n]);
        newH = $('<p>').append(newA);
        newHr = $('<hr>');

        eventsFeed.append(newH);
        eventsFeed.append(newH1);
        eventsFeed.append(newH2);
        eventsFeed.append(newH3);
        eventsFeed.append(newH4);
        eventsFeed.append(newH5);
        eventsFeed.append(newHr);
    }
    $('#attend').show();
}

function createEvent() {
    eventTitle = $('#eventTitle').val();
    eventCat = $('#eventCat').val();
    eventStart = $('#eventStart').val();
    eventEnd = $('#eventEnd').val();
    eventLoc = 0//$('#eventLoc').val
    eventVis = $('#eventVis').val();
    eventAcc = $('#eventAcc').val();
    maxAttendees = $('#maxAttendees').val();
    description = $('#description').val();
    event = new Event();
    event.create(user.getID(), eventCat, eventStart, eventEnd, description, eventTitle, eventVis, eventAcc, eventLoc, maxAttendees, user);
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
}

$(window).load(setUpComponents);
