'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"timechime": {
		shortDesc: "On switch-in, this Pokemon summons Trick Room.",
		onStart: function(source) {
			this.useMove("Trick Room", source);
		},
		id: "timechime",
		name: "Time Chime",
	},
	"backmask": {
		shortDesc: "On switch-in, this Pokemon summons Inverse Room.",
		onStart: function(source) {
			this.useMove("Inverse Room", source);
		},
		id: "backmask",
		name: "Backmask",
	},
  	"magician": {// user has an immunity.
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function(source) {
			this.useMove("Magic Room", source);
		},
		id: "magician",
		name: "Magician",
	},
  	"cheatcode": {
		shortDesc: "On switch-in, this Pokemon summons Wonder Room.",
		onStart: function(source) {
			this.useMove("wonderroomm", source);
		},
		id: "cheatcode",
		name: "Cheat Code",
	},
};
exports.BattleAbilities = BattleAbilities;
