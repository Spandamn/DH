"use strict";

exports.BattleMovedex = {
	"swampysmackdown": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "Summons a swamp on the target's side of the field, quartering the Speed of any Pokemon on that side.",
		id: "swampysmackdown",
		isViable: true,
		name: "Swampy Smackdown",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Frenzy Plant", target);
		},
		onHit: function (target, source, move) {
			target.side.addSideCondition('grasspledge');
		},
		target: "normal",
		type: "Grass",
		isZ: "venusauriumz",
	},
	"intensifiedinferno": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "Summons a sea of flames on the target's side of the field, causing any non-Fire-types to lose 12.5% of their Maximum HP at the end of each turn.",
		id: "intensifiedinferno",
		isViable: true,
		name: "Intensified Inferno",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blast Burn", target);
		},
		onHit: function (target, source, move) {
			target.side.addSideCondition('firepledge');
		},
		target: "normal",
		type: "Fire",
		isZ: "charizardiumz",
	},
	"destructivedownpour": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "Summons a rainbow on the user's side of the field, doubling the chances of any secondaries.",
		id: "destructivedownpour",
		isViable: true,
		name: "Destructive Downpour",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Cannon", target);
		},
		onHit: function (target, source, move) {
			source.side.addSideCondition('waterpledge');
		},
		target: "normal",
		type: "Water",
		isZ: "blastoisiumz",
	},
	"hailhydra": {
		accuracy: true,
		basePower: 20,
		category: "Special",
		shortDesc: "5% chance to Freeze on each hit.",
		id: "hailhydra",
		isViable: true,
		name: "Hail Hydra",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Spear", target);
		},
		secondary: {
			chance: 5,
			status: 'frz',
		},
		multihit: 9,
		target: "normal",
		type: "Ice",
		isZ: "alolaninetaliumz",
	},
	"pursuingstrike": {
		accuracy: true,
		basePower: 180,
		basePowerCallback: function(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds or the target is protecting
			if (target.beingCalledBack || target.volatiles['stall']) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if a foe is switching out or protecting.",
		id: "pursuingstrike",
		isViable: true,
		name: "Pursuing Strike",
		pp: 1,
		priority: 0,
		beforeTurnCallback: function(pokemon, target) {
			target.side.addSideCondition('pursuingstrike', pokemon);
			if (!target.side.sideConditions['pursuingstrike'].sources) {
				target.side.sideConditions['pursuingstrike'].sources = [];
			}
			target.side.sideConditions['pursuingstrike'].sources.push(pokemon);
		},
		onModifyMove: function(move, source, target) {
			if (target && target.beingCalledBack) move.accuracy = true;
		},
		onTryHit: function(target, pokemon) {
			target.side.removeSideCondition('pursuingstrike');
		},
		effect: {
			duration: 1,
			onBeforeSwitchOut: function(pokemon) {
				this.debug('Pursuing Strike start');
				let sources = this.effectData.sources;
				let alreadyAdded = false;
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].moveThisTurn || sources[i].fainted) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuing Strike');
						alreadyAdded = true;
					}
					this.cancelMove(sources[i]);
					// Run through each decision in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (sources[i].canMegaEvo) {
						for (let j = 0; j < this.queue.length; j++) {
							if (this.queue[j].pokemon === sources[i] && this.queue[j].choice === 'megaEvo') {
								this.runMegaEvo(sources[i]);
								this.queue.splice(j, 1);
								break;
							}
						}
					}
					this.runMove('pursuingstrike', sources[i], this.getTargetLoc(pokemon, sources[i]));
				}
			},
		},
		target: "normal",
		type: "Dark",
		isZ: "tyraniumz",
	},
	"earthlycrush": {
		accuracy: true,
		basePower: 175,
		category: "Physical",
		shortDesc: "Stealth Rock is set up on both sides of the field. Becomes Rock-type instead against targets immune to Ground.",
		id: "earthlycrush",
		isViable: true,
		name: "Earthly Crush",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		onModifyMove: function(move, pokemon, target) {
			if (!target.isGrounded()) {
				move.type = 'Rock';
			}
		},
		sideCondition: 'stealthrock',
		self: {
			sideCondition: 'stealthrock',
		},
		target: "normal",
		type: "Ground",
		isZ: "hippowniumz",
	},
	"blossominglifedrain": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		shortDesc: "User recovers 66.7% of damage dealt.",
		id: "blossominglifedrain",
		isViable: true,
		name: "Blossoming Life Drain",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Giga Drain", target);
		},
		target: "normal",
		type: "Grass",
		drain: [2, 3],
		isZ: "abomasnowniumz",
	},
	"honingrocks": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Maximizes Speed and raises the user's Attack by 2.",
		id: "honingrocks",
		isViable: true,
		name: "Honing Rocks",
		pp: 1,
		priority: 0,
		boosts: {
			spe: 12,
			atk: 2,
		},
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		target: "self",
		type: "Rock",
		isZ: "gigaliumz",
	},
	"snowstormspinkle": {
		accuracy: true,
		basePower: 210,
		category: "Special",
		shortDesc: "Sets up Tailwind and Hail after dealing damage.",
		id: "snowstormspinkle",
		isViable: true,
		name: "Snowstorm Spinkle",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		self: {
			sideCondition: 'tailwind',
		},
		weather: 'hail',
		target: "normal",
		type: "Ice",
		isZ: "vanilliumz",
	},
	"infernoburst": {
		accuracy: true,
		basePower: 195,
		category: "Special",
		shortDesc: "100% chance to raise the user's Special Attack by 3.",
		id: "infernoburst",
		isViable: true,
		name: "Inferno Burst",
		pp: 1,
		priority: 0,
		flags: {},
		weather: 'sunnyday',
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 3,
				},
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "ninetalesiumz",
	},
	"blitzingtremor": {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Combines Fire in its type effectiveness.",
		id: "blitzingtremor",
		isViable: true,
		name: "Blitzing Tremor",
		pp: 1,
		priority: 0,
		flags: {},
		onEffectiveness: function (typeMod, type, move) {
			// @ts-ignore
			return typeMod + this.getEffectiveness('Fire', type);
		},
		secondary: {
			chance: 70,
			status: 'brn',
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
			this.add('-anim', source, "Earthly Crust", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "groudoniumz",
	},
	"pyrotechnics": { // Code The Additional Effect: Torkoal deals damage. Afterwards it gains +1 to each stat for each other Fire-type or Grass-type on its team without a status condition, and not fainted. -1 Priority. Fails if you have no other Fire-types or Grass-types on your team- similar checks on teammates to Beat Up. */
		accuracy: true,
		basePower: 180,
		category: "Special",
		id: "pyrotechnics",
		isViable: true,
		name: "Pyrotechnics ",
		pp: 1,
		priority: 0,
		flags: {},
		onHit: function(target, source, move) {
			source.addVolatile("pyrotechnics");
			for(let i=0;i<source.volatiles.pyrotechnics.index;i++) {
				this.boost({atk:1, def:1, spa:1, spd:1, spe:1}, source, source, source.volatiles.pyrotechnics);
			}
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.effectData.index = 0;
				while (pokemon.side.pokemon[this.effectData.index] !== pokemon &&
					(!pokemon.side.pokemon[this.effectData.index] ||
					pokemon.side.pokemon[this.effectData.index].fainted ||
					pokemon.side.pokemon[this.effectData.index].status)) {
					this.effectData.index++;
				}
			},
			onRestart: function (pokemon) {
				do {
					this.effectData.index++;
					if (this.effectData.index >= 6) break;
				} while (!pokemon.side.pokemon[this.effectData.index] || pokemon.side.pokemon[this.effectData.index].fainted || pokemon.side.pokemon[this.effectData.index].status);
			},
		},
		onAfterMove: function (pokemon) {
			pokemon.removeVolatile('pyrotechnics');
		},
		target: "normal",
		type: "Fire",
		isZ: "torkoaliumz",
	},
"depthstridedecimation": { // Add in such that this gets past Filter 
		accuracy: true,
		basePower: 210,
		category: "Special",
		shortDesc: "Ignores abilities that nullify Water-type moves and Desolate Land to hit.",
		id: "depthstridedecimation",
		isViable: true,
		name: "Depthstride Decimation",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		onModifyMove: function (move, pokemon, target) {
			if (target.hasAbility(['waterabsorb', 'stormdrain'])){
				move.ignoreAbility = true;
			}
		},
		//Ignoring Desolate Land will be coded into statuses.js.
		target: "normal",
		type: "Water",
		isZ: "kyogriumz",
	},
"inneraurafocus": { 
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Until the end of the next turn, user's moves crit. Raises all stats by 1 (not acc/eva)",
		id: "inneraurafocus",
		isViable: true,
		name: "Inner Aura Focus",
		pp: 1,
		priority: 0,
		flags: {},
		volatileStatus: 'laserfocus',
		self: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", source);
		},
		target: "self",
		type: "Normal",
		isZ: "lucariumz",
	},
"hyperwatershuriken": { 
		accuracy: true,
		basePower: 40,
		category: "Special",
		basePowerCallback: function (pokemon, target, move) {
			if (pokemon.template.species === 'Greninja-Ash' && pokemon.hasAbility('battlebond')) {
				move.breaksProtect = true;
				return move.basePower + 20;
			}
		},
		shortDesc: "Usually goes first. Hits 5 times in one turn. If used by Ash-Greninja, breaks protect and has 60 power per hit.",
		id: "hyperwatershuriken",
		isViable: true,
		name: "Hyper Water Shuriken",
		pp: 1,
		priority: 1,
		flags: {},
		multihit: 5,
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
		},
		target: "normal",
		type: "Water",
		isZ: "greninjiumz",
	},
		
"toadshypnospiral": { 
		accuracy: true,
		basePower: 0,
		category: "Special",
		id: "toadshypnospiral",
		isViable: true,
		name: "Toad's Hypno-Spiral",
		shortDesc: "Causes the target to fall asleep. Prevents the target from switching out.",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'slp',
		onHit: function (target, source, move) {
			if (!target.addVolatile('trapped', source, move, 'trapper')) {
				this.add('-fail', target);
			}
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hypnosis", target);
			this.add('-anim', source, "Mean Look", target);
		},
		target: "normal",
		type: "Psychic",
		isZ: "politoediumz",
	},
"highdeliverydeluge": { //Does damage and extends rain to 8 more turns. Basically allows Pelipper to have a Z-move while still being able to set up rain as if it had Damp Rock. */
		accuracy: true,
		basePower: 190,
		category: "Special",
		shortDesc: "Summons Rain Dance.",
		id: "highdeliverydeluge",
		isViable: true,
		name: "High Delivery Deluge",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		weather: 'RainDance',
		target: "normal",
		type: "Water",
		isZ: "pelipiumz",
	},
"sacredspiral": { 
		accuracy: true,
		basePower: 190,
		category: "Special",
		shortDesc: "Boosts user's Def/SpD/Spe by 1 after damage.",
		id: "sacredspiral",
		isViable: true,
		name: "Sacred Spiral",
		pp: 1,
		priority: 0,
		flags: {},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		target: "normal",
		type: "Water",
		isZ: "omastatiumz",
	},
	
	"omnitemporalblast": {
		accuracy: true,
		basePower: 150,
		category: "Special",
		desc: "Hits once, the damage calculated normally. Hits again two turns after this move is used, the damage calculated independently from the first hit. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits again two turns after being used.",
		id: "omnitemporalblast",
		name: "Omnitemporal Blast",
		pp: 1,
		priority: 0,
		flags: {},
		onHit: function (target, source) {
			target.side.addSideCondition('futuremove');
			if (!target.side.sideConditions['futuremove'].positions[target.position]) {
				target.side.sideConditions['futuremove'].positions[target.position] = {
					duration: 3,
					move: 'omnitemporalblast',
					source: source,
					moveData: {
						id: 'omnitemporalblast',
						name: "Omnitemporal Blast",
						accuracy: true,
						basePower: 150,
						category: "Special",
						priority: 0,
						flags: {},
						effectType: 'Move',
						isFutureMove: true,
						type: 'Psychic',
					},
				};
				this.add('-start', source, 'move: Omnitemporal Blast');
			}
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		isZ: "celebiumz",
	},
"ancientservantsascension": { 
		accuracy: true,
		basePower: 73,
		category: "Physical",
		id: "ancientservantsascension",
		shortDesc: "Suppresses user's ability before damage. Hits three times, the first hit Rock-type, the second Ice-type and the third Steel-type.",
		isViable: true,
		name: "Ancient Servant's Ascension",
		pp: 1,
		priority: 0,
		multihit: 3,
		multihitType: 'ancientservantsascension',
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Slide", target);
			this.add('-anim', source, "Icicle Crash", target);
			this.add('-anim', source, "Metal Burst", target);
		},
		onTryHit: function (target, pokemon) {
			// Ability is discarded before damage is calculated.
			if (target.runImmunity('Rock')) {
				pokemon.addVolatile('gastroacid');
			}
		},
		onModifyMove: function (move, pokemon) {
			let type = ['Rock', 'Ice', 'Steel'];
			move.type = type[move.hit - 1] || '???';
		},
		target: "normal",
		type: "Normal",
		isZ: "regigigiumz",
	},
	"celestialcurse": {
		accuracy: true,
		basePower: 0,
		damageCallback: function (pokemon, target) {
			if (target.hp > 0){
				return target.hp - 1;
			}
			return 1;
		},
		category: "Special",
		desc: "Deals damage to the target equal to its current HP minus one, but not less than 1 HP.",
		shortDesc: "Target is brought down to 1HP.",
		id: "celestialcurse",
		isViable: true,
		name: "Celestial Curse",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psystrike", target);
		},
		target: "normal",
		type: "Psychic",
		isZ: "gothitelliumz",
	},
};
