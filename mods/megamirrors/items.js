'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
"abomasitex": {
		id: "abomasitex",
		name: "Abomasite X",
		spritenum: 575,
		megaStone: "Abomasnow-Mega-X",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2000,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	"absolitey": {
		id: "absolitey",
		name: "Absolite Y",
		spritenum: 576,
		megaStone: "Absol-Mega-Y",
		megaEvolves: "Absol",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2001,
		gen: 6,
		desc: "If held by an Absol, this item allows it to Mega Evolve in battle.",
	},
  	"aerodactylitey": {
		id: "aerodactylitey",
		name: "Aerodactylite Y",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega-Y",
		megaEvolves: "Aerodactyl",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2002,
		gen: 6,
		desc: "If held by an Aerodactyl, this item allows it to Mega Evolve in battle.",
	},
};

exports.BattleItems = BattleItems;
