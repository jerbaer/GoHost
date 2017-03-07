/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery.ajaxSetup({async: false});
sys_init = {
    coreUrl: "http://143.44.67.0:13774/GoHost/api/",
    profile: null,

    doLogin: function () {
        var url = sys_init.coreUrl + "user/login?email=" + $('#loginEmail').val() + "&password=" + $('#loginPass').val();
        $.getJSON(url).done(sys_init.moveToHome);
    },

    //Gonna have to get rid of this parameter since it's being passed 
    moveToHome: function (data) {
        if (data === undefined) {
            $('#loginWarning').show();
        } else {
            if (data.iduser > 0 && data.admin != 1) {
                // Storing the id number of the user
                sessionStorage.setItem('id', parseInt(data.iduser));
                window.location.href = 'home';
                sys_init.refresh;
            } else if (data.admin == 1) {
                sessionStorage.setItem('id', parseInt(data.iduser));
                window.location.href = 'notifications';
                sys_init.refresh;
            } else {
                $('#loginWarning').show();
            }
        }
    },

    createUser: function () {
        if ($('#regPass').val() !== $('#regPassConf').val()) {
            $('#regPassWarning').show();
        } else {
            //1. create a user account with an email, password, and name
            //2. Use the returned userid to create a profile 
            //3. Take the returned idprofile of that profile
            //4. PUT it into that user
            var url = sys_init.coreUrl + "user";
            var user = {name: $('#regName').val(), email: $('#regEmail').val(),
                password: $('#regPass').val(), admin: 0};
            var toSend = JSON.stringify(user);
            $.ajax({
                url: url,
                type: 'post',
                data: toSend,
                contentType: 'application/json',
                dataType: 'json',
                async: false,
                success: sys_init.createProfile
            });
        }
    },

    createProfile: function (data) {
        if (data.iduser > 0) {
            // Storing the id number of the user
            sessionStorage.setItem('id', parseInt(data.iduser));
        } else if (data.iduser == "0" || data.iduser == 0) {
            $('#regWarning2').show();
        } else {
            $('#regWarning').show();
        }
        var user = new User();
        user.create(parseInt(sessionStorage.getItem('id')));
        var iduser = user.getID();
        var email = user.getEmail();
        var password = user.getPassword();
        var name = user.getName();
        sys_init.profile = new Profile();
        sys_init.profile.create(parseInt(sessionStorage.getItem('id')), user);
        var profileId = {idprofile: sys_init.profile.getIdProfile(), iduser: iduser, password: password, name: name, email: email, admin: 0};
        $.ajax({
            url: sys_init.coreUrl + 'user/' + parseInt(sessionStorage.getItem('id')),
            type: 'PUT',
            data: JSON.stringify(profileId),
            contentType: 'application/json',
            dataType: 'json',
            complete: sys_init.moveToHome2
        });
    },

    moveToHome2: function (data) {
        window.location.replace = 'home';
    },

    setUpButtons: function () {
        // Hide the warning divisions upon loading
        $('#loginWarning').hide();
        $('#regWarning').hide();
        $('#regWarning2').hide();

        // Button for submitting login info
        //$('button#login').on('click', sys_init.doLogin);
        // This is to simulate the login
        $('#login').on('click', sys_init.doLogin);
        // Button for creating an account
        $('#register').on('click', sys_init.createUser);
    },
    refresh: function () {
        window.location.href = window.location.href;
        window.location.reload(true);
    }
};

$(document).ready(sys_init.setUpButtons);