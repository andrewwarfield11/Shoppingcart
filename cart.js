
// copy pasted from app.js
var config = {
    apiKey: "AIzaSyBthC9BLzwfHrmp1xiFk1rglVDqYQ5rB-s",
    authDomain: "cs-3033-fa18.firebaseapp.com",
    databaseURL: "https://cs-3033-fa18.firebaseio.com",
    projectId: "cs-3033-fa18",
    storageBucket: "cs-3033-fa18.appspot.com",
    messagingSenderId: "494659703474"
};

$(function () {
    console.log("cart");


    function get(url, callback) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                callback(http.responseText);
            }
        }
        http.open("GET", url, true);
        http.contex
        http.send();
    }


    $("body").on("click", '.btn', function(event) {
        if(this.id = "purchase") {
            get('/', loadpage);
            console.log("lj");
        }
    })

    function loadpage(html) {
        console.log("load index");
        get('/clearcart' , log);
        location.reload();        
    }

    function log(thing) {
        console.log(thing);
    }



})

