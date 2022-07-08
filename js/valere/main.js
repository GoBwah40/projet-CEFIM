//................Base de données factice
baseProducts = [
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

//................un array pour stocker les id de notre panier
cartProductId = [];


//.................................. Ensemble de fonction à lancer au chargement de la page
document.addEventListener("DOMContentLoaded", function () {

  //................on mélange les produits de notre bdd(purement esthétique)
  productsShuffled = shuffleProducts(baseProducts);

  //................Génére et ajoute les cartes de produit
  addGroupProducts(baseProducts);

  //................Génére et ajoute les cartes de produit
  addCardProducts(productsShuffled);

  //................fonction pour ajouter un produit dans le total/panier
  buttonMore();

  //................fonction pour retirer un produit dans le total/panier
  buttonLess();

  //................fonction pour filtrer les produits afficher
  buttonFilter();

  getCartInUrl();

  if(cartProductId){
    setCartInUrl(cartProductId);
  }
});


//.................................. Génération des boutons ajout/supprimer/filtrer
function buttonMore() {
  buttonsMore = document.querySelectorAll(".more");
  for (i of buttonsMore) {
    i.addEventListener("click", addProduct);
  }
}

function buttonLess() {
  buttonsLess = document.querySelectorAll(".less");
  for (i of buttonsLess) {
    i.addEventListener("click", removeProduct);
  }
}

function buttonFilter() {
  buttonsFilter = document.querySelectorAll(".filter-products-item");
  for (button of buttonsFilter) {
    button.addEventListener("click", function () {
      group = event.currentTarget.textContent;
      getProductsByGroup(group, baseProducts);

      oldSelected = document.querySelector(".filter-products-selected");
      oldSelected.classList.remove("filter-products-selected");
      event.currentTarget.classList.add("filter-products-selected");
    });
  }
}

//.................................. Génération de la navigation dans les produits, et les produits
function addGroupProducts(products) {
  //................on vise la zone de notre nav
  filterNavGroup = document.body.querySelector(".filter-products");
  arrayGroup = [];

  //................on boucle sur les produits pour lister les groupes
  for (product of products) {

    //................on vérifie que le groupe n'a pas déjà été ajouté
    if (!arrayGroup.includes(product.group)) {

      //................on ajoute le groupe et on crée un li correspondant
      arrayGroup.push(product.group);
      groupName = document.createElement("li");
      groupName.textContent = product.group;
      groupName.className = "filter-products-item";
    }

    //................on ajoute notre li à notre nav
    filterNavGroup.appendChild(groupName);
  }
}

function addCardProducts(products) {
  //................on vide la zone des produits pour les filtres
  content = document.body.getElementsByClassName("products");
  content[0].innerHTML = "";

  for (i = 0; i < products.length; i++) {
    //................création de la card d'un produit
    productCard = document.createElement("div");
    productCard.className = "content-card";
    productCard.id = "product" + products[i].id;
    //................ image du produit
    productImg = document.createElement("img");
    productImg.src = products[i].image;
    productCard.appendChild(productImg);

    //................contenu body titre/description/prix
    productCardBody = document.createElement("div");
    productCardBody.className = "content-card_body";

    //titre et description
    productCardInfo = document.createElement("div");
    productCardInfo.className = "content-card_body-info";

    productTitle = document.createElement("h2");
    productTitle.textContent = products[i].name;
    productCardInfo.prepend(productTitle);

    productDesc = document.createElement("p");
    productDesc.textContent = products[i].desc;
    productCardInfo.appendChild(productDesc);

    //prix
    productCardPrice = document.createElement("aside");
    productCardPrice.className = "content-card_body-price";
    productCardPrice.textContent = products[i].price + "€";

    //ajout au card body et au content card
    productCardBody.appendChild(productCardInfo);
    productCardBody.appendChild(productCardPrice);

    productCard.appendChild(productCardBody);

    //................contenu card footer quantité/+/-
    productCardFooter = document.createElement("div");
    productCardFooter.className = "content-card_footer";

    productCardLess = document.createElement("a");
    productCardLess.textContent = "-";
    productCardLess.dataset.id = products[i].id;
    productCardLess.dataset.price = products[i].price;
    productCardLess.className = "less";

    productCardMore = document.createElement("a");
    productCardMore.textContent = "+";
    productCardMore.dataset.id = products[i].id;
    productCardMore.dataset.price = products[i].price;
    productCardMore.className = "more";

    productCardQuantity = document.createElement("p");
    productCardQuantity.textContent = 0;
    productCardQuantity.className = "content-card_footer-quantity";
    productCardQuantity.id = "qty" + products[i].id;

    productCardFooter.appendChild(productCardLess);
    productCardFooter.appendChild(productCardQuantity);
    productCardFooter.appendChild(productCardMore);

    productCard.appendChild(productCardFooter);

    //................Ajout à l'aside content de la page

    content[0].appendChild(productCard);
  }
}


//.................................. Ajout d'un produit au panier
function addProduct() {
  currentproductId = event.currentTarget.dataset.id;
  currentPrice = parseInt(event.currentTarget.dataset.price);
  currentQuantity = document.getElementById("qty" + currentproductId).textContent;
  document.getElementById("qty" + currentproductId).textContent = parseInt(currentQuantity) + 1;
  getTotal(currentproductId, currentPrice);
}

//.................................. Suppression d'un produit du panier
function removeProduct() {
  currentproductId = event.currentTarget.dataset.id;
  currentPrice = -parseInt(event.currentTarget.dataset.price);
  currentQuantity = document.getElementById("qty" + currentproductId).textContent;
  if (parseInt(currentQuantity) > 0) {
    document.getElementById("qty" + currentproductId).textContent = parseInt(currentQuantity) - 1;
    getTotal(currentproductId, currentPrice);
  }
}

//.................................. filtrage des produits

function getProductsByGroup(group, baseProducts) {
  newProducts = [];
  for (product of baseProducts) {
    if (product.group == group) {
      newProducts.push(product);
    }
  }

  if (group == "Tout") {
    addCardProducts(shuffleProducts(baseProducts));
  } else {
    addCardProducts(newProducts);
  }
  replaceQuantityProduct(cartProductId);
  buttonMore();
  buttonLess();
}

//.................................. Génération et affichage du panier
function getTotal(id, price) {
  change = "more";
  total = parseInt(document.getElementById("total-products").textContent);
  newTotal = total + price;

  if (newTotal < total) {
    change = "less";
    cartProductId.splice(cartProductId.findIndex(a => a === id), 1);
  } else {
    cartProductId.push(id);
  }
  
  cartShow(newTotal, change);
  setCartInUrl(cartProductId);
}

function cartShow(total, change) {
  document.getElementById("total-products").textContent = total;
  if (total > 0) {
    cartHidden = document.getElementsByClassName("cart");
    cartHidden[0].classList.remove("cart-hidden");

    if (!cartHidden[0].classList.contains("cart-animation-" + change)) {
      cartHidden[0].classList.add("cart-animation-" + change);
      setTimeout(function () {
        cartHidden[0].classList.remove("cart-animation-" + change);
      }, 100);
    }
  } else {
    cartHidden = document.getElementsByClassName("cart");
    if (!cartHidden[0].classList.contains("cart-hidden")) {
      cartHidden[0].classList.add("cart-hidden");
    }
  }
}

function replaceQuantityProduct(arrayProductId) {
  if (arrayProductId) {
    for (productId of arrayProductId) {
      product = document.getElementById("product" + productId);
      productQty = document.getElementById("qty" + productId);
      if (product) {
        if (productQty.id == "qty" + productId) {
          currentQuantity = parseInt(productQty.textContent);
          productQty.textContent = currentQuantity + 1;
          document.body.querySelector(".products").prepend(product);
        }
      }
    }
  }
}


//.................................. Fonctions supplémentaires(tri aléatoire des produits, ajout/récupération du panier dans l'url)
function shuffleProducts(array) {
  for (let i = 0; i <= array.length - 2; i++) {
    let j = Math.floor(Math.random() * array.length);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}





function setCartInUrl(cart) {
  linkHome = document.getElementById("home");
  linkCart = document.getElementById("cart");
  linkCartIcon = document.getElementById("cart-icon-link");
  if(cart) {
    total = parseInt(document.getElementById("total-products").textContent)
    urlCart = "?cart="+cart.toString()+"&total="+total;
    if(urlCart == "?cart=&total=0") {
      linkHome.href = "index.html";
      window.history.replaceState(null, null, "index.html");
      linkCart.href = "panier.html"
      linkCartIcon.href = "panier.html"

    }else {
      linkHome.href = "index.html"+urlCart;
      linkCart.href = "panier.html"+urlCart;
      linkCartIcon.href = "panier.html"+urlCart;
      //document.location.replace( "index.html"+urlCart);
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
    cartShow(total, "more");
    replaceQuantityProduct(arrayCart);
    console.log(document.location.href);
  }

}

// -------------------------- Konami Code by Alexane ---------------------------------
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