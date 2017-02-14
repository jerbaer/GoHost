/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Need to make sure that friend statuses aren't repeated
//Why doesn't it recognize the class name when I try to reference it?
FriendsList = {
    friends : null, //array of user objects with friends in them
    owner : 0,
    size: 0,
    coreUrl: "http://" + window.location.host + "/GoHost/api/",
    create: function(iduser){
        owner = iduser;
        //get friends from database and populate list, fill in size
        var url = coreUrl + "friend?iduser1="+owner;
        $.getJSON(url).done(FriendsList.friendFollowUp);
        //Need to also cross reference it with friends that are user1
        //Need to rethink how friends status happens in the first place
    },
    
    friendFollowUp : function(data){
        size = data.length;
        friends = [];
        for(n=0;n<data.length;n++){
            friends[n] = data[n].iduser2;
        }
    },
    
    getFriends: function(){
        return friends;
    },
    isUserOnList: function(iduser){
      for (i = 0; i<size; i++){
          if (iduser = friends[i].getID()){
              return true
          }
      }
      return false
    }
};
