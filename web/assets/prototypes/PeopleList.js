/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Need to make sure that friend statuses aren't repeated
//Why doesn't it recognize the class name when I try to reference it?
function PeopleList() {
    this.people = null; //array of user objects with friends in them
    this.owner = 0;
    this.size = 0;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    
    this.create = function (iduser) {
        this.owner = new User();
        this.owner.create(iduser);
        //get friends from database and populate list, fill in size
        var url = this.coreUrl + "friend?iduser1=" + this.owner;
        $.getJSON(url).done(this.friendFollowUp);
        //Need to also cross reference it with friends that are user1
        //Need to rethink how friends status happens in the first place
    };

    this.friendFollowUp = function (data) {
        this.size = data.length;
        people = [];
        for (n = 0; n < data.length; n++) {
            let user = new User();
            user.create //need to finish this and also fix the getjson above
            people[n] = data[n].iduser2;
        }
    };

    this.getFriends = function () {
        return this.people;
    };
    
    this.getSize = function () {
        return this.people.length;
    }
    
    this.isUserOnList = function (iduser) {
        for (i = 0; i < size; i++) {
            if (iduser = people[i].getID()) {
                return true
            }
        }
        return false
    };
};
