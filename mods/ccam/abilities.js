'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"timechime": {
		shortDesc: "On switch-in, this Pokemon summons Trick Room.",
		onStart: function(source) {
			this.useMove("Trick Room", source);
		},
		id: "timechime",
		name: "Time Chime",
	},
	"backmask": {
		shortDesc: "On switch-in, this Pokemon summons Inverse Room.",
		onStart: function(source) {
			this.useMove("Inverse Room", source);
		},
		id: "backmask",
		name: "Backmask",
	},
  	"magician": {// user has an immunity.
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function(source) {
			this.useMove("Magic Room", source);
		},
		id: "magician",
		name: "Magician",
	},
  	"cheatcode": {
		shortDesc: "On switch-in, this Pokemon summons Wonder Room.",
		onStart: function(source) {
			this.useMove("wonderroomm", source);
		},
		id: "cheatcode",
		name: "Cheat Code",
	},
	"zenmode": {
		desc: "If this Pokemon is a Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. If Darmanitan loses this Ability while in Zen Mode it reverts to Standard Mode immediately.",
		shortDesc: "If Darmanitan, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
		onStart: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
				pokemon.addVolatile('zenmode');
		},
		onEnd: function (pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			pokemon.formeChange('Darmanitan', this.effect, false, '[silent]');
		},
		effect: {
			onStart: function (pokemon) {
				if (pokemon.template.speciesid !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
			},
			onEnd: function (pokemon) {
				pokemon.formeChange('Darmanitan');
			},
		},
		id: "zenmode",
		name: "Zen Mode",
		rating: -1,
		num: 161,
	},
	"illuminate": {
		desc: "Intimidate for Evasion",
		shortDesc: "On switch-in, this Pokemon lowers the Evasion of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Illuminate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({eva: -1}, target, pokemon);
				}
			}
		},
		id: "illuminate",
		name: "Illuminate",
		rating: 3.5,
		num: 22,
	},
	"mudbath": {
		shortDesc: "On switch-in, this Pokemon summons Mud Sport.",
		onStart: function(source) {
			this.useMove("Mud Sport", source);
		},
		id: "mudbath",
		name: "Mud Bath",
	},
	"overflow": {
		shortDesc: "On switch-in, this Pokemon summons Water Sport.",
		onStart: function(source) {
			this.useMove("Water Sport", source);
		},
		id: "overflow",
		name: "Overflow",
	},
	"flowergift": {
		shortDesc: "Boosts Atk, SpA and Spe by 50% in Sun.",
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtjPriority: 5,
		onModifyAtk: function (spa, pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpePriority: 5,
		onModifySpe: function (spa, pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		id: "flowergift",
		name: "Flower Gift",
	},
	"mowdown": {
		shortDesc: "The user's moves deal Super Effective damage on Grass-types",
		onModifyMove: function(move) {
			move.onEffectiveness = function(typeMod, type) {
				if (type === 'Grass') return 1;
			};
		},
		id: "mowdown",
		name: "Mow Down",
	},
		"clearbody": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		id: "clearbody",
		name: "Clear Body",
		rating: 2,
		num: 29,
	},
	"whitesmoke": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: White Smoke", "[of] " + target);
		},
		id: "whitesmoke",
		name: "White Smoke",
		rating: 2,
		num: 73,
	},
	"fullmetalbody": {
		desc: "Prevents other Pokemon from lowering this Pokemon's stat stages. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Full Metal Body", "[of] " + target);
		},
		isUnbreakable: true,
		id: "fullmetalbody",
		name: "Full Metal Body",
		rating: 2,
		num: 230,
	},
};
exports.BattleAbilities = BattleAbilities;
