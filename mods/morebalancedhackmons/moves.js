'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
"corrosiveacid": {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "10% chance to poison the opponent and is super effective against Steel-types.",
		shortDesc: "Super Effective against Steel. 10% Poison chance.",
		id: "corrosiveacid",
		isViable: true,
		name: "Corrosive Acid",
		pp: 24,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid", target);
		},
		onModifyMovePriority: -5,
		onModifyMove: function(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Steel'] = true;
				move.ignoreImmunity['Poison'] = true;
			}
		},
		onEffectiveness: function(typeMod, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 140,
		contestType: "Beautiful",
	},
};

exports.BattleMovedex = BattleMovedex;
