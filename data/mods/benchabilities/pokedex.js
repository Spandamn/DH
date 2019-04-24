'use strict';

/**@type {{[k: string]: TemplateData}} */
let BattlePokedex = {
victini: {
		num: 494,
		species: "Victini",
		types: ["Psychic", "Fire"],
		gender: "N",
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Victory Star", B: "Confidence Boost"},
		heightm: 0.4,
		weightkg: 4,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	},
};

exports.BattlePokedex = BattlePokedex;
