// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js

'use strict';

/**@type {{[k: string]: FormatsData}} */
let BattleFormats = {
extremespeedclause: {
		effectType: 'ValidatorRule',
		name: 'Extreme Speed Clause',
		desc: "Extreme Speed Clause: Only one Extreme Speed user per team.",
		banlist: ['Extreme Speed > 1'],
		onStart: function () {
			this.add('rule', 'Extreme Speed Clause: Only one Extreme Speed user per team.');
		},
	},
  
 };

exports.BattleFormats = BattleFormats;
