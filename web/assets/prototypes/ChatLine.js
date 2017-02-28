/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ChatLine () {
    this.parent = null;
    this.user = null;
    this.text = "";
    this.time = "";
    
    this.create = function () {
        
    };
    
    this.getParent = function () {
        return this.parent;
    };
    
    this.getUser = function () {
        return this.user;
    };
    
    this.getText = function () {
        return this.text;
    };
    
    this.getTime = function () {
        return this.time;
    };
    
    
}
