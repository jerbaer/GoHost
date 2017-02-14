/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Classes that I will be interacting with here: Event, User, FriendsList

// Global Variables go under here if they are needed
var id = 0;
var eventid  = 0;
var event = null;
var accessor = null;
var isHost = false;
var isAttendee = false;
var canJoin = false;
function setUpComponents() {
	// Link some buttons to certain functions
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', inviteFriends);
        id = parseInt(sessionStorage.getItem('id'));
        eventid  = parseInt(sessionStorage.getItem('eventid'));
	//Call function to display the event based on the relation of the
        //accessor to that event. Host, Attendee, neither
        getEvent();
        isHost = event.isAccessorHost();
        isAttendee = event.isUserInEvent();
        canJoin = (event.canUserJoin()&&!event.isUserInEvent());
        
        //Show and hide all the divs in the html under here 
}

function getEvent() {
    event =  new Event();
    event.createFromDB(eventid, id);
}

function deleteEvent() {
    event.deleteEvent();
}


function editEvent() {
    //This will get all the input from the edit form and use it call all the
    //edit functions on the event object. After that, it will call the function
    //that flushes all the changes to the database
}


function inviteFriends() {
    //This will pull up a list of the user's friends and then the other button
    //would actually allow you to invite people?
}

//This will be coded in iteration 2.0??
function chat(){
    
}
$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
};

function refresh() {
	window.location.href = window.location.href; window.location.reload(true); 
}

$(window).load(setUpComponents);

