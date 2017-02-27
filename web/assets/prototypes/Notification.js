/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Notification(){
    this.idnotification = 0;
    this.iduser = 0;
    this.from = 0;
    this.idevent = 0;
    this.status = 0;
    this.read = null;
    this.timestamp = 0;
    
    
    this.creatFromDB = function (iduser){
        //Get request here
    };
    
    this.create = function (iduser, from, idevent, timestamp) {
        //This does not take status and read as parameters because those
        //Should be intitalized to not accepted and not read
        //This would have a post request
        // var notification = {member variables}
            // $.ajax({
                // member variables
            // });
    };
    
    
    this.editRead = function (read) {
        this.read = read;
    };
    
    this.editStatus = function(status){
        this.status = status;
    };
    
    
    //Copied this from event. Change everything to fit notification
    //Also, this hasn't been debugged in event so it could be incorrect
    this.refreshEdits = function () {
        var event = {read: this.read, status: this.status};
        $.ajax({
            url: coreUrl + 'event',
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json'
        });
        //This will have a put request that updates the db with all the edits 
        //That might have happened to the event object. We will call this 
        //End-all function everytime an edit happens
    };
}
