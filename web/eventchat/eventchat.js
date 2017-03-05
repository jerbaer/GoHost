/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//There is no need for this html or js anymore. The chat will go in the event page directly.
//Move the code here to the event page js


var id = 0;
var idevent = 0;
var eventChat = null;
var chatLog;
var user = null;
var senders;
var messages;
var times;
var messageIDs;

function setUpComponents() {
    jQuery.ajaxSetup({async: false});
    id = parseInt(sessionStorage.getItem('id'));
    idevent = parseInt(sessionStorage.getItem('idevent'));
    getMessages();
}
String.prototype.mysqlToDate = String.prototype.mysqlToDate || function() {
    var t = this.split(/[- :T]/);
    return new Date(t[0], t[1]-1, t[2], t[3]||0, t[4]||0, t[5]||0);
};

function getMessages() {
    eventChat = new EventChat();
    eventChat.create(idevent);
    setTimeout(getMessageStrings(eventChat), 10000);
    var newH, newA, newA2, newHr, newH1, newH2, newH3, newH4, newH5, chat;
    var n, url, url2;
    // Find the newestBlogs div that will house newly created blogs
    chat = $('#chat');
    //Here need to find a way smart way to show messages along with the senders
    //The senders need to have links to their profiles. Finish this later
    for (n = eventChat.getSize() - 1; n > -1; n--) {
        url = "../profile/index.html#" + senders[n].getID();
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

        eventsFeed.append(newH);
        eventsFeed.append(newH1);
        eventsFeed.append(newH2);
        eventsFeed.append(newH3);
        eventsFeed.append(newH4);
        eventsFeed.append(newH5);
        eventsFeed.append(newHr);
    }

}

function getMessageStrings(eventChat) {
    chatLog = eventChat.getChatLog();
    senders = new Array(chatLog.length);
    messages = new Array(chatLog.length);
    times = new Array(chatLog.length);
    messageIDs = new Array(chatLog.length);
    for (i = 0; i < chatLog.length; i++) {
        senders[i] = chatLog[i].getUser();
        messages[i] = chatLog[i].getText();
        var d = chatLog[i].getTime().mysqlToDate();
        times[i] = d.toString().replace("GMT-0600 (Central Standard Time)", "");
        messageIDs[i] = chatLog[i].getID();
    }
}





$.wait = function (ms) {
    var defer = $.Deferred();
    setTimeout(function () {
        defer.resolve();
    }, ms);
    return defer;
}

function refresh() {
    window.location.href = window.location.href;
    window.location.reload(true);
}

$(window).load(setUpComponents);

