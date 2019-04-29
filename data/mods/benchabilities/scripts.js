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
		this.modData('Pokedex', 'ribombee').abilities['S'] = 'Protective Powder';
		
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
		this.modData('Pokedex', 'rhyhorn').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhydon').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'rhyperior').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'aron').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'lairon').abilities['S'] = 'Heavy Expert';
		this.modData('Pokedex', 'aggron').abilities['S'] = 'Heavy Expert';
		
		// Ocean's Blessing: Lumineon, Alomomola, Mantine, Manaphy, Phione
		this.modData('Pokedex', 'lumineon').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'alomomola').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'mantine').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'manaphy').abilities['S'] = 'Ocean\'s Blessing';
		this.modData('Pokedex', 'phione').abilities['S'] = 'Ocean\'s Blessing';
		
		// Spooky Encounter: Cacnea, Cacturne, Scraggy, Scrafty, Pinsir, Spiritomb
		this.modData('Pokedex', 'cacnea').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'cacturne').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'scraggy').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'scrafty').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'pinsir').abilities['S'] = 'Spooky Encounter';
		this.modData('Pokedex', 'spiritomb').abilities['S'] = 'Spooky Encounter';
		
		// Hand Off: Aipom, Ambipom,
		this.modData('Pokedex', 'aipom').abilities['S'] = 'Hand Off';
		this.modData('Pokedex', 'ambipom').abilities['S'] = 'Hand Off';
		
		// Torrential Will: Blastoise, Feraligatr, Swampert, Empoleon, Samurott, Simipour, Greninja, Primarina
		this.modData('Pokedex', 'blastoise').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'feraligatr').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'swampert').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'empoleon').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'samurott').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'simipour').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'greninja').abilities['S'] = 'Torrential Will';
		this.modData('Pokedex', 'primarina').abilities['S'] = 'Torrential Will';
		
		// Overgrowing Will: Venusaur, Meganium, Sceptile, Torterra, Serperior, Simisage, Chesnaught, Decidueye
		this.modData('Pokedex', 'venusaur').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'meganium').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'sceptile').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'torterra').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'serperior').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'simisage').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'chesnaught').abilities['S'] = 'Overgrowing Will';
		this.modData('Pokedex', 'decidueye').abilities['S'] = 'Overgrowing Will';
		
		// Blazing Will: Charizard, Typhlosion, Blaziken, Infernape, Emboar, Simisear, Delphox, Incineroar
		this.modData('Pokedex', 'charizard').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'typhlosion').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'blaziken').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'infernape').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'simisear').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'emboar').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'delphox').abilities['S'] = 'Blazing Will';
		this.modData('Pokedex', 'incineroar').abilities['S'] = 'Blazing Will';
	
		// Bomb Shelter: Natu, Xatu, Sigilyph, Chespin, Quilladin, Jangmo-o, Hakamo-o, Kommo-o, Octillery
		this.modData('Pokedex', 'natu').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'xatu').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'sigilyph').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'chespin').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'quilladin').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'jangmoo').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'hakamoo').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'kommoo').abilities['S'] = 'Bomb Shelter';
		this.modData('Pokedex', 'octillery').abilities['S'] = 'Bomb Shelter';
		
		// Guardian Angel: Ralts, Kirlia, Gardevoir, Togepi, Togetic, Togekiss
		this.modData('Pokedex', 'ralts').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'kirlia').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'gardevoir').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'togepi').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'togetic').abilities['S'] = 'Guardian Angel';
		this.modData('Pokedex', 'togekiss').abilities['S'] = 'Guardian Angel';
		
		// Retro Racer: Tauros, Dodrio, Aerodactyl
		this.modData('Pokedex', 'tauros').abilities['S'] = 'Retro Racer';
		this.modData('Pokedex', 'dodrio').abilities['S'] = 'Retro Racer';
		this.modData('Pokedex', 'aerodactyl').abilities['S'] = 'Retro Racer';
		
		// Omnimorph: Silvally
		this.modData('Pokedex', 'silvally').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallybug').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallydark').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallydragon').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyelectric').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyfairy').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyfighting').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyfire').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyflying').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyghost').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallygrass').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyground').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyice').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallypoison').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallypsychic').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallyrock').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallysteel').abilities['S'] = 'Omnimorph';
		this.modData('Pokedex', 'silvallypsychic').abilities['S'] = 'Omnimorph';
	}
};
