'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
	"assaultjacket": {
		id: "assaultjacket",
		name: "Assault Jacket",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(1.5);
		},
		onDisableMove: function (pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.getMove(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 640,
		gen: 6,
		desc: "Holder's Def is 1.5x, but it can only select damaging moves.",
	},
};

exports.BattleItems = BattleItems;
