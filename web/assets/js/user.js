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
    this.friendsList = null;
    this.eventsHosting = null;
    this.eventsAttending = null;
    this.eventsVisible = null;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";

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
        //Do you want me to call these other functions right away or to wait for now?
    };

    this.createFriendsList = function () {
        this.friendsList = new FriendsList();
        this.friendsList.create(iduser);
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

    this.getID = function () {
        return this.iduser;
    };

    this.getEventsAttending = function () {
        this.createEventsAttendingList();
        return this.eventsAttending;
    };

    this.getVisibleEvents = function () {
        return this.eventsVisible;
    };

    this.getFriendsList = function () {
        this.createFriendsList();
        return this.friendsList;
    };

    this.getEventsHosting = function () {
        this.createHostedEventsList();
        return this.eventsHosting;
    };

    this.getName = function () {
        return this.name;
    };
}

/*User = {
 iduser: 0,
 email: "",
 password: "",
 name: "",
 friendsList: null,
 eventsHosting: null,
 eventsAttending: null,
 eventsVisible: null,
 coreUrl: "http://143.44.67.0:13774/GoHost/api/",
 
 create: function (iduser) {
 //This will use the iduser stored in the session by system_init to
 //create and populate a user object from an already created user row in
 //the database. After that, it will use other
 //objects to populate friends list, eventslist...
 this.iduser = iduser;
 var url = this.coreUrl + "user/" + iduser;
 $.getJSON(url).done(this.createFollowUp);
 },
 
 createFollowUp: function (data) {
 this.email = data.email;
 this.password = data.password;
 this.name = data.name;
 //Do you want me to call these other functions right away or to wait for now?
 },
 createFriendsList: function () {
 this.friendsList = FriendsList();
 this.friendsList.create(iduser);
 },
 createHostedEventsList: function () {
 this.eventsHosting = eventsList;
 this.eventsHosting.create(User, 0);
 },
 createEventsAttendingList: function () {
 this.eventsAttending = eventsList;
 this.eventsAttending.create(User, 1);
 },
 createVisibleList: function () {
 this.eventsVisible = eventsList;
 this.eventsVisible.create(User, 2);
 },
 
 receiveUser: function (Data) {
 this.iduser = Data.idUser;
 if (this.iduser !== "0") {
 sessionStorage.setItem('id', this.iduser);
 this.email = Data.email;
 this.name = Data.name;
 }
 },
 getID: function () {
 return this.iduser;
 },
 getEventsAttending: function () {
 this.createEventsAttendingList();
 return this.eventsAttending;
 },
 getVisibleEvents: function () {
 return this.eventsVisible;
 },
 getFriendsList: function () {
 this.createFriendsList();
 return this.friendsList;
 },
 getEventsHosting: function () {
 this.createHostedEventsList();
 return this.eventsHosting;
 },
 getName: function () {
 return this.name;
 }
 
 };
 */