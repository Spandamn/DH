'use strict';

/**@type {{[k: string]: TemplateData}} */
let BattlePokedex = {

shucklemega: {
num: 213, 
species: "Shuckle-Mega", 
baseSpecies: "Shuckle", 
forme: "Mega", 
formeLetter: "M", 
types:["Bug", "Rock "],
baseStats: {hp: 20, atk: 110, def: 205, spa: 10, spd: 205, spe: 55}, 
abilities: {0: "Technician"}, 
weightkg: 20.5, 
evoLevel: 1,
}, 

};

exports.BattlePokedex = BattlePokedex;
