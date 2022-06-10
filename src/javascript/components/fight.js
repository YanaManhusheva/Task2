import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const playerOne = { 
      health : firstFighter.health,
      lastCriticalAttack : 0
    } ;
    const playerTwo = { 
      health : secondFighter.health,
      lastCriticalAttack : 0
    } ;

    const rightHealthBar = document.getElementById('right-fighter-indicator');
    const leftHealthBar = document.getElementById('left-fighter-indicator');
    rightHealthBar.style.width = '100%';
    leftHealthBar.style.width = '100%';
    
    const keyState = {
      PlayerOneAttack: false,
      PlayerOneBlock: false,
      PlayerTwoAttack: false,
      PlayerTwoBlock: false,
      PlayerOneCriticalHitCombination: [false, false, false],
      PlayerTwoCriticalHitCombination: [false, false, false]
    }
    const keyCodes = ['KeyA', 'KeyD', 'KeyJ', 'KeyL', 'KeyQ', 'KeyW', 'KeyE', 'KeyU', 'KeyI', 'KeyO'];

    const onKeyUp = (event) =>{
      if (!keyCodes.some(p => p === event.code)){
        return;
      }
      switch(event.code){
        case controls.PlayerOneAttack:
          keyState.PlayerOneAttack = false;
          break;
        case controls.PlayerOneBlock:
          keyState.PlayerOneBlock = false;
          break;
        case controls.PlayerTwoAttack:
          keyState.PlayerTwoAttack = false;
          break;
        case controls.PlayerTwoBlock:
          keyState.PlayerTwoBlock = false;
          break;
        case controls.PlayerOneCriticalHitCombination[0]:
          keyState.PlayerOneCriticalHitCombination[0] = false;
          break;
        case controls.PlayerOneCriticalHitCombination[1]:
          keyState.PlayerOneCriticalHitCombination[1] = false;
          break;
        case controls.PlayerOneCriticalHitCombination[2]:
          keyState.PlayerOneCriticalHitCombination[2] = false;
          break;
        case controls.PlayerTwoCriticalHitCombination[0]:
          keyState.PlayerTwoCriticalHitCombination[0] = false;
          break;
        case controls.PlayerTwoCriticalHitCombination[1]:
          keyState.PlayerTwoCriticalHitCombination[1] = false;
          break;
        case controls.PlayerTwoCriticalHitCombination[2]:
          keyState.PlayerTwoCriticalHitCombination[2] = false;
          break;
      }

    }
    const onKeyPress = (event) =>{
      if (!keyCodes.some(p => p === event.code)){
        return;
      }
      switch(event.code){
        case controls.PlayerOneAttack:
          keyState.PlayerOneAttack = true;
          break;
        case controls.PlayerOneBlock:
          keyState.PlayerOneBlock = true;
          break;
        case controls.PlayerTwoAttack:
          keyState.PlayerTwoAttack = true;
          break;
        case controls.PlayerTwoBlock:
          keyState.PlayerTwoBlock = true;
          break;
        case controls.PlayerOneCriticalHitCombination[0]:
          keyState.PlayerOneCriticalHitCombination[0] = true;
          break;
        case controls.PlayerOneCriticalHitCombination[1]:
          keyState.PlayerOneCriticalHitCombination[1] = true;
          break;
        case controls.PlayerOneCriticalHitCombination[2]:
          keyState.PlayerOneCriticalHitCombination[2] = true;
          break;
        case controls.PlayerTwoCriticalHitCombination[0]:
          keyState.PlayerTwoCriticalHitCombination[0] = true;
          break;
        case controls.PlayerTwoCriticalHitCombination[1]:
          keyState.PlayerTwoCriticalHitCombination[1] = true;
          break;
        case controls.PlayerTwoCriticalHitCombination[2]:
          keyState.PlayerTwoCriticalHitCombination[2] = true;
          break;
      }

      if(keyState.PlayerOneAttack){
        if(keyState.PlayerTwoBlock || keyState.PlayerOneBlock){
          return;
        }
        playerTwo.health -= getDamage(firstFighter, secondFighter);

        const currentWidth =  parseFloat(rightHealthBar.style.width.slice(0,-1));
        let damagePercentage = currentWidth - getDamage(firstFighter, secondFighter) / playerTwo.health * 100 ;
        if(damagePercentage <= 0){
          damagePercentage =0;
        }
        rightHealthBar.style.width = `${damagePercentage}%`
      }
      if(keyState.PlayerTwoAttack){
        if(keyState.PlayerOneBlock || keyState.PlayerTwoBlock){
          return;
        }
        playerOne.health -= getDamage(secondFighter, firstFighter);

        const currentWidth =  parseFloat(leftHealthBar.style.width.slice(0,-1));
        const damagePercentage = currentWidth - getDamage(secondFighter, firstFighter) / playerOne.health * 100 ;
        leftHealthBar.style.width = `${damagePercentage}%`
      }
      if(keyState.PlayerOneCriticalHitCombination.every(p=>p)){
        if((Date.now() - playerOne.lastCriticalAttack) / 10000 < 10) {return;}
        playerOne.lastCriticalAttack = Date.now();
        playerTwo.health -= firstFighter.attack *2

        const currentWidth =  parseFloat(rightHealthBar.style.width.slice(0,-1));
        const damagePercentage = currentWidth - firstFighter.attack *2 / playerTwo.health * 100 ;
        if(damagePercentage <= 0){
          damagePercentage =0;
        }
        rightHealthBar.style.width = `${damagePercentage}%`

      }
      if(keyState.PlayerTwoCriticalHitCombination.every(p=>p)){
        if((Date.now() - playerTwo.lastCriticalAttack) < 10000) { 
          console.log((Date.now() - playerTwo.lastCriticalAttack) / 10000)
          return;
        }
        playerTwo.lastCriticalAttack = Date.now();
        console.log(playerTwo.lastCriticalAttack)
        playerOne.health -= secondFighter.attack *2

        const currentWidth =  parseFloat(leftHealthBar.style.width.slice(0,-1));
        const damagePercentage = currentWidth - secondFighter.attack *2 / playerOne.health * 100 ;
        leftHealthBar.style.width = `${damagePercentage}%`
      }
      if(playerOne.health <= 0){
        RemoveHandler(onKeyPress,onKeyUp);
        resolve(secondFighter);
      }
      if(playerTwo.health <= 0){
        RemoveHandler(onKeyPress,onKeyUp);
        resolve(firstFighter);
      }
    }

  
    document.addEventListener('keypress', onKeyPress );
    document.addEventListener('keyup', onKeyUp );

    
    // resolve the promise with the winner when fight is over
  });
}

function RemoveHandler(onKeyPress,onKeyUp){
  document.removeEventListener('keypress', onKeyPress);
  document.removeEventListener('keyup', onKeyUp );
}

export function getDamage(attacker, defender) {
  const blockPower = getBlockPower(defender) ;
  const hitPower = getHitPower(attacker);
  return (blockPower > hitPower) ? 0 : hitPower - blockPower;
  // return damage
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() + 1);
  // return hit power
}

export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() + 1);
  
  // return block power
}
