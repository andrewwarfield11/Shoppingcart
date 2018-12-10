
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
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            displayCart(http.responseText);
        }
    }
    http.open("GET", '/getCart', true);
    http.setRequestHeader("Content-type","application/json");
    http.send();

    function test() {
        console.log("this is a test");
    }

    function displayCart(data) {
        var cart = JSON.parse(data);
        var price = 0;
        cart.forEach( function (prod) {
            price += prod["price"];
            buildProd(prod);
        })
    }

    function buildProd(prod) {
        var row = $('<div class="row"></div>');
        var col = $('<div class="col col-md-offset-4">');
        col.append($('<h1 id="' + prod["id"] + 'name' + '"></h1>').text(prod["name"])); // book name
        col.append($('<h2 id="' + prod["id"] + 'price' + '"></h2>').text("Price: $" + prod["price"])); // book price
        col.append($('</div>'));
        row.append(col);
        $(".main").append(row);

    }
})

