/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Need to make sure that friend statuses aren't repeated
//Why doesn't it recognize the class name when I try to reference it?
function PeopleList() {
    this.people = null; //array of user objects with people in them
    this.friends = null;
    this.friendsIDs = null;
    this.owner = 0;
    this.idevent = 0;
    this.viewType =0;
    this.size = 0;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    this.user1 = null;
    
    //This needs to have logic that checks what kind of list is needed.
    //Kinds of lists:
    //1. List of people attending a certain event (get request that grabs the ids of all the attendees of a certain from the attendee table)
    //2. List of all the friends of some person. (get request that grabs all the users that are friends with some dude from the friends table)
    //3. List of all the people that some dude is not friends with for the explore people tab (Opposite of last one, same table)
    this.create = function (iduser, idevent, viewType) {
        this.owner = new User();
        this.owner.create(iduser);
        this.viewType = viewType;
        this.idevent = idevent;
        //Checks what kind of PeopleList is needed
        if (viewType == 0) {
            this.getUsersAttending();
        } else if (viewType == 1) {
            this.getFriends();
        } else if (viewType == 2) {
            this.getNotFriends();
        }
    };
    
    this.getFriends = function () {
        //get friends from database and populate list, fill in size
        var url = this.coreUrl + "friend/iduser?iduser1=" + this.owner;
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.friendFollowUp
        });
    };

    this.friendFollowUp = function (data) {
        this.people = [];
        this.friends = [];
        for (var n = 0; n < data.length; n++) {
            this.user1 = new User();
            this.user1.create(data[n].iduser);
            this.people.push(this.user1);
            //this array is only being populated so I can splice its
            //contents out of the people array for the not friends list
            this.friends.push(this.user1);
        }
    };
    //Does a get request of all people in the user table
    //Then goes through the friends array splicing each of its elements out of
    //the people array
    this.getNotFriends = function () {
        var url = this.coreUrl + "user/all";
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.notFriendsFollowUp
        });
    };
    
    this.notFriendsFollowUp = function (data) {
        this.people = [];
        for (var n = 0; n < data.length; n++) {
            this.user1 = new User();
            this.user1.create(data[n].iduser);
            this.people.push(this.user1);
        }
        for (var i = 0; i < data.length; i++) {
            var index = people.indexOf(friends[i]);
            if (index > -1) {
                people.splice(index, 1);
            }
        }
    };
    
    //Does a get request for all users attending a certain event
    this.sendFriendRequest = function(newfriend){
        
    }

    this.getPeopleList = function () {
        return this.people;
    };
    
    this.getSize = function () {
        return this.people.length;
    }
    
    this.isUserOnList = function (iduser) {
        for (var i = 0; i < size; i++) {
            if (iduser = people[i].getID()) {
                return true
            }
        }
        return false;
    };
};
