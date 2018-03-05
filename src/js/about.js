// animations
const animateWeekly = document.querySelector('.animate-weekly');
const animateQuarterly = document.querySelector('.animate-quarterly');

const modalWeekly = document.querySelector('.modal-weekly');
const modalWeeklyClose = document.querySelector('.modal-weekly .modal-close');
const modalWeeklyBackground = document.querySelector('.modal-weekly .modal-background');

const modalQuarterly = document.querySelector('.modal-quarterly');
const modalQuarterlyClose = document.querySelector('.modal-quarterly .modal-close');
const modalQuarterlyBackground = document.querySelector('.modal-quarterly .modal-background');

let weeklyClicked = false;
let quarterlyClicked = false;

const changeState = (a, b, c) => {
    a.style.animationPlayState = c;
    b.style.animationPlayState = c;
};

const exists = (element, event, callback) => {
    if (element) element.addEventListener(event, () => callback());
};

// mouseover events
exists(animateWeekly, 'mouseover', () => changeState(animateQuarterly, animateWeekly, 'paused'));
exists(animateQuarterly, 'mouseover', () => changeState(animateQuarterly, animateWeekly, 'paused'));
exists(animateWeekly, 'mouseleave', () => {
    if (weeklyClicked !== true) {
        changeState(animateQuarterly, animateWeekly, 'running');
    }
});
exists(animateQuarterly, 'mouseleave', () => {
    if (quarterlyClicked !== true) {
        changeState(animateQuarterly, animateWeekly, 'running');
    }
});

// toggle modal
const toggleModal = m => m.classList.toggle('is-active');

// click events
exists(animateWeekly, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'paused');
    toggleModal(modalWeekly);
    weeklyClicked = true;
});

exists(modalWeeklyBackground, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalWeekly);
    weeklyClicked = false;
});

exists(modalWeeklyClose, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalWeekly);
    weeklyClicked = false;
});

exists(animateQuarterly, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'paused');
    toggleModal(modalQuarterly);
    quarterlyClicked = true;
});

exists(modalQuarterlyBackground, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalQuarterly);
    quarterlyClicked = false;
});

exists(modalQuarterlyClose, () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalQuarterly);
    quarterlyClicked = false;
});
