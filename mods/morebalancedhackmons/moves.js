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
		basePower: 60,
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
	"aurorabeam": {
		num: 62,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 10% chance to lower the target's Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		id: "aurorabeam",
		name: "Aurora Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Ice",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"boneclub": {
		num: 125,
		accuracy: 85,
		basePower: 60,
		category: "Physical",
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
		id: "boneclub",
		name: "Bone Club",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ground",
		zMovePower: 120,
		contestType: "Tough",
	},
	"brine": {
		num: 362,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Power doubles if the target has less than or equal to half of its maximum HP remaining.",
		shortDesc: "Power doubles if the target's HP is 50% or less.",
		id: "brine",
		name: "Brine",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 120,
		contestType: "Tough",
	},
	"bubblebeam": {
		num: 61,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 10% chance to lower the target's Speed by 1 stage.",
		shortDesc: "10% chance to lower the target's Speed by 1.",
		id: "bubblebeam",
		name: "Bubble Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"firefang": {
		num: 424,
		accuracy: 95,
		basePower: 60,
		category: "Physical",
		desc: "Has a 10% chance to burn the target and a 10% chance to flinch it.",
		shortDesc: "10% chance to burn. 10% chance to flinch.",
		id: "firefang",
		isViable: true,
		name: "Fire Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fire",
		zMovePower: 120,
		contestType: "Cool",
	},
	"glaciate": {
		num: 549,
		accuracy: 95,
		basePower: 60,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the foe(s) Speed by 1.",
		id: "glaciate",
		name: "Glaciate",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ice",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"hex": {
		num: 506,
		accuracy: 100,
		basePower: 60,
		basePowerCallback: function (pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		desc: "Power doubles if the target has a major status condition.",
		shortDesc: "Power doubles if the target has a status ailment.",
		id: "hex",
		isViable: true,
		name: "Hex",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Clever",
	},
	"hornattack": {
		num: 30,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "hornattack",
		name: "Horn Attack",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Cool",
	},
	"icefang": {
		num: 423,
		accuracy: 95,
		basePower: 60,
		category: "Physical",
		desc: "Has a 10% chance to freeze the target and a 10% chance to flinch it.",
		shortDesc: "10% chance to freeze. 10% chance to flinch.",
		id: "icefang",
		isViable: true,
		name: "Ice Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Ice",
		zMovePower: 120,
		contestType: "Cool",
	},
	"leaftornado": {
		num: 536,
		accuracy: 90,
		basePower: 60,
		category: "Special",
		desc: "Has a 50% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "50% chance to lower the target's accuracy by 1.",
		id: "leaftornado",
		name: "Leaf Tornado",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Grass",
		zMovePower: 120,
		contestType: "Cool",
	},
	"lowsweep": {
		num: 490,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		id: "lowsweep",
		name: "Low Sweep",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 120,
		contestType: "Clever",
	},
	"mirrorshot": {
		num: 429,
		accuracy: 85,
		basePower: 60,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
		id: "mirrorshot",
		name: "Mirror Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"mudbomb": {
		num: 426,
		accuracy: 85,
		basePower: 60,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
		id: "mudbomb",
		name: "Mud Bomb",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Ground",
		zMovePower: 120,
		contestType: "Cute",
	},
	"paraboliccharge": {
		num: 570,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "paraboliccharge",
		name: "Parabolic Charge",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
		zMovePower: 120,
		contestType: "Clever",
	},
	"psybeam": {
		num: 60,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
		id: "psybeam",
		name: "Psybeam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"sludge": {
		num: 124,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 30% chance to poison the target.",
		shortDesc: "30% chance to poison the target.",
		id: "sludge",
		name: "Sludge",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 120,
		contestType: "Tough",
	},
	"knockoff": {
		num: 282,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "If the target is holding an item that can be removed from it, ignoring the Sticky Hold Ability, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot remove Z-Crystals, cause Pokemon with the Sticky Hold Ability to lose their held item, cause Pokemon that can Mega Evolve to lose the Mega Stone for their species, or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, or a Silvally to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, or Memory respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "knockoff",
		isViable: true,
		name: "Knock Off",
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
		type: "Dark",
		zMovePower: 120,
		contestType: "Clever",
	},
	"spark": {
		num: 209,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze the target.",
		id: "spark",
		name: "Spark",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 120,
		contestType: "Cool",
	},
	"steamroller": {
		num: 537,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to flinch the target.",
		id: "steamroller",
		name: "Steamroller",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Bug",
		zMovePower: 120,
		contestType: "Tough",
	},
	"stomp": {
		num: 23,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to flinch the target.",
		id: "stomp",
		name: "Stomp",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Tough",
	},
	"thunderfang": {
		num: 422,
		accuracy: 95,
		basePower: 60,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target and a 10% chance to flinch it.",
		shortDesc: "10% chance to paralyze. 10% chance to flinch.",
		id: "thunderfang",
		name: "Thunder Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'par',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Electric",
		zMovePower: 120,
		contestType: "Cool",
	},
	"venoshock": {
		num: 474,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Power doubles if the target is poisoned.",
		shortDesc: "Power doubles if the target is poisoned.",
		id: "venoshock",
		name: "Venoshock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"freezeshock": {
		num: 553,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% paralyze.",
		id: "freezeshock",
		name: "Freeze Shock",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"iceburn": {
		num: 554,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% burn.",
		id: "iceburn",
		name: "Ice Burn",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"searingabsolutezero": {
		num: 700,
		accuracy: true,
		basePower: 200,
		category: "Special",
		desc: "Has a 100% chance to burn the target.",
		shortDesc: "100% chance to burn the target.",
		id: "searingabsolutezero",
		name: "Searing Absolute Zero",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "reshiumz",
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	"shockingabsolutezero": {
		num: 700,
		accuracy: true,
		basePower: 200,
		category: "Physical",
		desc: "Has a 100% chance to paralyze the target.",
		shortDesc: "100% chance to paralyze the target.",
		id: "shockingabsolutezero",
		name: "Shocking Absolute Zero",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "zekriumz",
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	"wonderroom": {
		num: 472,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all active Pokemon have their Defense and Special Defense stats swapped. Stat stage changes are unaffected. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all Defense and Sp. Def stats switch.",
		id: "wonderroom",
		name: "Wonder Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'wonderroom',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
			if (source && source.hasItem('roomlock')) {
				return 8;
			}
			return 5;
		},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.removePseudoWeather('wonderroom');
			},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onResidualOrder: 24,
			onEnd: function () {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"trickroom": {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, slower Pokemon move first.",
		id: "trickroom",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'trickroom',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
			if (source && source.hasItem('roomlock')) {
				return 8;
			}
			return 5;
		},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd: function () {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {accuracy: 1},
		contestType: "Clever",
	},
	"magicroom": {
		num: 478,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the held items of all active Pokemon have no effect. An item's effect of causing forme changes is unaffected, but any other effects from such items are negated. During the effect, Fling and Natural Gift are prevented from being used by all active Pokemon. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all held items have no effect.",
		id: "magicroom",
		name: "Magic Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'magicroom',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
			if (source && source.hasItem('roomlock')) {
				return 8;
			}
			return 5;
		},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 25,
			onEnd: function () {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"gravity": {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability can affect Flying types or Pokemon with the Levitate Ability. Fails if this move is already in effect.",
		shortDesc: "For 5 turns, negates all Ground immunities.",
		id: "gravity",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'gravity',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
			if (source && source.hasItem('ironball')) {
				return 8;
			}
			return 5;
		},
			onStart: function () {
				this.add('-fieldstart', 'move: Gravity');
				for (const pokemon of this.sides[0].active.concat(this.sides[1].active)) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy: function (accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function () {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spa: 1},
		contestType: "Clever",
	},
};

exports.BattleMovedex = BattleMovedex;
