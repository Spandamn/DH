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
	  
	  this.modData('Pokedex', 'keldeo').baseStats['atk'] = 129;
	  this.modData('Pokedex', 'keldeo').baseStats['spa'] = 72;
	  
	  this.modData('Pokedex', 'basculin').types = ['Water', 'Fighting'];
	  this.modData('Pokedex', 'basculin').baseStats['atk'] = 112;
	  this.modData('Pokedex', 'basculin').baseStats['spe'] = 108;
	  
	  this.modData('Pokedex', 'basculinbluestriped').types = ['Water', 'Rock'];
	  this.modData('Pokedex', 'basculinbluestriped').baseStats['atk'] = 102;
	  this.modData('Pokedex', 'basculinbluestriped').baseStats['spe'] = 118;
	  
	  this.modData('Pokedex', 'kyuremblack').types = ['Ice', 'Electric'];
	  this.modData('Pokedex', 'kyuremwhite').types = ['Ice', 'Fire'];
	  
	  this.modData('Pokedex', 'cherrimsunshine').types = ['Grass', 'Fire'];
  },
  };
