'use strict';

exports.BattleItems = {
    "shulkiumz": {
        id: "shulkiumz",
        name: "Shulkium Z",
        onTakeItem: false,
        zMove: "Monado Buster",
        zMoveFrom: "Sacred Sword",
        zMoveUser: ["Shulk"],
        desc: "If held by Shulk with Sacred Sword, he can use Monado Buster.",
    },
	 "christmasspirit": { 
		  id: "christmasspirit",
		  name: "Christmas Spirit",
		  spritenum: "184",
		  megaStone: "Smolitzer-Mega",
		  megaEvolves: "Smolitzer",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by the Smolitzer, this item allows it to Mega Evolve in battle."
	 },
    "siivagunniumz": {
        id: "siivagunniumz",
        name: "SiIvaGunniumZ",
        onTakeItem: false,
        zMove: "Stone Halation",
        zMoveFrom: "Snow Halation",
        zMoveUser: ["SiIvaGunner"],
        desc: "If held by SiIvaGunner with Snow Halation, he can use Stone Halation.",
    },
		 
};
