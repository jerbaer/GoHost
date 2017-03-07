// Going to work with User, PeopleList, Profile

//Global variables
var friends = null;
var strangers = null;
var searchResults = null;
var input = "";
var user = null;
var list;
var peopleNames;
var peoplePictures;
var peopleDescriptions;
var peopleIDs;
var id;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    $('#friendsTab').on('click', getFriendsStrings);
    $('#strangersTab').on('click', getStrangersStrings);
    $('#searchTab').on('click', userSearch);
    getPeople();
    getProfile();
}


function getPeople() {
    user = new User();
    user.create(id);
    getFriendsStrings();
}

function userSearch () {
    $('#friends').hide();
    $('#strangers').hide();
    $('#friends').empty();
    $('#strangers').empty();
    $('#search').empty();
    input = $('#userName').val();
    //Here need to pass it to the user object instead of putting in session storage
    sessionStorage.setItem('search', input);
    if (friends !== null)
        friends = null;
    if (strangers !== null)
        strangers = null;
    if (searchResults !== null)
        searchResults = null;
    user.setWord(input);
    user.createSearchList();
    searchResults = user.getSearchList();
    peopleNames = null;
    peoplePictures = null;
    peopleDescriptions = null;
    peopleIDs = null;
    //Getting both here. Did not take the time to understand what this code will
    //actually do.
    getStringsFromStrangers(searchResults);
    getStringsFromPeople(searchResults);
    var newH, newA, newP, searchList;
    var n, url;
    // this part might need to change/be more specific with bootstrap classes
    searchList = $('#search');
    for (n = searchResults.getSize() - 1; n > -1; n--) {
        url = ".../profile/index.html#" + peopleUserIDs[n];
        newA = $('<a>').attr('href', url).text(peopleNames[n]).on('click', function () {
            window.locaton.href = url;
            window.location.reload(true);
            //double check this session storage part
            sessionStorage.setItem('peopleid'), peopleIDs[n];
        });
        newH = $('<h3>').append(newA);
        newP = $('<p>').append(peopleDescriptions[n]);
        // figure out how to do picture

        searchList.append(newH);
        searchList.append(newP);
    }
    $('#search').show();
}


function getStrangersStrings() {
    $('#friends').hide();
    $('#search').hide();
    $('#search').empty();
    $('#friends').empty();
    $('#strangers').empty();
    if (friends !== null)
        friends = null;
    if (strangers !== null)
        strangers = null;
    if (searchResults !== null)
        searchResults = null;
    user.createStrangersList();
    strangers = user.getStrangersList();
    peopleNames = null;
    peoplePictures = null;
    peopleDescriptions = null;
    peopleIDs = null;
    getStringsFromStrangers(strangers);
    var newH, newA, newP, peopleList;
    var n, url;
    // this part might need to change/be more specific with bootstrap classes
    peopleList = $('#strangers');
    for (n = strangers.getSize() - 1; n > -1; n--) {
        url = ".../profile/index.html#" + peopleUserIDs[n];
        newA = $('<a>').attr('href', url).text(peopleNames[n]).on('click', function () {
            window.locaton.href = url;
            window.location.reload(true);
            //double check this session storage part
            sessionStorage.setItem('peopleid'), peopleIDs[n];
        });
        newH = $('<h3>').append(newA);
        newP = $('<p>').append(peopleDescriptions[n]);
        // figure out how to do picture

        peopleList.append(newH);
        peopleList.append(newP);
    }
    $('#strangers').show();
}

function getFriendsStrings() {
    $('#strangers').hide();
    $('#search').hide();
    $('#search').empty();
    $('#strangers').empty();
    $('#friends').empty();
    if (friends !== null)
        friends = null;
    if (strangers !== null)
        stragners = null;
    if (searchResults !== null)
        searchResults = null;
    user.createPeopleList();
    friends = user.getPeopleList();
    peopleNames = null;
    peoplePictures = null;
    peopleDescriptions = null;
    peopleIDs = null;
    getStringsFromPeople(friends);
    var newH, newA, newP, peopleList;
    var n, url;
    // this part might need to change/be more specific with bootstrap classes
    peopleList = $('#friends');
    for (n = friends.getSize() - 1; n > -1; n--) {
        url = "../profile/index.html#" + peopleUserIDs[n];
        newA = $('<a>').attr('href', url).text(peopleNames[n]).on('click', function () {
            window.locaton.href = url;
            window.location.reload(true);
            //double check this session storage part
            sessionStorage.setItem('peopleid'), peopleIDs[n];
        });
        newH = $('<h3>').append(newA);
        newP = $('<p>').append(peopleDescriptions[n]);
        // figure out how to do picture

        peopleList.append(newH);
        peopleList.append(newP);
    }
    $('#friends').show();
}

// For strangers will need to get a PeopleList of not friends
function getStringsFromPeople(PeopleList) {
    PeopleList.getFriends();
    list = PeopleList.getFriendsList();
    peopleNames = new Array(list.length);
    peoplePictures = new Array(list.length);
    peopleDescriptions = new Array(list.length);
    peopleIDs = new Array(list.length);
    peopleUserIDs = new Array(list.length);
    for (i = 0; i < list.length; i++) {
        list[i].createProfile();
        peopleNames[i] = list[i].getName();
        peoplePictures[i] = list[i].getPicture();
        peopleDescriptions[i] = list[i].getDescription();
        peopleIDs[i] = list[i].getProfileID();
        peopleUserIDs[i] = list[i].getID();
    }
}

function getStringsFromStrangers(PeopleList) {
    list = PeopleList.getPeopleList();
    peopleNames = new Array(list.length);
    peoplePictures = new Array(list.length);
    peopleDescriptions = new Array(list.length);
    peopleIDs = new Array(list.length);
    peopleUserIDs = new Array(list.length);
    for (i = 0; i < list.length; i++) {
        list[i].createProfile();
        peopleNames[i] = list[i].getName();
        peoplePictures[i] = list[i].getPicture();
        peopleDescriptions[i] = list[i].getDescription();
        peopleIDs[i] = list[i].getProfileID();
        peopleUserIDs[i] = list[i].getID();
    }
}

function getProfile() {
    var url, newA;
    profile1 = new Profile();
    profile1.createFromDB(user, user);
    getStringsFromProfile(profile1);
    // Popualte the html page
    profName = $('#profName');
    url = "../profile/index.html#" + profile1.getIdUser();
    newA = $('<a>').attr('href', url).text(profileName).on('click', function () {
        window.location.href = url;
        window.location.reload(true);
    });
    newH1 = $('<h1>').append(newA);

    profPic = $('#profPic');
    // Do picture stuff

    profDesc = $('#profDesc');
    newP = $('<p>').text(profileDescription);

    profName.append(newH1);
    profDesc.append(newP);
}

function getStringsFromProfile(profile1) {
    profileName = profile1.getName();
    profilePicture = profile1.getPicture();
    profileDescription = profile1.getDescription();
}

$(window).load(setUpComponents);
