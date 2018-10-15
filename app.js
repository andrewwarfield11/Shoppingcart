// the provided Firebase config for accessing our Firebase NoSQL database
// removed all the to do's
var config = {
    apiKey: "AIzaSyBthC9BLzwfHrmp1xiFk1rglVDqYQ5rB-s",
    authDomain: "cs-3033-fa18.firebaseapp.com",
    databaseURL: "https://cs-3033-fa18.firebaseio.com",
    projectId: "cs-3033-fa18",
    storageBucket: "cs-3033-fa18.appspot.com",
    messagingSenderId: "494659703474"
};
// initialize the firebase app
firebase.initializeApp(config);

// use JQuery to call your code after the document.ready event
$(function () {
    var products = [];
    // booleans for the filters
    var av = false;
    var unav = false;
    var r1 = false;
    var r2 = false;
    var p1 = false;
    var p2 = false;
    var p3 = false;

    var rowSize = 3;

    $("#available label").on("click", function (event) {
        console.log(event);
        av = !av;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);

            index++;
        });
    });
    $("#unavailable label").on("click", function (event) {
        console.log(event);
        unav = !unav;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);

            index++;
        });
    });
    $("#price1 label").on("click", function (event) {
        console.log(event);
        p1 = !p1;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);

            index++;
        });
    });
    $("#price2 label").on("click", function (event) {
        console.log(event);
        p2 = !p2;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);

            index++;
        });
    });
    $("#price3 label").on("click", function (event) {
        console.log(event);
        p3 = !p3;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);

            index++;
        });
    });
    // rating + 1 filter
    $("#rating1 label").on("click", function (event) {
        console.log(event);
        r1 = !r1;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);
            index++;
        });
    });

    // rating + 2 filter
    $("#rating2 label").on("click", function (event) {
        console.log(event);
        r2 = !r2;
        var index = 0;
        products.forEach(function (product) {

            if (fitsRequirements(index))
                show(index);
            else
                hide(index);
            index++;
        });
    });

    function isHidden(i) {
        if ($("#" + products[i]["id"] + "name").is(":hidden")) return true;
        else return false;
    }
    function show(i) {
        if (isHidden(i)) {
            $("#" + products[i]["id"] + "name").show();
            $("#" + products[i]["id"] + "genre").show();
            $("#" + products[i]["id"] + "rating").show();
            $("#" + products[i]["id"] + "stock").show();
            $("#" + products[i]["id"] + "price").show();
        }
    }
    function hide(i) {
        if (!isHidden(i)) {
            $("#" + products[i]["id"] + "name").hide();
            $("#" + products[i]["id"] + "genre").hide();
            $("#" + products[i]["id"] + "rating").hide();
            $("#" + products[i]["id"] + "stock").hide();
            $("#" + products[i]["id"] + "price").hide();
        }
    }
    function checkAv(i) {
        if (av && products[i]["stock"] > 0 || !av)
            return true;
        else
            return false;
    }
    function checkUnav(i) {
        if (unav && products[i]["stock"] == 0 || !unav)
            return true;
        else
            return false;
    }
    function checkP1(i) {
        if (p1 && products[i]["price"] < 25 || !p1)
            return true;
        else
            return false;
    }
    function checkP2(i) {
        if (p2 && products[i]["price"] < 50 && products[i]["price"] >= 25 || !p2)
            return true;
        else
            return false;
    }
    function checkP3(i) {
        if (p3 && products[i]["price"] >= 50 || !p3)
            return true;
        else
            return false;
    }
    function checkR1(i) {
        if (r1 && products[i]["rating"] >= 1 || !r1)
            return true;
        else return false;
    }
    function checkR2(i) {
        if (r2 && products[i]["rating"] == 2 || !r2)
            return true;
        else return false;

    }
    function fitsRequirements(i) {
        if (checkAv(i) && checkUnav(i) && checkP1(i) && checkP2(i) && checkP3(i) && checkR1(i) && checkR2(i))
            return true;
        else return false;
    }
    var database = firebase.database();
    database.ref("departments/books").once("value").then(function (snapshot) {
        var data = snapshot.val();
        console.log(data);
        var row = $('<div class="row"></div>');
        var loc = 0;
        Object.keys(data["products"]).forEach(function (key) {
            var col, bookHTML;
            if (loc % rowSize == 0) {
                col = $("<div class='w-100'></div>");
                row.append(col);
            }
            loc++;
            var book = data["products"][key];
            console.log(book);
            products.push(book);
            col = $('<div class="col col-md-offset-2"></div>');
            col.append($('<h2 id="' + book["id"] + 'name' + '"></h2>').text(book["name"])); // book name
            col.append($('<h3 id="' + book["id"] + 'genre' + '"></h3>').text("Genre: " + book["genre"])); // book genre
            col.append($('<h3 id="' + book["id"] + 'price' + '"></h3>').text("Price: $" + book["price"])); // book price
            col.append($('<h3 id="' + book["id"] + 'stock' + '"></h3>').text("Stock: " + book["stock"])); // book stock
            col.append($('<h3 id="' + book["id"] + 'rating' + '"></h3>').text("Rating: " + book["rating"])); // book rating
            row.append(col);
        });
        $(".main").append(row);
    });
});
