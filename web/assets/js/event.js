/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Investigate if all the urls are correct
Event = {
    host: null,
    category: null,
    accessor: null,
    idevent: 0,
    chat: null,
    eventStart: 0,
    eventEnd: 0,
    eventMax: 0,
    description: "",
    title: "",
    //visibility and accessibility are still being treated as objects in the code
    visibility: null,
    accessibility: null,
    invitedUsers: [],
    location: null,
    users: [],
    coreUrl: "http://" + window.location.host + "/GoHost/api/",
    createFromDB: function (idevent, iduser) {
        //fill all the relevant fields from SQL, get accessor from session, create objects
        //for category, user, host, location, visibility, accessibility
        var url = Event.coreUrl + "event?idevent="+idevent;
        accessor = new User;
        accessor.create(iduser)
        $.getJSON(url).done(Event.createFollowUp);
    },
    createFollowUp: function(data){
        Event.accessor = parseInt(sessionStorage.getItem('id'));
        Event.host = Event.accessor;
        idevent = data.idevent;
        chat = null;//Add this in iteration 2.0
        eventStart = data.starttime;
        eventEnd = data.endtime;
        eventMax = data.maxattendees;
        description = data.description;
        title = data.title;
        location = new Location(data.idlocation);
        category = new Category(data.idcategory);
        var url = Event.coreUrl + "invited?idevent="+idevent;
        $.getJSON(url).done(Event.invitedFollowUp);
        var url1 = Event.coreUrl + "attendee?idevent="+idevent;
        $.getJSON(url1).done(Event.attendeeFollowUp);
    },
    
    invitedFollowUp: function(data){
        for (n=0; n<data.length;n++){
            invitedUsers[n] = data[n].iduser;
        }
    },
    
    attendeeFollowUp: function(data){
        for (n=0; n<data.length;n++){
            users[n] = data[n].iduser;
        }
    },
    
    create: function (idhost, idcategory, eventStart, eventEnd, eventMax, description, title, idvisibility, idaccessibility, idlocation) {
        //creates a user from the idhost, category from idcategory, visibility from idvisibility/idaccessibility, location from idlocation, all other fields are filled from parameters
        //if accessibility is 1, add all friends to invited list. Add the created object to the database.
        var event = {title: title,idhost: idhost,maxattendees: eventMax,idlocation: idlocation,idvisibility: idvisibility,idaccessibility: idaccessibility,starttime: eventStart,endtime: eventEnd,description: description,idcategory: idcategory};
		$.ajax({
		  url:'http://143.44.10.35/GoHost/api/event',
		  type:'POST',
		  data:JSON.stringify(event),
		  contentType:'application/json',
		  dataType:'json',
		  success: createFollowUp2
		});
    },
    
    createFollowUp2: function(id){
        //Stores the id of the event row recently added to the database
        idevent = id;
    },
    
    isAccessorHost: function () {
        if (this.accessor.getID() == this.host.getID()) {
            return true
        } else
            return false;

    },
    isUserInEvent: function () {
        for (i = 0; i < this.users.size(); i++) {
            if (this.accessor.getID() == this.user[i].getID()) {
                return true;
            }
        }
        return false;
    },
    closeEvent: function () {
        access = new accessibility(3)
        this.accessibility = access;
    },
    
    //deletes all mentions of event from database
    deleteEvent: function () {
                //Deletes event from event table
		$.ajax({
		  url:'http://143.44.10.35/GoHost/api/event$idevent=' + idevent,
		  type:'DELETE'
		});
                //Deletes all attendee rows of this event
                $.ajax({
		  url:'http://143.44.10.35/GoHost/api/attendee$idevent=' + idevent,
		  type:'DELETE'
		});
                //Delets all invited rows of this evnet
                $.ajax({
		  url:'http://143.44.10.35/GoHost/api/invited$idevent=' + idevent,
		  type:'DELETE'
		});
                //Delets all messages of this event
                $.ajax({
		  url:'http://143.44.10.35/GoHost/api/message$idevent=' + idevent,
		  type:'DELETE'
		});
                //Deletes all notifications of this event
                $.ajax({
		  url:'http://143.44.10.35/GoHost/api/notification$idevent=' + idevent,
		  type:'DELETE'
		});
    },
    isEventFull: function () {
        if (this.accessibility.getID() == 3) {
            return true;
        } else
            return false;
    },
    addUserToEvent: function (iduser) {
        //adds user to the users array as well as the database and refresh
        n= users.length;
        users[n] = iduser;
        var user = {iduser: iduser, idevent: idevent};
		$.ajax({
		  url:'http://143.44.10.35/GoHost/api/attendee',
		  type:'POST',
		  data:JSON.stringify(user),
		  contentType:'application/json',
		  dataType:'json',
		});
    },
    canUserJoin: function () {
        if (this.accessibility.getID() == 0) {
            return true;
        } else {
            for (i = 0; i < this.invited.size(); i++) {
                if (this.accessor.getID() == this.invited[i].getID() && (this.accessibility==1||this.accessibility==2)) {
                    return true;
                }
            }
            return false;
        }
    },
    canUserSee: function(){
        if (this.visibility.getID() == 0){
            return true;
        } else if (this.host.isFriendsWith(accessor) && this.visibility.getID()== 1){
            return true;
        } else return false;
    },
    editDescription: function(description){
        this.description = description;
    },
    editStartTime: function(startTime){
        this.startTime = startTime;
    },
    editEndTime: function(endTime){
        this.endTime = endTime;
    },
    
    getEventStart : function(){
        return eventStart;
    },
    
    getEventEnd : function(){
        return eventEnd;
    },
    
    getHost : function(){
        return host;
    },
    
    getCategory : function(){
        return category;
    },
    
    getTitle : function(){
        return title;
    },
    
    getidEvent : function(){
        return idevent;
    },
    
    getLocation : function(){
        return location.getName();
    },
    
    getDescription : function(){
        return description;
    },
    
    getUsers : function(){
        return users;
    },
    
    refreshEdits: function(){
        var event = {title: title,idhost: host,maxattendees: eventMax,idlocation: location.idlocation,idvisibility: visibility,idaccessibility: accessibility,starttime: eventStart,endtime: eventEnd,description: description,idcategory: category.idcategory};
		$.ajax({
		  url:'http://143.44.10.35/GoHost/api/event',
		  type:'PUT',
		  data:JSON.stringify(user),
		  contentType:'application/json',
		  dataType:'json',
		});
        //This will have a put request that updates the db with all the edits 
        //That might have happened to the event object. We will call this 
        //End-all function everytime an edit happens
    },
};


