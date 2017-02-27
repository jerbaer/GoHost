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
    this.displayNotification = function () {
        
        // construct notification in html (i think)
    };
    
    this.readNotification = function () {
        
    };
    
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
}
