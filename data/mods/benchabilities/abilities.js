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
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			}
		},
		id: "confidenceboost",
		name: "Confidence Boost",
	},

"protectivepowder": { // Vivillon, Cutiefly line
		shortDesc: "Allied Bug types use Powder on switch in.",
		onStart(source) { 
            if (source.hasType('Bug')) {
				this.useMove("Powder", source);
             }
		},
		id: "protectivepowder",
		name: "Protective Powder",
	},

"arcticarmor": { // Walrein line, Lapras, Rotom-Frost, Kyurem
		shortDesc: "Allied Ice types summon Mist upon switching in. Aurora Veil now lasts 8 turns.", // Edit in Aurora Veil's moves.js code
		onStart(source) { 
                    if (source.hasType('Ice')) {
								this.useMove("Mist", source);
                        }
		},
		id: "arcticarmor",
		name: "Arctic Armor",
	},

"heavyexpert": {
		shortDesc: "Allies' Rock and Steel-type moves have 100% base accuracy.",
		onAllyModifyMove(move) {
			if (move.type ==='Rock' || move.type === 'Steel') {
				move.accuracy = 100;
			}
		},
		id: "heavyexpert",
		name: "Heavy Expert",
	},
"oceansblessing": { // Lumineon, Alomomola, Mantine, Manaphy, Phione
		shortDesc: "This Pokemon’s allies have the Aqua Ring effect added to them.",
		onStart(pokemon) { 
				pokemon.addVolatile("aquaring");
		},
		id: "oceansblessing",
		name: "Ocean's Blessing",
	},
	
	"spookyencounter": {
		shortDesc: "Allied Dark-types force the opponent to always be tormented.",
		onSwitchIn(pokemon) { 
			for (const target of pokemon.side.foe.active) {
				target.addVolatile("torment");
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasType('Dark')) {
				for (const target of pokemon.side.foe.active) {
				target.addVolatile('torment');
				}
			}
		},
	},
};

exports.BattleAbilities = BattleAbilities;
