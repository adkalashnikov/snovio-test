import './styles/index.scss'
import initModal from './js/components/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTriggers = document.querySelectorAll('.pricing-card__btn');

    if(modalTriggers) {
        [...modalTriggers].forEach(trigger => initModal(trigger));
    }
});
