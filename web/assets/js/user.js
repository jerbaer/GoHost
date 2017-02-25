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
        User.iduser = iduser;
        var url = User.coreUrl + "user/" + iduser;
        $.getJSON(url).done(User.createFollowUp);
    };

    this.createFollowUp = function (data) {
        User.email = data.email;
        User.password = data.password;
        User.name = data.name;
        //Do you want me to call these other functions right away or to wait for now?
    };

    this.createFriendsList = function () {
        User.friendsList = FriendsList();
        User.friendsList.create(iduser);
    };

    this.createHostedEventsList = function () {
        User.eventsHosting = eventsList;
        User.eventsHosting.create(User, 0);
    };

    this.createEventsAttendingList = function () {
        User.eventsAttending = eventsList;
        User.eventsAttending.create(User, 1);
    };

    this.createVisibleList = function () {
        User.eventsVisible = eventsList;
        User.eventsVisible.create(User, 2);
    };

    this.receiveUser = function (Data) {
        User.iduser = Data.idUser;
        if (User.iduser !== "0") {
            sessionStorage.setItem('id', User.iduser);
            User.email = Data.email;
            User.name = Data.name;
        }
    };

    this.getID = function () {
        return User.iduser;
    };

    this.getEventsAttending = function () {
        User.createEventsAttendingList();
        return User.eventsAttending;
    };

    this.getVisibleEvents = function () {
        return User.eventsVisible;
    };

    this.getFriendsList = function () {
        User.createFriendsList();
        return User.friendsList;
    };

    this.getEventsHosting = function () {
        User.createHostedEventsList();
        return User.eventsHosting;
    };

    this.getName = function () {
        return User.name;
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
 User.iduser = iduser;
 var url = User.coreUrl + "user/" + iduser;
 $.getJSON(url).done(User.createFollowUp);
 },
 
 createFollowUp: function (data) {
 User.email = data.email;
 User.password = data.password;
 User.name = data.name;
 //Do you want me to call these other functions right away or to wait for now?
 },
 createFriendsList: function () {
 User.friendsList = FriendsList();
 User.friendsList.create(iduser);
 },
 createHostedEventsList: function () {
 User.eventsHosting = eventsList;
 User.eventsHosting.create(User, 0);
 },
 createEventsAttendingList: function () {
 User.eventsAttending = eventsList;
 User.eventsAttending.create(User, 1);
 },
 createVisibleList: function () {
 User.eventsVisible = eventsList;
 User.eventsVisible.create(User, 2);
 },
 
 receiveUser: function (Data) {
 User.iduser = Data.idUser;
 if (User.iduser !== "0") {
 sessionStorage.setItem('id', User.iduser);
 User.email = Data.email;
 User.name = Data.name;
 }
 },
 getID: function () {
 return User.iduser;
 },
 getEventsAttending: function () {
 User.createEventsAttendingList();
 return User.eventsAttending;
 },
 getVisibleEvents: function () {
 return User.eventsVisible;
 },
 getFriendsList: function () {
 User.createFriendsList();
 return User.friendsList;
 },
 getEventsHosting: function () {
 User.createHostedEventsList();
 return User.eventsHosting;
 },
 getName: function () {
 return User.name;
 }
 
 };
 */