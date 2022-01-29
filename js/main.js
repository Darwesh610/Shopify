let cart = [];
let cartSection = document.getElementById("cartSection");
let cartCont = document.getElementById("CartDiv");
let total = document.getElementById("total");
let purchase = document.getElementById("purchase");
let totalPrice = 0;
setTimeout(() => {
    let shopButton = document.querySelectorAll(".shopnow");
    shopButton.forEach(ele => {
        ele.addEventListener("click", () => {
            cart.push(ele.parentElement.parentElement.cloneNode(true));
            totalPrice += parseInt(ele.previousSibling.innerText);
            total.innerText = `${totalPrice} $`;
            cart.forEach((e) => {
                e.classList.add("rounded");
                for (let i = 0; i < cart.length; i++) {
                    cartCont.append(cart[i]);
                }
            })
            cartCont.style.display = "flex";
        })
    });
}, 1000);

purchase.addEventListener("click", () => {
    cartCont.style.display = "none";
    Swal.fire(
        'Thanks For Purchase!',
        'Your Shopping Done!',
        'success'
    )
    total.innerText = `0 $`;
});


// --------------------- Owl Carousel Function ----------------------------------
$(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});


// -------------------- close & Open Windows --------------------------------
function closeForm(form) {
    form.style.display = "none"
}
function showForm(form) {
    form.style.display = "flex";
}


//------------------- Toggle Search --------------------------------------------

let search = document.querySelector(".search")
let input = document.querySelector(".inputSearch")
let buttonsearch = document.querySelector(".searchbt")


buttonsearch.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
})

