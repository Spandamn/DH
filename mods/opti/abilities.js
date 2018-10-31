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
		onAfterMove: function (pokemon, move) {
			for (const source of pokemon.side.active) {
			if (move && move.flags['dance']) {
				if (this.randomChance(9, 10)) {
					source.boost({atk: 1});
				}
			}
			}
		},
		id: "jubileespirit",
		name: "Jubilee Spirit",
	},
};
