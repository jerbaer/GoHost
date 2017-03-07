/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function EventChat () {
    this.parent = null;
    this.chatLog = [];
    this.user = null;
    this.coreUrl = "http://143.44.67.0:13774/GoHost/api/";
    this.line1 = null;
    
    
    this.create = function (parent, user) {
        this.parent = parent;
        this.user = user;
        var url = this.coreUrl + "message/idevent?idevent=" + this.parent.getID();
        $.ajax({
            dataType: "json",
            url: url,
            context: this,
            success: this.createFollowUp
        });
    };
    
    this.createFollowUp = function (data) {
        this.chatLog = new Array();
        for (var i = 0; i < data.length; i++) {
            var u = new User();
            u.create(data[i].iduser)
            this.line1 = new ChatLine();
            this.line1.createFromDB(data[i].idmessage, u);
            this.chatLog.push(this.line1);
        }
        this.chatLog.sort(function (a, b) {
        if (a.time > b.time)
            return -1;
        else if (a.time < b.time)
            return 1;
        else
            return 0;
    });
        this.chatLog.sort();
    };
    
    this.getChatLog = function () {
        return this.chatLog;
    };

    this.getSize = function () {
        return this.chatLog.length;
    };
    this.getUser = function () {
        return this.user;
    }
}
