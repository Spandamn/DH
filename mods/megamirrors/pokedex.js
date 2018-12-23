'use strict';

/**@type {{[k: string]: TemplateData}} */
let BattlePokedex = {	
abomasnowmegax: {
		num: 460,
		species: "Abomasnow-Mega-X",
		baseSpecies: "Abomasnow",
		forme: "Mega-X",
		formeLetter: "M",
		types: ["Grass", "Water"],
		baseStats: {hp: 90, atk: 112, def: 95, spa: 102, spd: 135, spe: 60},
		abilities: {0: "Regenerator"},
		heightm: 2.7,
		weightkg: 185,
		color: "White",
		eggGroups: ["Monster", "Grass"],
	},
  
	absolmegay: {
		num: 359,
		species: "Absol-Mega-Y",
		baseSpecies: "Absol",
		forme: "Mega-Y",
		formeLetter: "M",
		types: ["Dark", "Electric"],
		baseStats: {hp: 65, atk: 110, def: 60, spa: 115, spd: 100, spe: 115},
		abilities: {0: "Galvanize"},
		heightm: 1.2,
		weightkg: 49,
		color: "White",
		eggGroups: ["Field"],
	},
  aerodactylmegay: {
		num: 142,
		species: "Aerodactyl-Mega-Y",
		baseSpecies: "Aerodactyl",
		forme: "Mega-Y",
		formeLetter: "M",
		types: ["Rock", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 105, def: 75, spa: 130, spd: 85, spe: 140},
		abilities: {0: "Savagery"},
		heightm: 2.1,
		weightkg: 79,
		color: "Purple",
		eggGroups: ["Flying"],
	},
};

exports.BattlePokedex = BattlePokedex;
