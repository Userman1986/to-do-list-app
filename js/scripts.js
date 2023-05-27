const pokemonRepository = (function() {
  let repository = [];

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    const pokemonList = document.getElementById('pokemon-list');

    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = pokemon.name;

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemon-details');

    pokemonDetails.innerHTML = `<h2>${pokemon.name}</h2>
                                <p>Height: ${pokemon.height}</p>
                                <p>Types: ${pokemon.types.join(', ')}</p>`;
  }

  function showLoadingMessage() {
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Loading...';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    const loadingMessage = document.querySelector('p');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  function loadList() {
    showLoadingMessage();
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => {
        data.results.forEach(pokemon => {
          const { name, url } = pokemon;
          const detailsUrl = url;
          const pokemonToAdd = { name, detailsUrl };
          add(pokemonToAdd);
        });
        hideLoadingMessage();
      })
      .catch(error => {
        console.error(error);
        hideLoadingMessage();
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        pokemon.imgUrl = data.sprites.front_default;
        pokemon.height = data.height;
        hideLoadingMessage();
      })
      .catch(error => {
        console.error(error);
        hideLoadingMessage();
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Load Pokémon data and display the list
pokemonRepository.loadList().then(function() {
  const pokemonList = pokemonRepository.getAll();
  pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Example usage
pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'] });

console.log(pokemonRepository.getAll());
