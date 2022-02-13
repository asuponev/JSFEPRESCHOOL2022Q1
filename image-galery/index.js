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
        const imageItem = `<div class="image-item" style="background-image: url('${result.urls.regular}');"></div>`;
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