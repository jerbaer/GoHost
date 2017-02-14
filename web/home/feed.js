/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var id = 0;
var visibleEvents = null
var user = null
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;
function setUpComponents() {
    //id = parseInt(SessionStorage.getItem('id'));
    id = 8;
    sessionStorage.setItem("id", 8);
    getEvents();
}

function getEvents() {
    user = new User();
    user.create(id);
    visibleEvents = user.getVisibleEvents();
    getVisibleStrings();
    //this is where it connects with HTML to print the feed in objects
    var newH, newA, newHr,newH1,newH2,newH3,newH4, eventsFeed;
    var n, url;
	// Find the newestBlogs div that will house newly created blogs
	eventsFeed = $('#eventsFeed');
	
	for(n = visibleEvents.getSize-1; n > -1; n--){
		url = "event/index.html";
		newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function() {window.location.href = url; window.location.reload(true); });
                newH1 = $('<a>').text(eventHosts[n]);
                newH2 = $('<a>').text(eventStartTimes[n]);
                newH3 = $('<a>').text(eventEndTimes[n]);
                newH4 = $('<a>').text(eventCategories[n]);
		newH = $('<h6>').append(newA);
		newHr = $('<hr>');
		
		eventsFeed.append(newH);
                eventsFeed.append(newH1);
                eventsFeed.append(newH2);
                eventsFeed.append(newH3);
                eventsFeed.append(newH4);
		eventsFeed.append(newHr);
	}
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
        eventHosts [i] = EventsList.getEventsList()[i].getHost().getName();
        eventStartTimes[i] = EventsList.getEventsList()[i].getStartTime();
        eventEndTimes[i] = EventsList.getEventsList()[i].getEndTime();
        eventCategories[i] = EventsList.getEventsList()[i].getCategory().getName();
        eventIDs[i] = EventsList.getEventsList()[i].getID();
    }
}
function getVisibleStrings() {
    getStringsFromEvents(visibleEvents);
}
$(document).ready(setUpComponents);