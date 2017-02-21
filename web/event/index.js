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
var canSee = false;
function setUpComponents() {
	// Link some buttons to certain functions
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', inviteFriends);
        id = parseInt(sessionStorage.getItem('id'));
        eventid = (window.location.href.split('#'))[1];
        accessor = User;
        accessor.create(id);
        
	//Call function to display the event based on the relation of the
        //accessor to that event. Host, Attendee, neither
        getEvent();
        if(event.getHost().getID() == accessor.getID()){
            isHost = true;
        }
        isHost = event.isAccessorHost();
        isAttendee = event.isUserInEvent();
        canJoin = (event.canUserJoin()&&!event.isUserInEvent());
        canSee = event.canUserSee();
        //eventDetails, joinEvent, hostOnly
        if(isHost){
            $('#joinEvent').hide();
        } else if (isAttendee){
            $('#joinEvent').hide();
            $('#hostOnly').hide();
        } else if (canJoin){
            $('#hostOnly').hide();
        } else if (!canSee){
            $('#eventDetails').hide();
            $('#joinEvent').hide();
            $('#hostOnly').hide();
        }
        //Show and hide all the divs in the html under here 
}

function getEvent() {
    event =  new Event();
    event.createFromDB(eventid, accessor);
}

function deleteEvent() {
    event.deleteEvent();
}


function editEvent() {
    //This will get all the input from the edit form and use it call all the
    //edit functions on the event object. After that, it will call the function
    //that flushes all the changes to the database
    event.editDescription($('#description').val());
    event.editTitle($('#eventTitle').val());
    //Need to make sure these two have proper values
    event.editStartTime($('#eventStart').val());
    event.editEndTime($('#eventEnd').val());
    //These two need to be creating objects on the other end
    event.editCategory($('#eventCat').val());
    event.editLocation($('#eventLoc').val());
    //These two need to be converted to 0,1,2
    event.editAccessiblity($('#eventAcc').val());
    event.editVisibility($('#eventVis').val());
    //Flushes everything to the database
    event.refreshEdits();
}


function inviteFriends() {
    //This will pull up a list of the user's friends and then the other button
    //would actually allow you to invite people?
}

function getStringFromEvent() {
    
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

