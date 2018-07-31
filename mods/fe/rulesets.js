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
		onValidateSet: function (team, format) {
			let movetable={}
			for (const set of team) {
				let movespeed = "Extreme Speed";
				if (!movespeed) continue;
				if (movetable[movespeed]) {
			return [(set.name || set.species) + " Extreme Speed Clause."];
				}
				movetable[movespeed] = true;
			}
		},
},
  
 };

exports.BattleFormats = BattleFormats;
