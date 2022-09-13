sessionStorage.setItem('urlBase', 'http://localhost:3031');

/* const urlBase = 'http://localhost:3031'; */

window.onload = async () => {
  const app = document.getElementById('root');
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  app.appendChild(container);

  console.log('main.js success');

  // Aqui debemos agregar nuestro fetch

  try {
    let response = await fetch(sessionStorage.getItem('urlBase') + '/api/movies');
    let peliculas = await response.json();
    console.log(peliculas);

    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement('p');
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement('p');
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const buttonEdit = document.createElement('a');
      buttonEdit.setAttribute('href', 'formulario.html?id=' + movie.id);
      buttonEdit.setAttribute('class', 'botonAgregar');
      buttonEdit.textContent = 'EDITAR';
      card.appendChild(buttonEdit);

      const buttonDelete = document.createElement('button');
      buttonDelete.setAttribute('id', movie.id);
      buttonDelete.setAttribute('class', 'botonBorrar');
      buttonDelete.textContent = 'ELIMINAR';
      card.appendChild(buttonDelete);
    });
  } catch (error) {
    console.error;
  }
  container.addEventListener('click', (e) => {
    console.log(e.target);
  });

  //Codigo que debemos usar para mostrar los datos en el frontend
};
