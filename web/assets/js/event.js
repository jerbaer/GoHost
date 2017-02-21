/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    visibility: 0,
    accessibility: 0,
    invitedUsers: [],
    location: null,
    users: [],
    coreUrl: "http://143.44.67.0:13774/GoHost/api/",

    createFromDB: function (idevent, accessor) {
        //fill all the relevant fields from SQL, get accessor from session, create objects
        //for category, user, host, location, visibility, accessibility
        var url = Event.coreUrl + "event/" + accessor.getID();
        Event.accessor = accessor
        $.getJSON(url).done(Event.createFollowUp);
    },
    createFollowUp: function (data) {
        Event.host = User;
        Event.host.create(data.idhost);
        Event.idevent = data.idevent;
        Event.chat = null;//Add this in iteration 2.0
        Event.eventStart = data.starttime;
        Event.eventEnd = data.endtime;
        Event.eventMax = data.maxattendees;
        Event.description = data.description;
        Event.title = data.title;
        //location = new Location(data.getIdlocation);
        Event.category = Object.create(Category);
        Event.category.create(data.idcategory);
        Event.accessibility = data.accessibility;
        Event.visibility = data.visibility;
        //var url = Event.coreUrl + "invited?idevent="+idevent;
        //$.getJSON(url).done(Event.invitedFollowUp);
        //var url1 = Event.coreUrl + "attendee?idevent="+idevent;
        //$.getJSON(url1).done(Event.attendeeFollowUp);
    },

    invitedFollowUp: function (data) {
        for (n = 0; n < data.length; n++) {
            invitedUsers[n] = data[n].iduser;
        }
    },

    attendeeFollowUp: function (data) {
        for (n = 0; n < data.length; n++) {
            users[n] = data[n].iduser;
        }
    },

    create: function (idhost, idcategory, eventStart, eventEnd, eventMax, description, title, idvisibility, idaccessibility, idlocation) {
        //creates a user from the idhost, category from idcategory, visibility from idvisibility/idaccessibility, location from idlocation, all other fields are filled from parameters
        //if accessibility is 1, add all friends to invited list. Add the created object to the database.
        var event = {title: title, idhost: idhost, maxattendees: eventMax, /*idlocation: idlocation,*/ idvisibility: idvisibility, idaccessibility: idaccessibility, /*starttime: eventStart, endtime: eventEnd,*/ description: description, idcategory: idcategory};
        $.ajax({
            url: Event.coreUrl + "event",
            type: 'POST',
            data: JSON.stringify(event),
            contentType: 'application/json',
            dataType: 'json'
            //success: Event.createFollowUp2
        });
    },

    //createFollowUp2: function (id) {
        //Stores the id of the event row recently added to the database
        //idevent = id;
    //},

    isAccessorHost: function () {
        if (this.accessor.getID() === this.host.getID()) {
            return true;
        } else
            return false;

    },
    isUserInEvent: function () {
        for (i = 0; i < this.users.size(); i++) {
            if (this.accessor.getID() === this.user[i].getID()) {
                return true;
            }
        }
        return false;
    },
    closeEvent: function () {
        access = 3;
        this.accessibility = access;
    },

    //deletes all mentions of event from database
    deleteEvent: function () {
        //Deletes event from event table
        $.ajax({
            url: coreUrl + 'event$idevent=' + idevent,
            type: 'DELETE'
        });
        //Deletes all attendee rows of this event
        $.ajax({
            url: coreUrl + 'attendee$idevent=' + idevent,
            type: 'DELETE'
        });
        //Delets all invited rows of this evnet
        $.ajax({
            url: coreUrl + 'invited$idevent=' + idevent,
            type: 'DELETE'
        });
        //Delets all messages of this event
        $.ajax({
            url: coreUrl + 'message$idevent=' + idevent,
            type: 'DELETE'
        });
        //Deletes all notifications of this event
        $.ajax({
            url: coreUrl + 'notification$idevent=' + idevent,
            type: 'DELETE'
        });
    },
    isEventFull: function () {
        if (this.accessibility.getID() === 3) {
            return true;
        } else
            return false;
    },
    addUserToEvent: function (iduser) {
        //adds user to the users array as well as the database and refresh
        n = users.length;
        users[n] = iduser;
        var user = {iduser: iduser, idevent: idevent};
        $.ajax({
            url: coreUrl + 'attendee',
            type: 'POST',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    },
    canUserJoin: function () {
        if (this.accessibility.getID() === 2) {
            return true;
        } //else {
        //for (i = 0; i < this.invited.size(); i++) {
        //   if (this.accessor.getID() == this.invited[i].getID() && (this.accessibility==1||this.accessibility==0)) {
        //        return true;
        //    }
        //  }
        //  return false;
        // }
    },
    canUserSee: function () {
        if (this.visibility.getID() === 2) {
            return true;
            //} else if (this.host.isFriendsWith(accessor) && this.visibility.getID()== 1){
            //    return true;
        } else
            return false;
    },
    editDescription: function (description) {
        Event.description = description;
    },
    editStartTime: function (startTime) {
        Event.startTime = startTime;
    },
    editEndTime: function (endTime) {
        Event.endTime = endTime;
    },

    editTitle: function (title) {
        Event.title = title;
    },

    editCategory: function (category) {
        Event.category = category;
    },
    editLocation: function (location) {
        Event.location = location;
    },
    editVisibility: function (visibility) {
        Event.visibility = visibility;
    },

    editAccessiblity: function (accessibility) {
        Event.accessibility = accessibility;
    },

    editMax: function (max) {
        Event.eventMax = max;
    },

    getEventStart: function () {
        return Event.eventStart;
    },

    getEventEnd: function () {
        return Event.eventEnd;
    },

    getHost: function () {
        return Event.host;
    },

    getCategory: function () {
        return Event.category;
    },

    getTitle: function () {
        return Event.title;
    },

    getLocation: function () {
        return location.getName();
    },

    getDescription: function () {
        return Event.description;
    },

    getUsers: function () {
        return Event.users;
    },

    getID: function () {
        return Event.idevent;
    },

    refreshEdits: function () {
        var event = {title: title, idhost: host, maxattendees: eventMax, idlocation: location.idlocation, idvisibility: visibility, idaccessibility: accessibility, starttime: eventStart, endtime: eventEnd, description: description, idcategory: category.idcategory};
        $.ajax({
            url: coreUrl + 'event',
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
        //This will have a put request that updates the db with all the edits 
        //That might have happened to the event object. We will call this 
        //End-all function everytime an edit happens
    }
};


