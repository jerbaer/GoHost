/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Profile () {
    this.iduser = 0; // assuming the index of the profile and the user is the same
    // might not need to make owner object and just make it in the functions everytime we need it instead
    this.owner = null;
    this.description = '';
    this.photoURL = '';
    this.accessor = null;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";

    
    this.create = function (iduser, accessor1) { // might pass iduser instead as mentioned above
        this.iduser = iduser;
        this.owner = new User();
        this.owner.create(iduser);
        this.accessor = accessor1;
        // Ajax stuff here
    };
    
    this.createFollowUp = function (data) {
        this.description = data.description;
        this.photoURL = data.photoURL;
    };
    
    this.isCurrentUser = function () {
        if(this.owner === accessor)
            return true;
        return false;
    };
    
    this.isFriend = function () {
        friends = new PeopleList();
        friends.create(iduser);
        if(friends.isUserOnList(this.accessor.getID()))
            return true;
        return false;
    };
    
    this.canUserSee = function () {
        // For if we want to implement blocking people
    }
    
    this.getName = function () {
        return this.owner.getName();
    };
    
    this.getDescription = function () {
        return this.description;
    };
    
    this.getPicture = function () {
        return this.photoURL;
    };
    
    this.editDescription = function (description) {
        this.description = description;
        this.refreshEdits();
    };
    
    this.editPicture = function (photoURL) {
        this.photoURL = photoURL;
        this.refreshEdits();
    };
    
    // Are these necessary since User already does this?
    this.editName = function (name) {
      this.owner.editName(name);
      this.refreshEdits();
    };
    
    this.editPassword = function (password) {
        this.owner.editPassword(password);
        this.refreshEdits();
    };
    
    this.editEmail = function (email) {
        this.owner.editEmail(email);
        this.refreshEdits();
    };
    
    // These next ones I'm not sure about. Also might not need to pass any variables

    
    this.Inbox = function (owner) {
        // Not sure what this is
    };
    
    // Might move this to the top and change create like Event is organized
    this.createFromDB = function (owner1, accessor1) {
        this.owner = owner1;
        this.iduser = this.owner.getID();
        this.accessor = accessor1;
        var url = this.coreUrl + "profile/iduser?iduser=" + iduser;
        $.ajax({
            dataType: "json",
            url: url,
            type: 'GET',
            context: this,
            success: this.createProfileFollowUp
        })
    };
    
    this.createProfileFollowUp = function (data) {
        this.description = data.description;
       
    };
    
    this.getPeopleList = function () {
        friends = new PeopleList();
        friends.create(iduser);
        return friends.getFriends();
    };
    
    this.isUserOnList = function () {
        // idk which user and which list so yeah
    };
    
    this.deleteAccount = function (){
        // Fill this in
    };
    
    this.refreshEdits = function () {
        var profile = {}; //long list of member variables
        // ajax requests here. reference event.refreshEdits
    };
}
