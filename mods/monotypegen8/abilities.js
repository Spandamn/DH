'use strict';
exports.BattleAbilities = {
	"datamining": {
		desc: "On switch-in, this Pokemon reveals the opposing Pokemon's moveset.",
		shortDesc: "On switch-in, this Pokemon reveals the opposing Pokemon's moveset.",
		onStart: function (pokemon) {
			/**@type {(Move|Pokemon)[][]} */
			for (const target of pokemon.side.foe.active) {
				this.add('-ability', pokemon, 'Datamining');
				let revealStr = "|";
				let revealName = pokemon.name
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					let move = this.getMove(moveSlot.move);
					revealStr = revealStr + " " + move.name + " |"
				}
				this.add('-message', revealName + "'s moveset was revealed to be " + revealStr);
			}
		},
		id: "datamining",
		name: "Datamining",
		rating: 1,
		num: 108,
	},
	"calloused": {
		shortDesc: "This pokemon is immune to Stealth Rock and Spikes.",
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') || (effect && effect.id === 'spikes') {
				return false;
			}
		},
		id: "calloused",
		name: "Calloused",
		rating: 3.5,
		num: -2,
	},
	"crystalcore": {
		shortDesc: "This Pokemon's attacks become Physical or Special, depending on which attacking stat is highest",
		onModifyMove: function (move, attacker, defender) {
			if move.category != "Status"){
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) { move.category = 'Physical';
				} else if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) { move.category = 'Special';
				} else { move.category = 'Physical';
				}
			}
		},
		id: "crystalcore",
		name: "Crystal Core",
	},
	"frozenfire": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('frozenfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Frozen Fire');
				}
				return null;
			}
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('frozenfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Frozen Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					this.debug('Frozen Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					this.debug('Frozen Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Frozen Fire', '[silent]');
			},
		},
		id: "frozenfire",
		name: "Frozen Fire",
		rating: 3,
		num: 18,
	},
	"majestic": {
        desc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opponents by 1 stage.",
        onStart: function (pokemon) {
            let activated = false;
            for (const target of pokemon.side.foe.active) {
                if (!target || !this.isAdjacent(target, pokemon)) continue;
                if (!activated) {
                    this.add('-ability', pokemon, 'Mythical Presence', 'boost');
                    activated = true;
                }
                if (target.volatiles['substitute']) {
                    this.add('-immune', target, '[msg]');
                } else {
                    this.boost({spa: -1}, target, pokemon);
                }
            }
        },
        id: "majestic",
        name: "Majestic",
        rating: 3.5,
        num: 22.5,
    },
};
