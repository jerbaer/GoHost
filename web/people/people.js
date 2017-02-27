// Going to work with User, PeopleList, Profile

//Global variables
var friends = null;
var strangers = null;
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
    getPeople();
}

function getPeople() {
    user = new User();
    user.create(id);
    getFriendsStrings();
}

function getFriendsStrings() {
    $('#strangers').hide();
    $('#strangers').empty();
    $('#friends').empty();
    if (friends !== null)
        friends = null;
    if (strangers !== null)
        stragners = null;
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
        url = ".../people/index.html#" + peopleIDs[n];
        newA = $('<a>').attr('href',url).text(peopleNames[n]).on('click', function () {
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
    list = PeopleList.getFriends();
    peopleNames = new Array(list.length);
    peoplePictures = new Array(list.length);
    peopleDescriptions = new Array(list.length);
    peopleIDs = new Array(list.length);
    for (i = 0; i < list.length(); i++) {
        peopleNames[i] = list[i].getName;
        peoplePictures[i] = list[i].getPicture;
        peopleDescriptions[i] = list[i].getDescription;
        peopleIDs[i] = list[i].getIDs;
    }
}

$(window).load(setUpComponents);
