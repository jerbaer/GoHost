// Using Profile, User, FriendsList

//Global Variables Here
var id = 0;
var profileid = 0;
var profile1 = null;
var user = null;
var owner = null;

var profileDescription;
var favCat;
var favCategory;

var eventsHosted = null;
var eventsAttending = null;
var visibleEvents = null;
var canFlag = true;
var canRequest = true;

String.prototype.mysqlToDate = String.prototype.mysqlToDate || function () {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
};

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    profileid = (window.location.href.split('#'))[1];
    owner = new User();
    owner.create(profileid);
    accessor = new User();
    accessor.create(id);
    inbox = new Inbox();
    inbox.create(id);
    inbox.getNotifications();
    if (inbox.areUnread()) {
        $('#bell').addClass('text-warning');
    }

    $('.ownerName').text(owner.getName());

    getProfile();
    getCategories();
    getEvents();
    getLocations();
    canFlagProfile();
    canFriendRequestProfile();

    isOwner = profile1.isCurrentUser();
    isFriend = profile1.isFriend();
    if (isOwner) {
        $('#ownerOnly').removeClass('hidden');
        $('#editProfile').on('click', editProfile);
        $('#editUser').on('click', editAccount);
        $('#deleteAcc').on('click', deleteAccount);
        $('#attendingtab').on('click', getAttendingStrings);
        $('#hostingtab').on('click', getHostStrings);
    } else if (isFriend) {
        $('#friendsOnly').removeClass('hidden');
        $('#attendingtab').on('click', getAttendingStrings);
        $('#hostingtab').on('click', getHostStrings);
        $('#flagUser').removeClass('hidden');
        $('#report').on('click', reportUser);
    } else {
        if (!canRequest) {
            $('#addFriend').removeClass('hidden');
            $('#addFriend').on('click', addFriend);
        }
        $('#flagUser').removeClass('hidden');
        $('#report').on('click', reportUser);
    }

    $('#reportModal').on('hidden.bs.modal', function () {
        window.location.reload();
    })
}

function reportUser() {
    if (canFlag) {
        notification = new Notification();
        notification.create(owner.getID(), accessor.getID(), 0, new Date(), 0, 4);
        $('#reportModal').modal();
    } else {
        $('#reportedModal').modal();
    }
}
function canFlagProfile() {
    profile1.hasFlag();
    canFlag = profile1.canFlag;
}
function canFriendRequestProfile() {
    profile1.hasFriendRequest();
    canRequest = profile1.canFriend;
}

function getProfile() {
    profile1 = new Profile();
    profile1.createFromDB(owner, accessor);
    getStringsFromProfile(profile1);
    // Popualte the html page
    profPic = $('#profPic');
    profPic.attr('src', profile1.getPicture());

    profDesc = $('#profileDesc');
    newP = $('<span>').text(profileDescription);

    favCat = $('#favCat');
    favCategory.retrieveName();
    newP2 = $('<span>').text(favCategory.getName());

    profDesc.append(newP);
    favCat.append(newP2);
}

function getStringsFromProfile(profile1) {
    profileDescription = profile1.getDescription();
    favCategory = new Category(profile1.getCategory());
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
    if ($('category').val() > 0) {
        profile1.editCategory($('category').val()); // Isn't passing the profile object for some reason
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
    accessor.deleteUser();
    url = "http://143.44.67.0:13774/GoHost/"
    setTimeout(sessionStorage.clear(), 10000);
    window.location.href = url;
}

function getEvents() {
    user = new User();
    user.create(profileid);
    getHostStrings();
}

function getStringsFromEvents(eventList) {
    list = eventList.getEventsList();
    list.sort(function (a, b) {
        if (a.eventStart > b.eventStart)
            return -1;
        else if (a.eventStart < b.eventStart)
            return 1;
        else
            return 0;
    });
    list.sort;
    eventTitles = new Array(list.length);
    eventHosts = new Array(list.length);
    eventStartTimes = new Array(list.length);
    eventEndTimes = new Array(list.length);
    eventCategories = new Array(list.length);
    eventLocations = new Array(list.length);
    eventIDs = new Array(list.length);
    hostIDs = new Array(list.length);
    for (i = 0; i < list.length; i++) {
        if (list[i].canUserSee())
            eventTitles[i] = list[i].getTitle();
        eventHosts [i] = list[i].getHost().getName();
        //var t = list[i].getEventStart().split(/[- T :]/);
        var d = list[i].getEventStart().mysqlToDate();
        eventStartTimes[i] = d.toString().substring(0, 21);
        var x = list[i].getEventEnd().mysqlToDate();
        eventEndTimes[i] = x.toString().substring(0, 21);
        eventCategories[i] = list[i].getCategory();
        eventLocations[i] = list[i].getLocation();
        eventIDs[i] = list[i].getID();
        hostIDs[i] = list[i].getHostID();
    }
}

function getHostStrings() {
    $('#attend').hide();
    $('#attend').empty();
    $('#host').empty();
    if (eventsHosted !== null) {
        eventsHosted = null;
    }
    if (eventsAttending !== null) {
        eventsAttending = null;
    }
    user.createHostedEventsList();
    eventsHosted = user.getEventsHosting();
    eventTitles = null;
    eventHosts = null;
    eventStartTimes = null;
    eventEndTimes = null;
    eventCategories = null;
    eventLocations = null;
    getStringsFromEvents(eventsHosted);
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, eventsList;
    var n, url, url2;
    eventsList = $('#host');
    eventsList.append('<br />');
    for (n = eventsHosted.getSize() - 1; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n];
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        url2 = "../profile/index.html#" + hostIDs[n];
        newA2 = $('<a>').attr('href', url2).text(eventHosts[n]).on('click', function () {
            window.location.href = url2;
            window.location.reload(true);
        });
        newH2 = $('<p>').text(eventStartTimes[n]);
        newH3 = $('<p>').text(eventEndTimes[n]);
        newH4 = $('<p>').text(eventCategories[n]);
        newH5 = $('<p>').text(eventLocations[n]);
        newH = $('<h4>').append(newA);
        newH1 = $('<p>').append(newA2);
        newHr = $('<hr>');

        eventsList.append(newH);
        eventsList.append(newH1);
        eventsList.append(newH2);
        eventsList.append(newH3);
        eventsList.append(newH4);
        eventsList.append(newH5);
        eventsList.append(newHr);
    }
    $('#host').show();
}

function getAttendingStrings() {
    $('#host').hide();
    $('#host').empty();
    $('#attend').empty();
    if (eventsAttending !== null) {
        eventsAttending = null;
    }
    if (eventsHosted !== null) {
        eventsHosted = null;
    }
    user.createEventsAttendingList();
    eventsAttending = user.getEventsAttending();
    eventTitles = null;
    eventHosts = null;
    eventStartTimes = null;
    eventEndTimes = null;
    eventCategories = null;
    eventLocations = null;
    getStringsFromEvents(eventsAttending);
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, eventsList;
    var n, url, url2;
    eventsList = $('#attend');
    eventsList.append('<br />');
    for (n = eventsAttending.getSize() - 1; n > -1; n--) {
        url = "../event/index.html#" + eventIDs[n];
        newA = $('<a>').attr('href', url).text(eventTitles[n]).on('click', function () {
            window.location.href = url;
            window.location.reload(true);
        });
        url2 = "../profile/index.html#" + hostIDs[n];
        newA2 = $('<a>').attr('href', url2).text(eventHosts[n]).on('click', function () {
            window.location.href = url2;
            window.location.reload(true);
        });
        newH2 = $('<p>').text(eventStartTimes[n]);
        newH3 = $('<p>').text(eventEndTimes[n]);
        newH4 = $('<p>').text(eventCategories[n]);
        newH5 = $('<p>').text(eventLocations[n]);
        newH = $('<h4>').append(newA);
        newH1 = $('<p>').append(newA2);
        newHr = $('<hr>');

        eventsList.append(newH);
        eventsList.append(newH1);
        eventsList.append(newH2);
        eventsList.append(newH3);
        eventsList.append(newH4);
        eventsList.append(newH5);
        eventsList.append(newHr);
    }
    $('#attend').show();
}

function createEvent() {
    var today = new Date();
    var startDate = new Date($('#eventStart').val());
    var endDate = new Date($('#eventEnd').val());
    if ($('#eventTitle').val() === '') {
        $('#invTitleModal').modal('show');
    } else if ($('#eventStart').val() === '' || $('eventEnd').val() === '') {
        $('#invTimeModal').modal('show');
    } else if (startDate < today) {
        $('#invTimeModal').modal('show');
    } else if (startDate > endDate) {
        $('#invTimeModal').modal('show');
    } else {
        eventTitle = $('#eventTitle').val();
        eventStart = $('#eventStart').val();
        eventEnd = $('#eventEnd').val();
        eventCat = $('#eventCat').val();
        eventLoc = $('#eventLoc').val() + 1;
        eventVis = $('#eventVis').val();
        eventAcc = $('#eventAcc').val();
        maxAttendees = $('#maxAttendees').val();
        description = $('#description').val();
        event = new Event();
        event.create(user.getID(), eventCat, eventStart, eventEnd, description, eventTitle, eventVis, eventAcc, eventLoc, maxAttendees, user);
        window.location.reload();
    }
}

function getCategories() {
    var url = "http://143.44.67.0:13774/GoHost/api/category/all";
    $.getJSON(url).done(categoriesFollowUp);
}

function categoriesFollowUp(data) {
    var eventsCat = $('#category');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(parseInt(data[i].idcategory)).text(data[i].name);
        eventsCat.append(newHr);
    }
}

function getLocations() {
    var url = "http://143.44.67.0:13774/GoHost/api/location/all";
    $.getJSON(url).done(locationsFollowUp);
}

function locationsFollowUp(data) {
    eventsLoc = $('#eventLoc');
    for (i = 0; i < data.length; i++) {
        newHr = $('<option>').val(data[i].idcategory).text(data[i].name);
        eventsLoc.append(newHr);
    }
}

$.wait = function (ms) {
    var defer = $.Deferred();
    setTimeout(function () {
        defer.resolve();
    }, ms);
    return defer;
};

function refresh() {
    window.location.href = window.location.href;
    window.location.reload(true);
}

$(window).load(setUpComponents);
