import i18Obj from './translate.js';

// ----------Work burger-menu----------
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const shadow = document.querySelector('.shadow');

// Add/remove active classes for burger-menu elements
function burgerMenu() {
    nav.classList.toggle('nav-open');
    burger.classList.toggle('is-active');
    shadow.classList.toggle('shadow-enabled');
};

burger.addEventListener('click', burgerMenu);

// ----------Сlose burger-menu----------
const navItems = document.querySelectorAll('.nav-item');

// Сlose burger-menu when clicking on the nav link
for (let navItem of navItems) {
    navItem.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        shadow.classList.remove('shadow-enabled');
        burger.classList.remove('is-active');
    });
};

// ----------Сhange pictures in portfolio----------
const portfolioImages = document.querySelectorAll('.photo-card');
const portfolioBtns = document.querySelector('.portfolio-buttons');
const portfolioBtnAll = document.querySelectorAll('.portfolio-button');

function changePic(event) {
    if (event.target.classList.contains('portfolio-button')) {
        portfolioBtnAll.forEach(btn => btn.classList.remove('btn-on'));
        event.target.classList.toggle('btn-on');
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    };
};

portfolioBtns.addEventListener('click', changePic);

// ----------Portfolio image caching----------
function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn']
    seasons.forEach(season => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`
        };
    });
};

preloadImages();

// ----------Change theme----------
const btnTheme = document.querySelector('.button-theme');
const forLightElements = ['body', 'footer', '.section-title', '.hero-inner', '.portfolio-button', '.btn-on', '.title-text', '.nav', '.nav-item', '.burger']

// Change icon-theme, add/remove class .light to the necessary elements
function changeTheme() {
    btnTheme.classList.toggle('button-light-theme');
    forLightElements.forEach((element) => {
        let currentElements = document.querySelectorAll(element);
        currentElements.forEach(item => {
            if (btnTheme.classList.contains('button-light-theme')) {
                item.classList.add('light');
                setLocalStorage('theme', 'light');
            } else {
                item.classList.remove('light');
                localStorage.removeItem('theme');
            };
        });
    });
};

btnTheme.addEventListener('click', changeTheme);

// ----------Translate page----------
const switchItem = document.querySelectorAll('.switch-item');
const forTranslateElements = document.querySelectorAll('[data-i18n]');

// Switch en/ru, save in localStorage
function makeTranslate(event) {
    switchItem.forEach((item) => {
        if (item.classList.contains('switch-on')) {
            item.classList.remove('switch-on');
            event.target.classList.toggle('switch-on');
        };
    });
    let lang = event.target.textContent;
    if (lang === 'ru') {
        setLocalStorage('lang', 'ru');
    } else {
        localStorage.removeItem('lang');
    };
    getTranslate(lang);
};

// translate text/placeholder for data-i18n elements
function getTranslate(lang) {
    forTranslateElements.forEach((item) => {
        const key = item.dataset.i18n;
        const text = i18Obj[lang][key];
        item.textContent = text;
        if (item.placeholder) {
            item.placeholder = text;
            item.textContent = '';
        };
    });
};

switchItem.forEach((item) => item.addEventListener('click', makeTranslate));

// ----------Save in localStorage----------
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
};

// Get from localStorage
function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        getTranslate('ru')
        switchItem.forEach(item => item.classList.toggle('switch-on'));
    };
    if (localStorage.getItem('theme')) {
        changeTheme();
    };
};

getLocalStorage();

// ----------Scroll top----------
const btnScrollTop = document.querySelector('.scroll-top')

window.onscroll = () => {
    if (window.scrollY > 700) {
        btnScrollTop.classList.remove('hide')
    } else {
        btnScrollTop.classList.add('hide')
    };
};

function scrollTop() {
    window.scrollTo(0, 0);
}

btnScrollTop.addEventListener('click', scrollTop);

// ----------Вutton animation----------
const buttonsRippleAll = document.querySelectorAll('.ripple')

function buttonRipple(e) {
    const x = e.clientX
    const y = e.clientY

    const buttonTop = e.target.offsetTop
    const buttonLeft = e.target.offsetLeft

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
};

buttonsRippleAll.forEach((item) => {
    item.addEventListener('click', buttonRipple)
});

console.log('Оценка: 82\n\n',
'1. Смена изображений в секции portfolio (25/25)\n',
    '1.1. При кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20\n',
    '1.2. Кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5\n\n',
'2. Перевод страницы на два языка (25/25)\n',
    '2.1. При клике по надписи ru англоязычная страница переводится на русский язык +10\n',
    '2.2. При клике по надписи en русскоязычная страница переводится на английский язык +10\n',
    '2.3. Надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5\n\n',
'3. Переключение светлой и тёмной темы (25/25)\n',
    'Выбран вариант первый. Блоки и секции header, hero, contacts, footer остались без изменений, в оставшихся секциях цвет фона и шрифта поменялись местами согласно макету в figma - "Portfolio-white-1"\n',
    'На страницу добавлен переключатель при клике по которому\n',
    '3.1. Тёмная тема приложения сменяется светлой +10\n',
    '3.2. Светлая тема приложения сменяется тёмной +10\n',
    '3.3. После смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5\n\n',
'4. Дополнительно: выбранный пользователем язык отображения страницы и тема сохраняются при перезагрузке страницы (5/5)\n\n',
'5. Дополнительно: сложные эффекты для кнопок при клике (2/5)\n');