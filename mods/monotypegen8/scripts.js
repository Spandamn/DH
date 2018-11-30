'use strict';

let BattleScripts = {
	init: function () {
		this.modData('Learnsets', 'ampharos').learnset.energyball = ['7L1'];
		this.modData('Learnsets', 'ampharos').learnset.tailglow = ['7L1'];
		
		this.modData('Learnsets', 'pidgeot').learnset.focusblast = ['7L1'];
	},
};

exports.BattleScripts = BattleScripts;
