//cojo el contenedor en el que voy a insertar cada card
const poke_container = document.getElementById('poke-container');
//guardo una constante para el recuento de pokemons
const pokemon_count = 150;
//almaceno en un objeto con clave-valor el color que se corresponde con cada tipo de pokemon
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

//almaceno el endpoint de todos los pokemons
const myEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

//creo un contador para crear las 150 cards
for (let id = 1; id <= pokemon_count; id++) {
	await createPokemonCard(id);
}

//creo la función asíncrona de crear cada card
async function createPokemonCard(id) {
	// añado el id del pokemon
	const pokemonEndpoint = `${myEndpoint}${id}`;
	
	try {
		// declaro una constante y le asigno el response (await fetch)
		const response = await fetch(pokemonEndpoint);
		
		// obtengo el json de ese response y lo asigno a otra constante
		const pokeData = await response.json();

		//convierto el id en string
		const idAsString = pokeData.id.toString();

		// añado el padding de 0 al principio
		const paddedId = idAsString.padStart(3, '0');

		// obtengo el type de cada pokemon
		const type = pokeData.types[0].type.name;

		//obtengo la img de cada pokemon
		const img = pokeData.sprites.other["official-artwork"].front_default;

	// creo el html que voy a insertar, con template, lo inserto en poke-container con insertAdjacentHTML
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
