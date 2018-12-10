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
    //var url = 'https://hidden-reaches-58019.herokuapp.com/'
    var url = 'localhost:5000'


    function getViewport() {
        // return values : 0 for small, 1 for medium, 2 for large
        var width = window.innerWidth;
        var height = window.innerHeight;
        if(width < 500 || height < 500) {
            return 0;
        }
        else if(width < 800 || height < 800) {
            return 1;
        }
        else {
            return 2;
        }
    }

    function setRowSize(size) {
        if(size == 0) {
            return 1;
        }
        else if( size == 1) {
            return 2;
        }
        else {
            return 3;
        }
    }
    $("#cartbutton").on("click", function(event) {
        get('/cart/view.html',loadCart);
    })


    function loadCart(html) {
        // definitely not the ideal way to do it, but it works
        console.log("load cart");
        //document.body.innerHTML = "";
        //document.head.innerHTML = "";
        $("body").empty();
        //var body = html.split('<body>').pop().split('</body>')[0];
        //console.log(body);
        //var head = html.split('<head>').pop().split('</head>')[0];
        //var test = document.body;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        //test.appendChild(doc);
        //document.body = test;
        //var b = document.body;
        //var empty = '';
        //document.body.innerHTML = null;
        document.body.append(doc.body);
        document.head.append(doc.head);
        //document.head.innerHTML = null;
        //document.head = head;
        //document.head.innerHTML = head;
        get('/getCart', addCart);
        //window.location = url + '/cart/view.html';
    }

    function addCart(items) {
        prods = JSON.parse(items);
        var cost = 0;
        prods.forEach( function(prod) {
            cost += prod["price"];
            var row = $('<div class="row"></div>');
            //var row = $("");
            var col = $('<div class="col col-md-offset-6">');
            //var col = $("");
            col.append($('<h1 id="' + prod["id"] + 'name' + '"></h1>').text(prod["name"])); // book name
            col.append($('<h2 id="' + prod["id"] + 'price' + '"></h2>').text("Price: $" + prod["price"])); // book price
            col.append($('</div>'));
            row.append(col);
            $("#items").append(row);

        });

        $("#cost").append($('<h1>Total: ' + cost + '</h1>'));

        //addScriptToCart();
    }

    function addScriptToCart() {
        // needed this because scripts added with innerHTML don't get executed.
        console.log("adding script to cart");
        var scr = $('<script type="text/javascript">\
        var purchase = document.getElementBYId("purchase");\
        purchase.onclick = function() {\
            var script = document.createElement("script");\
            script.type = "text/javascript";\
            script.src = "/cart.js";\
            return false;\
        }\
        </script>');
        var newdiv = $('<div>');
        newdiv += scr;
        newdiv += $('</div>');
        document.body.appendChild(newdiv);
    }
    function getBools() {
        var str = getAvCheck() + ',' + getUnavCheck() + ',' + getP1Check() + ',' + getP2Check() + ',' + 
        getP3Check() + ',' + getR1Check() + ',' + getR2Check();
        return str;
    }

    function getAvCheck() {
        return document.getElementById("avcheck").checked;
    }
    function getUnavCheck() {
        return document.getElementById("unavcheck").checked;
    }
    function getP1Check() {
        return document.getElementById("price1check").checked;
    }
    function getP2Check() {
        return document.getElementById("price2check").checked;
    }
    function getP3Check() {
        return document.getElementById("price3check").checked;
    }
    function getR1Check() {
        return document.getElementById("rating1check").checked;
    }
    function getR2Check() {
        return document.getElementById("rating2check").checked;
    }

    $(document).on("click", 'input[type="checkbox"]', function (event) {
        var name = this.id;
        console.log(event);
        if(! name.endsWith("check")) {
            console.log (this);
            console.log("iterating over prods");
            products.forEach( function(prod) {
                if(prod["name"] == name) {
                    //console.log("found it");
                    if(prod["stock"] > 0)
                        send( '/addToCart' , dothis, prod);
                }
                //else {
                    //console.log("False: name is " + name + " and product[name] is " + product["name"] + " and this.checked is " + this.checked);
                //}
            })
        }
    })

    function removePurchased(pur) {
        var prods = JSON.parse(pur);
        prods.forEach(function(prod) {
            var newstock = prod["stock"] - 1;
            products.forEach(function(p) {
                if(p["name"] == prod["name"]) {
                    p["stock"] = newstock;
                }
            })
        })
    }

    $("body").on("click", '.btn', function(event) {
        // remove 1 stock from each of the products in cart
        if(this.id = "purchase") {
            get('/getCart', removePurchased);
        }
    })


    $("#available label").on("click", function (event) {
        console.log(event);
        av = !av;
        rebuild();
        //send( '/products/' + getBools() , build, products);
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
        //console.log(event);
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

    function checkAv(i) {
        if (getAvCheck() && i["stock"] > 0 || !getAvCheck() || (getAvCheck() && getUnavCheck())) {
            //console.log("checkav true: av is " + av );
          return true;
        }
        else {
          return false;
        }
      }
      function checkUnav(i) {
        if (getUnavCheck() && i["stock"] == 0 || !getUnavCheck() || (getAvCheck() && getUnavCheck()))
          return true;
          else {
            return false;
          }
      }
      function checkPrice(i) {

        if( (getP1Check() && i['price'] <= 25) || (getP2Check() && (i['price'] >= 25 && i['price'] <= 50) )
         || (getP3Check() && i['price'] >= 50) || (!getP1Check() && !getP2Check() && !getP3Check()))
          return true;
        else
          return false

      }
      function checkR1(i) {
        if (getR1Check() && i["rating"] >= 1 || !getR1Check())
          return true;
          else {
            return false;
          }
      }
      function checkR2(i) {
        if (getR2Check() && i["rating"] == 2 || !getR2Check())
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
            build(products, true);
      }
    function fitsRequirements(i) {
        //console.log("checking requirements");
        //console.log("availability is " + i["stock"]);
        if (checkAv(i) && checkUnav(i) && checkPrice(i) && checkR1(i) && checkR2(i)) {
            //console.log("true");
            return true;
        }
        else {
            //console.log("false");
            return false;
        }
    }

    function build(prods, firstBuild) {
        var row = $('<div class="row"></div>');
        var loc = 0;
        if(!firstBuild) {
            prods = JSON.parse(prods);
        }
        //console.log(products);
        prods.forEach(function (product) {
            var col;
            var rowSize = setRowSize(getViewport());
            if (loc % rowSize == 0) {
                col = $("<div class='w-100'></div>");
                row.append(col);
            }
            var book = product;
            //console.log(book);
            if(fitsRequirements(book)) {

                col = $('<div class="col col-md-offset-4">');
                col.append($('<ul class="list-group">'));            
                col.append($('<li class="list-group item>'));
                col.append($('<h3 id="' + book["id"] + 'name' + '"></h3>').text(book["name"])); // book name
                col.append($('</li>'));
                col.append($('<li class="list-group item>'));
                col.append($('<h3 id="' + book["id"] + 'genre' + '"></h3>').text("Genre: " + book["genre"])); // book genre
                col.append($('<li class="list-group item>'));
                col.append($('<h3 id="' + book["id"] + 'price' + '"></h3>').text("Price: $" + book["price"])); // book price
                col.append($('</li>'));
                col.append($('<li class="list-group item>'));
                col.append($('<h3 id="' + book["id"] + 'stock' + '"></h3>').text("Stock: " + book["stock"])); // book stock
                col.append($('</li>'));
                col.append($('<li class="list-group item>'));
                col.append($('<h3 id="' + book["id"] + 'rating' + '"></h3>').text("Rating: " + book["rating"])); // book rating
                col.append($('</li>'));
                col.append($('<li class="list-group item>'));
                col.append($('<div class="checkbox"> <label> <input type="checkbox" id="' + book["name"] + '"> <span class="cr">\
                    <i class="cr-icon glyphicon glyphicon-ok"> </i> </span> Add To Cart </label> </div>'));
                col.append($('</li>'));
                col.append($('</ul>'));
    
                row.append(col);
                loc++;
            }
        });
        //console.log(row);
        $(".main").append(row);
    }
    var database = firebase.database();
    database.ref("departments/books").once("value").then(function (snapshot) {
        var data = snapshot.val();
        console.log(data);
        var loc = 0;
        Object.keys(data["products"]).forEach(function (key) {
            var book = data["products"][key];
            console.log(book);
            products.push(book);

        });
        build(products, true);
    });

    // connect to server

    function send(url, callback, data) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                callback(http.responseText, false);
            }
        }
        http.open("POST", url, true);
        http.setRequestHeader("Content-type","application/json");
        http.send(JSON.stringify(data));
        //http.send(null);

    }


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
    function dothis(cb) {
        console.log(cb);
    }

});
/*
function send2(url, callback, data) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText, false);
        }
    }
    http.open("POST", url, true);
    http.setRequestHeader("Content-type","application/json");
    http.send(JSON.stringify(data));
    //http.send(null);

}


function get2(url, callback) {
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

function build(prods, firstBuild) {
    var row = $('<div class="row"></div>');
    var loc = 0;
    if(!firstBuild) {
        prods = JSON.parse(prods);
    }
    //console.log(products);
    prods.forEach(function (product) {
        var col;
        var rowSize = setRowSize(getViewport());
        if (loc % rowSize == 0) {
            col = $("<div class='w-100'></div>");
            row.append(col);
        }
        var book = product;
        //console.log(book);
        if(fitsRequirements(book)) {

            col = $('<div class="col col-md-offset-4">');
            col.append($('<ul class="list-group">'));            
            col.append($('<li class="list-group item>'));
            col.append($('<h3 id="' + book["id"] + 'name' + '"></h3>').text(book["name"])); // book name
            col.append($('</li>'));
            col.append($('<li class="list-group item>'));
            col.append($('<h3 id="' + book["id"] + 'genre' + '"></h3>').text("Genre: " + book["genre"])); // book genre
            col.append($('<li class="list-group item>'));
            col.append($('<h3 id="' + book["id"] + 'price' + '"></h3>').text("Price: $" + book["price"])); // book price
            col.append($('</li>'));
            col.append($('<li class="list-group item>'));
            col.append($('<h3 id="' + book["id"] + 'stock' + '"></h3>').text("Stock: " + book["stock"])); // book stock
            col.append($('</li>'));
            col.append($('<li class="list-group item>'));
            col.append($('<h3 id="' + book["id"] + 'rating' + '"></h3>').text("Rating: " + book["rating"])); // book rating
            col.append($('</li>'));
            col.append($('<li class="list-group item>'));
            col.append($('<div class="checkbox"> <label> <input type="checkbox" id="' + book["name"] + '"> <span class="cr">\
                <i class="cr-icon glyphicon glyphicon-ok"> </i> </span> Add To Cart </label> </div>'));
            col.append($('</li>'));
            col.append($('</ul>'));

            row.append(col);
            loc++;
        }
    });

    if(firstBuild) {
        send2('/makeProds', cb, prods);
    }
    //console.log(row);
    $(".main").append(row);
}

function cb(c) {
    console.log(cb);
}
function checkAv(i) {
    if (getAvCheck() && i["stock"] > 0 || !getAvCheck() || (getAvCheck() && getUnavCheck())) {
        //console.log("checkav true: av is " + av );
      return true;
    }
    else {
      return false;
    }
  }
function checkUnav(i) {
    if (getUnavCheck() && i["stock"] == 0 || !getUnavCheck() || (getAvCheck() && getUnavCheck()))
      return true;
      else {
        return false;
      }
  }
  function checkPrice(i) {

    if( (getP1Check() && i['price'] <= 25) || (getP2Check() && (i['price'] >= 25 && i['price'] <= 50) )
     || (getP3Check() && i['price'] >= 50) || (!getP1Check() && !getP2Check() && !getP3Check()))
      return true;
    else
      return false

  }
  function checkR1(i) {
    if (getR1Check() && i["rating"] >= 1 || !getR1Check())
      return true;
      else {
        return false;
      }
  }
  function checkR2(i) {
    if (getR2Check() && i["rating"] == 2 || !getR2Check())
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
        build(products, true);
  }
function fitsRequirements(i) {
    //console.log("checking requirements");
    //console.log("availability is " + i["stock"]);
    if (checkAv(i) && checkUnav(i) && checkPrice(i) && checkR1(i) && checkR2(i)) {
        //console.log("true");
        return true;
    }
    else {
        //console.log("false");
        return false;
    }
}

function getViewport() {
    // return values : 0 for small, 1 for medium, 2 for large
    var width = window.innerWidth;
    var height = window.innerHeight;
    if(width < 500 || height < 500) {
        return 0;
    }
    else if(width < 800 || height < 800) {
        return 1;
    }
    else {
        return 2;
    }
}

function setRowSize(size) {
    if(size == 0) {
        return 1;
    }
    else if( size == 1) {
        return 2;
    }
    else {
        return 3;
    }
}

function getAvCheck() {
    return document.getElementById("avcheck").checked;
}
function getUnavCheck() {
    return document.getElementById("unavcheck").checked;
}
function getP1Check() {
    return document.getElementById("price1check").checked;
}
function getP2Check() {
    return document.getElementById("price2check").checked;
}
function getP3Check() {
    return document.getElementById("price3check").checked;
}
function getR1Check() {
    return document.getElementById("rating1check").checked;
}
function getR2Check() {
    return document.getElementById("rating2check").checked;
}
*/
