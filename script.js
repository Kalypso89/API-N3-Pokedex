const poke_container = document.getElementById('poke-container');

const pokemon_count = 150;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const myEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

for (let id = 1; id <= pokemon_count; id++) {
	await createPokemonCard(id);
}

async function createPokemonCard(id) {

	const pokemonEndpoint = `${myEndpoint}${id}`;
	
	try {
		const response = await fetch(pokemonEndpoint);
		
		const pokeData = await response.json();

		const idAsString = pokeData.id.toString();

		const paddedId = idAsString.padStart(3, '0');

		const type = pokeData.types[0].type.name;

		const img = pokeData.sprites.other["official-artwork"].front_default;

		poke_container.insertAdjacentHTML('beforeend',
			`<article class="pokemon" style="background-color: ${colors[type]}">
				<div class="img-container">
					<img src=${img} alt=${pokeData.name}>
				</div>
				<div class="info">
					<span class="number">${paddedId}</span>
					<h3 class="name">${pokeData.name}</h3>
					<small class="type">Type: <span>${type}</span></small>
				</div>
			</article>`)

	} catch (error) {
		console.log(error);
	}
}
