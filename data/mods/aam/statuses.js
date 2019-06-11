'use strict';

/**@type {{[k: string]: PureEffectData}} */
let BattleStatuses = {
	"abilitydesolateland": {
		desc: "On switch-in, the weather becomes extremely harsh sunlight that prevents damaging Water-type moves from executing, in addition to all the effects of Sunny Day. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream or Primordial Sea.",
		shortDesc: "On switch-in, extremely harsh sunlight begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.setWeather('desolateland', source);
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'desolateland' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('desolateland')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		id: "desolateland",
		name: "Desolate Land",
		rating: 5,
		num: 190,
	},
	"abilityprimordialsea": {
		desc: "On switch-in, the weather becomes heavy rain that prevents damaging Fire-type moves from executing, in addition to all the effects of Rain Dance. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream or Desolate Land.",
		shortDesc: "On switch-in, heavy rain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.setWeather('primordialsea', source);
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'primordialsea' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('primordialsea')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		id: "primordialsea",
		name: "Primordial Sea",
		rating: 5,
		num: 189,
	},
};

exports.BattleStatuses = BattleStatuses;
