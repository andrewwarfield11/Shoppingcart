var app = require('express')();
var bodyParser = require('body-parser');
var port = parseInt(process.argv[2]);
app.use(bodyParser.json())

var cart = [];
var allProds = [];
var av, unav, p1, p2, p3, r1, r2;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
    res.sendFile(__dirname + '/app.js');
});

app.get('/cart.js', function (req, res) {
    res.sendFile(__dirname + '/cart.js');
})

app.get('/lib/css/:id', function(req, res) {
    res.sendFile(__dirname + '/lib/css/' + req.params.id);
});

app.get('/lib/fonts/:id', function(req, res) {
    res.sendFile(__dirname + '/lib/fonts/' + req.params.id);
});

app.get('/cart/view.html', function(req, res) {
    res.sendFile(__dirname + '/cart/view.html');
});

app.get('/allProds' , function(req,res) {
    res.send(JSON.stringify(allProds));
})

app.get('/clearcart', function (req,res) {
    cart.length=0;
    res.send("cleared cart");
})

app.post('/makeProds' , function (req,res) {
    var list = req.body;
    list.forEach(function (element) {
        allProds.push(element);
    })

    res.send("made prods.");
})

app.post('/products/:bools', function(req,res) {
    sendProds(req,res);
})

app.get('/bools', function(req,res) {
    res.send(av + ',' + unav + ',' + p1 + ',' + p2 + ',' + p3 + ',' + r1+ ',' + r2);
})

app.post('/addToCart', function(req,res) {
    console.log("in add to cart");
    var inCart = false;
    cart.forEach( function (prod, idx) {
        if(req.body["name"] == prod["name"]) {
            console.log("splicing");
            cart.splice(idx,1);
            inCart = true;
        }
    });
    if(!inCart) {
        console.log("pushing to cart")
        cart.push(req.body);
    }
    console.log(cart);
    console.log('/n/n');
    res.send("hi");
})

app.get('/getCart',function(req,res) {
    res.send(JSON.stringify(cart));
})

app.listen(port, function() {
    console.log('listening on *:' + port);
});


function sendProds(req,res) {
    var vals = req.params.bools.split(",");
    console.log(vals);
    av = vals[0];
    unav = vals[1];
    p1 = vals[2];
    p2 = vals[3];
    p3 = vals[4];
    r1 = vals[5];
    r2 = vals[6];

    console.log("av: " + av + " unav: " + unav);
    var prods = [];

    //console.log('req.body');
    console.log(req.body);
    req.body.forEach( function (prod) {
        //console.log(prod['name']);
        console.log('');
        if(fitsRequirements(prod)) {
            prods.push(prod);
        }
        //else {
            //console.log("Didnt fit requirements: stock is " + prod["stock"]);
        //}
    })

    console.log('prods:');
    prods.forEach( function(p) {
        console.log(p['name'] + "   " + p["stock"]);
    });

    console.log("prods length is " +prods.length +  " amd req.body length is " + req.body.length);

    res.send(JSON.stringify(prods));

}

function checkAv(i) {
    if ( av && (i["stock"] > 0 || unav) || !av) {
        if(i['stock'] == 0 && av) {
            console.log(" checkav returning false");
            return false;
        }
        console.log(" checkav returning true");
      return true;
    }
    else {
        console.log(" checkav returning false");
      return false;
    }
  }
  function checkUnav(i) {
    if (unav && i["stock"] == 0 || !unav || (av&&unav)) {
        console.log(" checkunav returning true");
        return true;
    }
      else {
        console.log(" checkunav returning false");
        return false;
      }
  }
  function checkPrice(i) {

    if( (p1 && i['price'] <= 25) || (p2 && (i['price'] >= 25 
    && i['price'] <= 50) ) || (p3 && i['price'] >= 50) || (!p1 && !p2 && !p3)) {
        console.log(" checkprice returning true");
        return true;
    }
    else {
        console.log(" checkprice returning true");
        return false;
    }

  }
  function checkR1(i) {
    if (r1 && i["rating"] >= 1 || !r1) {
        console.log(" checkr1 returning true");
        return true;
    }
      else {
        console.log(" checkr1 returning false");
        return false;
      }
  }
  function checkR2(i) {
    if (r2 && i["rating"] == 2 || !r2) {
        console.log(" checkr2 returning true");
        return true;
    }
      else {
        console.log(" checkr2 returning true");
        return false;
      }

  }
function fitsRequirements(i) {
    //console.log("checking requirements");
    console.log(i);
    if (checkAv(i) && checkUnav(i) && checkPrice(i) && checkR1(i) && checkR2(i)) {
        console.log(" requirements returning true");
        return true;
    }
    else {
        console.log("requirements returning false");
        return false;
    }
}

