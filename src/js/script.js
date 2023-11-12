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
const modalWindow = document.querySelectorAll('#consultation, #order, #thanks');

function fadeIn(modal, time){
    modal.style.opacity = 0;
    modal.style.display = 'block';
    modal.style.transition = `${time}ms opacity`;
    setTimeout(() => {
        modal.style.opacity = 1;
    }, 10);
}

function fadeOut(modal, time){
    modal.style.opacity = 1;
    modal.style.transition = `${time}ms opacity`;
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, time);
}

for(let i = 0; i < buttCons.length; i++){
    buttCons[i].addEventListener('click', function(){
        fadeIn(document.querySelector('.blackout'), 600);
        fadeIn(document.querySelector('#consultation'), 600);
    });
}

for(let i = 0; i < buttCard.length; i++){
    buttCard[i].addEventListener('click', function(){
        document.querySelector('#order .modal__desc').textContent = cardTitle[i].textContent;
        fadeIn(document.querySelector('.blackout'), 600);
        fadeIn(document.querySelector('#order'), 600);
    });
}

for(let i = 0; i < buttClose.length; i++){
    buttClose[i].addEventListener('click', function(){
        fadeOut(document.querySelector('.blackout'), 600);
        fadeOut(modalWindow[i], 600);
    })
}


/*-----------------Validation and mailer------------------------*/

const inputs = document.querySelectorAll('form input');

function validForms(form){
    var validator = new JustValidate(document.querySelector(form));
    
    validator
        .addField(document.querySelector(form + ' input[name=name]'), [
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
        .addField(document.querySelector(form + ' input[name=phone]'), [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, введите свой номер телефона',
            },
        ],
        {
            errorFieldCssClass: ['form__errorInput'],
            errorLabelCssClass: ['form__errorMessage'],
        })
        .addField(document.querySelector(form + ' input[name=email]'), [
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
        })
        .onSuccess(function(e){
            e.preventDefault();
            fetch('mailer/smart.php',{
                method: 'POST',
                body: new FormData(document.querySelector(form)),
            }).then(function(){
                for(let i = 0; i < inputs.length; i++){
                    inputs[i].value = '';
                }
                fadeOut(document.querySelector('#consultation'), 600);
                fadeOut(document.querySelector('#order'), 600);
                fadeIn(document.querySelector('.blackout'), 600);
                fadeIn(document.querySelector('#thanks'), 600);
            });
            return false;
        });
}

validForms('#consultForm');
validForms('#consultation form');
validForms('#order form');


/*-----------------Mask for phone-------------------------*/

const inputPhone = document.querySelectorAll('input[name=phone]');
let im = new Inputmask('+7 (999) 999-99-99');

im.mask(inputPhone);
