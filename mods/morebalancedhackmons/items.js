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
	"assaultarmor": {
		id: "assaultarmor",
		name: "Assault Armor",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(1.3);
		},
		onModifySpDPriority: 1,
		onModifySpD: function (spd) {
			return this.chainModify(1.3);
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
		desc: "Holder's Def and SpD are 1.3x, but it can only select damaging moves.",
	},
	"brightpowder": {
		id: "brightpowder",
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.type === 'Ghost' || move.type === 'Dark') {
				this.debug('-30% reduction');
					this.add(target, this.effect, '[weaken]');
					return this.chainModify(0.7);
			}
		},
		num: 213,
		gen: 2,
		desc: "The holder takes 30% less damage from Dark and Ghost Attacks.",
	},
	"mentalherb": {
		id: "mentalherb",
		name: "Mental Herb",
		spritenum: 285,
		fling: {
			basePower: 10,
			effect: function (pokemon) {
				let conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
				for (const firstCondition of conditions) {
					if (pokemon.volatiles[firstCondition]) {
						for (const secondCondition of conditions) {
							pokemon.removeVolatile(secondCondition);
							if (firstCondition === 'attract' && secondCondition === 'attract') {
								this.add(pokemon, 'move: Attract', '[from] item: Mental Herb');
							}
						}
						return;
					}
				}
			},
		},
		onUpdate: function (pokemon) {
			let conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
			for (const firstCondition of conditions) {
				if (pokemon.volatiles[firstCondition]) {
					if (!pokemon.useItem()) return;
					for (const secondCondition of conditions) {
						pokemon.removeVolatile(secondCondition);
						if (firstCondition === 'attract' && secondCondition === 'attract') {
							this.add(pokemon, 'move: Attract', '[from] item: Mental Herb');
						}
					}
					return;
				}
			}
		},
		num: 219,
		gen: 3,
		desc: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment.",
	},
	"zekriumz": {
		id: "zekriumz",
		name: "Zekrium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Shocking Absolute Zero",
		zMoveFrom: "Freeze Shock",
		zMoveUser: ["Kyurem-Black", "Kyurem-White", "Kyurem"],
		num: 1000,
		gen: 7,
		desc: "If held by a Kyurem, Kyurem-Black, or Kyurem-White with Freeze Shock, it can use Shocking Absolute Zero.",
	},
	"reshiumz": {
		id: "reshiumz",
		name: "Reshium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Searing Absolute Zero",
		zMoveFrom: "Ice Burn",
		zMoveUser: ["Kyurem-Black", "Kyurem-White", "Kyurem"],
		num: 1000,
		gen: 7,
		desc: "If held by a Kyurem, Kyurem-Black, or Kyurem-White with Ice Burn, it can use Searing Absolute Zero",
	},
	"roomlock": {
		id: "roomlock",
		name: "Room Lock",
		spritenum: 88,
		fling: {
			basePower: 60,
		},
		num: 285,
		gen: 4,
		desc: "Holder's use of Room moves lasts 8 turns instead of 5.",
	},
	"ironball": {
		id: "ironball",
		name: "Iron Ball",
		spritenum: 224,
		fling: {
			basePower: 130,
		},
		num: 278,
		gen: 4,
		desc: "Holder's use of Gravity lasts 8 turns instead of 5.",
	},
	"grassyseed": {
		id: "grassyseed",
		name: "Grassy Seed",
		spritenum: 251,
		onTakeItem: false,
		fling: {
			basePower: 10,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Tapu Bulu') {
				return this.chainModify(1.25);
			}
		},
		num: 236,
		gen: 2,
		desc: "If held by a Tapu Bulu, its Defense is 1.25x.",
	},
	"electricseed": {
		id: "electricseed",
		name: "Electric Seed",
		spritenum: 251,
		onTakeItem: false,
		fling: {
			basePower: 10,
		},
		onModifySpePriority: 1,
		onModifySpe: function (spe, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Tapu Koko') {
				return this.chainModify(1.25);
			}
		},
		num: 236,
		gen: 2,
		desc: "If held by a Tapu Koko, its Speed is 1.25x.",
	},
	"mistyseed": {
		id: "mistyseed",
		name: "Misty Seed",
		spritenum: 251,
		onTakeItem: false,
		fling: {
			basePower: 10,
		},
		onModifySpDPriority: 1,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Tapu Fini') {
				return this.chainModify(1.25);
			}
		},
		num: 236,
		gen: 2,
		desc: "If held by a Tapu Fini, its Sp. Defense is 1.25x.",
	},
	"psychicseed": {
		id: "psychicseed",
		name: "Psychic Seed",
		spritenum: 251,
		onTakeItem: false,
		fling: {
			basePower: 10,
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Tapu Lele') {
				return this.chainModify(1.25);
			}
		},
		num: 236,
		gen: 2,
		desc: "If held by a Tapu Lele, its Sp. Attack is 1.25x.",
	},
};

exports.BattleItems = BattleItems;
