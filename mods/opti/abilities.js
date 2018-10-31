'use strict';

exports.BattleAbilities = {
"fluid": {
		shortDesc: "This Pokemon's Normal-type moves become Water type and Water-type moves cannot miss and ignore all protection",
		onModifyMovePriority: 8,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Water';
			}
			if (move.type === 'Water') { // Add protection break
				delete move.flags['protect'];
				move.breaksProtect = true;
				move.accuracy = true; 
			}
		},
		id: "fluid",
		name: "Fluid",
	},
	"jubileespirit": {
		shortDesc: "40% chance to raise this Pokemon's higher attacking stat after successfully hitting the foe with a Dance move.",
		onAfterMove: function (damage, target, source, move) {
			if (move && move.flags['dancer']) {
				if (this.randomChance(9, 10)) {
					let stat = 'atk';
				let bestStat = 0;
				for (let i in source.stats) {
					if (source.stats[i] > bestStat) {
						stat = i;
						bestStat = source.stats[i];
					}
				}
				this.boost({[stat]: 1}, source);
				}
			}
		},
		id: "jubileespirit",
		name: "Jubilee Spirit",
	},
};
