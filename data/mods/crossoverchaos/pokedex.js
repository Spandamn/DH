'use strict';

exports.BattlePokedex = {
	/* For pokemon with two abilities use
	   abilities: {0: "Ability1Name", H: "Ability2Name"},
	   For a pokemon with three abilities use
	   abilities: {0: "Ability1Name", 1: "Ability2Name", H: "Ability3Name"}, */
	
	kirby: {
		num: 6000001,
		species: "Kirby",
		types: ["Flying"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
		otherFormes: ["kirbybug", "kirbydark", "kirbydragon", "kirbyelectric", "kirbyfairy", "kirbyfighting", "kirbyfire", "kirbynormal", "kirbyghost", "kirbygrass", "kirbyground", "kirbyice", "kirbypoison", "kirbypsychic", "kirbyrock", "kirbysteel", "kirbywater"],
	},
	
	kirbybug: {
		num: 6000001,
		species: "Kirby-Bug",
		baseSpecies: "Kirby",
		forme: "Bug",
		formeLetter: "B",
		types: ["Flying", "Bug"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbydark: {
		num: 6000001,
		species: "Kirby-Dark",
		baseSpecies: "Kirby",
		forme: "Dark",
		formeLetter: "D",
		types: ["Flying", "Dark"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbydragon: {
		num: 6000001,
		species: "Kirby-Dragon",
		baseSpecies: "Kirby",
		forme: "Dragon",
		formeLetter: "D",
		types: ["Flying", "Dragon"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyelectric: {
		num: 6000001,
		species: "Kirby-Electric",
		baseSpecies: "Kirby",
		forme: "Electric",
		formeLetter: "E",
		types: ["Flying", "Electric"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyfairy: {
		num: 6000001,
		species: "Kirby-Fairy",
		baseSpecies: "Kirby",
		forme: "Fairy",
		formeLetter: "F",
		types: ["Flying", "Fairy"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyfighting: {
		num: 6000001,
		species: "Kirby-Fighting",
		baseSpecies: "Kirby",
		forme: "Fighting",
		formeLetter: "F",
		types: ["Flying", "Fighting"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyfire: {
		num: 6000001,
		species: "Kirby-Fire",
		baseSpecies: "Kirby",
		forme: "Fire",
		formeLetter: "F",
		types: ["Flying", "Fire"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyghost: {
		num: 6000001,
		species: "Kirby-Ghost",
		baseSpecies: "Kirby",
		forme: "Ghost",
		formeLetter: "G",
		types: ["Flying", "Ghost"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbygrass: {
		num: 6000001,
		species: "Kirby-Grass",
		baseSpecies: "Kirby",
		forme: "Grass",
		formeLetter: "G",
		types: ["Flying", "Grass"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyground: {
		num: 6000001,
		species: "Kirby-Ground",
		baseSpecies: "Kirby",
		forme: "Ground",
		formeLetter: "G",
		types: ["Flying", "Ground"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyice: {
		num: 6000001,
		species: "Kirby-Ice",
		baseSpecies: "Kirby",
		forme: "Ice",
		formeLetter: "I",
		types: ["Flying", "Ice"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbynormal: {
		num: 6000001,
		species: "Kirby-Normal",
		baseSpecies: "Kirby",
		forme: "Normal",
		formeLetter: "N",
		types: ["Flying", "Normal"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbypoison: {
		num: 6000001,
		species: "Kirby-Poison",
		baseSpecies: "Kirby",
		forme: "Poison",
		formeLetter: "P",
		types: ["Flying", "Poison"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbypsychic: {
		num: 6000001,
		species: "Kirby-Psychic",
		baseSpecies: "Kirby",
		forme: "Psychic",
		formeLetter: "P",
		types: ["Flying", "Psychic"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbyrock: {
		num: 6000001,
		species: "Kirby-Rock",
		baseSpecies: "Kirby",
		forme: "Rock",
		formeLetter: "R",
		types: ["Flying", "Rock"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbysteel: {
		num: 6000001,
		species: "Kirby-Steel",
		baseSpecies: "Kirby",
		forme: "Steel",
		formeLetter: "S",
		types: ["Flying", "Steel"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	kirbywater: {
		num: 6000001,
		species: "Kirby-Water",
		baseSpecies: "Kirby",
		forme: "Water",
		formeLetter: "W",
		types: ["Flying", "Water"],
		gender: "M",
		baseStats: {hp: 130, atk: 120, def: 80, spa: 120, spd: 80, spe: 70}, //"No holding back" version is 150/140/90/140/90/90
		abilities: {0: "Gluttony", H: "Dancer"},	
		heightm: 0.2,
		color: "Pink",
	},
	
	inkling: {
		num: 6000002,
		species: "Inkling", /* Splatoon */
		baseForme: "Squid",
		types: ["Poison"],
		baseStats: {hp: 70, atk: 60, def: 65, spa: 90, spd: 85, spe: 130},
		abilities: {0: "Inky Surge", H: "Soundproof"},
		otherFormes: ["inklingkid"],
	},
	
	inklingkid: {
		num: 6000002,
		species: "Inkling-Kid",
		baseSpecies: "Inkling",
		forme: "Kid",
		formeLetter: "K",
		types: ["Poison", "Normal"],
		baseStats: {hp: 80, atk: 90, def: 65, spa: 120, spd: 95, spe: 100},
		abilities: {0: "Inky Surge", H: "Soundproof"},
	},
	
	corrin: {
		num: 6000003, 
		species: "Corrin", /* Fire Emblem: Fates */
		baseForme: "Human",
		types:["Dragon", "Fighting"],
		baseStats: {hp: 90, atk: 125, def: 95, spa: 85, spd: 65, spe: 115}, 
		abilities: {0: "Dragon's Blood"},
		otherFormes: ["inklingkid"],
	},
	
	corrindragon: {
		num: 6000003,
		species: "Corrin-Dragon",
		baseSpecies: "Corrin",
		forme: "Dragon",
		formeLetter: "D",
		types: ["Dragon", "Water"],
		baseStats: {hp: 90, atk: 110, def: 130, spa: 140, spd: 115, spe: 75}, 
		abilities: {0: "Dragon's Blood"},
	},
	
	dedede: {
		num: 6000004, 
		species: "Dedede", /* Kirby */
		baseForme: "King",
		types: ["Normal", "Flying"],
		gender: "M",
		baseStats: {hp: 130, atk: 150, def: 110, spa: 70, spd: 70, spe: 70}, 
		abilities: {0: "Thick Fat", 1: "Gluttony", H: "Hammer Royale"},
		otherFormes: ["dededemasked"],
	},
	
	dededemasked: {
		num: 6000004,
		species: "Dedede-Masked",
		baseSpecies: "Dedede",
		forme: "Masked",
		formeLetter: "M",
		types: ["Electric", "Flying"],
		gender: "M",
		baseStats: {hp: 130, atk: 180, def: 130, spa: 80, spd: 80, spe: 100}, 
		abilities: {0: "Thick Fat", 1: "Gluttony", H: "Hammer Royale"},
	},
	
     
//    /* mario: {
// 		num: 6000001,
// 		species: "Salandit",
// 		types: [],
// 		baseStats: {hp: 48, atk: 44, def: 40, spa: 71, spd: 40, spe: 77},
// 		abilities: {0: "Corrosion", H: "Oblivious"},
// 	}, First three*/
	
// kirby: {
// 		num: 6000004,
// 		species: "Kirby",
// 		types: ["Fairy"],
// 		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
// 		abilities: {0: "Run Away"}, /* Copy Ability - This Pokemon copies the ability of the Pokemon that lands a move on it and gains a secondary typing that matches  */
// 	},
// 	shadowmewtwo: {
// 		num: 6000028,
// 		species: "Shadow Mewtwo", /* Pokken Tournament */
// 		types: ["Psychic"],
// 		gender: "N",
// 		baseStats: {hp: 86, atk: 130, def: 85, spa: 164, spd: 85, spe: 130},
// 		abilities: {0: "Burst Mode"},
// 		otherFormes: ["shadowmewtwoburst"],
// 	},
// 	shadowmewtwoburst: {
// 		num: 6000028,
// 		species: "Shadow Mewtwo-Burst",
// 		baseSpecies: "Shadow Mewtwo",
// 		forme: "Burst",
// 		formeLetter: "B",
// 		types: ["Psychic", "Fighting"],
// 		gender: "N",
// 		baseStats: {hp: 86, atk: 210, def: 85, spa: 174, spd: 85, spe: 140},
// 		abilities: {0: "Burst Mode"},
// 	},
// 	marisakirisame: {
// 		num: 6000029,
// 		species: "Marisa Kirisame", /* Touhou */
// 		types: ["Electric", "Psychic"],
// 		gender: "F",
// 		baseStats: {hp: 70, atk: 120, def: 60, spa: 150, spd: 80, spe: 120},
// 		abilities: {0: "Magician", 1: "Levitate", H: "Drizzle"},
// 	},
// 	deathwing: {
// 		num: 6000030,
// 		species: "Deathwing", /* World of Warcraft */
// 		types: ["Dragon", "Fire"],
// 		gender: "M",
// 		baseStats: {hp: 120, atk: 150, def: 100, spa: 140, spd: 100, spe: 90},
// 		abilities: {0: "Magma Armor"},
// 	},
// 	niko: {
// 		num: 6000031,
// 		species: "Niko", /* OneShot */
// 		types: ["Normal", "Ground"],
// 		gender: "N",
// 		baseStats: {hp: 82, atk: 95, def: 100, spa: 65, spd: 110, spe: 68},
// 		abilities: {0: "Sun Carrier", 1: "Technician", H: "Telepathy"},
// 	},
// 	waluigi: {
// 		num: 6000032,
// 		species: "Waluigi", /* Mario */
// 		types: ["Dark"],
// 		gender: "M",
// 		baseStats: {hp: 89, atk: 105, def: 85, spa: 101, spd: 91, spe: 122},
// 		abilities: {0: "Prankster", H: "Showoff"},
// 	},
// 	sayori: {
// 		num: 6000033,
// 		species: "Sayori", /* Doki Doki Literature Club */
// 		types: ["Normal", "Fairy"],
// 		gender: "F",
// 		baseStats: {hp: 115, atk: 85, def: 85, spa: 95, spd: 85, spe: 95},
// 		abilities: {0: "Natural Cure", H: "Depression"},
// 		otherFormes: ["sayorihanged"],
// 	},
// 	sayorihanged: {
// 		num: 6000033,
// 		species: "Sayori-Hanged",
// 		baseSpecies: "Sayori",
// 		forme: "Hanged",
// 		formeLetter: "H",
// 		types: ["Normal", "Fairy"],
// 		gender: "F",
// 		baseStats: {hp: 115, atk: 85, def: 85, spa: 95, spd: 85, spe: 95},
// 		abilities: {0: "Natural Cure", H: "Depression"},
// 	},
// 	samus: {
// 		num: 6000034,
// 		species: "Samus", /* Metroid */
// 		types: ["Electric", "Fighting"],
// 		gender: "F",
// 		baseStats: {hp: 105, atk: 80, def: 95, spa: 145, spd: 95, spe: 85},
// 		abilities: {0: "Mega Launcher", H: "Tinted Lens"},
// 	},
// 	demigodofrock: {
// 		num: 6000035,
// 		species: "Demigod of Rock", /* Guitar Hero: Warriors of Rock */
// 		types: ["Rock", "Ghost"],
// 		gender: "M",
// 		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
// 		abilities: {0: "Solid Rock"},
// 	},
// 	sora: {
// 		num: 6000036,
// 		species: "Sora", /* Sora and 100% Orange Juice */
// 		types: ["Fighting", "Flying"],
// 		gender: "F",
// 		baseStats: {hp: 75, atk: 120, def: 85, spa: 100, spd: 85, spe: 120},
// 		abilities: {0: "Motor Drive"},
// 	},
// 	bigrig: {
// 		num: 6000037,
// 		species: "Big Rig", /* Big Rigs: Over the Road Racing */
// 		baseForme: "Reversed",
// 		types: ["Ghost", "Fire"],
// 		gender: "N",
// 		baseStats: {hp: 85, atk: 70, def: 70, spa: 70, spd: 50, spe: 255},
// 		abilities: {0: "Champion"},
// 		otherFormes: ["bigrigforwards"],
// 	},
// 	bigrigforwards: {
// 		num: 6000037,
// 		species: "Big Rig-Forwards",
// 		baseSpecies: "Big Rig",
// 		forme: "Forwards",
// 		formeLetter: "F",
// 		types: ["Ghost", "Fire"],
// 		gender: "N",
// 		baseStats: {hp: 85, atk: 70, def: 70, spa: 70, spd: 50, spe: 55},
// 		abilities: {0: "Heavy Metal"},
// 	},
// 	norn: {
// 		num: 6000038,
// 		species: "Norn", /* Katamari Series */
// 		types: ["Ice", "Fairy"],
// 		gender: "M",
// 		baseStats: {hp: 100, atk: 117, def: 56, spa: 87, spd: 125, spe: 115},
// 		abilities: {0: "Refrigerate", H: "Pixilate"},
// 	},
// 	pepsiman: {
// 		num: 6000039,
// 		species: "Pepsiman", /* Pepsiman */
// 		types: ["Water", "Steel"],
// 		gender: "M",
// 		baseStats: {hp: 110, atk: 90, def: 115, spa: 80, spd: 50, spe: 155},
// 		abilities: {0: "Bulletproof", 1: "Speed Boost", H: "Refreshing Pepsi"},
// 	},
// 	heavy: {
// 		num: 6000040,
// 		species: "Heavy", /* Team Fortress 2 */
// 		types: ["Normal"],
// 		gender: "M",
// 		baseStats: {hp: 150, atk: 80, def: 99, spa: 80, spd: 99, spe: 77},
// 		abilities: {0: "Thick Fat"},
// 	},
// 	reimuhakurei: {
// 		num: 6000041,
// 		species: "Reimu Hakurei", /* Touhou */
// 		types: ["Flying", "Psychic"],
// 		gender: "F",
// 		baseStats: {hp: 110, atk: 80, def: 110, spa: 100, spd: 140, spe: 60},
// 		abilities: {0: "Super Luck", H: "Sacred Barrier"},
// 	},
// 	crow: {
// 		num: 6000042,
// 		species: "Crow", /* Brawl Stars */
// 		types: ["Poison", "Flying"],
// 		gender: "N",
// 		baseStats: {hp: 60, atk: 87, def: 53, spa: 117, spd: 53, spe: 130},
// 		abilities: {0: "Merciless", 1: "Early Bird", H: "Extra Toxic"},
// 	},
// 	shovelknight: {
//     num: 6000043,
//     species: "Shovel Knight", /* Shovel Knight */
//     types: ["Steel", "Ground"],
//     gender: "M",
//     baseStats: {hp: 60, atk: 120, def: 130, spa: 60, spd: 130, spe: 90},
//     abilities: {0: "Battle Armor"},
// },
// cuphead: {
//     num: 6000044,
//     species: "Cuphead", /* Cuphead */
//     types: ["Water", "Dark"],
//     gender: "M",
//     baseStats: {hp: 80, atk: 80, def: 60, spa: 120, spd: 60, spe: 100},
//     abilities: {0: "Soul-Heart"},
// },
// shantae: {
//     num: 6000045,
//     species: "Shantae", /* Shantae */
//     types: ["Psychic", "Normal"],
//     gender: "F",
//     baseStats: {hp: 100, atk: 120, def: 70, spa: 110, spd: 90, spe: 100},
//     abilities: {0: "Magic Guard"},
// },

// chainchomp: {
//     num: 6000046,
//     species: "Chain Chomp", /* Super Mario Bros */
//     types: ["Steel"],
//     gender: "M",
//     baseStats: {hp: 50, atk: 105, def: 185, spa: 55, spd: 75, spe: 20},
//     abilities: {0: "Strong Jaw", 1: "Steelworker", 2: "Unchained"},
// },
// isabelle: {
//     num: 6000047,
//     species: "Isabelle", /* Animal Crossing */
//     types: ["Normal"],
//     gender: "F",
//     baseStats: {hp: 100, atk: 55, def: 100, spa: 55, spd: 100, spe: 60},
//     abilities: {0: "Friend Guard", 1: "Flower Gift", 2: "Harvest"},
// },
// amaterasu: {
//     num: 6000048,
//     species: "Amaterasu", /* Ōkami */
//     types: ["Fire"],
//     gender: "F",
//     baseStats: {hp: 70, atk: 110, def: 80, spa: 120, spd: 90, spe: 130},
//     abilities: {0: "Astral Pouch"},
// },
// 	mario: {
//     num: 6000049,
//     species: "Mario", /* Super Mario Bros */
//     types: ["Normal", "Ground"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 120, def: 90, spa: 70, spd: 90, spe: 110},
//     abilities: {0: "Steelworker"},
// 	},
// mariofire: {
//     num: 6000049,
//     species: "Mario-Fire", /* Super Mario Bros */
//     types: ["Ground", "Fire"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 70, def: 85, spa: 140, spd: 85, spe: 100},
//     abilities: {0: "Steelworker"},
// 	},
// marioice: {
//     num: 6000049,
//     species: "Mario-Ice", /* Super Mario Bros */
//     types: ["Ground", "Ice"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 50, def: 115, spa: 160, spd: 115, spe: 40},
//     abilities: {0: "Steelworker"},  
// 	},
// mariopropeller: {
//     num: 6000049,
//     species: "Mario-Propeller", /* Super Mario Bros */
//     types: ["Normal", "Flying"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 140, def: 70, spa: 70, spd: 70, spe: 130},
//     abilities: {0: "Steelworker"},
// 	},
// sonic: { 
// 	 num: 6000050,
//     species: "Sonic", /* Sonic the Hedgehog */
//     types: ["Normal"],
//     gender: "M",
//     baseStats: {hp: 70, atk: 135, def: 60, spa: 95, spd: 60, spe: 150},
//     abilities: {0: "Speed Boost"},
// 	},
// sonicsuper: {
//     num: 6000050,
//     species: "Sonic-Super", /* Sonic the Hedgehog */
//     types: ["Flying", "Normal"],
//     gender: "M",
//     baseStats: {hp: 70, atk: 160, def: 60, spa: 160, spd: 60, spe: 160},
//     abilities: {0: "Aerilate"},
// 	},
	
};
