'use strict';

/**@type {{[k: string]: EffectData}} */
let BattleStatuses = {
gravity: {
        name: 'Gravity',
        id: 'gravity',
        num: 0,
        effectType: 'Weather',
        duration: 5,
        durationCallback: function (source, effect) {
            if (source && source.hasItem('metalpowder')) {
                return 8;
            }
            return 5;
        },
 
        onStart: function () {
                this.add('-weather', 'Gravity');
                for (const pokemon of this.sides[0].active.concat(this.sides[1].active)) {
                    let applies = false;
                    if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
                        applies = true;
                        this.cancelMove(pokemon);
                        pokemon.removeVolatile('twoturnmove');
                    }
                    if (pokemon.volatiles['skydrop']) {
                        applies = true;
                        this.cancelMove(pokemon);
 
                        if (pokemon.volatiles['skydrop'].source) {
                            this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
                        }
                        pokemon.removeVolatile('skydrop');
                        pokemon.removeVolatile('twoturnmove');
                    }
                    if (pokemon.volatiles['magnetrise']) {
                        applies = true;
                        delete pokemon.volatiles['magnetrise'];
                    }
                    if (pokemon.volatiles['telekinesis']) {
                        applies = true;
                        delete pokemon.volatiles['telekinesis'];
                    }
                    if (applies) this.add('-activate', pokemon, 'move: Gravity');
                }
            },
        onBeforeMovePriority: 6,
        onBeforeMove: function (pokemon, target, move) {
            if (move.flags['gravity']) {
                this.add('cant', pokemon, 'move: Gravity', move);
                return false;
            }
        },
        onResidualOrder: 1,
        onResidual: function () {
            this.add('-weather', 'Gravity', '[upkeep]');
            this.eachEvent('Weather');
        },
        onEnd: function () {
            this.add('-weather', 'none');
        },
    },
    };

exports.BattleStatuses = BattleStatuses;
