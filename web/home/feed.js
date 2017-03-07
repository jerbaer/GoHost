var id = 0;
var visibleEvents = null;
var user = null;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;
var eventLocations;
var eventIDs;
var hostIDs;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));

    user = new User();
    user.create(id);
    inbox = new Inbox();
    inbox.create(id);
    inbox.getNotifications();
    if (inbox.areUnread()) {
        $('#bell').addClass('text-warning');
    }

    getEvents();
    getProfile();
    getCategories();
    getLocations();
    profPic = $('#profPic');
    user.createProfile(user);
    profPic.attr('src', user.getPicture());
    $('#categoryButton').on('click', function () {
        visibleEvents.getEventsByCategory($('#category').val());
        setTimeout(getStringsFromEvents(visibleEvents), 10000);
        populateFeed();
    });
    $('#locationButton').on('click', function () {
        visibleEvents.getEventsByLocation($('#location').val());
        setTimeout(getStringsFromEvents(visibleEvents), 10000);
        populateFeed();
    });
    $('#refreshPage').on('click', refresh);
}

String.prototype.mysqlToDate = String.prototype.mysqlToDate || function () {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
};

function getEvents() {
    user.createVisibleList();
    visibleEvents = user.getVisibleEvents();

    setTimeout(getStringsFromEvents(visibleEvents), 10000);
    populateFeed();
}

function populateFeed() {
    //this is where it connects with HTML to print the feed in objects
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, eventsFeed;
    var n, url, url2;
    // Find the newestBlogs div that will house newly created blogs
    eventsFeed = $('#eventsFeed');
    eventsFeed.empty();

    for (n = visibleEvents.getSize() - 1; n > -1; n--) {
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

        eventsFeed.append(newH);
        eventsFeed.append(newH1);
        eventsFeed.append(newH2);
        eventsFeed.append(newH3);
        eventsFeed.append(newH4);
        eventsFeed.append(newH5);
        eventsFeed.append(newHr);
    }
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
    for (var i = 0; i < list.length; i++) {
        var currentDate = new Date();
        if (list[i].getEventStart().mysqlToDate()<currentDate){
            list[i].deleteEvent();
        }else{
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
}

function getProfile() {
    var url, newA;
    profile1 = new Profile();
    profile1.createFromDB(user, user);
    // Popualte the html page
    profName = $('#profName');
    url = "../profile/index.html#" + profile1.getIdUser();
    newA = $('<a>').attr('href', url).text(profile1.getName()).on('click', function () {
        window.location.href = url;
        window.location.reload(true);
    });
    newH1 = $('<h1>').append(newA);

    profPic = $('#profPic');
    profPic.attr('src', profile1.getPicture());

    profName.append(newH1);
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
    eventsCat = $('#category');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idcategory).text(data[i].name);
        eventsCat.append(newHr);
    }
}

function locationsFollowUp(data) {
    eventsLoc = $('#location');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idlocation).text(data[i].name);
        eventsLoc.append(newHr);
    }
}
function refresh() {
    //window.location.href = window.location.href; // this is weird
    window.location.reload(true);
}

$(document).ready(setUpComponents);
