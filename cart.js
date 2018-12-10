
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
        //http.setRequestHeader("Content-type","application/json");
        http.send();
        //http.send(null);

    }


    $("body").on("click", '.btn', function(event) {
        // this actually fucking works. wow im stupid
        if(this.id = "purchase") {
            get('/', loadpage);
            console.log("lj");
        }
    })

    function loadpage(html) {
        console.log("load index");
        /*$("body").empty();
        var doc = new DOMParser().parseFromString(html, 'text/html');
        document.body.append(doc.body);
        document.head.append(doc.head);*/
        get('/clearcart' , log);
        location.reload();
        //get('/getCart', addCart);
        
    }

    function log(thing) {
        console.log(thing);
    }



})

