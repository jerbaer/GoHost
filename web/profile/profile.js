//Global Variables Here
var id = 0;
var profileid;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    profileid = (window.location.href.split('#'))[1];
    owner = new User();
    owner.create(profileid);
    accessor = new User();
    accessor.create(id);
    
    getProfile;
    isOwner;
    
}

function getProfile() {
    profile1 = new Profile();
    profile1.createFromDB(user, accessor);
    getStringsFromProfile
}

function getStringsFromProfile(profile1) {
    profileName = profile1.getName();
}

function deleteAccount() {
    profile.deleteAccount();
    location.href = "../";
}
