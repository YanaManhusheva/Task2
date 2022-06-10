import App from '../../app';
import { createElement } from '../../helpers/domHelper';
import { showModal } from './modal'

export function showWinnerModal(fighter) {
  const winTitle = fighter.name;
  const winBodyElement = createElement({
    tagName:'div',
    className : 'modal-body'
  });

  winBodyElement.innerText = 'I won';
  showModal({
    title : winTitle,
    bodyElement : winBodyElement,
    onClose : () => {
      document.getElementById('root').innerHTML = '';
      App.startApp();
    }

  });
  // call showModal function 
}
