/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

eventsList = {
    events: [], //array of events contained in the list
    accessor: null, //user that is accessing the list
    viewType: 0, // 0 means view events hosting, 1 means events attending, 2 means all visible events
    coreUrl: "http://" + window.location.host + "/GoHost/api/",
    create: function (accessor, viewType) {
        if (viewType == 0){
            getEventsHosting();
        } else if (viewType == 1){
            getEventsAttending();
        } else if (viewType == 2){
            getEventsVisible();
        }
        this.accessor = accessor;
        this.viewType = viewType

    },
    getEventsHosting: function () {
        //get all events accessor is hosting, put them in events (0)
        var url = eventsList.coreUrl + "event?idhost="+accessor;
        $.getJSON(url).done(eventsList.hostingFollowUp);
    },
    
    hostingFollowUp: function (data) {
        for (n=0; n<data.length;n++){
            events[n] = data[n].idevent;
        }
    },
    
    getEventsAttending: function () {
        //self explanatory (1)
        var url = eventsList.coreUrl + "attendee?iduser="+accessor;
        $.getJSON(url).done(eventsList.attendingFollowUp);
    },
    
    attendingFollowUp: function (data) {
        for (n=0; n<data.length;n++){
            events[n] = data[n].idevent;
        }
    },
    
    getEventsVisible: function () {
        //self explantory (2)
        //Wait for Alex to explain visibility and accessibility
        //Visibility: 2 = public, 1 = friends only, 0 = invites only
        //Accessiblitiy: 2 = open to everybody, 1 = rquests , 0 = closed  
        //This is a shit show. Fix it once inbox class has been written and 
        //friends tables have been finalized.
        //This would entail the following:
        //1. Getting all public events, visibility (2)
        //2. Getting all events that friends are hosting
        //3. Getting all events that I've been nvited to
        //4. Get all events I'm in?
        //
    },
    visibleFollowUp: function (data) {
        //I would call this function many times in the previous one
        //This is why n starts at the length of the array
        //Need to find a way later to sort these out by date
        //A view can do that for sure
        for (n=eventsList.events.length; n<data.length;n++){
            events[n] = data[n].idevent;
        }
    },
    getEventsList: function () {
        return events;
    },

}
