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
        var user = {iduser: this.iduser, idprofile: this.idprofile, password:this.password, name: this.name, email: this.email}; //long list of member variables
             $.ajax({
            url: this.coreUrl + 'user/' + this.iduser,
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}
