/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var id = 0;
var visibleEvents = null;
var user = null;
var eventTitles;
var eventHosts;
var eventStartTimes;
var eventEndTimes;
var eventCategories;

function setUpComponents() {
    jQuery.ajaxSetup({async:false});
    id = parseInt(sessionStorage.getItem('id'));
    getEvents();
}

function getEvents() {
    user = User;
    user.create(id);
    user.createVisibleList();
    visibleEvents = user.getVisibleEvents()
    
    setTimeout(getVisibleStrings(),10000);
    //this is where it connects with HTML to print the feed in objects
    var newH, newA, newHr,newH1,newH2,newH3,newH4, eventsFeed;
    var n, url;
	// Find the newestBlogs div that will house newly created blogs
	eventsFeed = $('#eventsFeed');

	for(n = visibleEvents.getSize()-1; n > -1; n--){
		url = "event/index.html#" + eventIDs[n];
		newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function() {window.location.href = url; window.location.reload(true);});
                newH1 = $('<h6>').text(eventHosts[n]);
                newH2 = $('<h6>').text(eventStartTimes[n]);
                newH3 = $('<h6>').text(eventEndTimes[n]);
                newH4 = $('<h6>').text(eventCategories[n]);
		newH = $('<h6>').append(newA);
		newHr = $('<hr>');
		
                eventsFeed.append(newHr);
		eventsFeed.append(newH);
                eventsFeed.append(newH1);
                eventsFeed.append(newH2);
                eventsFeed.append(newH3);
                eventsFeed.append(newH4);
		eventsFeed.append(newHr);
	}
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
function getVisibleStrings() {
    getStringsFromEvents(visibleEvents);
}

$(document).ready(setUpComponents);
