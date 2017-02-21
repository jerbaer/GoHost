/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class User {
    
    constructor() {
        this.iduser = iduser;
        this.email = "";
        this.password = "";
        this.name = "";
        this.friendsList = null;
        this.eventsHosting = null;
        this.eventsAttending = null;
        this.eventsVisible = null;
        this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";        
    }
    create(iduser){

        var url = this.coreUrl + "user/" + iduser;
        $.getJSON(url).done(this.createFollowUp);
    }
    createFollowUp(data) {
        email = data.email;
        password = data.password;
        name = data.name;
    }
    createFriendsList() {
        let friendsList = new FriendsList(iduser);
    }
    createHostedEventsList() {
        let eventsHosting = new eventsList(this, 0);
    }
    createEventsAttendingList() {
        let eventsAttending = new eventsList(this,1);
    }
    createVisibleList() {
        let eventsVisible = new eventsList(this,2);
    }
    receiveUser(Data) {
        iduser = Data.idUser;
        if (iduser !== "0") {
            sessionStorage.setItem('id', iduser);
            email = Data.email;
            name = Data.name;
        }
    }
    getID() {
        return iduser;
    }
    getEventsAttending() {
        this.createEventsAttendingList();
        return eventsAttending;
    }
    getVisibleEvents() {
        return eventsVisible;
    }
    getFriendsList() {
        createFriendsList();
        return friendsList;
    }
    getEventsHosting() {
        createHostedEventsList();
        return eventsHosting;
    }
    getName() {
        return name;
    }
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