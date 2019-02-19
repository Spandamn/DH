'use strict';

/**@type {{[k: string]: TemplateData}} */
froxbite: {
		num: -14,
		species: "Froxbite",
		types: ["Ice", "Fire"],
		baseStats: {hp: 70, atk: 135, def: 63, spa: 120, spd: 55, spe: 112},
		abilities: {0: "Flash Fire", 1: "Cute Charm", H: "Snow Warning"},
		heightm: 3.6,
		weightkg: 80,
		eggGroups: ["Fairy"],
	},
cnidali: {
		num: -14,
		species: "Cnidali",
		types: ["Poison", "Fighting"],
		baseStats: {hp: 109, atk: 100, def: 85, spa: 40, spd: 90, spe: 66},
		abilities: {0: "Regenerator", 1: "Stench", H: "Poison Heal"},
    otherFormes: ["cnidalimega"],
	},
cnidalimega: {
		num: -14,
		species: "Cnidali-Mega",
		baseSpecies: "Cnidali",
		forme: "Mega",
		formeLetter: "M",
		types: ["Poison", "Fighting"],
		baseStats: {hp: 109, atk: 130, def: 95, spa: 60, spd: 120, spe: 76},
		abilities: {0: "Contrary"},
	},
chamereon: {
		num: -23,
		species: "Chamereon",
		types: ["Normal"],
		baseStats: {hp: 119, atk: 71, def: 111, spa: 69, spd: 109, spe: 51},
		abilities: {0: "Multitype", H: "Color Change"},
		heightm: 2.2,
		weightkg: 22.5,
		eggGroups: ["Dragon", "Field"],
	},
petrogeist: {
		num: -23,
		species: "Petrogeist",
		types: ["Ghost", "Rock"],
		baseStats: {hp: 75, atk: 100, def: 100, spa: 50, spd: 85, spe: 115},
		abilities: {0: "Intimidate", H: "Rock Head"},
		heightm: 4.11,
		weightkg: 180.1,
		eggGroups: ["Amorphous", "Mineral"],
	},
ampeater: {
		num: -23,
		species: "Ampeater",
		types: ["Electric", "Dark"],
		baseStats: {hp: 85, atk: 48, def: 115, spa: 115, spd: 85, spe: 92},
		abilities: {0: "Sheer Force", H: "Sand Force"},
		heightm: 3.7,
		weightkg: 83.8,
		eggGroups: ["Field", "Monster"],
	},

};

exports.BattlePokedex = BattlePokedex;
