import i18Obj from './translate.js';

(function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-item');
    const shadow = document.querySelector('.shadow');
    const portfolioImages = document.querySelectorAll('.photo-card');
    const portfolioBtns = document.querySelector('.portfolio-buttons');
    const btnTheme = document.querySelector('.button-theme');
    const forLightElements = ['body', 'footer', '.section-title', '.hero-inner', '.portfolio-button', '.btn-on', '.title-text', '.nav', '.nav-item','.burger']

    // Burger-menu
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
    });
    burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
    });

    // Added shadow under burger-menu
    burger.addEventListener('click', () => {
        shadow.classList.toggle('shadow-enabled');
    });

    // Closed burger-menu when clicking on the nav link
    for (let navItem of navItems) {
        navItem.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            shadow.classList.remove('shadow-enabled');
            burger.classList.remove('is-active');
        });
    };

    // Delete default class .btn-on, toggle this class when clicking and change image by data.season
    portfolioBtns.addEventListener('click', (event) => {
        if (event.target.classList.contains('portfolio-button')) {
            Array.from(portfolioBtns.children).forEach(child => child.classList.remove('btn-on'));
            event.target.classList.toggle('btn-on');
            portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
        };
    });

    // Portfolio image caching
    const preloadImages = () =>  {
        const seasons = ['winter', 'spring', 'summer', 'autumn']
        seasons.forEach(season => {
            for (let i = 1; i <= 6; i++) {
                const img = new Image();
                img.src = `./assets/img/${season}/${i}.jpg`
            };
        });
    };
    preloadImages();

    // Change theme
    btnTheme.addEventListener('click', () => {
        changeTheme();
    });
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
                }
            });
        });
    };

    // Func for save in localStorage
    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, value)
    }

    // Get from localStorage
    const getLocalStorage = () => {
        if (localStorage.getItem('lang')) {
            changeLang(localStorage.getItem('lang'))
        };
        if (localStorage.getItem('theme')) {
            changeTheme();
        };
    };
    getLocalStorage()

}());

console.log('Промежуточная оценка: 25\n\n',
'1. Смена изображений в секции portfolio (25/25)\n',
    '1.1. При кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20\n',
    '1.2. Кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5\n\n',
'3. Переключение светлой и тёмной темы (25/25)\n',
    'Выбран вариант первый. Блоки и секции header, hero, contacts, footer остались без изменений, в оставшихся секциях цвет фона и шрифта поменялись местами согласно макету в figma - "Portfolio-white-1"\n',
    'На страницу добавлен переключатель при клике по которому\n',
    '3.1. Тёмная тема приложения сменяется светлой +10\n',
    '3.2. Светлая тема приложения сменяется тёмной +10\n',
    '3.3. После смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5\n\n',
'4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы (5/5)\n',);