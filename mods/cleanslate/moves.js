	'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
  "venomslam": {
		num: 690.5,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is badly poisoned.",
		shortDesc: "Badly poisons on contact with the user before it moves.",
		id: "venomslam",
		isViable: true,
		name: "Venom Slam",
		pp: 15,
		priority: -3,
		flags: {bullet: 1, protect: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('venomslam');
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Venom Slam');
			},
			onHit: function (pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('tox', pokemon);
				}
			},
		},
		onMoveAborted: function (pokemon) {
			pokemon.removeVolatile('venomslam');
		},
		onAfterMove: function (pokemon) {
			pokemon.removeVolatile('venomslam');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 180,
	},

"petalblast": {
		num: 585.5,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 30% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "30% chance to lower the target's Sp. Atk by 1.",
		id: "petalblast",
		isViable: true,
		name: "Petal Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 175,
	},

	"viciousmockery": {
		num: 691.5,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "Lowers the user's Special Attack by 1 stage.",
		shortDesc: "Lowers the user's Special Attack by 1.",
		id: "viciousmockery",
		isViable: true,
		name: "Vicious Mockery",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		selfBoost: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		zMovePower: 185,
	},

	"venostrike": {
		num: 474,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Power doubles if the target has a negative stat change.",
		shortDesc: "Power doubles if the target has a negative stat change.",
		id: "venostrike",
		name: "Venostrike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			if (target.negativeBoosts === 'true') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 120,
	},
	"gravity": {
        num: 356,
        accuracy: true,
        basePower: 0,
        category: "Status",
        desc: "For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Ability Arena Trap can affect Flying types or Pokemon with the Ability Levitate. Fails if this move is already in effect.",
        shortDesc: "For 5 turns, negates all Ground immunities.",
        id: "gravity",
        name: "Gravity",
        pp: 5,
        priority: 0,
        flags: {nonsky: 1},
        weather: 'Gravity',
        secondary: null,
        target: "all",
        type: "Psychic",
        zMoveBoost: {spe: 1},
        contestType: "Beautiful",
    },
  };

exports.BattleMovedex = BattleMovedex;
