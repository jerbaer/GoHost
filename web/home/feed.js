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
    getEvents();
    getProfile();
}
String.prototype.mysqlToDate = String.prototype.mysqlToDate || function() {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1]-1, t[2], t[3]||0, t[4]||0, t[5]||0);
};

function getEvents() {
    user = new User();
    user.create(id);
    user.createVisibleList();
    visibleEvents = user.getVisibleEvents()

    setTimeout(getVisibleStrings(), 10000);
    //this is where it connects with HTML to print the feed in objects
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, eventsFeed;
    var n, url, url2;
    // Find the newestBlogs div that will house newly created blogs
    eventsFeed = $('#eventsFeed');

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
    list.sort(function(a, b) {
    return parseFloat(a.eventStart) - parseFloat(b.eventStart);
});
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
        eventStartTimes[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        var x = list[i].getEventEnd().mysqlToDate();
        eventEndTimes[i] = x.toString().replace("GMT-0600 (Central Standard Time)", "");
        eventCategories[i] = list[i].getCategory();
        eventLocations[i] = list[i].getLocation();
        eventIDs[i] = list[i].getID();
        hostIDs[i] = list[i].getHostID();
    }
}

function getVisibleStrings() {
    getStringsFromEvents(visibleEvents);
}

function getProfile() {
    var url, newA;
    profile1 = new Profile();
    profile1.createFromDB(user, user);
    getStringsFromProfile(profile1);
    // Popualte the html page
    profName = $('#profName');
    url = "../profile/index.html#" + profile1.getIdUser();
    newA = $('<a>').attr('href', url).text(profileName).on('click', function () {
        window.location.href = url;
        window.location.reload(true);
    });
    newH1 = $('<h1>').append(newA);

    profPic = $('#profPic');
    // Do picture stuff

    profDesc = $('#profDesc');
    newP = $('<p>').text(profileDescription);

    profName.append(newH1);
    profDesc.append(newP);
}

function getStringsFromProfile(profile1) {
    profileName = profile1.getName();
    profilePicture = profile1.getPicture();
    profileDescription = profile1.getDescription();
}

$(document).ready(setUpComponents);
