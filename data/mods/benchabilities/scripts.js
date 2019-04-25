'use strict';

exports.BattleScripts = {
	getEffect: function (name) {
		if (name && typeof name !== 'string') {
			return name;
		}
		let id = toId(name);
		if (id.startsWith('ability')) return Object.assign(Object.create(this.getAbility(id.slice(7))), {id});
		return Object.getPrototypeOf(this).getEffect.call(this, name);
	},
	suppressingWeather() {
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon && !pokemon.ignoringAbility() && pokemon.hasAbility('Cloud Nine')) {
					return true;
				}
			}
		}
		return false;
	},
	pokemon: {
		hasAbility: function (ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(ability => this.hasAbility(ability));
			ability = toId(ability);
			return this.ability === ability || !!this.volatiles['ability' + ability];
		},
	},
	init() {
		// Confidence Boost
		this.modData('Pokedex', 'victini').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'plusle').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'machop').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'machoke').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'machamp').abilities['S'] = 'Confidence Boost';
		this.modData('Pokedex', 'florges').abilities['S'] = 'Confidence Boost';
		
		// Protective Powder
		this.modData('Pokedex', 'vivillon').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'wurmple').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'cascoon').abilities['S'] = 'Protective Powder';
		this.modData('Pokedex', 'beautifly').abilities['S'] = 'Protective Powder';
		
		// Arctic Armor
		this.modData('Pokedex', 'spheal').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'sealeo').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'walrein').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'lapras').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'rotomfrost').abilities['S'] = 'Arctic Armor';
		this.modData('Pokedex', 'kyurem').abilities['S'] = 'Arctic Armor';
		
		// Heavy Expert: Onix, Steelix, Rhyhorn, Rhydon, Rhyperior, Aron, Lairon, Aggron			
		this.modData('Pokedex', 'onix').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'steelix').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'shyhorn').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhydon').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhyperior').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'aron').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'lairon').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'aggron').abilities['S'] = 'Heavy Expert';
	}
};
