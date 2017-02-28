// Using Profile, User, FriendsList

//Global Variables Here
var id = 0;
var profileid = 0;
var profile1 = null;
var user = null;
var owner = null;

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
        $('#addFriend').hide();
        $('#joinEvent').hide();
        $('#editProfile').on('click', editProfile);
        $('#editUser').on('click', editAccount);
        $('#deleteAcc').on('click', deleteAccount);
    } else if (isFriend) {
        $('#addFriend').hide();
        $('#ownerOnly').hide();
    } else if (canSee) {
        $('#ownerOnly').hide();
        $('#addFriend').on('click', addFriend);
    } else {
        $('#profileDetails').hide();
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
    owner.createPeopleList();
    owner.getPeopleList().addFriend(user);
    window.location.reload();
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
