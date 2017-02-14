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
    id = parseInt(SessionStorage.getItem('id'));
}

function getEvents() {
    user = new User();
    user.create(userID);
    visibleEvents = user.getVisibleEvents();
    getVisibleStrings();
    //this is where it connects with HTML to print the feed in objects
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
        eventHosts [i] = EventsList.getEventsList()[i].getHost();
        eventStartTimes[i] = EventsList.getEventsList()[i].getStartTime();
        eventEndTimes[i] = EventsList.getEventsList()[i].getEndTime();
        eventCategories[i] = EventsList.getEventsList()[i].getCategory();
        eventIDs[i] = EventsList.getEventsList()[i].getID();
    }
}
function getVisibleStrings() {
    getStringsFromEvents(visibleEvents);
}