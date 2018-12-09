'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
"inverseroom": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, all Pokémon on the field are resistant to normally super-effective types and weak to normally not-very-effective or ineffective types (as in Inverse Battles) ",
		id: "inverseroom",
		name: "Inverse Room",
		pp: 8,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'inverseroom',
		effect: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				else if (source && source.hasItem('roomextender')) {
					return 8;
				}
				return 5;
			},
			onStart: function(target, source) {
			this.removePseudoWeather('trickroom');
			this.removePseudoWeather('magicroom');
			this.removePseudoWeather('wonderroom');
				this.add('-fieldstart', 'move: Inverse Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				return null;
			},
			onEffectiveness: function(typeMod, target, type, move) {
				if (move && !this.getImmunity(move, type)) return 1;
				return -typeMod;
			},
			onResidualOrder: 23,
			onEnd: function() {
				this.add('-fieldend', 'move: Inverse Room');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Sunny Day", source);
		},
		secondary: false,
		target: "all",
		type: "Psychic",
		zMoveBoost: {acc: 1},
	},
	"wonderroomm": {
		num: 472,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all active Pokemon have their Defense and Special Defense stats swapped. Stat stage changes are unaffected. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all Defense and Sp. Def stats switch.",
		id: "wonderroomm",
		name: "Wonder Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'wonderroomm',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.removePseudoWeather('wonderroomm');
			},
			onModifyMove: function (move){
			if (move.category === 'Status') return;
			if (move.category === 'Physical') {
				 	move.category = 'Special';
			}
			else if (move.category === 'Special') {
				 move.category = 'Physical';
			}
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
};
exports.BattleMovedex = BattleMovedex;
