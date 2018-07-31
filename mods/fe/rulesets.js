// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js

'use strict';

/**@type {{[k: string]: FormatsData}} */
let BattleFormats = {
itemclause: {
		effectType: 'ValidatorRule',
		name: 'Extreme Speed Clause',
		desc: "Extreme Speed Clause: Only one Extreme Speed user per team.",
		onStart: function () {
			this.add('rule', 'Extreme Speed Clause: Only one Extreme Speed user per team.');
		},
		onValidateTeam: function (team, format) {
			let moves = [];
			if (set.moves) {
				let hasMove = {"Extreme Speed"};
				for (const moveId of set.moves) {
					let move = this.getMove(moveId);
					let moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(moveId);
				}
			}
			set.moves = moves;
		},
	},
  
 };

exports.BattleFormats = BattleFormats;
