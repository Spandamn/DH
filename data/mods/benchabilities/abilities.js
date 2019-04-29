'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {

	"confidenceboost": { // Machamp line, Victini, Plusle, Florges
		desc: "If an active teammate has a stat lowered, raise it's highest stat by one stage.",
		shortDesc: "If an active teammate has a stat lowered, raise it's highest stat by one stage.",
		onAfterEachBoost(boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			let statsLowered = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				let statName = 'atk';
				let bestStat = 0;
				/** @type {StatNameExceptHP} */
				let s;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			}
		},
		id: "confidenceboost",
		name: "Confidence Boost",
	},

	"protectivepowder": { // Vivillon, Cutiefly line
		shortDesc: "Allied Bug types use Powder on switch in.",
		onSwitchIn(source) { 
            if (source.hasType('Bug')) {
				this.useMove("Powder", source);
             }
		},
		id: "protectivepowder",
		name: "Protective Powder",
	},

	"arcticarmor": { // Walrein line, Lapras, Rotom-Frost, Kyurem
		shortDesc: "Allied Ice types summon Mist upon switching in. Aurora Veil now lasts 8 turns.", // Edit in Aurora Veil's moves.js code
		onSwitchIn(source) { 
			if (source.hasType('Ice')) {
				this.useMove("Mist", source);
			}
		},
		id: "arcticarmor",
		name: "Arctic Armor",
	},

	"heavyexpert": {
		shortDesc: "Allies' Rock and Steel-type moves have 100% base accuracy.",
		onAllyModifyMove(move) {
			if (move.type ==='Rock' || move.type === 'Steel') {
				move.accuracy = 100;
			}
		},
		id: "heavyexpert",
		name: "Heavy Expert",
	},
	"oceansblessing": { // Lumineon, Alomomola, Mantine, Manaphy, Phione
		shortDesc: "This Pokemon’s allies have the Aqua Ring effect added to them.",
		onSwitchIn(pokemon) { 
			pokemon.addVolatile("aquaring");
		},
		id: "oceansblessing",
		name: "Ocean's Blessing",
	},
	
	"spookyencounter": {
		shortDesc: "Allied Dark-types force the opponent to always be tormented.",
		onSwitchIn(pokemon) { 
			if (pokemon.hasType('Dark')) {
				for (const target of pokemon.side.foe.active) {
					target.addVolatile("torment");
				}
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasType('Dark')) {
				for (const target of pokemon.side.foe.active) {
					target.addVolatile('torment');
				}
			}
		},
	},
	"handoff": { // Aipom, Ambipom
		shortDesc: "When an ally consumes their held item, this pokemon gives its item to them.",
		onAfterUseItem(item, pokemon) {
			// if (pokemon !== this.effectData.target) return;
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			console.log( allyBench )
			for (let i = 0; i < 6; i++ ) {
				let pkmnInfo = allyBench[ i ]
				if ( pkmnInfo && pkmnInfo.ability === 'handoff' && pkmnInfo.item !== '' ) {
					pokemon.setItem( pkmnInfo.item )
					pkmnInfo.item = ''
					this.add('-ability', pokemon, 'Hand Off');
					this.add( '-message', pkmnInfo.name + ' gave its item to ' + pokemon.name + '!' )
					break
				}
			}
		},
		id: "handoff",
		name: "Hand Off",
	},
	"torrentialwill": { // Blastoise, Feraligatr, Swampert, Empoleon, Samurott, Simipour, Greninja, Primarina
		shortDesc: "Grass Pledge and Fire Pledge deal 30% more damage and summon the swamp or rainbow combo effects, respectively.",
		onBasePower(move) {
			if ( move.id === 'firepledge' || move.id === 'grasspledge' ){
				return this.chainModify( 1.3 )
			}
		},
		onSourceHit(target, source, move) {
			if ( move.id === 'firepledge' ){
				source.side.addSideCondition('waterpledge');
			}
			if ( move.id === 'grasspledge' ){
				target.side.addSideCondition('grasspledge');
			}
		},
		id: "torrentialwill",
		name: "Torrential Will",
	},
	"overgrowingwill": { // All Grass starters
		shortDesc: "Water Pledge and Fire Pledge deal 30% more damage and summon the swamp or inferno combo effects, respectively.",
		onBasePower(move) {
			if ( move.id === 'firepledge' || move.id === 'grasspledge' ){
				return this.chainModify( 1.3 )
			}
		},
		onSourceHit(target, source, move) {
			if ( move.id === 'firepledge' ){
				target.side.addSideCondition('firepledge');
			}
			if ( move.id === 'waterpledge' ){
				target.side.addSideCondition('grasspledge');
			}
		},
		id: "overgrowingwill",
		name: "Overgrowing Will",
	},
	"blazingwill": { // All Fire starters
		shortDesc: "Grass Pledge and Water Pledge deal 30% more damage and summon the inferno or rainbow combo effects, respectively.",
		onBasePower(move) {
			if ( move.id === 'firepledge' || move.id === 'grasspledge' ){
				return this.chainModify( 1.3 )
			}
		},
		onSourceHit(target, source, move) {
			if ( move.id === 'waterpledge' ){
				source.side.addSideCondition('waterpledge');
			}
			if ( move.id === 'grasspledge' ){
				target.side.addSideCondition('firepledge');
			}
		},
		id: "blazingwill",
		name: "Blazing Will",
	},
};

exports.BattleAbilities = BattleAbilities;
