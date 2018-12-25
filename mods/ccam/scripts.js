'use strict';

exports.BattleScripts = {
  init: function() {
  this.modData('Learnsets', 'darmanitan').learnset.slackoff = ['7L1'];
  this.modData('Learnsets', 'sawsbuck').learnset.seasonalstrike = ['7L1'];
  this.modData('Learnsets', 'kyuremblack').learnset.freezedry = ['7L1'];
	  
	  this.modData('Pokedex', 'castform').baseStats['atk'] = 100;
	  this.modData('Pokedex', 'castformsunny').baseStats['atk'] = 100;
	  this.modData('Pokedex', 'castformrainy').baseStats['atk'] = 100;
	  this.modData('Pokedex', 'castformsnowy').baseStats['atk'] = 100;
	  
	  this.modData('Pokedex', 'castform').baseStats['def'] = 100;
	  this.modData('Pokedex', 'castformsunny').baseStats['def'] = 100;
	  this.modData('Pokedex', 'castformrainy').baseStats['def'] = 100;
	  this.modData('Pokedex', 'castformsnowy').baseStats['def'] = 100;
	  
	  this.modData('Pokedex', 'castform').baseStats['spa'] = 100;
	  this.modData('Pokedex', 'castformsunny').baseStats['spa'] = 100;
	  this.modData('Pokedex', 'castformrainy').baseStats['spa'] = 100;
	  this.modData('Pokedex', 'castformsnowy').baseStats['spa'] = 100;
	  
	  this.modData('Pokedex', 'castform').baseStats['spd'] = 100;
	  this.modData('Pokedex', 'castformsunny').baseStats['spd'] = 100;
	  this.modData('Pokedex', 'castformrainy').baseStats['spd'] = 100;
	  this.modData('Pokedex', 'castformsnowy').baseStats['spd'] = 100;
	  
	  this.modData('Pokedex', 'castform').baseStats['spe'] = 100;
	  this.modData('Pokedex', 'castformsunny').baseStats['spe'] = 100;
	  this.modData('Pokedex', 'castformrainy').baseStats['spe'] = 100;
	  this.modData('Pokedex', 'castformsnowy').baseStats['spe'] = 100;

  },
  };
