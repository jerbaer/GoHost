// Going to work with User, FriendsList

//Global variables
var id;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    getPeople;
}

function getPeople() {
    user = new User();
    user.create(id);
    getFriends();
}

function getFriends() {
    
}

// For strangers will need to get a FriendsList of not friends
function getStringsFromPeople(friendsList) {
    peopleNames = new Array(friendsList.getSize());
    peoplePhotoURLs = new Array(friendsList.getSize());
    peopleDescription = new Array(friendsList.getSize());
    
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
        var d = eventList.getEventsList()[i].getEventStart().mysqlToDate();
        eventStartTimes[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        var x = eventList.getEventsList()[i].getEventEnd().mysqlToDate();
        eventEndTimes[i] = x.toString().replace("GMT-0600 (Central Standard Time)", "");
        eventCategories[i] = eventList.getEventsList()[i].getCategory();
        eventLocations[i] = eventList.getEventsList()[i].getLocation();
        eventIDs[i] = eventList.getEventsList()[i].getID();
    }
}
