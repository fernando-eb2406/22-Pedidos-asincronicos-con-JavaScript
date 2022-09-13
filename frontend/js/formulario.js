const $ = (element) => document.getElementById(element);

window.onload = async () => {
  console.log('formulario.js success');

  let query = new URLSearchParams(location.search);

  /* console.log(query.has('id')); */

  if (query.has('id')) {
    $('botonEditar').hidden = false;

    try {
      /* let response = await fetch(
        sessionStorage.getItem('urlBase') + '/api/movies/' + query.get('id')
      ); */

      let response = await fetch(
        `${sessionStorage.getItem('urlBase')}/api/movies/${query.get('id')}`
      );

      let result = await response.json();

      /* console.log(result); */

      let movie = result.data;

      $('title').value = movie.title;
      $('rating').value = movie.rating;
      $('awards').value = movie.awards;
      $('release_date').value = moment(release_date).format('yyyy-MM-dd');
      $('length').value = movie.length;
    } catch (error) {
      console.error;
    }

    $('formulario').addEventListener('submit', async (e) => {
      e.preventDefault();
      /* console.log('Enviando formulario...'); */

      let bodyForm = {
        title: $('title').value,
        rating: $('rating').value,
        awards: $('awards').value,
        release_date: $('release_date').value,
        length: $('length').value,
      };

      try {
        let response = await fetch(
          `${sessionStorage.getItem('urlBase')}/api/movies/update/${query.get('id')}`,
          {
            method: 'PUT',
            body: JSON.stringify(bodyForm),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        let result = await response.json();
        console.log(result);
      } catch (error) {
        console.error;
      }
    });
  } else {
    $('botonAgregar').hidden = false;
  }
};
