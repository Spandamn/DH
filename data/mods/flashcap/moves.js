'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
"flaredash": {
		num: 410,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "flaredash",
		name: "Flare Dash",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 100,
		contestType: "Cool",
	},
};

exports.BattleMovedex = BattleMovedex;
