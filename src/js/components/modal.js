const body = document.querySelector('body'),
    modal = document.querySelector('.js-modal'),
    modalBody = modal.querySelector('.modal__inner');

let timeoutID;

function closeModal() {
    modal.classList.remove('active');
    body.classList.remove('show-modal');
    modalBody.innerHTML = '';
}

function clearCountdown() {
    window.clearTimeout(timeoutID);
}

function modalCountdown() {
    let seconds = modal.querySelector('.js-card-spinner span'),
        secondsCountdown = parseInt(seconds.innerHTML);

    secondsCountdown -= 1;
    seconds.innerHTML = secondsCountdown;

    if (secondsCountdown < 0) {
        clearCountdown();
        closeModal();
    } else {
        seconds.innerHTML = secondsCountdown;
        timeoutID = window.setTimeout(modalCountdown, 1000);
    }
}

export default function initModal(trigger) {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();

        // clone card to modal
        let card = trigger.parentNode,
            cloneCard = card.cloneNode(true);

        cloneCard.classList.remove('active');
        cloneCard.querySelector('.pricing-card__btn').remove();
        modalBody.append(cloneCard);
        cloneCard.insertAdjacentHTML('afterBegin', '<div class="pricing-card__close-btn js-close-modal"></div>');
        cloneCard.insertAdjacentHTML('beforeEnd', '<div class="pricing-card__spinner js-card-spinner"><span>31</span></div>');

        // show modal
        modal.classList.add('active');
        body.classList.add('show-modal');

        // init countdown
        modalCountdown();
    });

    // close modal on esc btn
    document.addEventListener('keydown', (e) => {
        if(document.querySelector('body.show-modal') && e.keyCode === 27) {
            clearCountdown();
            closeModal();
        }
    });

    // close modal btn
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('js-close-modal')) {
            clearCountdown();
            closeModal();
        }
    });
}
