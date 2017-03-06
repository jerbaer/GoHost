/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function User() {
    this.iduser = 0;
    this.email = "";
    this.password = "";
    this.name = "";
    this.PeopleList = null;
    this.StrangerList = null;
    this.eventsHosting = null;
    this.eventsAttending = null;
    this.eventsVisible = null;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    this.idprofile;
    //0 if not admin, 1 if is admin
    this.isAdmin = false;

    this.create = function (iduser) {
        //This will use the iduser stored in the session by system_init to
        //create and populate a user object from an already created user row in
        //the database. After that, it will use other
        //objects to populate friends list, eventslist...
        this.iduser = iduser;
        var url = this.coreUrl + "user/" + iduser;
                $.ajax({
                    dataType: "json",
                    url: url,
                    context: this,
                    success: this.createFollowUp
                });
    };

    this.createFollowUp = function (data) {
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
        this.idprofile = data.idprofile;
        this.isAdmin = data.admin;
        //Do you want me to call these other functions right away or to wait for now?
    };
    //This will be called in one of two places:
    //1. The user themselves does it. After that they are taken back to the login page.
    //2. The admin does it.
    //This needs to delete ALL traces of this user from the database
    //1. Delete the user from the user table
    //2. Delete all the events being hosted by this user
    //3. Remove him from the attendee table
    //4. Remove him from the invited table
    //5. Remove all friend rows that have him on either side
    //6. Remove all messages that have been sent by him
    //7. Delete that user's profile
    //8. Delete all the notification sent by that user
    //9. Delete all the notification sent to that user
    this.deleteUser = function () {
        //Deletes the user from the user table
        $.ajax({
            url: this.coreUrl + 'user/' + this.iduser,
            type: 'DELETE'
        });
        //Gets all the events being hosted by this user
        $.ajax({
            url: this.coreUrl + 'event/idhost?idhost=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteEvents
        });
        //Gets all the attendee rows where he is an attendee
        $.ajax({
            url: this.coreUrl + 'attendee/iduser?iduser=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteAttendees
        });
        //Gets all the invited rows where he is invited
        $.ajax({
            url: this.coreUrl + 'invited/iduser?iduser=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteInvited
        });
        //Gets all the friend rows where he is user1
        $.ajax({
            url: this.coreUrl + 'friend/iduser?iduser=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteFriend
        });
        //Gets all the friend rows where he is user2
        //This calls the same callback function as the last one
        $.ajax({
            url: this.coreUrl + 'friend/iduser2?iduser2=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteFriend
        });
        //Gets all the message rows where he is the sender
        //Need to make sure my message facade supports this call
        $.ajax({
            url: this.coreUrl + 'message/iduser?iduser=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteMessage
        });
        //Gets the profile associated with the user
        //Need to make sure my profile facade supports this call
        $.ajax({
            url: this.coreUrl + 'profile/iduser?iduser=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteProfile
        });
        //Gets all the notification rows where he is the sender
        //Need to make sure my notification facade supports this call
        $.ajax({
            url: this.coreUrl + 'notification/iduser?iduser=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteNotification
        });
        //Gets all the notification rows where he is the recipient
        //Need to make sure my notification facade supports this call
        //This has the same callback function as the last one
        $.ajax({
            url: this.coreUrl + 'notification/from?from=' + this.iduser,
            type: 'GET',
            context: this,
            dataType : 'json',
            success: this.deleteNotification
        });
    };
    
    this.deleteEvents = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'event/' + data[i].idevent,
            type: 'DELETE'
        });
        }
    };
    this.deleteAttendees = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'attendee/' + data[i].idattendee,
            type: 'DELETE'
        });
        }
    };
    this.deleteInvited = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'invited/' + data[i].idinvited,
            type: 'DELETE'
        });
        }
    };
    this.deleteFriend = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'friend/' + data[i].idfriend,
            type: 'DELETE'
        });
        }
    };
    this.deleteMessage = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'message/' + data[i].idmessage,
            type: 'DELETE'
        });
        }
    };
    this.deleteProfile = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'profile/' + data[i].idprofile,
            type: 'DELETE'
        });
        }
    };
    this.deleteNotification = function(data){
        for(var i = 0; i<data.length; i++){      
        $.ajax({
            url: this.coreUrl + 'notification/' + data[i].idnotification,
            type: 'DELETE'
        });
        }
    };
    
    //These two functions will probably not be called from here
    this.createPeopleList = function () {
        this.PeopleList = new PeopleList();
        //
        this.PeopleList.create(this.iduser, null, 1);
    };
    
    this.createStrangersList = function () {
        this.StrangerList = new PeopleList();
        this.StrangerList.create(this.iduser, null, 2);
    };
    this.getStrangersList = function(){
        return this.StrangerList;
    };

    this.createHostedEventsList = function () {
        this.eventsHosting = new eventsList();
        this.eventsHosting.create(this, 0);
    };

    this.createEventsAttendingList = function () {
        this.eventsAttending = new eventsList();
        this.eventsAttending.create(this, 1);
    };

    this.createVisibleList = function () {
        this.eventsVisible = new eventsList();
        this.eventsVisible.create(this, 2);
    };

    this.receiveUser = function (Data) {
        this.iduser = Data.idUser;
        if (this.iduser !== "0") {
            sessionStorage.setItem('id', this.iduser);
            this.email = Data.email;
            this.name = Data.name;
        }
    };

    this.getEventsAttending = function () {
        this.createEventsAttendingList();
        return this.eventsAttending;
    };

    this.getVisibleEvents = function () {
        return this.eventsVisible;
    };

    this.getPeopleList = function () {
        this.createPeopleList();
        return this.PeopleList;
    };

    this.getEventsHosting = function () {
        this.createHostedEventsList();
        return this.eventsHosting;
    };
    
    this.getIsAdmin = function () {
        return this.isAdmin;
    };

    this.getID = function () {
        return this.iduser;
    };

    this.getName = function () {
        return this.name;
    };
    this.getEmail = function(){
        return this.email;
    };
    this.getPassword = function(){
        return this.password;
    };
    
    //idk if this is necessary as just doing what Profile does but for conveniene sake
    this.getDescription = function () {
        return profile.getDescription();
    };
    this.createProfile = function(accessor1){
        profile = new Profile();
        profile.createFromDB(this, accessor1);
    };
    this.getProfileID = function(){
        return profile.getID();
    }
    
    this.getPicture = function () {
        return profile.getPicture();
    }
    
    this.editName = function (name) {
        this.name = name;

    };
    
    this.editPassword = function (password) {
        this.password = password;

    };
    
    this.editEmail = function (email) {
        this.email = email;

    };
    
    this.refreshEdits = function () {
        if (isAdmin == true){
            var admin = 1;
        }else
            var admin = 0;
        var user = {iduser: this.iduser, idprofile: this.idprofile, password:this.password, name: this.name, email: this.email, admin: admin}; //long list of member variables
             $.ajax({
            url: this.coreUrl + 'user/' + this.iduser,
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}
