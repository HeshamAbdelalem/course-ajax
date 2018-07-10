/* eslint-env jquery */
/* jshint esversion: 6 */
(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;


        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 001da43ffec0dc5d910e5c2a13e343c8a18a928017268d0df7a757d711ff1197'
            }
        }).then((response) => {return response.json();})
          .then(addImage);
        /*
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 001da43ffec0dc5d910e5c2a13e343c8a18a928017268d0df7a757d711ff1197'
            }
        }).done(addImage);
        */
        /*
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=81a4b92e766f4125a238ff7c874b81ac`
        }).done(addArticles);
        */
       fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=81a4b92e766f4125a238ff7c874b81ac`)
       .then(response => response.json())
       .then(addArticles);
    });

    
    function addImage(images) {
        const firstImage = images.results[0];

        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
        );
    }

    function addArticles(data) {
        const articlesInHTML = data.response.docs.map(article => `<li>
                <h2><a href="${article.web_url}">${article.headline.main}</a><h2>
                <p>${article.snippet}</p>
            </li>`
        ).join('');

        responseContainer.insertAdjacentHTML('beforeend', `<ul>${articlesInHTML}</ul>`);
    }
})();
