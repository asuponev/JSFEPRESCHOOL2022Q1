(function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navClose = document.querySelector('.nav-close');
    const navItems = document.querySelectorAll('.nav-item');
    burger.addEventListener('click', () => {
        nav.classList.add('nav_open')
    });
    navClose.addEventListener('click', () => {
        nav.classList.remove('nav_open')
    });
    for (let navItem of navItems) {
        navItem.addEventListener('click', () => {
            nav.classList.remove('nav_open')
        });
    }
}());


// console.log('Оценка: 110\n\n\n-- Вёрстка валидная + 10\n(для проверки валидности вёрстки использовался сервис https://validator.w3.org/, ошибки и предупреждения отсутствуют)\n\n\n-- Вёрстка семантическая\nВ коде странице присутствуют следующие элементы:\n- <header>, <main>, <footer> +2\n- шесть элементов <section> (по количеству секций) +2\n- только один заголовок <h1> +2\n- пять заголовков <h2> (количество секций минус одна, у которой заголовок <h1>) +2\n- один элемент <nav> (панель навигации) +2\n- два списка ul > li > a (панель навигации, ссылки на соцсети) +2\n- десять кнопок <button> +2\n- два инпута: <input type="email"> и <input type="tel"> +2\n- один элемент <textarea> +2\n- три атрибута placeholder +2\n\n\n-- Вёрстка соответствует макету:\n- блок <header> +6\n- секция hero +6\n- секция skills +6\n- секция portfolio +6\n- секция video +6\n- секция price +6\n- секция contacts +6\n- блок <footer> +6\n\n\n-- Требования к css:\n- для построения сетки используются флексы  +2\n- при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\n- фоновый цвет тянется на всю ширину страницы +2\n- иконки добавлены в формате .svg +2\n- изображения добавлены в формате .jpg +2\n- есть favicon +2\n\n\n-- Интерактивность, реализуемая через css:\n- плавная прокрутка по якорям +5\n- ссылки в футере ведут на гитхаб (/elsuppo) и на страницу курса "https://rs.school/js-stage0/" +5\n- интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты: изменение цвета фона или цвета шрифта, указанные в макете +5\n- обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5');