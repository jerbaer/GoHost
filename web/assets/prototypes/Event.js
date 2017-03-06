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
    this.eventStart = "";
    this.eventEnd = "";
    this.eventMax = 0;
    this.description = "";
    this.title = "";
    this.visibility = 0;
    this.accessibility = 0; //0 means open to everyone, 1 means friends can join without request, 2, everyone must request
    this.invitedUsers = [];
    this.location = null;
    this.users = [];
    this.tempID;
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
        this.host = new User(); // Is this how you construct a user?
        this.host.create(data.idhost);
        this.idevent = data.idevent;
        this.chat = null; // Adding this in iteration 2.0
        this.eventStart = data.starttime;
        this.eventEnd = data.endtime;
        this.eventMax = data.maxattendees;
        this.description = data.description;
        this.title = data.title;
        this.location = new Location(data.idlocation); // throwing an error here
        this.location.retrieveName();
        this.category = new Category(data.idcategory);
        this.category.retrieveName();
        this.accessibility = data.accessibility;
        this.visibility = data.visibility;
        this.getUsersAttending();
        this.getInvitedUsers();
        // Need to populate users
    };

    this.create = function (idhost, idcategory, eventStart, eventEnd, description, title, idvisibility, idaccessibility, idlocation, eventMax) {
        this.tempID = idhost;
        var event = {title: title, idhost: idhost, maxattendees: parseInt(eventMax), idlocation: idlocation, visibility: parseInt(idvisibility), accessibility: parseInt(idaccessibility), starttime: new Date(eventStart), endtime: new Date(eventEnd), description: description, idcategory: parseInt(idcategory)};
        $.ajax({
            url: this.coreUrl + "event",
            type: 'post',
            data: JSON.stringify(event),
            contentType: 'application/json',
            dataType: 'json',
            context: this,
            async: false,
            success: this.createFollowUp2
        });
    };

    this.createFollowUp2 = function (data) { //when PeopleList is working, do some of this stuff
        var id = parseInt(data.idevent);
        var attendee = {iduser : this.tempID, idevent : id};
        $.ajax({
            url: this.coreUrl + "attendee",
            type: 'POST',
            data: JSON.stringify(attendee),
            context: this,
            contentType: 'application/json',
            dataType: 'json',
            async: false
        });
        if (data.visibility == 1){
            var user = new User();
            user.create(this.tempID);
            var PeopleList = user.getPeopleList();
            for(var i = 0; i<PeopleList.getSize(); i++){
            var attending = {iduser: user.getPeopleList().getFriendsList()[i].getID(), idevent: id}; 
            $.ajax({
            url: this.coreUrl + "invited",
            type: 'POST',
            data: JSON.stringify(attending),
            context: this,
            contentType: 'application/json',
            dataType: 'json',
            async: true,
        });
                
            }
        }
    };
    this.getListofAttendees = function () {
        return this.users;
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
    
    this.getHostID = function () {
        return this.host.getID();
    }

    this.getCategory = function () {
        return this.category.getName();
    };
    
    this.getCategoryID = function () {
        return this.category.getID();
    };

    this.getTitle = function () {
        return this.title;
    };

    this.getLocation = function () {
        return this.location.getName();
    };
    this.getLocationID = function () {
        return this.location.getID();
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

    this.isAccessorHost = function () {
        if (this.accessor.getID() === this.host.getID()) {
            return true;
        } else
            return false;
    };
    
    this.isUserInEvent = function () {
        for (i = 0; i < this.users.length; i++) {
            if (this.accessor.getID() === this.users[i].getID()) {
                return true;
            }
        }
        return false;
    };
    
    this.isAccessorInEvent = function (accessor) {
        for (i = 0; i < this.users.length; i++) {
            if (accessor.getID() === this.users[i].getID()) {
                return true;
            }
        }
        return false;
    };
    
    this.isEventFull = function () {
        if (this.accessibility === 3) {
            return true;
        } else
            return false;
    };
    
    this.isOpenEvent = function () {
        if(this.accessibility === 0) // if event is open
            return true;
        return false;
    };
    
    this.canUserJoin = function () {
        if (this.accessibility === 0) {
            return true;
        } else {
        for (i = 0; i < this.invitedUsers.length; i++) {
           if (this.accessor.getID() == this.invitedUsers[i].getID()) {
                return true;
           }
          }
          return false;
         }
    };
    
    this.canUserSee = function () {
        
        if (this.visibility === 2) {
            return true;
            } else if (this.host.getPeopleList().isUserOnList(this.accessor) && this.visibility == 1){
                return true;
        } else
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
            url: this.coreUrl + 'event/' + this.idevent,
            type: 'DELETE'
        });
        //Deletes all attendee rows of this event
        $.ajax({
            url: this.coreUrl + 'attendee/idevent?idevent=' + this.idevent,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteAttendees
        });
        //Delets all invited rows of this event
        $.ajax({
            url: this.coreUrl + 'invited/idevent?idevent=' + this.idevent,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteInvited
        });
        //Delets all messages of this event
        $.ajax({
            url: this.coreUrl + 'message/idevent?idevent=' + this.idevent,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteMessages
        });
        //Deletes all notifications of this event
        $.ajax({
            url: this.coreUrl + 'notification/idevent?idevent=' + this.idevent,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteNotifications
        });
    };
    this.deleteAttendees = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'attendee/' + data.idattendee,
            type: 'DELETE'
        });
    }
    };
    this.deleteInvited = function(data){
                for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'invited/' + data.idinvited,
            type: 'DELETE'
        });
    }
    };
    this.deleteNotifications = function(data){
                for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'notification/' + data.idnotification,
            type: 'DELETE'
        });
    }
    };
    this.deleteMessages = function(data){
                for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'message/' + data.idmessage,
            type: 'DELETE'
        });
    }
    }
    
    this.addUserToEvent = function (iduser) {
        //adds user to the users array as well as the database and refresh
        n = this.users.length;
        var u = new User();
        u.create(iduser);
        this.users[n] = u;
        if(this.users.length == this.eventMax){
            this.accessibility = 3;
        }
        var user = {iduser: iduser, idevent: this.idevent};
        $.ajax({
            url: this.coreUrl + 'attendee',
            type: 'POST',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
    
    this.removeUserFromEvent = function (iduser) {
        $.ajax({
            url: this.coreUrl + 'attendee/iduser?iduser=' + iduser,
            type: 'GET',
            dataType: 'json',
            context: this,
            success: this.getRight
        });
        
    };
    
    this.getRight = function(data){
        var idattendee = 0;
        for(var i =0; i<data.length; i++){
            if (data[i].idevent == this.idevent){
                idattendee = data[i].idattendee;
                this.removeUser(idattendee);
            }
          
        }
    };
    
    this.removeUser = function(idattendee){
        $.ajax({
            url: this.coreUrl + 'attendee/' + idattendee,
            type: 'DELETE'
        });
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
    
    this.getInvitedUsers = function(){
        //Need to make sure the attendee facade supports this 
        var url = this.coreUrl + "invited/idevent?idevent=" + this.idevent;
        $.ajax({
            type: 'get',
            dataType: "json",
            url: url,
            context: this,
            success: this.invitedFollowUp
        });
    };
    
    this.invitedFollowUp = function (data) {
        for (var n = 0; n < data.length; n++) {
            this.user1 = new User();
            this.user1.create(data[n].iduser);
            this.invitedUsers.push(this.user1);
        }
    };
    
    this.getUsersAttending = function () {
        //Need to make sure the attendee facade supports this 
        var url = this.coreUrl + "attendee/idevent?idevent=" + this.idevent;
        $.ajax({
            dataType: 'json',
            url: url,
            type: 'GET',
            context: this,
            success: this.attendingFollowUp
        });
    };
    this.inviteUser = function(iduser){
        var url = this.coreUrl + "invited";
        var toSend ={ iduser: iduser, idevent : this.idevent};
        $.ajax({
            dataType: 'json',
            data: JSON.stringify(toSend),
            url: url,
            contentType: 'application/json',
            type: 'POST',
            context: this,
            success: this.inviteUserFollowUp
        });
    }
    this.inviteUserFollowUp = function(data){
        var note = new Notification();
        note.create(data, this.host.getID(), this.idevent, new Date(), 0, 0);        
    }
    this.isUserInvited = function(iduser){
        for(var i = 0; i<this.invitedUsers.length; i++){
            var invitedID = this.invitedUsers[i].getID();
            if (iduser === invitedID){
                return true;
            }
        }
        return false;
    }
    
    this.attendingFollowUp = function (data) {
        for (var n = 0; n < data.length; n++) {
            this.user1 = new User();
            this.user1.create(data[n].iduser);
            this.users.push(this.user1);
        }
    };

    this.refreshEdits = function () {
        var event = {idevent: parseInt(this.idevent), title: this.title, idhost: this.host.getID(), maxattendees: parseInt(this.eventMax), idlocation: this.location.getID(), idvisibility: parseInt(this.visibility), idaccessibility: parseInt(this.accessibility), starttime: new Date(this.eventStart), endtime: new Date(this.eventEnd), description: this.description, idcategory: parseInt(this.category.getID())};
        $.ajax({
            url: this.coreUrl + 'event/' + this.idevent,
            type: 'PUT',
            data: JSON.stringify(event),
            contentType: 'application/json',
            dataType: 'json'
        });
        //This will have a put request that updates the db with all the edits 
        //That might have happened to the event object. We will call this 
        //End-all function everytime an edit happens
    };
}
