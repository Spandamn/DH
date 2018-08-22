'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"mythicalpresence": {
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
		id: "mythicalpresence",
		name: "Mythical Presence",
		rating: 3.5,
		num: 22.5,
	},
	
"forceofattraction": {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart: function (source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.template.speciesid === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.useMove('Gravity', source);
		},
		id: "forceofattraction",
		name: "Force of Attraction",
		rating: 4.5,
		num: 2.5,
	},

"extremebulk": {
		shortDesc: "If Gravity is active, this Pokemon's Attack is doubled.",
		onModifySpe: function (atk, pokemon) {
			if (this.pseudoWeather.gravity) {
				return this.chainModify(2);
			}
		},
		id: "extremebulk",
		name: "Extreme Bulk",
		rating: 3,
		num: 33.5,
	},
  };

exports.BattleAbilities = BattleAbilities;
