'use strict';

/**@type {{[k: string]: PureEffectData}} */
let BattleAbilities = {
	"desolateland": {
		inherit: true,
		onStart: function (source) {
			this.field.setWeather('desolateland', source);
		},
	},
	"primordialsea": {
		inherit: true,
		onStart: function (source) {
			this.field.setWeather('primordialsea', source);
		},
	},
};

exports.BattleAbilities = BattleAbilities;
