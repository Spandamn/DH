'use strict';

/**@type {ModdedBattleScriptsData} */
let BattleScripts = {
	init() {
		for (let i in this.data.Pokedex) {
			let pokemon = this.data.Pokedex[i];
			let bannedPokemon =  ['Blaziken-Mega', 'Gengar-Mega', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'];
			let forme = pokemon.forme;
			if (bannedPokemon.includes(pokemon.species)) continue;
			if (pokemon.forme && pokemon.forme.includes('Mega')) {
				this.modData('Pokedex', i).gen = 7;
				this.modData('Pokedex', i).isMega = true;
				this.modData('Pokedex', i).battleOnly = false;
				delete this.modData('FormatsData', i).requiredItem;
			}
		}
	},
};

exports.BattleScripts = BattleScripts;