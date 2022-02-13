const url = 'https://api.unsplash.com/search/photos?query=javascript&per_page=30&orientation=landscape&client_id=M4xZ4Txwckv_VcGc4h2iugcxbryTcYt7h8hYgHafG6k'

const imagesFlex = document.querySelector('.images')

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

function showData(data) {
    imagesFlex.innerHTML = '';
    data.results.forEach(result => {
        const imageItem = `<div class="image-item" style="background-image: url('${result.urls.regular}');"></div>`;
        imagesFlex.insertAdjacentHTML('beforeend', imageItem);
    });
}

window.addEventListener('load', getData());