(function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-item');
    const shadow = document.querySelector('.shadow');
    const portfolioImages = document.querySelectorAll('.photo-card');
    const portfolioBtns = document.querySelector('.portfolio-buttons');

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

}());

console.log('Промежуточная оценка: 25\n\n',
'1. Смена изображений в секции portfolio (25/25)\n',
'1.1. При кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20\n',
'1.2. Кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5\n');