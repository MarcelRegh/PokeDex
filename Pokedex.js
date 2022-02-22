// ====================> Global Variables <==================== \\
let currentPokemon;
let allPokemonNames = [];
let allPokemons = 1;
// ====================> Global Variables End <==================== \\
// ============================================================================================================================== \\
// ====================> Search function WIP <==================== \\
async function renderPokemonNames() {
    for (i = 1; i < 897; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemonName = await response.json();
        allPokemonNames.push(currentPokemonName['name']);
    }
}
// ====================> Search function End <==================== \\
// ============================================================================================================================== \\
// ====================> Fetching currentPokemon from API <==================== \\
async function renderPokedex() {
    //renderPokemonNames();
    for (i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();  
        renderPokeCard(i);
        renderPokemonAbout(i);
        renderPokemonBaseStats(i);
        renderPokemonMoves(i);
    }
}
// ====================> Fetching currentPokemon from API End <==================== \\
// ============================================================================================================================== \\
// ====================> Onscroll fetching more Pokemmons from API <==================== \\
window.onscroll = async function(){
    if(window.scrollY + window.innerHeight >= document.body.clientHeight) {
        let a = allPokemons * 20 + 1;
        let b = allPokemons * 20 + 20;
        allPokemons++;
        for (i = a; i < b; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            currentPokemon = await response.json();  
            renderPokeCard(i);
            renderPokemonAbout(i);
            renderPokemonBaseStats(i);
            renderPokemonMoves(i);
        }
    }
}
// ====================> Onscroll fetching more Pokemmons from API End <==================== \\
// ============================================================================================================================== \\
// ====================> Render currentPokemon PokeCard while fetching from API <==================== \\
function renderPokeCard(i) {
    let type = currentPokemon['types'][0]['type']['name'];
    document.getElementById('pokeDex').innerHTML += `
    <div class="showPokemon">
        <div id="pokeCard${i}" class="pokeCard ${type}" onclick="showStats(${i})">
            <div class="pokemonId" id="pokemonId">ID# ${currentPokemon['id']}</div>
            <div class="pokemonName" id="pokemonName">${currentPokemon['name'].replace(/^.{1}/g, currentPokemon['name'][0].toUpperCase())}</div>
            <div class="pokemonTypeImg">
                <div id="pokemonType">${type.replace(/^.{1}/g, type[0].toUpperCase())}</div>
                <div id="pokemonImg">
                    <img class="pokemonImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${currentPokemon['id']}.png">
                </div>
            </div>
        </div>
        <div class="d-none pokemonStats" id="pokemonAbout${i}"></div>
        <div class="d-none pokemonStats" id="pokemonBaseStats${i}"></div>
        <div class="d-none pokemonStats" id="pokemonMoves${i}"></div>
    </div>
    `;
}
// ====================> Render currentPokemon PokeCard while fetching from API End <==================== \\
/* --------------------------------------------------------------------------------------------------------- */
// ====================> Render currentPokemon Abouts while fetching from API <==================== \\
function renderPokemonAbout(i) {
    document.getElementById(`pokemonAbout${i}`).innerHTML += `
    <div class="center">
        <button onclick="showAbout(${i})">About</button>
        <button onclick="showBaseStats(${i})">Base Stats</button>
        <button onclick="showMoves(${i})">Moves</button>
    </div>
    <table>
        <tr>
            <td>Species</td>
            <td class="stat">${currentPokemon['species']['name'].replace(/^.{1}/g, currentPokemon['species']['name'][0].toUpperCase())}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td class="stat">${currentPokemon['height']}</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td class="stat">${currentPokemon['weight']}</td>
        </tr>
        <tr>
            <td>Abilities</Sp></td>
            <td class="stat">${currentPokemon['abilities'][0]['ability']['name'].replace(/^.{1}/g, currentPokemon['abilities'][0]['ability']['name'][0].toUpperCase())}</td>
        </tr>
    </table>
    `;
}
// ====================> Render About from the currentPokemon while fetching from API End <==================== \\
// ============================================================================================================================== \\
// ====================> Render currentPokemon BaseStats while fetching from API <==================== \\
function renderPokemonBaseStats(i) {
    document.getElementById(`pokemonBaseStats${i}`).innerHTML += `
    <div class="center">
        <button onclick="showAbout(${i})">About</button>
        <button onclick="showBaseStats(${i})">Base Stats</button>
        <button onclick="showMoves(${i})">Moves</button>
    </div>
        <table>
            <tr>
                <td>HP</td>
                <td class="stat">${currentPokemon['stats'][0]['base_stat']}</td>
            </tr>
            <tr>
                <td>Attack</td>
                <td class="stat">${currentPokemon['stats'][1]['base_stat']}</td>
            </tr>
            <tr>
                <td>Defense</td>
                <td class="stat">${currentPokemon['stats'][2]['base_stat']}</td>
            </tr>
            <tr>
                <td>Sp.Akt</Sp></td>
                <td class="stat">${currentPokemon['stats'][3]['base_stat']}</td>
            </tr>
            <tr>
                <td>Sp.Def</td>
                <td class="stat">${currentPokemon['stats'][4]['base_stat']}</td>
            </tr>
            <tr>
                <td>Speed</td>
                <td class="stat">${currentPokemon['stats'][5]['base_stat']}</td>
            </tr>
        </table>
    `;
}
// ====================> Render currentPokemon BaseStats while fetching from API End <==================== \\
// ============================================================================================================================== \\
// ====================> Render currentPokemon Moves while fetching from API <==================== \\
function renderPokemonMoves(i) {
    document.getElementById(`pokemonMoves${i}`).innerHTML += `
    <div class="center">
        <button onclick="showAbout(${i})">About</button>
        <button onclick="showBaseStats(${i})">Base Stats</button>
        <button onclick="showMoves(${i})">Moves</button>
    </div>
    <div id="moves${i}" class="pokemonMovesContainer"></div>
    `;
    for (let x = 0; x < currentPokemon['moves'].length; x++) {
        const move = currentPokemon['moves'][x]['move']['name'];
        document.getElementById(`moves${i}`).innerHTML += `<div class="pokemonMoves">${move.replace(/^.{1}/g, move[0].toUpperCase())}</div>`;
    }
}
// ====================> Render currentPokemon Moves while fetching from API End <==================== \\
// ============================================================================================================================== \\
// ====================> Remove and Add d-none class to some divs  <==================== \\
function showStats(i) {
    let e = document.getElementById(`pokemonAbout${i}`);
    let e1 = document.getElementById(`pokemonBaseStats${i}`);
    let e2 = document.getElementById(`pokemonMoves${i}`);
    let e3 = document.getElementById(`pokeCard${i}`)
    if (e.classList.contains('d-none') && e1.classList.contains('d-none') && e2.classList.contains('d-none')) {
        e.classList.remove('d-none');
        e3.classList.add('pokeCardStats');
    } else {
        e.classList.add('d-none');
        e1.classList.add('d-none');
        e2.classList.add('d-none');
        e3.classList.remove('pokeCardStats');
    }
}

function showAbout(i) {
    let e = document.getElementById(`pokemonAbout${i}`);
    let e1 = document.getElementById(`pokemonBaseStats${i}`);
    let e2 = document.getElementById(`pokemonMoves${i}`);
    if (e.classList.contains('d-none')) {
        e.classList.remove('d-none');
        e1.classList.add('d-none');
        e2.classList.add('d-none');
    }
}

function showBaseStats(i) {
    let e = document.getElementById(`pokemonAbout${i}`);
    let e1 = document.getElementById(`pokemonBaseStats${i}`);
    let e2 = document.getElementById(`pokemonMoves${i}`);
    if (e1.classList.contains('d-none')) {
        e.classList.add('d-none');
        e1.classList.remove('d-none');
        e2.classList.add('d-none');
    }
}

function showMoves(i) {
    let e = document.getElementById(`pokemonAbout${i}`);
    let e1 = document.getElementById(`pokemonBaseStats${i}`);
    let e2 = document.getElementById(`pokemonMoves${i}`);
    if (e2.classList.contains('d-none')) {
        e.classList.add('d-none');
        e1.classList.add('d-none');
        e2.classList.remove('d-none');
    }
}
// ====================> Remove and Add d-none class to some divs End <==================== \\