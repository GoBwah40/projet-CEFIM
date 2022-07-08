const content = document.getElementsByClassName("products");


arrayCart = [];

//Initialisation des produits
products = [
    {
      id: 1,
      name: "Écharpe rouge",
      price: 10,
      image: "img/scarf01.jpg",
      desc: "Une très belle écharpe rouge.",
      group: "Écharpe"
    }, {
      id: 2,
      name: "Écharpe moche",
      price: 15,
      image: "img/scarf02.jpg",
      desc: "Une très laide écharpe et cher.",
      group: "Écharpe"
    }, {
      id: 3,
      name: "Manteau classe",
      price: 32,
      image: "img/coat01.jpg",
      desc: "Trop la classe en soirée!",
      group: "Manteau"
    }, {
      id: 4,
      name: "Manteau chaud",
      price: 27,
      image: "img/coat02.jpg",
      desc: "Pour l'hiver et uniquement pour ça.",
      group: "Manteau"
    }, {
      id: 5,
      name: "Tshirt blanc",
      price: 10,
      image: "img/shirt01.jpg",
      desc: "Parce que la vanille c'est trop bon.",
      group: "Tshirt"
    }, {
      id: 6,
      name: "Tshirt noir long",
      price: 16,
      image: "img/shirt02.jpg",
      desc: "Pour se la jouer Steve Jobs",
      group: "Tshirt"
    }, {
      id: 7,
      name: "Bonnet rouge",
      price: 8,
      image: "img/hat01.jpg",
      desc: "Plus beau que la bleu, non ?",
      group: "Bonnet"
    }, {
      id: 8,
      name: "Bonnet bleu",
      price: 7,
      image: "img/hat02.jpg",
      desc: "Clairement moins sympa que le rouge",
      group: "Bonnet"
    }
  ];
  document.addEventListener("DOMContentLoaded", function() {
    addCardProducts(products);
    buttonFilter();
    getCartInUrl();

  });  

function buttonFilter() {
    buttonsFilter = document.querySelectorAll(".filter-products-item");
    for (button of buttonsFilter) {
      button.addEventListener("click", function () {
        group = event.currentTarget.textContent;
        console.log(group);
        getProductsByGroup(group, products);
        getCartInUrl();
  
        oldSelected = document.querySelector(".filter-products-selected");
        oldSelected.classList.remove("filter-products-selected");
        event.currentTarget.classList.add("filter-products-selected");
      });
    }
  }

  function getProductsByGroup(group, products) {
    newProducts = [];
    for (product of products) {
      if (product.group == group) {
        newProducts.push(product);
      }
    }
  
    if (group == "Tout") {
      addCardProducts(shuffleProducts(products));
    } else {
      addCardProducts(newProducts);
    }
    
  }

function addCardProducts(products) {
    //................on vide la zone des produits pour les filtres
  content[0].innerHTML = "";


    for (i = 0; i < products.length; i++) {


        //Carte = content-card
        var productContent = document.createElement("div");
        productContent.className = "content-card";
        productContent.id = "product" + products[i].id;

        //Image
        productImg = document.createElement("img");
        productImg.src = products[i].image;
        productContent.className = "content-card img";
        productContent.appendChild(productImg);

        //Premiere div = content-card_body
        var productBody = document.createElement("div");
        productBody.className = "content-card_body";
        productContent.appendChild(productBody)

        //deuxieme div = content-card_body-info
        var productInfo = document.createElement("div");
        productInfo.className = "content-card_body-info";
        productBody.appendChild(productInfo)

        //Titre
        var productTitle = document.createElement("h2");
        productTitle.textContent = products[i].name;
        productInfo.appendChild(productTitle);

        //Description
        var productDescription = document.createElement("p");
        productDescription.textContent = products[i].desc;
        productInfo.appendChild(productDescription);


        //Troisieme div = content-card_body-price
        var productPriceDiv = document.createElement("aside");
        productPriceDiv.className = "content-card_body-price";
        productBody.appendChild(productPriceDiv)

        //Prix
        var productPrice = document.createElement("span");
        productPriceDiv.appendChild(productPrice);
        productPrice.className = "price";
        productPrice.textContent = products[i].price;
        productPrice.id = "price" + products[i].id
        productPrice.innerHTML += `€`

        //Footer---------------------------------------------------------------------
        var productFooter = document.createElement("div");
        productFooter.className = "content-card_footer";
        productContent.appendChild(productFooter);

        //Bouton moins(-)
        var btnMinus = document.createElement("a");
        btnMinus.className = "btnMinus";
        btnMinus.innerHTML = `-`
        btnMinus.id = products[i].id;
        productFooter.appendChild(btnMinus);

        //Quantité-----------------------------------------------------
        var productQuantite = document.createElement("span");
        productQuantite.className = "quantite"
        productQuantite.innerHTML = `0`
        productQuantite.id = "qty" + products[i].id
    
        productFooter.appendChild(productQuantite);

        //Bouton plus (+)
        var btnPlus = document.createElement("a");
        btnPlus.className = "btnPlus";
        btnPlus.innerHTML = `+`
        btnPlus.id = products[i].id;
        productFooter.appendChild(btnPlus);


        content[0].appendChild(productContent);
    }

    const plus = document.querySelectorAll(".btnPlus");
    const minus = document.querySelectorAll(".btnMinus");
    const panierTotal = document.getElementById("valeur_panier");
    const valider = document.querySelector(".valider");
    // const quantite = document.querySelectorAll(".quantite");
    // const price = document.querySelectorAll(".price");
    const panierFooter = document.getElementsByClassName("messageBox");



    //Validation du panier
    valider.addEventListener('click', () => {
        if (parseInt(panierTotal.textContent) > 0) {
            if (confirm("Votre panier est terminé ?")) {
                var messageMerci = document.createElement("div");
                messageMerci.innerHTML = `<p>Merci de votre passage, à bientôt !</p>`
                messageMerci.classList = "messageMerci"
                panierFooter[0].appendChild(messageMerci)
                setTimeout(() => {
                    messageMerci.classList = "messageMerciVu"
                }, 2000)
                setTimeout(() => {
                    messageMerci.remove();
                }, 3000)
                for (i = 0; i < products.length; i++) {
                    qtyProduct = document.getElementById("qty"+i);
                    arrayCart = [];
                    if(qtyProduct) {
                        qtyProduct.textContent = 0;
                    }

                }
                panierTotal.textContent = 0;
                newPanier = panierTotal.textContent;
                setCartInUrl(arrayCart, newPanier);
            }
        } else {
            var messageVide = document.createElement("div");
            messageVide.innerHTML = `<p>Votre panier est vide !</p>`
            messageVide.classList = "messageVide"
            panierFooter[0].appendChild(messageVide)
            setTimeout(() => {
                messageVide.classList = "messageVideVu"
            }, 700)
            setTimeout(() => {
                messageVide.remove();
            }, 1700)
        }
    })

    //Activation des boutons "Plus"
    plus.forEach(function(btnPlus) {
        btnPlus.addEventListener('click', (e) => {
            id = e.target.id
            price = document.getElementById("price"+id);
            currentQuantite = document.getElementById("qty"+id)
            currentQuantite.textContent = parseInt(currentQuantite.textContent) + 1
            getPlus(price, id)
            
        })
    });

    //Activation des boutons "Moins"
    minus.forEach(function(btnMinus) {
        btnMinus.addEventListener('click', (e) => {
            id = e.target.id
            price = document.getElementById("price"+id);
            currentQuantite = document.getElementById("qty"+id)
            if (parseInt(currentQuantite.textContent) > 0) {
                currentQuantite.textContent = parseInt(currentQuantite.textContent) - 1
                getMinus(price, id)
                
            }
        })
    });

    //Fonction pour donner la valeur de panier total
    function getPlus(price, id) {
        total = parseInt(panierTotal.textContent)
        panierTotal.textContent = eval(total + parseInt(price.textContent))
        arrayCart.push(id)
        setCartInUrl(arrayCart, total)
    }

    function getMinus(price, id) {
        total = parseInt(panierTotal.textContent)
        panierTotal.textContent = eval(total - parseInt(price.textContent))
        if (arrayCart) {
            arrayCart.splice(cartProductId.findIndex(a => a === id), 1);
        }
        setCartInUrl(arrayCart, total)    }
}

function shuffleProducts(array) {
    for (let i = 0; i <= array.length - 2; i++) {
      let j = Math.floor(Math.random() * array.length);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // -------------------------- Konami Code ---------------------------------
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
  };
  
  // Code Konami officiel
  var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
  var konamiCodePosition = 0;
  
  document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
  
    if (key == requiredKey) {
      konamiCodePosition++;
      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
  
  function activateCheats() {
    lien_css = document.createElement('link');
    lien_css.href = "css/konami.css";
    lien_css.rel = "stylesheet";
    lien_css.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(lien_css);
  }

  function setCartInUrl(cart) {
    linkHome = document.getElementById("home");
    linkCart = document.getElementById("cart");
    if(cart) {
      total = parseInt(document.getElementById("valeur_panier").textContent)
      urlCart = "?cart="+cart.toString()+"&total="+total;
      if(urlCart == "?cart=&total=0") {
        linkHome.href = "index.html";
        window.history.replaceState(null, null, "panier.html");
        linkCart.href = "panier.html"
  
      }else {
        linkHome.href = "index.html"+urlCart;
        linkCart.href = "panier.html"+urlCart;
        // document.location.replace( "panier.html"+urlCart);
        window.history.replaceState(null, null, urlCart);
      }
      
    } 
    
  }

  
  function getCartInUrl () {
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    cart = urlParams.get('cart');
    total = urlParams.get('total');
    if (cart) {
      arrayCart = cart.split(',');
      cartProductId = arrayCart;
      transfertPanierTotal(cartProductId, total);
      setCartInUrl(cart);
      console.log(cart);
    
    }
  }

  function transfertPanierTotal(cart, total) {
      panierTotal = document.getElementById("valeur_panier")
    panierTotal.textContent = total;
    for (id of cart) {
        product = document.getElementById("product" + id);
        qtyCart = document.getElementById("qty"+id);
        if (qtyCart) {
            qtyCart.textContent = eval(parseInt(qtyCart.textContent) + 1);
            document.querySelector('.products').prepend(product);
        }
    }
    
  }