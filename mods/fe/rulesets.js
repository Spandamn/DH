// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js

'use strict';

/**@type {{[k: string]: FormatsData}} */
let BattleFormats = {
extremespeedclause: {
		effectType: 'ValidatorRule',
		name: 'Extreme Speed Clause',
		desc: "Extreme Speed Clause: Only one Extreme Speed user per team.",
		onStart: function () {
			this.add('rule', 'Extreme Speed Clause: Only one Extreme Speed user per team.');
		},
		onValidateTeam: function (team, format) {
			let moveTable = {};
			for (const set of team) {
				let move = toId(set.move);
				if (move !== "extremespeed") continue;
				if (moveTable[move]) {
					return ["You are limited to one Extreme Speed user by Clause.", "(You have more than one)"];
				}
				moveTable[move] = true;
			}
		},
	},
  
 };

exports.BattleFormats = BattleFormats;
