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


/*------------catalog--------------*/

const tabs = document.querySelectorAll('.catalog__tab');
const contents = document.querySelectorAll('.catalog__content');

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


const links = document.querySelectorAll('.catalogCard__link');
const backs = document.querySelectorAll('.catalogCard__back');
const wrapper = document.querySelectorAll('.catalogCard__wrapper');

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


/*-------------modal---------------------*/
const buttCons = document.querySelectorAll('.button_consultation');
const buttCard = document.querySelectorAll('.button_card');
const cardTitle = document.querySelectorAll('.catalogCard__subtitle');
const buttClose = document.querySelectorAll('.modal__close');
const modal = document.querySelectorAll('#consultation, #order, #thanks');

function fadeIn(modal, time){
    document.querySelector('.blackout').style.opacity = 0;
    modal.style.opacity = 0;
    document.querySelector('.blackout').style.display = 'block';
    modal.style.display = 'block';
    document.querySelector('.blackout').style.transition = `${time}ms opacity`;
    modal.style.transition = `${time}ms opacity`;
    setTimeout(() => {
        document.querySelector('.blackout').style.opacity = 1;
        modal.style.opacity = 1;
    }, 10);
}

function fadeOut(modal, time){
    document.querySelector('.blackout').style.opacity = 1;
    modal.style.opacity = 1;
    document.querySelector('.blackout').style.transition = `${time}ms opacity`;
    modal.style.transition = `${time}ms opacity`;
    document.querySelector('.blackout').style.opacity = 0;
    modal.style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.blackout').style.display = 'none';
        modal.style.display = 'none';
    }, time);
}

for(let i = 0; i < buttCons.length; i++){
    buttCons[i].addEventListener('click', function(){
        fadeIn(document.querySelector('#consultation'), 600);
    });
}

for(let i = 0; i < buttCard.length; i++){
    buttCard[i].addEventListener('click', function(){
        document.querySelector('#order .modal__desc').textContent = cardTitle[i].textContent;
        fadeIn(document.querySelector('#order'), 600);
    });
}

for(let i = 0; i < buttClose.length; i++){
    buttClose[i].addEventListener('click', function(){
        fadeOut(modal[i], 600);
    })
}


/*-----------------Validation------------------------*/

function validForms(form){
    const validator = new JustValidate(form);
    
    validator
        .addField(form + ' input[name=name]', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, введите свое имя',
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Введите 2 символов',
            },
        ],
        {
            errorFieldCssClass: ['form__errorInput'],
            errorLabelCssClass: ['form__errorMessage'],
        })
        .addField(form + ' input[name=phone]', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, введите свой номер телефона',
            },
        ],
        {
            errorFieldCssClass: ['form__errorInput'],
            errorLabelCssClass: ['form__errorMessage'],
        })
        .addField(form + ' input[name=email]', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, введите свою почту',
            },
            {
                rule: 'email',
                errorMessage: 'Неправильно введен адрес почты',
            },
        ],
        {
            errorFieldCssClass: ['form__errorInput'],
            errorLabelCssClass: ['form__errorMessage'],
        });
}

validForms('#consultForm');
validForms('#consultation form');
validForms('#order form');

/*-----------------Mask for phone-------------------------*/

const inputPhone = document.querySelectorAll('input[name=phone]');
let im = new Inputmask('+7 (999) 999-99-99');

im.mask(inputPhone);