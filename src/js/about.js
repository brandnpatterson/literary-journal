import testForElement from './handlers/test-for-element';

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
testForElement(animateWeekly, 'mouseover', () => changeState(animateQuarterly, animateWeekly, 'paused'));
testForElement(animateQuarterly, 'mouseover', () => changeState(animateQuarterly, animateWeekly, 'paused'));
testForElement(animateWeekly, 'mouseleave', () => {
    if (weeklyClicked !== true) {
        changeState(animateQuarterly, animateWeekly, 'running');
    }
});
testForElement(animateQuarterly, 'mouseleave', () => {
    if (quarterlyClicked !== true) {
        changeState(animateQuarterly, animateWeekly, 'running');
    }
});

// toggle modal
const toggleModal = m => m.classList.toggle('is-active');

// click events
testForElement(animateWeekly, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'paused');
    toggleModal(modalWeekly);
    weeklyClicked = true;
});

testForElement(modalWeeklyBackground, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalWeekly);
    weeklyClicked = false;
});

testForElement(modalWeeklyClose, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalWeekly);
    weeklyClicked = false;
});

testForElement(animateQuarterly, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'paused');
    toggleModal(modalQuarterly);
    quarterlyClicked = true;
});

testForElement(modalQuarterlyBackground, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalQuarterly);
    quarterlyClicked = false;
});

testForElement(modalQuarterlyClose, 'click', () => {
    changeState(animateQuarterly, animateWeekly, 'running');
    toggleModal(modalQuarterly);
    quarterlyClicked = false;
});
