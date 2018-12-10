exports.filter = function (products, avail, unavail,
  price25, price50, price100, thumb1, thumb2, genre) {
  return new Promise(function (resolve,reject) {
    // TODO: implement own project filter functionality here
    //setTimeout(function() {
      function checkAv(i, av, unav) {
        if (av && i["stock"] > 0 || !av || (av && unav))
          return true;
        else {
          console.log("checkav is false");
          return false;
        }
      }
      function checkUnav(i, av, unav) {
        if (unav && i["stock"] == 0 || !unav || (av&&unav))
          return true;
          else {
            console.log("checkunav is false");
            return false;
          }
      }
      function checkPrice(i,p1,p2,p3) {

        if( (p1 && i['price'] <= 25) || (p2 && (i['price'] >= 25 && i['price'] <= 50) ) 
        || (p3 && i['price'] >= 50) || (!p1 && !p2 && !p3))
          return true;
        else
          return false

      }
      function checkR1(i, r1) {
        if (r1 && i["rating"] >= 1 || !r1)
          return true;
          else {
            console.log("checkR1 is false");
            return false;
          }
      }
      function checkR2(i, r2) {
        if (r2 && i["rating"] == 2 || !r2)
          return true;
          else {
            console.log("checkR2 is false");
            return false;
          }
  
      }
      console.log("avail: " + avail + " unavail: " + unavail + " price25: " + price25 + " price50: " + price50
      + " price100: " + price100 + " thumb1: " + thumb1 + " thumb2: " + thumb2);

      //resolve(function() {
      var prodIndex=0;
      console.log(products.toString());
      var prods = [0];
      products.forEach( function (prod) {
        console.log(prod);
        if (checkAv(prod, avail,unavail) && checkUnav(prod,avail, unavail)
        //&& checkP1(prod, price25) && checkP2(prod,price50) && checkP3(prod,price100) 
        //if(checkAvUnav(prod, avail, unavil) 
        && checkPrice(prod, price25,price50,price100)
        && checkR1(prod,thumb1) && checkR2(prod,thumb2)) {
          console.log("fits requirements, keeping product");
          prods[prodIndex] = prod;
          prodIndex++;
        }
        else {
          console.log("not keeping this product");
        }
      });

      console.log("Prods being returned:")
      prods.forEach( function(prod) {
        console.log(prod);
      })
      resolve(prods);
      //})
      //}).catch(error) =>{
       // console.log(error);
      //};

    //}, 1000);

    
      
  });
};
