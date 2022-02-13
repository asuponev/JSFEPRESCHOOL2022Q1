let url = 'https://api.unsplash.com/search/photos?query=javascript&per_page=30&orientation=landscape&client_id=M4xZ4Txwckv_VcGc4h2iugcxbryTcYt7h8hYgHafG6k'

const imagesFlex = document.querySelector('.images')
const searchField = document.querySelector('.header__search');
const searchButton = document.querySelector('.header__search_button');
const inputSearch = document.querySelector('.input-search');
const closeButton = document.querySelector('.button-close');

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
};

function showData(data) {
    imagesFlex.innerHTML = '';
    data.results.forEach(result => {
        const imageItem = `<a href='${result.links.html}' target="_blank"><div class="image-item" style="background-image: url('${result.urls.regular}');"></div></a>`;
        imagesFlex.insertAdjacentHTML('afterbegin', imageItem);
    });
};

window.addEventListener('load', getData());

// Search images 
searchButton.addEventListener('click', searchImages);
inputSearch.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        searchImages();
    };
});

function searchImages() {
    if (inputSearch.value.trim() !== '') {
        url = `https://api.unsplash.com/search/photos?query=${inputSearch.value}&per_page=30&orientation=landscape&client_id=M4xZ4Txwckv_VcGc4h2iugcxbryTcYt7h8hYgHafG6k`;
    } else {
        url = url;
    };
    getData();
    inputSearch.blur();
};

// Clear input search
inputSearch.addEventListener('input', toggleActiveButton);
closeButton.addEventListener('click', clearInput);

function toggleActiveButton(event) {
    if (event.target.classList.contains('input-search')) {
        closeButton.classList.add('active');
        if (inputSearch.value === '') {
            closeButton.classList.remove('active');
        };
    };
};

function clearInput() {
    inputSearch.value = '';
    closeButton.classList.remove('active');
    inputSearch.focus();
};

console.log(
    '1. Вёрстка (10/10)\n',
    'на странице есть несколько фото и строка поиска +5\n',
    'в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n\n',
    '2. При загрузке приложения на странице отображаются полученные от API изображения (10/10)\n\n',
    '3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API (10/10)\n\n',
    '4. Поиск (30/30):\n',
    'при открытии приложения курсор находится в поле ввода +5\n',
    'есть placeholder +5\n',
    'автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n',
    'поисковый запрос можно отправить нажатием клавиши Enter +5\n',
    'после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n',
    'в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5');