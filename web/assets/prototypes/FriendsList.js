/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Need to make sure that friend statuses aren't repeated
//Why doesn't it recognize the class name when I try to reference it?
function FriendsList() {
    this.friends = null; //array of user objects with friends in them
    this.owner = 0;
    this.size = 0;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    
    this.create = function (iduser) {
        owner = iduser;
        //get friends from database and populate list, fill in size
        var url = coreUrl + "friend?iduser1=" + owner;
        $.getJSON(url).done(this.friendFollowUp);
        //Need to also cross reference it with friends that are user1
        //Need to rethink how friends status happens in the first place
    };

    this.friendFollowUp = function (data) {
        this.size = data.length;
        friends = [];
        for (n = 0; n < data.length; n++) {
            let user = new User();
            user.create //need to finish this and also fix the getjson above
            friends[n] = data[n].iduser2;
        }
    };

    this.getFriends = function () {
        return friends;
    };
    
    this.isUserOnList = function (iduser) {
        for (i = 0; i < size; i++) {
            if (iduser = friends[i].getID()) {
                return true
            }
        }
        return false
    };
};


/*
//Need to make sure that friend statuses aren't repeated
//Why doesn't it recognize the class name when I try to reference it?
FriendsList = {
    friends: null, //array of user objects with friends in them
    owner: 0,
    size: 0,
    coreUrl: "http://143.44.67.0:13774/GoHost/api/",
    create: function (iduser) {
        owner = iduser;
        //get friends from database and populate list, fill in size
        var url = coreUrl + "friend?iduser1=" + owner;
        $.getJSON(url).done(this.friendFollowUp);
        //Need to also cross reference it with friends that are user1
        //Need to rethink how friends status happens in the first place
    },

    friendFollowUp: function (data) {
        size = data.length;
        friends = [];
        for (n = 0; n < data.length; n++) {
            friends[n] = data[n].iduser2;
        }
    },

    getFriends: function () {
        return friends;
    },
    isUserOnList: function (iduser) {
        for (i = 0; i < size; i++) {
            if (iduser = friends[i].getID()) {
                return true
            }
        }
        return false
    }
};
*/