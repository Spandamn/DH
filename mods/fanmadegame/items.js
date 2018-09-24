'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
shuckleite: { 
id: "shuckleite",
name: "Shuckleite", 
spritenum: 612, 
megaStone: "Shuckle-Mega", 
megaEvolves: "Shuckle",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Shuckle, this item allows it to Mega Evolve in battle.", 
},
};

exports.BattleItems = BattleItems;
