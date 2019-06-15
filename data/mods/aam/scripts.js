'use strict';

exports.BattleScripts = {
	getEffect: function (name) {
		if (name && typeof name !== 'string') {
			return name;
		}
		let id = toID(name);
		if (id.startsWith('ability')) return Object.assign(Object.create(this.getAbility(id.slice(7))), {id});
		return Object.getPrototypeOf(this).getEffect.call(this, name);
	},
	suppressingWeather: function () {
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon && !pokemon.ignoringAbility() && pokemon.hasAbility('Cloud Nine')) {
					return true;
				}
			}
		}
		return false;
	},
	pokemon: {
		hasAbility: function (ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(ability => this.hasAbility(ability));
			ability = toID(ability);
			return this.ability === ability || !!this.volatiles['ability' + ability];
		},
	},
	dragIn (side, pos) {
		if (!pos) pos = 0;
		if (pos >= side.active.length) return false;
		const pokemon = this.getRandomSwitchable(side);
		if (!pokemon || pokemon.isActive) return false;
		pokemon.isActive = true;
		this.runEvent('BeforeSwitchIn', pokemon);
		if (side.active[pos]) {
			const oldActive = side.active[pos];
			if (!oldActive.hp) {
				return false;
			}
			if (!this.runEvent('DragOut', oldActive)) {
				return false;
			}
			this.runEvent('SwitchOut', oldActive);
			oldActive.illusion = null;
			this.singleEvent('End', this.getAbility(oldActive.ability), oldActive.abilityData, oldActive);
			if (oldActive.otherAbilities.length) {
				for (let i of oldactive.otherAbilities) {
					this.singleEvent('End', this.getAbility(i), oldActive.volatiles[i], oldActive.pokemon);
				}
			}
			oldActive.isActive = false;
			oldActive.isStarted = false;
			oldActive.usedItemThisTurn = false;
			oldActive.position = pokemon.position;
			pokemon.position = pos;
			side.pokemon[pokemon.position] = pokemon;
			side.pokemon[oldActive.position] = oldActive;
			this.cancelMove(oldActive);
			oldActive.clearVolatile();
		}
		side.active[pos] = pokemon;
		pokemon.activeTurns = 0;
		if (this.gen === 2) pokemon.draggedIn = this.turn;
		for (const moveSlot of pokemon.moveSlots) {
			moveSlot.used = false;
		}
		this.add('drag', pokemon, pokemon.getDetails);
		if (this.gen >= 5) {
			this.singleEvent('PreStart', pokemon.getAbility(), pokemon.abilityData, pokemon);
			this.runEvent('SwitchIn', pokemon);
			if (!pokemon.hp) return true;
			pokemon.isStarted = true;
			if (!pokemon.fainted) {
				this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
				this.singleEvent('Start', pokemon.getItem(), pokemon.itemData, pokemon);
			}
		} else {
			this.insertQueue({pokemon, choice: 'runSwitch'});
		}
		return true;
	},
	runAction (action) {
		// returns whether or not we ended in a callback
		switch (action.choice) {
		case 'start': {
			// I GIVE UP, WILL WRESTLE WITH EVENT SYSTEM LATER
			const format = this.getFormat();

			// Remove Pokémon duplicates remaining after `team` decisions.
			for (const side of this.sides) {
				side.pokemon = side.pokemon.slice(0, side.pokemonLeft);
			}

			if (format.teamLength && format.teamLength.battle) {
				// Trim the team: not all of the Pokémon brought to Preview will battle.
				for (const side of this.sides) {
					side.pokemon = side.pokemon.slice(0, format.teamLength.battle);
					side.pokemonLeft = side.pokemon.length;
				}
			}

			this.add('start');
			for (const side of this.sides) {
				for (let pos = 0; pos < side.active.length; pos++) {
					this.switchIn(side.pokemon[pos], pos);
				}
			}
			for (const pokemon of this.getAllPokemon()) {
				this.singleEvent('Start', this.getEffectByID(pokemon.speciesid), pokemon.speciesData, pokemon);
			}
			this.midTurn = true;
			break;
		}

		case 'move':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect, action.zmove);
			break;
		case 'megaEvo':
			this.runMegaEvo(action.pokemon);
			break;
		case 'beforeTurnMove': {
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('before turn callback: ' + action.move.id);
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return false;
			if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
			action.move.beforeTurnCallback.call(this, action.pokemon, target);
			break;
		}

		case 'event':
			// @ts-ignore - easier than defining a custom event attribute TBH
			this.runEvent(action.event, action.pokemon);
			break;
		case 'team': {
			action.pokemon.side.pokemon.splice(action.index, 0, action.pokemon);
			action.pokemon.position = action.index;
			// we return here because the update event would crash since there are no active pokemon yet
			return;
		}

		case 'pass':
			return;
		case 'instaswitch':
		case 'switch':
			if (action.choice === 'switch' && action.pokemon.status && this.data.Abilities.naturalcure) {
				this.singleEvent('CheckShow', this.getAbility('naturalcure'), null, action.pokemon);
			}
			if (action.pokemon.hp) {
				action.pokemon.beingCalledBack = true;
				const sourceEffect = action.sourceEffect;
				if (sourceEffect && sourceEffect.selfSwitch === 'copyvolatile') {
					action.pokemon.switchCopyFlag = true;
				}
				if (!action.pokemon.switchCopyFlag) {
					this.runEvent('BeforeSwitchOut', action.pokemon);
					if (this.gen >= 5) {
						this.eachEvent('Update');
					}
				}
				if (!this.runEvent('SwitchOut', action.pokemon)) {
					// Warning: DO NOT interrupt a switch-out if you just want to trap a pokemon.
					// To trap a pokemon and prevent it from switching out, (e.g. Mean Look, Magnet Pull)
					// use the 'trapped' flag instead.

					// Note: Nothing in BW or earlier interrupts a switch-out.
					break;
				}
			}
			action.pokemon.illusion = null;
			this.singleEvent('End', this.getAbility(action.pokemon.ability), action.pokemon.abilityData, action.pokemon);
			if (action.pokemon.otherAbilities.length) {
				for (let i of action.pokemon.otherAbilities) {
					this.singleEvent('End', this.getAbility(i), action.pokemon.volatiles[i], action.pokemon);
				}
			}
			if (!action.pokemon.hp && !action.pokemon.fainted) {
				// a pokemon fainted from Pursuit before it could switch
				if (this.gen <= 4) {
					// in gen 2-4, the switch still happens
					action.priority = -101;
					this.queue.unshift(action);
					this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
					break;
				}
				// in gen 5+, the switch is cancelled
				this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
				break;
			}
			if (action.target.isActive) {
				this.hint("A switch failed because the Pokémon trying to switch in is already in.");
				break;
			}
			this.switchIn(action.target, action.pokemon.position, action.sourceEffect);
			break;
		case 'runUnnerve':
			this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityData, action.pokemon);
			break;
		case 'runSwitch':
			this.runEvent('SwitchIn', action.pokemon);
			if (this.gen <= 2 && !action.pokemon.side.faintedThisTurn && action.pokemon.draggedIn !== this.turn) {
				this.runEvent('AfterSwitchInSelf', action.pokemon);
			}
			if (!action.pokemon.hp) break;
			action.pokemon.isStarted = true;
			if (!action.pokemon.fainted) {
				this.singleEvent('Start', action.pokemon.getAbility(), action.pokemon.abilityData, action.pokemon);
				action.pokemon.abilityOrder = this.abilityOrder++;
				this.singleEvent('Start', action.pokemon.getItem(), action.pokemon.itemData, action.pokemon);
			}
			if (this.gen === 4) {
				for (const foeActive of action.pokemon.side.foe.active) {
					foeActive.removeVolatile('substitutebroken');
				}
			}
			action.pokemon.draggedIn = null;
			break;
		case 'runPrimal':
			if (!action.pokemon.transformed) {
				this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemData, action.pokemon);
			}
			break;
		case 'shift': {
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			action.pokemon.activeTurns--;
			this.swapPosition(action.pokemon, 1);
			break;
		}

		case 'beforeTurn':
			this.eachEvent('BeforeTurn');
			break;
		case 'residual':
			this.add('');
			this.clearActiveMove(true);
			this.updateSpeed();
			this.residualEvent('Residual');
			this.add('upkeep');
			break;
		}

		// phazing (Roar, etc)
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon.forceSwitchFlag) {
					if (pokemon.hp) this.dragIn(pokemon.side, pokemon.position);
					pokemon.forceSwitchFlag = false;
				}
			}
		}

		this.clearActiveMove();

		// fainting

		this.faintMessages();
		if (this.ended) return true;

		// switching (fainted pokemon, U-turn, Baton Pass, etc)

		if (!this.queue.length || (this.gen <= 3 && ['move', 'residual'].includes(this.queue[0].choice))) {
			// in gen 3 or earlier, switching in fainted pokemon is done after
			// every move, rather than only at the end of the turn.
			this.checkFainted();
		} else if (action.choice === 'megaEvo' && this.gen >= 7) {
			this.eachEvent('Update');
			// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
			const moveIndex = this.queue.findIndex(queuedAction =>
				queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move'
			);
			if (moveIndex >= 0) {
				const moveAction = this.queue.splice(moveIndex, 1)[0];
				moveAction.mega = 'done';
				this.insertQueue(moveAction, true);
			}
			return false;
		} else if (this.queue.length && this.queue[0].choice === 'instaswitch') {
			return false;
		}

		const switches = this.sides.map(side =>
			side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
		);

		for (let i = 0; i < this.sides.length; i++) {
			if (switches[i] && !this.canSwitch(this.sides[i])) {
				for (const pokemon of this.sides[i].active) {
					pokemon.switchFlag = false;
				}
				switches[i] = false;
			}
		}

		for (const playerSwitch of switches) {
			if (playerSwitch) {
				if (this.gen >= 5) {
					this.eachEvent('Update');
				}
				this.makeRequest('switch');
				return true;
			}
		}

		this.eachEvent('Update');

		return false;
	},
};
