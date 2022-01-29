

function getProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "products.JSON", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var product = xhr.responseText;
            displayProducts(product);
        }
    };
    xhr.send();
}

// --------------------- Display All Products -------------------------------

function displayProducts(p) {
    var prod = [];
    prod = JSON.parse(p);
    // console.log(prod);
    buildAllStructures();
    for (i of prod) {
        buildProduct(i.id, i.category, i.title, i.description, i.previous_price, i.current_price, i.img_src);
    }
}



function buildProduct(id, category, title, description, previous_price, curent_price, img_src) {
    //----------------- Main Card Div -----------------------
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", `${category}-${id}`);
    mainDiv.classList.add("card", "text-center", "col-lg-3", "shadow-lg", "my-3");
    mainDiv.style.width = "18rem";
    //---------------- Creating Img Element --------------------
    var prodImg = document.createElement("img");
    prodImg.setAttribute("src", `${img_src}`)
    prodImg.classList.add("card-img-top");
    //----------------- Appending Img to Main Card Div ---------------
    mainDiv.append(prodImg);
    //----------------- Creating Hovering Div -------------------
    var subDiv1 = document.createElement("div");
    subDiv1.classList.add("img-layout2");

    var subAnc = document.createElement("a");
    subAnc.setAttribute("href", "#cart");
    subAnc.innerHTML = '<h3 onclick="showCart()"><i class="fas fa-shopping-cart"></i></h3>';
    //---------------- Appending the hovering div to the main div --------------------------------
    subDiv1.append(subAnc);
    mainDiv.append(subDiv1);
    //---------------- Checking if there is a sale or not ---------------------------
    if (previous_price > curent_price) {
        var saleDiv = document.createElement("div");
        saleDiv.classList.add("sale-div");
        saleDiv.innerHTML = "SALE";
        mainDiv.appendChild(saleDiv);
    }
    //---------------- Creating the card div and its inner elements as well --------------
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card-body");

    var titleH5 = document.createElement("h5");
    titleH5.classList.add("card-title", "shop-item-title");
    titleH5.innerHTML = title;
    cardDiv.append(titleH5);

    var descriprionP = document.createElement("p");
    descriprionP.classList.add("card-text");
    descriprionP.innerHTML = description;
    cardDiv.append(descriprionP);

    if (previous_price !== 0 && previous_price > curent_price) {
        var saleSpan = document.createElement("span");
        saleSpan.classList.add("Ign-price");
        saleSpan.innerHTML = previous_price + "LE";
        cardDiv.append(saleSpan);
    }

    var priceP = document.createElement("p");
    priceP.classList.add("pro-price", "shop-item-price");
    priceP.innerHTML = curent_price;
    cardDiv.append(priceP);

    var buyAnc = document.createElement("button");
    buyAnc.id = id;
    buyAnc.addEventListener('click', function () {
        var price = priceP.innerText
        var title = titleH5.innerText
        var img = prodImg.src
    })
    buyAnc.classList.add("btn", "butt", "shop-item-button", "shopnow");
    buyAnc.innerHTML = "Buy Now";
    cardDiv.append(buyAnc);
    mainDiv.append(cardDiv);
    document.getElementById("where" + category + "Go").append(mainDiv);
    show(titleH5, mainDiv);
}



function buildStructure(category) {
    var outterDiv = document.createElement("div");
    outterDiv.classList.add(category + "-products");
    outterDiv.setAttribute("id", `${category}-products`);

    var containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    var innerDiv = document.createElement("div");
    innerDiv.classList.add("row", "my-5", "justify-content-evenly", "align-items-center", "align-content-around");
    innerDiv.id = `where${category}Go`;

    containerDiv.appendChild(innerDiv);
    outterDiv.appendChild(containerDiv);

    document.getElementById("Products-Con").appendChild(outterDiv);
    con(outterDiv);
}
function buildAllStructures() {
    buildStructure("fashion");
    buildStructure("phone");
    buildStructure("electronics");
    buildStructure("sports");
    buildStructure("books");
}
getProducts();



// ------------------------ Side Menu Handling -----------------------

var products = ["fashion", "phone", "electronics", "sports", "books"];


function showStuff(test) {
    products.forEach(element => {
        if (element != test) {
            document.getElementById(`${element}-products`).style.display = "none";
        }
        else {
            document.getElementById(`${element}-products`).style.display = "block";
        }
    });
}


function showall() {
    products.forEach(element => {
        document.getElementById(`${element}-products`).style.display = "block";
    });
}

// ----------------------------- Search Input --------------------------------------

let inp = document.querySelector(".inputSearch");
var a = [];
var b = [];
function show(element, card) {
    a.push(element.innerText);
    b.push(card);
}
let c = [];
function con(element) {
    c.push(element);
}
console.log(c);


let res = [];
inp.addEventListener("keyup", function Search() {
    for (let i = 0; i < a.length; i++) {
        if (a[i].toLowerCase().startsWith(inp.value.toLowerCase()) === true) {
            for (let j = 0; j < b.length; j++) {
                b[j].style.display = "none";
            }
            for (let o = 0; o < 12; o++) {
                b[i].style.display = "flex";
                i++
            }

        }
    }

    if (inp.value === "") {
        for (let a = 0; a < b.length; a++) {
            b[a].style.display = "flex";
        }
    }

});

inp.addEventListener("blur", function () {
    for (let a = 0; a < b.length; a++) {
        b[a].style.display = "flex";
    }
})





// --------------------- Sorting Each Catogery Lonely By Price ---------------------------

function arrangeProducts(categoryTest, order) {
    showStuff(categoryTest);
    //Building the two arrays 1- holding the divs     2 - holding the prices
    var tempDiv = document.querySelectorAll(`#${categoryTest}-products .card`);
    var tempPrice = [];
    var i, j;
    for (i = 0; i < tempDiv.length; i++) {
        //checking whether or not it has a sale 
        if (tempDiv[i].lastChild.children.length == 4) {
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[2].innerHTML));
        }
        else {
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[3].innerHTML));
        }
    }
    //Sorting from lowest to highest
    if (order == 'lowest') {
        //Selection sort      
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] < tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            //swaping elements in both arrays
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
    //Sorting from highest to lowest
    else if (order == 'highest') {
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] > tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
}




// -------------------------- Sorting All Product By Price --------------------------------


function arrangeAll(order) {
    var tempDiv = document.querySelectorAll(`#Products-Con .card`);
    var tempPrice = [];
    var i, j;
    for (i = 0; i < tempDiv.length; i++) {
        if (tempDiv[i].lastChild.children.length == 4) {
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[2].innerHTML));
        }
        else {
            tempPrice.push(parseInt(tempDiv[i].lastChild.children[3].innerHTML));
        }
    }
    //Sorting from lowest to highest
    if (order == 'lowest') {
        //Selection sort      
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] < tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            //swaping elements in both arrays
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
    //Sorting from highest to lowest
    else if (order == 'highest') {
        for (i = 0; i < tempDiv.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < tempDiv.length; j++) {
                if (tempPrice[j] > tempPrice[min_idx]) {
                    min_idx = j;
                }
            }
            tmp = tempPrice[min_idx];
            tempPrice[min_idx] = tempPrice[i];
            tempPrice[i] = tmp;

            tmp = tempDiv[min_idx].innerHTML;
            tempDiv[min_idx].innerHTML = tempDiv[i].innerHTML;
            tempDiv[i].innerHTML = tmp;
        }
    }
}


// --------------------- back arrow -------------------------------- 

let backbtn = document.getElementById("btnback");

window.onscroll = function () {
    if (scrollY > 500) {
        backbtn.style.display = "block"
    } else {
        backbtn.style.display = "none"
    }
}


backbtn.onclick = function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

// ----------------------- loading page ----------------------------------

let loadinCon = document.querySelector(".loading-Con");
let loading = document.querySelector(".loading");

let counter = 0;
let time = setInterval(count, 30);
let timeOut = setTimeout(() => {
    loadinCon.style.display = "none";

}, 5000);



function count() {
    counter++
    loading.innerText = `${counter}%`
    if (counter > 99) {
        clearInterval(time);
        loadinCon.style.opacity = 0;
    }
}
