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

	// declaro una constante y le asigno el response (await fetch)
	try {
		const response = await fetch(pokemonEndpoint);

	// obtengo el json de ese response y lo asigno a otra constante
		const data = await response.json();

	// creo el html que voy a insertar, con template, lo inserto en poke-container con insertAdjacentHTML
		poke_container.insertAdjacentHTML('beforeend',
			`<article class="pokemon" style="background-color: rgb(222,253,224);">
				<div class="img-container">
					<img src=${data.sprites.other["official-artwork"].front_default} alt=${data.name}>
				</div>
				<div class="info">
					<span class="number">00${data.id}</span>
					<h3 class="name">${data.name}</h3>
					<small class="type">Type: <span>${data.types[0].name}</span></small>
				</div>
			</article>`)
	// falta usar el método padStart para strings
	// falta cambiar el background en función del tipo de pokemon 

	} catch (error) {
		console.log(error);
	}

	console.log(pokemonEndpoint);
}
