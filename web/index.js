/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

sys_init = {
    // changed .host to .hostname
    coreUrl: "http://" + window.location.hostname + "/GoHost/api/",

    doLogin: function () {
        var url = sys_init.coreUrl + "user?email=" + $('#loginEmail').val() + "&password=" + $('#loginPass').val();
        $.getJSON(url).done(sys_init.moveToHome);
    },

    createUser: function () {
        if ($('#regPass').val() !== $('#regPassConf').val()) {
            $('#regPassWarning').show();
        } else {
            var url = coreUrl + "user";
            var user = {email: $('#regEmail').val(),
                password: $('#regPass').val()};
            var toSend = JSON.stringify(user);
            $.ajax({
                url: url,
                type: 'post',
                data: toSend,
                contentType: 'application/json',
                dataType: 'json',
                success: sys_init.moveToHome
            });
        }
    },
    moveToHome: function (data) {
        if (data.iduser !== 0) {
            // Storing the id number of the user
            sessionStorage.setItem('id', data.iduser);
            //Take them to home page
            // deleted ".href", maybe this will work
            window.location = 'home/index.html#' + data.iduser;
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
        $('button#login').on('click', sys_init.doLogin);
        // Button for creating an account
        $('button#register').on('click', sys_init.createUser);
    }
};

$(document).ready(sys_init.setUpButtons);
