'use strict';

exports.BattleScripts = {
// 	useMoveInner: function (move, pokemon, target, sourceEffect, zMove) {
// 		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
// 		move = this.getMoveCopy(move);
// 		if (zMove && move.id === 'weatherball') {
// 			let baseMove = move;
// 			this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
// 			move = this.getZMoveCopy(move, pokemon);
// 			if (move.type !== 'Normal') sourceEffect = baseMove;
// 		} else if (zMove || (move.category !== 'Status' && sourceEffect && sourceEffect.isZ && sourceEffect.id !== 'instruct')) {
// 			move = this.getZMoveCopy(move, pokemon);
// 		}
// 		if (this.activeMove) {
// 			move.priority = this.activeMove.priority;
// 			if (!move.hasBounced) move.pranksterBoosted = this.activeMove.pranksterBoosted;
// 		}
// 		let baseTarget = move.target;
// 		if (!target && target !== false) target = this.resolveTarget(pokemon, move);
// 		if (move.target === 'self' || move.target === 'allies') {
// 			target = pokemon;
// 		}
// 		if (sourceEffect) move.sourceEffect = sourceEffect.id;
// 		let moveResult = false;

// 		this.setActiveMove(move, pokemon, target);

// 		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
// 		if (baseTarget !== move.target) {
// 			// Target changed in ModifyMove, so we must adjust it here
// 			// Adjust before the next event so the correct target is passed to the
// 			// event
// 			target = this.resolveTarget(pokemon, move);
// 		}
// 		move = this.runEvent('ModifyMove', pokemon, target, move, move);
// 		if (baseTarget !== move.target) {
// 			// Adjust again
// 			target = this.resolveTarget(pokemon, move);
// 		}
// 		if (!move || pokemon.fainted) {
// 			return false;
// 		}

// 		let attrs = '';

// 		if (move.flags['charge'] && !pokemon.volatiles[move.id]) {
// 			attrs = '|[still]'; // suppress the default move animation
// 		}

// 		let movename = move.name;
// 		if (move.id === 'hiddenpower') movename = 'Hidden Power';
// 		if (sourceEffect) attrs += '|[from]' + this.getEffect(sourceEffect);
// 		if (zMove && move.isZ === true) {
// 			attrs = '|[anim]' + movename + attrs;
// 			movename = 'Z-' + movename;
// 		}
// 		this.addMove('move', pokemon, movename, target + attrs);

// 		if (zMove && move.category !== 'Status') {
// 			this.attrLastMove('[zeffect]');
// 		} else if (zMove && move.zMoveBoost) {
// 			// @ts-ignore
// 			this.boost(move.zMoveBoost, pokemon, pokemon, {id: 'zpower'});
// 		} else if (zMove && move.zMoveEffect === 'heal') {
// 			// @ts-ignore
// 			this.heal(pokemon.maxhp, pokemon, pokemon, {id: 'zpower'});
// 		} else if (zMove && move.zMoveEffect === 'healreplacement') {
// 			move.self = {sideCondition: 'healreplacement'};
// 		} else if (zMove && move.zMoveEffect === 'clearnegativeboost') {
// 			let boosts = {};
// 			for (let i in pokemon.boosts) {
// 				if (pokemon.boosts[i] < 0) {
// 					boosts[i] = 0;
// 				}
// 			}
// 			pokemon.setBoost(boosts);
// 			this.add('-clearnegativeboost', pokemon, '[zeffect]');
// 		} else if (zMove && move.zMoveEffect === 'redirect') {
// 			// @ts-ignore
// 			pokemon.addVolatile('followme', pokemon, {id: 'zpower'});
// 		} else if (zMove && move.zMoveEffect === 'crit2') {
// 			// @ts-ignore
// 			pokemon.addVolatile('focusenergy', pokemon, {id: 'zpower'});
// 		} else if (zMove && move.zMoveEffect === 'curse') {
// 			if (pokemon.hasType('Ghost')) {
// 				// @ts-ignore
// 				this.heal(pokemon.maxhp, pokemon, pokemon, {id: 'zpower'});
// 			} else {
// 				// @ts-ignore
// 				this.boost({atk: 1}, pokemon, pokemon, {id: 'zpower'});
// 			}
// 		}

// 		if (target === false) {
// 			this.attrLastMove('[notarget]');
// 			this.add('-notarget');
// 			if (move.target === 'normal') pokemon.isStaleCon = 0;
// 			return false;
// 		}

// 		let targets = pokemon.getMoveTargets(move, target);

// 		if (!sourceEffect || sourceEffect.id === 'pursuit') {
// 			let extraPP = 0;
// 			for (const source of targets) {
// 				let ppDrop = this.runEvent('DeductPP', source, pokemon, move);
// 				if (ppDrop !== true) {
// 					extraPP += ppDrop || 0;
// 				}
// 			}
// 			if (extraPP > 0 && !['calamity', 'diamondarmor'].includes(pokemon.getAbility())) {
// 				pokemon.deductPP(move, extraPP);
//					if (pokemon.hasAbility('powerdrain')){
// 					source.trySetStatus('par', pokemon);
// 				}
// 			}
// 		}

// 		if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
// 			!this.runEvent('TryMove', pokemon, target, move)) {
// 			move.mindBlownRecoil = false;
// 			return false;
// 		}

// 		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

// 		if (move.ignoreImmunity === undefined) {
// 			move.ignoreImmunity = (move.category === 'Status');
// 		}

// 		if (move.selfdestruct === 'always') {
// 			this.faint(pokemon, pokemon, move);
// 		}

// 		/**@type {number | false} */
// 		let damage = false;
// 		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
// 			damage = this.tryMoveHit(target, pokemon, move);
// 			if (damage || damage === 0 || damage === undefined) moveResult = true;
// 		} else if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes') {
// 			if (!targets.length) {
// 				this.attrLastMove('[notarget]');
// 				this.add('-notarget');
// 				return false;
// 			}
// 			if (targets.length > 1) move.spreadHit = true;
// 			let hitTargets = [];
// 			for (const source of targets) {
// 				let hitResult = this.tryMoveHit(source, pokemon, move);
// 				if (hitResult || hitResult === 0 || hitResult === undefined) {
// 					moveResult = true;
// 					hitTargets.push(source.toString().substr(0, 3));
// 				}
// 				if (damage !== false) {
// 					damage += hitResult || 0;
// 				} else {
// 					damage = hitResult;
// 				}
// 			}
// 			if (move.spreadHit) this.attrLastMove('[spread] ' + hitTargets.join(','));
// 		} else {
// 			target = targets[0];
// 			let lacksTarget = target.fainted;
// 			if (!lacksTarget) {
// 				if (move.target === 'adjacentFoe' || move.target === 'adjacentAlly' || move.target === 'normal' || move.target === 'randomNormal') {
// 					lacksTarget = !this.isAdjacent(target, pokemon);
// 				}
// 			}
// 			if (lacksTarget && (!move.flags['charge'] || pokemon.volatiles['twoturnmove'])) {
// 				this.attrLastMove('[notarget]');
// 				this.add('-notarget');
// 				if (move.target === 'normal') pokemon.isStaleCon = 0;
// 				return false;
// 			}
// 			damage = this.tryMoveHit(target, pokemon, move);
// 			if (damage || damage === 0 || damage === undefined) moveResult = true;
// 		}
// 		// @ts-ignore
// 		if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
// 		if (!pokemon.hp) {
// 			this.faint(pokemon, pokemon, move);
// 		}

// 		if (!moveResult) {
// 			this.singleEvent('MoveFail', move, null, target, pokemon, move);
// 			return false;
// 		}

// 		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
// 			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
// 			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
// 		}
// 		return true;
// 	},
    canUltraBurst: function(pokemon) {
        if (pokemon.getItem().id === 'ultranecroziumz') {
            switch (pokemon.baseTemplate.species) {
                case 'Necrozma-Dusk-Mane':
                case 'Necrozma-Dawn-Wings':
                    return "Necrozma-Ultra";
                case 'Necrynx':
                    return "Necrynx-Ultra";
                case 'Necroqua':
                    return "Necroqua-Ultra";
                case 'Necrozerain':
                    return "Necrozerain-Ultra";
                case 'Necropur':
                    return "Necropur-Beautiful";
                case 'Lampara':
                    return "Lampara-De-Lava";
                case 'Chazma':
                    return "Chazma-Hatched";
                case 'Smolitzer':
                    return "Smolitzer-Ultra";
                case 'Necrotune':
                    return "Necrotune-Ultra";
                case 'Nut':
                    return "Ultra Burst Nut";
            }
        }
        return null;
    },

    // BattlePokemon scripts, which should override the other things.
    pokemon: {
        isGrounded(negateImmunity = false) {
            if ('gravity' in this.battle.pseudoWeather) return true;
            if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
            if ('smackdown' in this.volatiles) return true;
            let item = (this.ignoringItem() ? '' : this.item);
            if (item === 'ironball') return true;
            // If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
            if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
            if ((this.hasAbility('levitate') || this.hasAbility('airraider') || this.hasAbility('magneticfield') || this.hasAbility('galelevitation') || this.hasAbility('floatinggrounds') || this.hasAbility('turborise')) && !this.battle.suppressingAttackEvents()) return null;
            //Compression protects Unleashed Giramini from Ground-type moves, but not Captive.
            if (this.hasAbility('compression') && this.template.species === 'Giramini-Unleashed' && !this.battle.suppressingAttackEvents()) return null;
            if ('magnetrise' in this.volatiles) return false;
            if ('telekinesis' in this.volatiles) return false;
            return item !== 'airballoon';
        },

        setStatus(status, source = null, sourceEffect = null, ignoreImmunities = false) {
            if (!this.hp) return false;
            status = this.battle.getEffect(status);
            if (this.battle.event) {
                if (!source) source = this.battle.event.source;
                if (!sourceEffect) sourceEffect = this.battle.effect;
            }

            if (this.status === status.id) {
                if (sourceEffect && sourceEffect.status === this.status) {
                    this.battle.add('-fail', this, this.status);
                } else if (sourceEffect && sourceEffect.status) {
                    this.battle.add('-fail', this);
                }
                return false;
            }

            if (!ignoreImmunities && status.id && !(source && (source.hasAbility('ailmentmaster') || ((source.hasAbility('corrosion') || source.hasAbility('poisonpores')) && ['tox', 'psn'].includes(status.id)))) && !(sourceEffect && sourceEffect.effectType === 'Move' && sourceEffect.id === 'thundervirus')) {
                // the game currently never ignores immunities
                if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
                    this.battle.debug('immune to status');
                    if (sourceEffect && sourceEffect.status) this.battle.add('-immune', this, '[msg]');
                    return false;
                }
            }
            let prevStatus = this.status;
            let prevStatusData = this.statusData;
            if (status.id) {
                let result = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
                if (!result) {
                    this.battle.debug('set status [' + status.id + '] interrupted');
                    return result;
                }
            }
            this.status = status.id;
            this.statusData = {
                id: status.id,
                target: this
            };
            if (source) this.statusData.source = source;
            if (status.duration) {
                this.statusData.duration = status.duration;
            }
            if (status.durationCallback) {
                this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
            }

            if (status.id && !this.battle.singleEvent('Start', status, this.statusData, this, source, sourceEffect)) {
                this.battle.debug('status start [' + status.id + '] interrupted');
                // cancel the setstatus
                this.status = prevStatus;
                this.statusData = prevStatusData;
                return false;
            }
            if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
                return false;
            }
            return true;
        },
        ignoringItem() {
            return !!((this.battle.gen >= 5 && !this.isActive) || ((this.hasAbility('klutz') || this.hasAbility('carelessforce') || this.volatiles['engarde']) && !this.getItem().ignoreKlutz) || this.volatiles['embargo'] || this.battle.pseudoWeather['magicroom']);
        },
    },
};
