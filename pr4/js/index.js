const cartButton = document.querySelector("#cart")
const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#close")

const buttonAuth = document.querySelector("#button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector('#cards-restarants');

let login = localStorage.getItem("gloDelivery");


const getData = async function(url){
    const respaunce = fetch(url);
};

getData('./db/partners.json').then(function(data){
    data.forEach(creslecardsRestaurants);
});

const modalProb = document.querySelector(".modal-prob");
const closeProb = document.querySelector(".close-prob");

function ProbToggleModal() {
    modalProb.classList.toggle("is-open");
}


function LogToggleModal() {
    modalAuth.classList.toggle("is-open");
    loginInput.style.borderColor = '';
    if ( modalAuth.classList.contains("is-open")){
        disableScroll();
    }
    else{
        enableScroll();
    }
}

function autorized(){
    console.log("Da");

    function logOut() {
        login = null;
        localStorage.removeItem("gloDelivery");
        buttonAuth.style.display = "";
        userName.style.display = "";
        buttonOut.style.display = "";
        userName.textContent = login;
        buttonOut.removeEventListener("click", logOut);

        checkAuth();
    }

    userName.textContent = login;

    buttonAuth.style.display = "none";
    userName.style.display = "inline";
    buttonOut.style.display = "block";
    buttonOut.addEventListener("click", logOut);
}

function notAutorized(){
    console.log("Net");

    function logIn(event){
        event.preventDefault();
        
        if (loginInput.value.trim()) {
            login = loginInput.value;
            localStorage.setItem("gloDelivery", login);
            LogToggleModal();
            buttonAuth.removeEventListener("click", LogToggleModal);
            closeAuth.removeEventListener("click", LogToggleModal);
            logInForm.removeEventListener("submit", logIn);
            logInForm.reset();

            checkAuth();
        } 
        else {
            loginInput.style.borderColor = '#ff0000';
            loginInput.value ='';
            //ProbToggleModal();
            //closeProb.addEventListener("click", ProbToggleModal);
        }
    }

    buttonAuth.addEventListener("click", LogToggleModal);
    closeAuth.addEventListener("click", LogToggleModal);
    logInForm.addEventListener("submit", logIn);
    modalAuth.addEventListener('click', function(event){
        if(event.target.classList.contains('is-open')){
            LogToggleModal()
        }
    })

}

function checkAuth(){
    if (login) {
        autorized();
    } else {
        notAutorized();
    }
}

checkAuth();

function toogleCartClass (){
    modal.classList.toggle("modal-active")
}

cartButton.addEventListener("click", ()=>{
    toogleCartClass()
})
closeModal.addEventListener("click", ()=>{
    toogleCartClass()
})

new WOW().init();

function creslecardsRestaurants(restaurant){

    console.log(restaurant);

    const{
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery: timeOfDelivery
    }= restaurant;

    const card =`
        <a class="card  animate__animated animate__pulse" data-products="${products}">
        <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}"</h3>
                    <span class="card-tag tag">${timeOfDelivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        <img src="./img/cards/rating.svg" alt="">${stars}</div>
                    <div class="price">От ${price} ₽</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

creslecardsRestaurants();
creslecardsRestaurants();
creslecardsRestaurants();

function openGoods(event){
    const target = event.target;

    if(login){
        const restaurant = target.closest('#cards-restarants');
        if(restaurant){
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            cardsRestaurants.classList.add('hide');
            menubar.classList.remove('hide');
            getData(`./db/${restaurant.dataset.products}`).then(function(data){
                data.forEach(openGoods);
            });
        }
    }else{
            LogToggleModal();
        }
}

cardsRestaurants.addEventListener('click', openGoods);

//slider

new Swiper('.swiper-container', {
    sliderPerView: 1,
    loop: true,
    autoplay:true,
    effect:'flipe',
    grabCursor: true,
})
