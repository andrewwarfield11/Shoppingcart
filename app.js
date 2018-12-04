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
    // every time one of these is clicked, scrap previous html in main and add new ones
    // try using .is(CLICKED)
    $("#available label").on("click", function (event) {
        console.log(event);
        av = !av;
        rebuild();
    });
    $("#unavailable label").on("click", function (event) {
        console.log(event);
        unav = !unav;
        rebuild();
    });
    $("#price1 label").on("click", function (event) {
        console.log(event);
        p1 = !p1;
        rebuild();
    });
    $("#price2 label").on("click", function (event) {
        console.log(event);
        p2 = !p2;
        rebuild();
    });
    $("#price3 label").on("click", function (event) {
        console.log(event);
        p3 = !p3;
        rebuild();
    });
    // rating + 1 filter
    $("#rating1 label").on("click", function (event) {
        console.log(event);
        r1 = !r1;
        rebuild();
    });

    // rating + 2 filter
    $("#rating2 label").on("click", function (event) {
        console.log(event);
        r2 = !r2;
        rebuild();
    });

    function isHidden(i) {
        if ($("#" + i["id"] + "name").is(":hidden")) return true;
        else return false;
    }
    function show(i) {
        if (isHidden(i)) {
            console.log("showing " + i);
            $("#" + i["id"] + "name").show();
            $("#" + i["id"] + "genre").show();
            $("#" + i["id"] + "rating").show();
            $("#" + i["id"] + "stock").show();
            $("#" + i["id"] + "price").show();
        }
    }
    function hide(i) {
        if (!isHidden(i)) {
            console.log("hiding " + i);
            $("#" + i["id"] + "name").hide();
            $("#" + i["id"] + "genre").hide();
            $("#" + i["id"] + "rating").hide();
            $("#" + i["id"] + "stock").hide();
            $("#" + i["id"] + "price").hide();
        }
    }
    function checkAv(i) {
        if (av && i["stock"] > 0 || !av || (av && unav)) {
            console.log("checkav true: av is " + av );
          return true;
        }
        else {
          return false;
        }
      }
      function checkUnav(i) {
        if (unav && i["stock"] == 0 || !unav || (av&&unav))
          return true;
          else {
            return false;
          }
      }
      function checkPrice(i) {

        if( (p1 && i['price'] <= 25) || (p2 && (i['price'] >= 25 
        && i['price'] <= 50) ) || (p3 && i['price'] >= 50) || (!p1 && !p2 && !p3))
          return true;
        else
          return false

      }
      function checkR1(i) {
        if (r1 && i["rating"] >= 1 || !r1)
          return true;
          else {
            return false;
          }
      }
      function checkR2(i) {
        if (r2 && i["rating"] == 2 || !r2)
          return true;
          else {
            return false;
          }
  
      }

      function removeAll() {
        $(".main").empty();
      }
      function rebuild() {
            removeAll();
            build();
      }
    function fitsRequirements(i) {
        console.log("checking requirements");
        console.log("availability is " + i["stock"]);
        if (checkAv(i) && checkUnav(i) && checkPrice(i) && checkR1(i) && checkR2(i)) {
            console.log("true");
            return true;
        }
        else {
            console.log("false");
            return false;
        }
    }

    function build() {
        console.log("building");
        var row = $('<div class="row"></div>');
        var loc = 0;
        console.log(products);
        products.forEach(function (product) {
            var col;
            if (loc % rowSize == 0) {
                col = $("<div class='w-100'></div>");
                row.append(col);
            }
            var book = product;
            //console.log(book);
            if(fitsRequirements(book)) {
                //console.log("fits requirements stock is " + book["stock"]);
                //console.log(book);
                col = $('<div class="col col-md-offset-2"></div>');
                col.append($('<h2 id="' + book["id"] + 'name' + '"></h2>').text(book["name"])); // book name
                col.append($('<h3 id="' + book["id"] + 'genre' + '"></h3>').text("Genre: " + book["genre"])); // book genre
                col.append($('<h3 id="' + book["id"] + 'price' + '"></h3>').text("Price: $" + book["price"])); // book price
                col.append($('<h3 id="' + book["id"] + 'stock' + '"></h3>').text("Stock: " + book["stock"])); // book stock
                col.append($('<h3 id="' + book["id"] + 'rating' + '"></h3>').text("Rating: " + book["rating"])); // book rating
                row.append(col);
                loc++;
            }
            else
                console.log("didn't fit requirements stock is " + book["stock"]);
        });
        console.log(row);
        $(".main").append(row);
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
