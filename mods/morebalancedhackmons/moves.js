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
	"sludgedrift": {
		num: 369,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "sludgedrift",
		isViable: true,
		name: "Sludge Drift",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 140,
		contestType: "Cute",
	},
	"sunsteelstrike": {
		num: 713,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		id: "sunsteelstrike",
		isViable: true,
		name: "Sunsteel Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Cool",
	},
	"moongeistbeam": {
		num: 714,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		id: "moongeistbeam",
		isViable: true,
		name: "Moongeist Beam",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Cool",
	},
	"photongeyser": {
		num: 722,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
		id: "photongeyser",
		isViable: true,
		name: "Photon Geyser",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 180,
		contestType: "Cool",
	},
	"psychoboost": {
		num: 354,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "psychoboost",
		isViable: true,
		name: "Psycho Boost",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 200,
		contestType: "Clever",
	},
	"airslash": {
		num: 126,
		accuracy: 85,
		basePower: 110,
		category: "Special",
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
		id: "airslash",
		isViable: true,
		name: "Air Slash",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Flying",
		zMovePower: 185,
		contestType: "Beautiful",
	},
	"octazooka": {
		num: 282,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "If the target is holding an item that can be removed from it, ignoring the Sticky Hold Ability, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot remove Z-Crystals, cause Pokemon with the Sticky Hold Ability to lose their held item, cause Pokemon that can Mega Evolve to lose the Mega Stone for their species, or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, or a Silvally to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, or Memory respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "octazooka",
		isViable: true,
		name: "Octazooka",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 120,
		contestType: "Clever",
	},
	"healbell": {
		num: 215,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Soundproof Ability are not cured.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "healbell",
		isViable: true,
		name: "Heal Bell",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, sound: 1, distance: 1, authentic: 1},
		onHit: function (pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			let side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Beautiful",
	},
	"aromatherapy": {
		num: 312,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Sap Sipper Ability are not cured, unless they are the user.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "aromatherapy",
		isViable: true,
		name: "Aromatherapy",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, distance: 1},
		onHit: function (pokemon, source, move) {
			this.add('-activate', source, 'move: Aromatherapy');
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally !== source && ((ally.hasAbility('sapsipper')) ||
						(ally.volatiles['substitute'] && !move.infiltrates))) {
					continue;
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		type: "Grass",
		zMoveEffect: 'heal',
		contestType: "Clever",
	},
	"secretpower": {
		num: 686,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
		id: "secretpower",
		isViable: true,
		name: "Secret Power",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"spacialrend": {
		num: 53,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 10% chance to raise SpA.",
		shortDesc: "10% chance to raise SpA.",
		id: "spacialrend",
		isViable: true,
		name: "Spacial Rend",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 175,
		contestType: "Beautiful",
	},
};

exports.BattleMovedex = BattleMovedex;
