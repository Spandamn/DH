'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"fluffycloak": {
		shortDesc: "This Pokemon's Sp. Defense is doubled.",
		onModifyDefPriority: 6,
		onModifyDef: function (spd) {
			return this.chainModify(2);
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
	"illuminate": {
		desc: "This Pokemon always at least resists Ghost and Dark moves."
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ghost' && move.typeMod = 0 || move.type === 'Dark' && move.typeMod = 0) {
				this.debug('Illuminate weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 6,
		onSourceModifySpA: function (spa, attacker, defender, move) {
			if (move.type === 'Ghost' && move.typeMod = 0 || move.type === 'Dark' && move.typeMod = 0) {
				this.debug('Illuminate weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ghost' && move.typeMod = 1 || move.type === 'Dark' && move.typeMod = 1) {
				this.debug('Illuminate weaken');
				return this.chainModify(0.25);
			}
		},
		onModifySpAPriority: 6,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ghost' && move.typeMod = 1 || move.type === 'Dark' && move.typeMod = 1) {
				this.debug('Illuminate weaken');
				return this.chainModify(0.25);
			}
		},
  };

exports.BattleAbilities = BattleAbilities;
