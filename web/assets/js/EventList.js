/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

eventsList = {
    events: [], //array of events contained in the list
    accessor: null, //user that is accessing the list
    viewType: 0, // 0 means view events hosting, 1 means events attending, 2 means all visible events
    coreUrl: "http://143.44.67.0:13774/GoHost/api/",
    create: function (accessor1, viewType) {
        if (viewType == 0){
            eventsList.getEventsHosting();
        } else if (viewType == 1){
            eventsList.getEventsAttending();
        } else if (viewType == 2){
            eventsList.getEventsVisible();
        }
        eventsList.accessor = accessor1;
        eventsList.viewType = viewType;

    },
    getEventsHosting: function () {
        //get all events accessor is hosting, put them in events (0)
        var url = eventsList.coreUrl + "event?idhost="+accessor.getID();
        $.getJSON(url).done(eventsList.hostingFollowUp);
    },
    
    hostingFollowUp: function (data) {
        for (n=0; n<data.length;n++){
            events[n] = data[n].idevent;
        }
    },
    
    getEventsAttending: function () {
        //self explanatory (1)
        var url = eventsList.coreUrl + "attendee?iduser="+accessor.getID();
        $.getJSON(url).done(eventsList.attendingFollowUp);
    },
    
    attendingFollowUp: function (data) {
        for (n=0; n<data.length;n++){
            events[n] = data[n].idevent;
        }
    },
    
    getEventsVisible: function () {
        var url = eventsList.coreUrl + "event?visibility=2";
        $.getJSON(url).done(eventsList.visibleFollowUp);
        
    },
    visibleFollowUp: function (data) {
        for(i=0;i<data.length;i++){
            events[i] = new Event();
            events[i].create(data[i].getIdevent());
        }
    },
    getEventsList: function () {
        return events;
    },
    getSize: function(){
        return events.length();
    }
};
