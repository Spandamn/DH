'use strict';
exports.BattleAbilities = {
    "karmicretribution": {
        desc: "This Pokemon's damaging moves become multi-hit moves that hit four times. The second hit has its damage quartered. Does not affect moves that have multiple targets.",
        shortDesc: "This Pokemon's damaging moves hit four times.",
        onPrepareHit(source, target, move) {
            if (['iceball', 'rollout'].includes(move.id)) return;
            if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
                move.multihit = 4;
                move.multihitType = 'karmicretribution';
            } else if (move.multihit) {
                if (Array.isArray(move.multihit) && move.multihit[1] > 4) {
                    if (move.multihit[0] === 2 && move.multihit[1] === 5 && this.randomChance(2, 3)) {
                        move.multihit = 4;
                    } else {
                        move.multihit = [4, move.multihit[1]];
                    }
                } else move.multihit = 4;
            }
        },
        onSourceModifySecondaries(secondaries, target, source, move) {
            if (move.multihitType === 'karmicretribution' && move.id === 'secretpower' && move.hit < 4) {
                // hack to prevent accidentally suppressing King's Rock/Razor Fang
                return secondaries.filter(effect => effect.volatileStatus === 'flinch');
            }
        },
        id: "karmicretribution",
        name: "Karmic Retribution",
    },
};
