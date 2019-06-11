'use strict';

/**@type {{[k: string]: PureEffectData}} */
let BattleAbilities = {
	"desolateland": {
		inherit: true,
		onStart(source) {
			this.field.setWeather('desolateland', source);
		},
	},
	"primordialsea": {
		inherit: true,
		onStart(source) {
			this.field.setWeather('primordialsea', source);
		},
	},
};

exports.BattleAbilities = BattleAbilities;
