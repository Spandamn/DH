'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"fluffycloak": {
		shortDesc: "This Pokemon's Sp. Defense is 1.5x.",
		onModifyDefPriority: 6,
		onModifyDef: function (spd) {
			return this.chainModify(1.5);
		},
		id: "fluffycloak",
		name: "Fluffy Cloak",
		rating: 3.5,
		num: 169,
	},
  "levitate": {
		desc: "This Pokemon is immune to Ground-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Ground-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Ground');
				}
				return null;
			}
		},
		id: "levitate",
		name: "Levitate",
		rating: 3.5,
		num: 11,
	},
 "versatility": {
		desc: "This Pokemon's moves not of it's typing gain 1.33x power.",
		onBasePower: function (basePower, pokemon, target, move) {
			if (!move.stab) {
				return this.chainModify([0x14CD, 0x1000]);
				}
				},
		id: "versatility",
		name: "Versatility",
		rating: 3.5,
		num: 11,
	},
	"triage": {
		shortDesc: "This Pokemon's healing moves have their priority increased by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.flags['heal']) return priority + 1;
		},
		id: "triage",
		name: "Triage",
		rating: 3.5,
		num: 205,
	},
	"gravitate": {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart: function(source) {
			this.useMove("Gravity", source);
		},
		id: "gravitate",
		name: "Gravitate",
	},
	"magician": {
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function(source) {
			this.useMove("Magic Room", source);
		},
		id: "magician",
		name: "Magician",
	},
	"scrappy": {
		shortDesc: "This Pokemon can hit Steel types with Poison-type moves.",
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		id: "scrappy",
		name: "Scrappy",
		rating: 3,
		num: 113,
	},
	"illuminate": {
		desc: "If a Pokemon uses a Ghost- or Dark-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "Ghost/Dark-type moves against this Pokemon deal damage with a halved attacking stat.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Illuminate weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Illuminate weaken');
				return this.chainModify(0.5);
			}
		},
		id: "illuminate",
		name: "Illuminate",
	},
  };

exports.BattleAbilities = BattleAbilities;
