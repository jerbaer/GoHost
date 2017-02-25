/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Event() {
    this.host = null;
    this.category = null;
    this.accessor = null;
    this.idevent = 0;
    this.chat = null;
    this.eventStart = 0;
    this.eventEnd = 0;
    this.eventMax = 0;
    this.description = "";
    this.title = "";
    //visibility and accessibility are still being treated as objects in the code
    this.visibility = 0;
    this.accessibility = 0;
    this.invitedUsers = [];
    this.location = null;
    this.users = [];
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";

    this.createFromDB = function (idevent, accessor1) {
        //fill all the relevant fields from SQL, get accessor from session, create objects
        //for category, user, host, location, visibility, accessibili
        var url = this.coreUrl + "event/" + idevent;
        this.accessor = accessor1;

        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.createFollowUp
        });
    };
    this.createFollowUp = function (data) {
        this.host = new User();//Is this how you construct a user?
        this.host.create(data.idhost);
        this.idevent = data.idevent;
        this.chat = null;//Add this in iteration 2.0
        this.eventStart = data.starttime;
        this.eventEnd = data.endtime;
        this.eventMax = data.maxattendees;
        this.description = data.description;
        this.title = data.title;
        this.location = new Location(data.idlocation);
        this.category = new Category(data.idcategory);//Is this how you construct a cat?
        this.accessibility = data.accessibility;
        this.visibility = data.visibility;
    };


    this.invitedFollowUp = function (data) {
        for (n = 0; n < data.length; n++) {
            this.invitedUsers[n] = data[n].iduser;
        }
    };

    this.attendeeFollowUp = function (data) {
        for (n = 0; n < data.length; n++) {
            this.users[n] = data[n].iduser;
        }
    };

    this.create = function (idhost, idcategory, eventStart, eventEnd, description, title, idvisibility, idaccessibility, idlocation, eventMax) {
        //creates a user from the idhost, category from idcategory, visibility from idvisibility/idaccessibility, location from idlocation, all other fields are filled from parameters
        //if accessibility is 1, add all friends to invited list. Add the created object to the database.
        //Won't let me use this.
        var event = {title: title, idhost: idhost, maxattendees: eventMax, /*idlocation: idlocation,*/ idvisibility: idvisibility, idaccessibility: idaccessibility, /*starttime: eventStart, endtime: eventEnd,*/ description: description, idcategory: idcategory};
        $.ajax({
            url: this.coreUrl + "event",
            type: 'post',
            data: JSON.stringify(event),
            contentType: 'application/json',
            dataType: 'json',
            async: false
                    //success: Event.createFollowUp2
        });
    };

    this.createFollowUp2 = function (id) {
        //Stores the id of the event row recently added to the database
        idevent = id;
    };

    this.isAccessorHost = function () {
        if (this.accessor.getID() === this.host.getID()) {
            return true;
        } else
            return false;

    };
    this.isUserInEvent = function () {
        for (i = 0; i < this.users.size(); i++) {
            if (this.accessor.getID() === this.user[i].getID()) {
                return true;
            }
        }
        return false;
    };
    this.closeEvent = function () {
        //Is this the right way to declare a variable?
        access = 3;
        this.accessibility = access;
    };

    //deletes all mentions of event from database
    this.deleteEvent = function () {
        //Deletes event from event table
        $.ajax({
            url: this.coreUrl + 'event$idevent=' + this.idevent,
            type: 'DELETE'
        });
        //Deletes all attendee rows of this event
        $.ajax({
            url: this.coreUrl + 'attendee$idevent=' + this.idevent,
            type: 'DELETE'
        });
        //Delets all invited rows of this evnet
        $.ajax({
            url: this.coreUrl + 'invited$idevent=' + this.idevent,
            type: 'DELETE'
        });
        //Delets all messages of this event
        $.ajax({
            url: this.coreUrl + 'message$idevent=' + this.idevent,
            type: 'DELETE'
        });
        //Deletes all notifications of this event
        $.ajax({
            url: this.coreUrl + 'notification$idevent=' + this.idevent,
            type: 'DELETE'
        });
    };
    this.isEventFull = function () {
        if (this.accessibility === 3) {
            return true;
        } else
            return false;
    };
    this.addUserToEvent = function (iduser) {
        //adds user to the users array as well as the database and refresh
        n = this.users.length;
        this.users[n] = iduser;
        var user = {iduser: iduser, idevent: idevent};
        $.ajax({
            url: this.coreUrl + 'attendee',
            type: 'POST',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
    this.canUserJoin = function () {
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
    };
    this.canUserSee = function () {
        if (this.visibility.getID() === 2) {
            return true;
            //} else if (this.host.isFriendsWith(accessor) && this.visibility.getID()== 1){
            //    return true;
        } else
            return false;
    };
    this.editDescription = function (description) {
        this.description = description;
    };
    this.editStartTime = function (startTime) {
        this.startTime = startTime;
    };
    this.editEndTime = function (endTime) {
        this.endTime = endTime;
    };

    this.editTitle = function (title) {
        this.title = title;
    };

    this.editCategory = function (category) {
        this.category = category;
    };
    this.editLocation = function (location) {
        this.location = location;
    };
    this.editVisibility = function (visibility) {
        this.visibility = visibility;
    };

    this.editAccessiblity = function (accessibility) {
        this.accessibility = accessibility;
    };

    this.editMax = function (max) {
        this.eventMax = max;
    };

    this.getEventStart = function () {
        return this.eventStart;
    };

    this.getEventEnd = function () {
        return this.eventEnd;
    };

    this.getHost = function () {
        return this.host;
    };

    this.getCategory = function () {
        return this.category;
    };

    this.getTitle = function () {
        return this.title;
    };

    this.getLocation = function () {
        return this.location.getName();
    };

    this.getDescription = function () {
        return this.description;
    };

    this.getUsers = function () {
        return Event.users;
    };

    this.getID = function () {
        return this.idevent;
    };

    this.refreshEdits = function () {
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
    };
}


