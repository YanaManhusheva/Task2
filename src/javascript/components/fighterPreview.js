import { createElement } from '../helpers/domHelper';


export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if(!fighter){ return fighterElement ;  }
  const imgElement = createFighterImage(fighter);
  const fighterInfo = createElement({
    tagName: 'div',
    className : 'fighter-preview___info'
  });
  const healthIndicator = createElement({
    tagName: 'p',
  });
  const attackIndicator = createElement({
    tagName: 'p',
  });
  const nameIndicator = createElement({
    tagName: 'p',
    className : 'name__preview'
  });
  healthIndicator.innerText =` Health : ${fighter.health} `;
  attackIndicator.innerText =` Attack : ${fighter.attack} `;
  nameIndicator.innerText = `${fighter.name} `;
  fighterInfo.append(nameIndicator,healthIndicator,attackIndicator);
  fighterElement.append(imgElement, fighterInfo)
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}



export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
