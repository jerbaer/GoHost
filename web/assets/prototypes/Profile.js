/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Profile() {
    this.iduser = 0; // assuming the index of the profile and the user is the same
    // might not need to make owner object and just make it in the functions everytime we need it instead
    this.owner = null;
    this.description = '';
    this.photoURL = '';
    this.accessor = null;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    this.idprofile = 0;
    this.favCategory = 0;


    this.create = function (iduser, accessor1) { // might pass iduser instead as mentioned above
        this.iduser = iduser;
        this.owner = new User();
        this.owner.create(iduser);
        this.accessor = accessor1;
        var profile = {iduser: this.iduser, description: this.description, picture: 'http://143.44.67.0:13774/goHost/assets/img/profile-placeholder.png'};
        $.ajax({
            url: this.coreUrl + "profile",
            type: 'post',
            data: JSON.stringify(profile),
            contentType: 'application/json',
            dataType: 'json',
            context: this,
            async: false,
            success: this.createFollowUp
        });
        //POST request
    };

    this.createFollowUp = function (data) {
        this.idprofile = data.idprofile;
        this.photoURL = "../assets/img/profile-placeholder.png";
    };

    this.isCurrentUser = function () {
        if (this.owner.getID() == this.accessor.getID())
            return true;
        return false;
    };

    this.isFriend = function () {
        owner.createPeopleList()
        if (owner.getPeopleList().isUserOnList(this.accessor))
            return true;
        return false;
    };

    this.canUserSee = function () {
        // For if we want to implement blocking people
    };

    this.getIdProfile = function () {
        return this.idprofile;
    };

    this.getIdUser = function () {
        return this.iduser;
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
    };

    this.editPicture = function (photoURL) {
        this.photoURL = photoURL;
    };

    // Are these necessary since User already does this?
    this.editName = function (name) {
        this.owner.editName(name);
    };

    this.editPassword = function (password) {
        this.owner.editPassword(password);
    };

    this.editEmail = function (email) {
        this.owner.editEmail(email);
    };
    this.editCategory = function (idcategory) {
        this.favCategory = idcategory;
    };
    this.getCategory = function () {
        return this.favCategory;
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
        var url = this.coreUrl + "profile/iduser?iduser=" + this.iduser;
        $.ajax({
            dataType: "json",
            url: url,
            type: 'GET',
            context: this,
            success: this.createProfileFollowUp,
            async: false
        });
    };

    this.createProfileFollowUp = function (data) {
        this.description = data.description;
        this.idprofile = data.idprofile;
        this.photoURL = data.picture;
        this.favCategory = data.idcategory;
    };
    this.getID = function () {
        return this.idprofile;
    };

    this.getPeopleList = function () {
        friends = new PeopleList();
        friends.create(iduser);
        return friends.getFriends();
    };

    this.isUserOnList = function () {
        // idk which user and which list so yeah
    };

    this.refreshEdits = function () {
        var profile = {idprofile: this.idprofile, iduser: this.owner.getID(), description: this.description, idcategory: this.favCategory, picture: this.photoURL};
        $.ajax({
            url: this.coreUrl + 'profile/' + this.idprofile,
            type: 'PUT',
            data: JSON.stringify(profile),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}
