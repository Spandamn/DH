'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"fluffycloak": {
		shortDesc: "This Pokemon's Sp. Defense is doubled.",
		onModifyDefPriority: 6,
		onModifyDef: function (spd) {
			return this.chainModify(2);
		},
		id: "fluffycloak",
		name: "Fluffy Cloak",
		rating: 3.5,
		num: 169,
	},
  
  };

exports.BattleAbilities = BattleAbilities;
