/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function eventsList() {
    this.events = []; //array of events contained in the list
    this.tempEvents = [];
    this.accessor = null; //user that is accessing the list
    this.viewType = 0; // 0 means view events hosting, 1 means events attending, 2 means all visible events
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    this.event1 = null;

    this.create = function (accessor1, viewType) {
        this.accessor = accessor1;
        this.viewType = viewType;

        if (viewType == 0) {
            this.getEventsHosting();
        } else if (viewType == 1) {
            this.getEventsAttending();
        } else if (viewType == 2) {
            this.getEventsVisible();
        }
    };

    this.getEventsHosting = function () {
        //get all events accessor is hosting, put them in events (0)
        var url = this.coreUrl + "event/idhost?idhost=" + this.accessor.getID();
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.hostingFollowUp
        });
    };

    this.hostingFollowUp = function (data) {
        this.events = new Array();
        for (i = 0; i < data.length; i++) {
            this.event1 = new Event();
            this.event1.createFromDB(data[i].idevent, this.accessor)
            this.events.push(this.event1);
        }
    };

    this.getEventsAttending = function () {
        //self explanatory (1)
        var url = this.coreUrl + "attendee/iduser?iduser=" + this.accessor.getID();
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.attendingFollowUp
        });
    };

    this.attendingFollowUp = function (data) {
        this.events = new Array();
        for (var i = 0; i < data.length; i++) {
            this.event1 = new Event();
            this.events.push(this.event1);
            this.events[i].createFromDB(data[i].idevent, this.accessor);
        }
    };
    //This now gets all the events in the events table
    this.getEventsVisible = function () {
        this.events = new Array();
        var url = this.coreUrl + "event/all";
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.visibleFollowUp,
            async: false
        });
    };
    //This uses the canUserSee function in the event protype to decide
    //whether to actually add it to the array of events
    this.visibleFollowUp = function (data) {
        if(data.length>0){
        for (var i = 0; i < data.length; i++) {
            let event1 = new Event();
            event1.createFromDB(data[i].idevent, this.accessor);
            if(event1.canUserSee()){
                this.events.push(event1);
            }
        }
    }
    };
    //this goes through the already existing events array, removing all
    //events that don't have that idlocation
    this.getEventsByLocation = function (idlocation) {
        this.tempEvents = new Array();
        this.tempEvents = this.events;
        this.events = [];
        for (var i = 0; i < this.tempEvents.length; i++) {
            if(this.tempEvents[i].getLocationID() == idlocation) {
                this.events.push(this.tempEvents[i]);
            }
        }
    };
    //this goes through the already existing events array, removing all
    //events that don't have that idcategory
    this.getEventsByCategory = function (idcategory) {
        this.tempEvents = new Array();
        this.tempEvents = this.events;
        this.events = [];
        for (var i = 0; i < this.tempEvents.length; i++) {
            if(this.tempEvents[i].getCategoryID() == idcategory) {
                this.events.push(this.tempEvents[i]);
            }
        }
    };

    this.getEventsList = function () {
        return this.events;
    };

    this.getSize = function () {
        return this.events.length;
    }
}
