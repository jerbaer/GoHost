/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

sys_init = {
    // changed .host to .hostname
    coreUrl: "http://143.44.67.0:13774/GoHost/api/",

    doLogin: function () {
        var url = sys_init.coreUrl + "user?email=" + $('#loginEmail').val() + "&password=" + $('#loginPass').val();
        $.getJSON(url).done(sys_init.moveToHome);
    },

    createUser: function () {
        if ($('#regPass').val() !== $('#regPassConf').val()) {
            $('#regPassWarning').show();
        } else {
            var url = sys_init.coreUrl + "user";
            var user = {email: $('#regEmail').val(),
                password: $('#regPass').val(), name:"", idprofile:2};
            var toSend = JSON.stringify(user);
            $.ajax({
                url: url,
                type: 'post',
                data: toSend,
                contentType: 'application/json',
                dataType: 'json',
                async : false,
                success: sys_init.moveToHome
            });
        }
    },

    moveToHome: function (data) {
        if (data !== "0"&& data !== 0) {
            // Storing the id number of the user
            sessionStorage.setItem('id', parseInt(data));
            //Take them to home page
            // deleted ".href", maybe this will work
            window.location.href = 'home/';
            sys_init.refresh;
        } else {
            $('#regWarning').show();
        }
    },

    setUpButtons: function () {
        // Hide the warning divisions upon loading
        $('#loginWarning').hide();
        // I've removed these two warnings for now
        //$('#regWarning').hide();
        //$('#regPassWarning').hide

        // Button for submitting login info
        //$('button#login').on('click', sys_init.doLogin);
        // This is to simulate the login
        $('#login').on('click', sys_init.doLogin);
        // Button for creating an account
        $('#register').on('click', sys_init.createUser);
    },
    refresh: function () {
	window.location.href = window.location.href; window.location.reload(true); 
    }
};

$(document).ready(sys_init.setUpButtons);