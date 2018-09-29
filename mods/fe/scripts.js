'use strict';

exports.BattleScripts = {
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
            //Compression protects Unleashed Giramini from Ground-type moves.
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
