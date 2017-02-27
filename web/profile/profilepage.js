// Using Profile, User, FriendsList

//Global Variables Here
var id = 0;
var profileid = 0;
var profile1 = null;
var user = null;

var profileName;
var profilePicture;
var profileDescription;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    profileid = (window.location.href.split('#'))[1];
    owner = new User();
    owner.create(profileid);
    accessor = new User();
    accessor.create(id);

    getProfile();
    isOwner = profile1.isCurrentUser();
    isFriend = profile1.isFriend();
    canSee = profile1.canUserSee();

    if (isOwner) {
        // Hide add friend button
        // Show edit/delete settings
        $('#joinEvent').hide();
        $('#delete').on('click', deleteEvent);
        $('#edit').on('click', editEvent);
        $('#invite').on('click', inviteFriends);
    } else if (isFriend) {
        // Hide add friend button
        // Hide edit/delete settings
    } else if (canSee) {
        // Hide edit/delete settings
        // Show add friend
    } else {
        // Show error div
    }
}

function getProfile() {
    profile1 = new Profile();
    profile1.createFromDB(user, accessor);
    getStringsFromProfile(profile1);
    // Popualte the html page
    profName = $('#profName');
    newH1 = $('<h1>').text(profileName);

    profPic = $('#profPic');
    // Do picture stuff

    profDesc = $('#profDesc');
    newP = $('<p>').text(profileDescription);

    profName.append(newH1);
    profDesc.append(hewP);
}

function getStringsFromProfile(profile1) {
    profileName = profile1.getName();
    profilePicture = profile1.getPicture();
    profileDescription = profile1.getDescriprion();
}

function addFriend() {

}

function editProfile() {
    profile1.editName($('#name').val());
    profile1.editPicture($('#picture').val());
    // Might need more code here for picture
    profile1.editDescription($('#desc').val());
    window.location.reload();
}

function editAccount() {
    profile1.editName($('#name').val());
    profile1.editPassword($('#password').val());
    profile1.editEmail($('#email').val());
    window.location.reload();
}

function deleteAccount() {
    profile1.deleteAccount();
    location.href = "../";

}
$(window).load(setUpComponents);
