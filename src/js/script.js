const slider = tns({
    container: '.carousel__slider',
    items: 1,
    slideBy: 1,
    autoplay: false,
    controls: false,
    nav: true,
    navPosition: "bottom",
    responsive: {
        769: {
            nav: false
        }
    }
});

document.querySelector('.carousel__bPrev').addEventListener('click', function(){
    slider.goTo('prev');
});

document.querySelector('.carousel__bNext').addEventListener('click', function(){
    slider.goTo('next');
});


let tabs = document.querySelectorAll('.catalog__tab');
let contents = document.querySelectorAll('.catalog__content');

for(let i = 0; i < tabs.length; i++){
    tabs[i].addEventListener('click', function(){
        for(let i = 0; i < tabs.length; i++)
        {
            tabs[i].classList.remove('catalog__tab_active');
            contents[i].classList.remove('catalog__content_active');
        }
        tabs[i].classList.add('catalog__tab_active');
        contents[i].classList.add('catalog__content_active');
    });
}


let links = document.querySelectorAll('.catalogCard__link');
let backs = document.querySelectorAll('.catalogCard__back');
let wrapper = document.querySelectorAll('.catalogCard__wrapper');

function Cards(buttons){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function(e){
            e.preventDefault();
            wrapper[i].classList.toggle('catalogCard__wrapper_active');
        });
    }
}

Cards(links);
Cards(backs);
