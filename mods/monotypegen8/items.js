'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {

"electivite": {
		id: "electivite",
		name: "Electivite",
		spritenum: 577,
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivite",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 7,
		isNonstandard: true,
		desc: "If held by a Electivire, this item allows it to Mega Evolve in battle.",
	},

"stakatakiumz": {
		id: "stakatakiumz",
		name: "Stakatakium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Gyration Dimension",
		zMoveFrom: "Gyro Ball",
		zMoveUser: ["Stakataka"],
		num: -2,
		gen: 7,
		desc: "If held by a Stakataka with Gyro Ball, it can use Gyration Dimension.",
	},

};

exports.BattleItems = BattleItems;
