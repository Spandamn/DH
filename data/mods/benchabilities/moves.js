'use strict';

exports.BattleMovedex = {
	"dreameater": {
		num: 138,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "The target is unaffected by this move unless it is asleep. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User gains 1/2 HP inflicted. Sleeping target only.",
		id: "dreameater",
		name: "Dream Eater",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onTryHit(target) {
			let battle = target.battle;
			if ( pokemon.status !== 'slp' 
					&& !pokemon.hasAbility('comatose') 
					&& ( !battle.benchPokemon.getPKMNInfo( 'hibernation', pokemon.side) 
						|| ! pokemon.types.includes( "Normal" ))) 
			{
				this.add('-immune', target);
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 180,
		contestType: "Clever",
	},
	"hex": {
		num: 506,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			let battle = target.battle;
			if ( target.status 
				|| target.hasAbility('comatose') 
				|| ( battle.benchPokemon.getPKMNInfo( 'hibernation', target.side )
					&& target.types.includes( "Normal" ))) 
			{
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		desc: "Power doubles if the target has a major status condition.",
		shortDesc: "Power doubles if the target has a status ailment.",
		id: "hex",
		isViable: true,
		name: "Hex",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Clever",
	},
	"nightmare": {
		num: 171,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn as long as it is asleep. This move does not affect the target unless it is asleep. The effect ends when the target wakes up, even if it falls asleep again in the same turn.",
		shortDesc: "A sleeping target is hurt by 1/4 max HP per turn.",
		id: "nightmare",
		name: "Nightmare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'nightmare',
		effect: {
			noCopy: true,
			onStart(pokemon) {
				let battle = pokemon.battle;
				if ( pokemon.status !== 'slp' 
					&& !pokemon.hasAbility('comatose') 
					&& ( !battle.benchPokemon.getPKMNInfo( 'hibernation', pokemon.side) 
						|| ! pokemon.types.includes( "Normal" ))) 
				{
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.maxhp / 4);
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMoveBoost: {spa: 1},
		contestType: "Clever",
	},
	"rest": {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user falls asleep for the next two turns and restores all of its HP, curing itself of any major status condition in the process. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
		shortDesc: "User sleeps 2 turns and restores HP and status.",
		id: "rest",
		isViable: true,
		name: "Rest",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			let battle = pokemon.battle;
			if ( pokemon.status !== 'slp' 
				&& !pokemon.hasAbility('comatose') 
				&& ( !battle.benchPokemon.getPKMNInfo( 'hibernation', pokemon.side) 
					|| ! pokemon.types.includes( "Normal" ))) 
			{
				return;
			}
			this.add('-fail', pokemon);
			return null;
		},
		onHit(target) {
			if (!target.setStatus('slp')) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); //Aeshetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"sleeptalk": {
		num: 214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Assist, Beak Blast, Belch, Bide, Celebrate, Chatter, Copycat, Focus Punch, Hold Hands, Me First, Metronome, Mimic, Mirror Move, Nature Power, Shell Trap, Sketch, Sleep Talk, Struggle, Uproar, any two-turn move, or any Z-Move.",
		shortDesc: "User must be asleep. Uses another known move.",
		id: "sleeptalk",
		isViable: true,
		name: "Sleep Talk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTryHit(pokemon) {
			let battle = pokemon.battle;
			if ( pokemon.status !== 'slp' 
				&& !pokemon.hasAbility('comatose') 
				&& ( !battle.benchPokemon.getPKMNInfo( 'hibernation', pokemon.side) 
					|| ! pokemon.types.includes( "Normal" )))
			{
				return false;
			}
		},
		onHit(pokemon) {
			let moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const move = moveSlot.id;
				const noSleepTalk = [
					'assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'uproar',
				];
				if (move && !(noSleepTalk.includes(move) || this.getMove(move).flags['charge'] || (this.getMove(move).isZ && this.getMove(move).basePower !== 1))) {
					moves.push(move);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, pokemon);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'crit2',
		contestType: "Cute",
	},
	"snore": {
		num: 173,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Has a 30% chance to flinch the target. Fails if the user is not asleep.",
		shortDesc: "User must be asleep. 30% chance to flinch target.",
		id: "snore",
		name: "Snore",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		sleepUsable: true,
		onTryHit(target, source) {
			let battle = source.battle
			if ( source.status !== 'slp' 
				&& !source.hasAbility('comatose') 
				&& ( !battle.benchPokemon.getPKMNInfo( 'hibernation', source.side) 
					|| ! source.types.includes( "Normal" )))
			{
				return false;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		zMovePower: 100,
		contestType: "Cute",
	},
	"wakeupslap": {
		num: 358,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			let battle = pokemon.battle
			if (target.status === 'slp' || target.hasAbility('comatose') || battle.benchPokemon.getPKMNInfo( 'hibernation', target.side )) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		desc: "Power doubles if the target is asleep. If the user has not fainted, the target wakes up.",
		shortDesc: "Power doubles if target is asleep, and wakes it.",
		id: "wakeupslap",
		name: "Wake-Up Slap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 140,
		contestType: "Tough",
	},
};
