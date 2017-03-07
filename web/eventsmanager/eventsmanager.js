//Global variables go under here
var eventsHosted = null;
var eventsAttending = null;
var visibleEvents = null;
var user = null;
var list;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;
var eventLocations;
var id;
String.prototype.mysqlToDate = String.prototype.mysqlToDate || function () {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
};

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    $('#createEvent').on('click', createEvent);
    $('#attendingtab').on('click', getAttendingStrings);
    $('#hostingtab').on('click', getHostStrings);
    id = parseInt(sessionStorage.getItem('id'));
    getEvents();
    getCategories();
    getLocations();
    inbox = new Inbox();
    inbox.create(id);
    inbox.getNotifications();
    if (inbox.areUnread()) {
        $('#bell').addClass('text-warning');
    }
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
    for (var i = 0; i < data.length; i++) {
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

function getEvents() {
    user = new User();
    user.create(id);
    getHostStrings();
}

function getStringsFromEvents(eventList) {
    list = eventList.getEventsList();
    list.sort(function (a, b) {
        if (a.eventStart > b.eventStart)
            return -1;
        else if (a.eventStart < b.eventStart)
            return 1;
        else
            return 0;
    });
    list.sort;
    eventTitles = new Array(list.length);
    eventHosts = new Array(list.length);
    eventStartTimes = new Array(list.length);
    eventEndTimes = new Array(list.length);
    eventCategories = new Array(list.length);
    eventLocations = new Array(list.length);
    eventIDs = new Array(list.length);
    hostIDs = new Array(list.length);
    for (i = 0; i < list.length; i++) {
        eventTitles[i] = list[i].getTitle();
        eventHosts [i] = list[i].getHost().getName();
        //var t = list[i].getEventStart().split(/[- T :]/);
        var d = list[i].getEventStart().mysqlToDate();
        eventStartTimes[i] = d.toString().substring(0, 21);
        var x = list[i].getEventEnd().mysqlToDate();
        eventEndTimes[i] = x.toString().substring(0, 21);
        eventCategories[i] = list[i].getCategory();
        eventLocations[i] = list[i].getLocation();
        eventIDs[i] = list[i].getID();
        hostIDs[i] = list[i].getHostID();
    }
}

function getHostStrings() {
    $('#attend').hide();
    $('#attend').empty();
    $('#host').empty();
    if (eventsHosted !== null) {
        eventsHosted = null;
    }
    if (eventsAttending !== null) {
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
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, eventsList;
    var n, url, url2;
    eventsList = $('#host');
    eventsList.append('<br />');
    for (n = eventsHosted.getSize() - 1; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n];
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        url2 = "../profile/index.html#" + hostIDs[n];
        newA2 = $('<a>').attr('href', url2).text(eventHosts[n]).on('click', function () {
            window.location.href = url2;
            window.location.reload(true);
        });
        newH2 = $('<p>').text(eventStartTimes[n]);
        newH3 = $('<p>').text(eventEndTimes[n]);
        newH4 = $('<p>').text(eventCategories[n]);
        newH5 = $('<p>').text(eventLocations[n]);
        newH = $('<h4>').append(newA);
        newH1 = $('<p>').append(newA2);
        newHr = $('<hr>');

        eventsList.append(newH);
        eventsList.append(newH1);
        eventsList.append(newH2);
        eventsList.append(newH3);
        eventsList.append(newH4);
        eventsList.append(newH5);
        eventsList.append(newHr);
    }
    $('#host').show();
}

function getAttendingStrings() {
    $('#host').hide();
    $('#host').empty();
    $('#attend').empty();
    if (eventsAttending !== null) {
        eventsAttending = null;
    }
    if (eventsHosted !== null) {
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
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, eventsList;
    var n, url, url2;
    eventsList = $('#attend');
    eventsList.append('<br />');
    for (n = eventsAttending.getSize() - 1; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n];
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        url2 = "../profile/index.html#" + hostIDs[n];
        newA2 = $('<a>').attr('href', url2).text(eventHosts[n]).on('click', function () {
            window.location.href = url2;
            window.location.reload(true);
        });
        newH2 = $('<p>').text(eventStartTimes[n]);
        newH3 = $('<p>').text(eventEndTimes[n]);
        newH4 = $('<p>').text(eventCategories[n]);
        newH5 = $('<p>').text(eventLocations[n]);
        newH = $('<h4>').append(newA);
        newH1 = $('<p>').append(newA2);
        newHr = $('<hr>');

        eventsList.append(newH);
        eventsList.append(newH1);
        eventsList.append(newH2);
        eventsList.append(newH3);
        eventsList.append(newH4);
        eventsList.append(newH5);
        eventsList.append(newHr);
    }
    $('#attend').show();
}

function createEvent() {
    var today = new Date();
    var startDate = new Date($('#eventStart').val());
    var endDate = new Date($('#eventEnd').val());
    if ($('#eventTitle').val() === '') {
        $('#invTitleModal').modal('show');
    } else if ($('#eventStart').val() === '' || $('eventEnd').val() === '') {
        $('#invTimeModal').modal('show');
    } else if (startDate < today) {
        $('#invTimeModal').modal('show');
    } else if (startDate > endDate) {
        $('#invTimeModal').modal('show');
    } else {
        eventTitle = $('#eventTitle').val();
        eventStart = $('#eventStart').val();
        eventEnd = $('#eventEnd').val();
        eventCat = $('#eventCat').val();
        eventLoc = $('#eventLoc').val() + 1;
        eventVis = $('#eventVis').val();
        eventAcc = $('#eventAcc').val();
        maxAttendees = $('#maxAttendees').val();
        description = $('#description').val();
        event = new Event();
        event.create(user.getID(), eventCat, eventStart, eventEnd, description, eventTitle, eventVis, eventAcc, eventLoc, maxAttendees, user);
        window.location.reload();
    }
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
