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
var favCat;

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
    if (isOwner) {
        $('#ownerOnly').removeClass('hidden');
        $('#editProfile').on('click', editProfile);
        $('#editUser').on('click', editAccount);
        $('#deleteAcc').on('click', deleteAccount);
    } else if(isFriend) {
        $('#favCat').removeClass('hidden');
    } else {
        $('#addFriend').removeClass('hidden');
        $('#addFriend').on('click', addFriend);
    }
}

function getProfile() {
    profile1 = new Profile();
    profile1.createFromDB(owner, accessor);
    getStringsFromProfile(profile1);
    // Popualte the html page
    profName = $('#profName');
    newH1 = $('<h1>').text(profileName);

    profPic = $('#profPic');
    // Do picture stuff

    profDesc = $('#profileDesc');
    newP = $('<p>').text(profileDescription);
    
    favCat = new Category($('#favCat').val());
    newP2 = $('<p>').text(favCat);

    profName.append(newH1);
    profDesc.append(newP);
    favCat.append(newP2)
}

function getStringsFromProfile(profile1) {
    profileName = profile1.getName();
    //profilePicture = profile1.getPicture();
    profileDescription = profile1.getDescription();
}

function addFriend() {
    owner.createPeopleList();
    owner.getPeopleList().addFriend(accessor);
    window.location.reload();
}

function editProfile() {
    if ($('#name').val() !== '') {
        profile1.editName($('#name').val());
    }
    if ($('#picture').val() !== '') {
        profile1.editPicture($('#picture').val());
    }

    if ($('#description').val() !== '') {
        profile1.editDescription($('#description').val());
    }
    if ($('category').val() !== ''){
        profile1.editCategory($('category').val());
    }
    profile1.refreshEdits();

    window.location.reload();
}

function editAccount() {
    if ($('#userName').val() !== '') {
        owner.editName($('#userName').val());
    }
    if ($('#password').val() !== '') {
        owner.editPassword($('#password').val());
    }
    if ($('#email').val() !== '') {
        owner.editEmail($('#email').val());
    }
    owner.refreshEdits();
    window.location.reload();
}

function deleteAccount() {
    profile1.deleteAccount();
    location.href = "../";

}
$(window).load(setUpComponents);
