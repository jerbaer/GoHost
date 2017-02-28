var id = 0;
var visibleEvents = null;
var user = null;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;
var eventLocations;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    getEvents();
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
    var newH, newA, newHr, newH1, newH2, newH3, newH4, newH5, eventsFeed;
    var n, url;
    // Find the newestBlogs div that will house newly created blogs
    eventsFeed = $('#eventsFeed');

    for (n = visibleEvents.getSize() - 1; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n];
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
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
        var d = eventList.getEventsList()[i].getEventStart().mysqlToDate();
        eventStartTimes[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        var x = eventList.getEventsList()[i].getEventEnd().mysqlToDate();
        eventEndTimes[i] = x.toString().replace("GMT-0600 (Central Standard Time)", "");
        eventCategories[i] = eventList.getEventsList()[i].getCategory();
        eventLocations[i] = eventList.getEventsList()[i].getLocation();
        eventIDs[i] = eventList.getEventsList()[i].getID();
    }
}

function getVisibleStrings() {
    getStringsFromEvents(visibleEvents);
}

function getProfile() {
    profile1 = new Profile();
    profile1.createFromDB(user, user);
    getStringsFromProfile(profile1);
    // Popualte the html page
    profName = $('#profName');
    newH1 = $('<h1>').text(profileName);

    profPic = $('#profPic');
    // Do picture stuff

    profDesc = $('#profDesc');
    newP = $('<p>').text(profileDescription);

    profName.append(newH1);
    profDesc.append(hewP);
}

function getStringsFromProfile(profile1) {
    profileName = profile1.getName();
    profilePicture = profile1.getPicture();
    profileDescription = profile1.getDescriprion();
}

$(document).ready(setUpComponents);
