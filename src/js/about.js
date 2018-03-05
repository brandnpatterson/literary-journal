import { forElement } from './handlers/test-for-element';

// animations
const animateWeekly = document.querySelector('.animate-weekly');
const animateQuarterly = document.querySelector('.animate-quarterly');

const modalWeekly = document.querySelector('.modal-weekly');
const modalWeeklyBackground = document.querySelector('.modal-weekly .modal-background');
const modalWeeklyClose = document.querySelector('.modal-weekly .modal-close');

const modalQuarterly = document.querySelector('.modal-quarterly');
const modalQuarterlyBackground = document.querySelector('.modal-quarterly .modal-background');
const modalQuarterlyClose = document.querySelector('.modal-quarterly .modal-close');

let weeklyClicked = false;
let quarterlyClicked = false;

const changeState = (a, b, c) => {
    a.style.animationPlayState = c;
    b.style.animationPlayState = c;
};

// mouseover events
forElement(animateWeekly, 'mouseover', () => changeState(animateQuarterly, animateWeekly, 'paused'));
forElement(animateQuarterly, 'mouseover', () => changeState(animateQuarterly, animateWeekly, 'paused'));
forElement(animateWeekly, 'mouseleave', () => {
    if (weeklyClicked !== true) {
        changeState(animateQuarterly, animateWeekly, 'running');
    }
});
forElement(animateQuarterly, 'mouseleave', () => {
    if (quarterlyClicked !== true) {
        changeState(animateQuarterly, animateWeekly, 'running');
    }
});

// toggle modal
const toggleModal = m => m.classList.toggle('is-active');

// click events
forElement(animateWeekly, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'paused');
    toggleModal(modalWeekly);
    weeklyClicked = true;
});

forElement(modalWeeklyBackground, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalWeekly);
    weeklyClicked = false;
});

forElement(modalWeeklyClose, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalWeekly);
    weeklyClicked = false;
});

forElement(animateQuarterly, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'paused');
    toggleModal(modalQuarterly);
    quarterlyClicked = true;
});

forElement(modalQuarterlyBackground, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalQuarterly);
    quarterlyClicked = false;
});

forElement(modalQuarterlyClose, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalQuarterly);
    quarterlyClicked = false;
});
