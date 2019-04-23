'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {

"confidenceboost": { // Machamp line, Victini, Plusle, Florges
		desc: "If an active teammate has a stat lowered, raise it's highest stat by one stage.",
		shortDesc: "If an active teammate has a stat lowered, raise it's highest stat by one stage.",
		onAfterEachBoost(boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			let statsLowered = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				let statName = 'atk';
				let bestStat = 0;
				/** @type {StatNameExceptHP} */
				let s;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, source);
			}
		},
		id: "confidenceboost",
		name: "Confidence Boost",
	},

"protectivepowder": { // Vivillon, Cutiefly line
		shortDesc: "Allied Bug types use Powder on switch in.",
		onAllyStart: function(pokemon) { // onAllyStart: 
			for (const allyActive of pokemon.side.active) {
          if (allyActive.hasType('Bug') && !pokemon.active) {
			 this.useMove("Powder", pokemon);
            }
			}
		},
		id: "protectivepowder",
		name: "Protective Powder",
	},

"arcticarmor": { // Walrein line, Lapras, Rotom-Frost, Kyurem
		shortDesc: "Allied Ice types summon Mist upon switching in. Aurora Veil now lasts 8 turns.", // Edit in Aurora Veil's moves.js code
		onStart: function(source) { // onAllyStart: 
                    if (source.hasType('Ice')) {
			this.useMove("Mist", source);
                        }
		},
		id: "arcticarmor",
		name: "Arctic Armor",
	},



};

exports.BattleAbilities = BattleAbilities;
