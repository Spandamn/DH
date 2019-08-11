'use strict';

exports.BattleScripts = {

  pokemon: {
    
	  getHealth = () => {
		  if (!this.hp) return {side: this.side.id, secret: '0 fnt', shared: '0 fnt'};
		  let secret = `${this.hp}/${this.maxhp}`;
		  let shared;
		  const ratio = ((!!('tippedarrowpsychic' in this.volatiles) ? 1 : this.hp) / this.maxhp);
		  if (this.battle.reportExactHP) {
		  	shared = secret;
		  } else if (this.battle.reportPercentages) {
		  	// HP Percentage Mod mechanics
		  	let percentage = Math.ceil(ratio * 100);
		  	if ((percentage === 100) && (ratio < 1.0)) {
		  		percentage = 99;
		  	}
		  	shared = `${percentage}/100`;
		  } else {
		  	// In-game accurate pixel health mechanics
		  	const pixels = Math.floor(ratio * 48) || 1;
		  	shared = `${pixels}/48`;
		  	if ((pixels === 9) && (ratio > 0.2)) {
		  		shared += 'y'; // force yellow HP bar
		  	} else if ((pixels === 24) && (ratio > 0.5)) {
		  		shared += 'g'; // force green HP bar
		  	}
		  }
		  if (this.status) {
		  	secret += ` ${this.status}`;
		  	shared += ` ${this.status}`;
		  }
		  return {side: this.side.id, secret, shared};
	  };  
  
	  isGrounded(negateImmunity: boolean = false) {
		  if ('gravity' in this.battle.field.pseudoWeather) return true;
		  if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
		  if ('smackdown' in this.volatiles) return true;
		  const item = (this.ignoringItem() ? '' : this.item);
		  if (item === 'ironball') return true;
		  // If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
		  if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
		  if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
		  if ('magnetrise' in this.volatiles) return false;
		  if ('cycloneslash' in this.volatiles) return false;
		  if ('telekinesis' in this.volatiles) return false;
		  return item !== 'airballoon';
	  },
  },

};
