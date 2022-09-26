const detailData = () => {
  const preloader = document.querySelector('.preloder');

  const renderGenreList = (genres) => {
    const dropdownBlock = document.querySelector('.header__menu .dropdown');
    dropdownBlock.innerHTML = '';
    genres.forEach((genres) => {
      dropdownBlock.insertAdjacentHTML(
        'beforeend',
        `
         <li><a href="./categories.html?genre=${genres}">${genres}</a></li>
      `
      );
    });
  };

  const renderAnimeDetails = (array, itemId) => {
    console.log(array);
    const animeObj = array.find((item) => item.id == itemId);
    console.log(animeObj);
    const imageBlock = document.querySelector('.anime__details__pic');
    const viewsBlock = imageBlock.querySelector('.view');
    const titleBlock = document.querySelector('.anime__details__title h3');
    const subTitleBlock = document.querySelector('.anime__details__title span');
    const descriptionBlock = document.querySelector('.anime__details__text p');
    const widgetList = document.querySelectorAll(
      '.anime__details__widget ul li'
    );

    const breadcrumb = document.querySelector('.breadcrumb__links span');

    if (animeObj) {
      imageBlock.dataset.setbg = animeObj.image;
      viewsBlock.innerHTML = '';
      viewsBlock.insertAdjacentHTML(
        'beforeend',
        `
      <div class="view">
         <i class="fa fa-eye"></i> ${animeObj.views}
                            </div>
      `
      );

      titleBlock.textContent = animeObj.title;
      subTitleBlock.textContent = animeObj['original-title'];
      descriptionBlock.textContent = animeObj.description;

      widgetList[0].insertAdjacentHTML(
        'beforeend',
        `
      <span>Date aired:</span> ${animeObj.date}
      `
      );
      widgetList[1].insertAdjacentHTML(
        'beforeend',
        `
     <span>Status:</span> ${animeObj.rating}
      `
      );
      widgetList[2].insertAdjacentHTML(
        'beforeend',
        `
     <span>Genre:</span>${animeObj.tags.join(', ')}
      `
      );

      breadcrumb.textContent = animeObj.genre;

      document.querySelectorAll('.set-bg').forEach((element) => {
        element.style.backgroundImage = `url(${element.dataset.setbg})`;
      });
      setTimeout(() => {
        preloader.classList.remove('active');
      }, 500);
    } else {
      console.log('няма');
    }
  };
  fetch('./db.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const genres = new Set();
      const genreParams = new URLSearchParams(window.location.search).get(
        'itemId'
      );
      data.anime.forEach((item) => {
        genres.add(item.genre);
      });

      if (genreParams) {
        renderAnimeDetails(data.anime, genreParams);
      } else {
        console.log('няма');
      }

      renderGenreList(genres);
    });
};

detailData();
