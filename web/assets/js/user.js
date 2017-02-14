/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
User = {
    iduser: 0,
    email: 0,
    password: 0,
    name: 0,
    friendsList: null,
    eventsHosting: null,
    eventsAttending: null,
    eventsVisible: null,
    coreUrl: "http://" + window.location.host + "/GoHost/api/",
    
    
    create: function(iduser){
        //This will use the iduser stored in the session by system_init to
        //create and populate a user object from an already created user row in
        //the database. After that, it will use other
        //objects to populate friends list, eventslist...
        User.iduser = iduser;
        var url = Event.coreUrl + "user?iduser="+iduser;
        $.getJSON(url).done(Event.createFollowUp);
    },
    
    createFollowUp: function(data){
        email = data.email;
        password = data.password;
        name = data.name;
        //Do you want me to call these other functions right away or to wait for now?
    },
    createFriendsList: function(){
        friendsList = new FriendsList(iduser);
    },
    createHostedEventsList: function(){
        eventsHosting = new EventsList(iduser, 0);
    },
    createEventsAttendingList: function(){
        eventsAttending = new EventsList(iduser, 1);
    },
    createVisibleList: function(){
        eventsVisible = new EventsList(iduser, 2);
    },
    
    receiveUser : function(Data){
        User.iduser = Data.idUser;
        if(User.iduser !== "0") {
            sessionStorage.setItem('id',User.iduser);
            User.email = Data.email;
            User.name = Data.name;
        }
    },
    getID: function(){
        return iduser;
    },
    getEventsAttending: function(){
        User.createEventsAttendingList();
        return eventsAttending;
    },
    getVisibleEvents: function(){
        User.createVisibleList;
        return eventsVisible;
    },
    getFriendsList: function(){
        User.createFriendsList();
        return friendsList;
    },
    getEventsHosting: function(){
        User.createHostedEventsList();
        return eventsHosting;
    }
    
};