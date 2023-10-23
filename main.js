const previousStateName = document.getElementById('previous-state-name');
const previousPeriods = document.getElementById('previous-state-periods');
const currentStateName = document.getElementById('current-state-name');
const currentPeriods = document.getElementById('current-state-periods');
const nextStateName = document.getElementById('next-state-name');
const nextPeriods = document.getElementById('next-state-periods');

const currentDate = new Date();
const currHour = currentDate.getHours();


class States {
    getPeak() {
        return {
            'stateName': 'Пик',
            'statePeriods': '' +
                '<div class="current-state-period">07.00 - 10.00</div>' +
                '<div class="current-state-period">17.00 - 21.00</div>',
        }
    }

    getHalfPeak() {
        return {
            'stateName': 'Полупик',
            'statePeriods': '' +
                '<div class="current-state-period">10.00 - 17.00</div>' +
                '<div class="current-state-period">21.00 - 23.00</div>'
        }
    }

    getNight() {
        return {
            'stateName': 'Ночь',
            'statePeriods': '<div class="previous-state-period">23.00 - 07.00</div>'
        }
    }
}

const states = new States();
let previousState = null;
let currentState = null;
let nextState = null;


if (7 <= currHour && currHour < 10) {
    previousState = states.getNight();
    currentState = states.getPeak();
    nextState = states.getHalfPeak();
} else if (10 <= currHour && currHour < 17) {
    previousState = states.getPeak();
    currentState = states.getHalfPeak();
    nextState = states.getPeak();
} else if (17 <= currHour && currHour < 21) {
    previousState = states.getHalfPeak();
    currentState = states.getPeak();
    nextState = states.getHalfPeak();
} else if (21 <= currHour && currHour < 23) {
    previousState = states.getPeak();
    currentState = states.getHalfPeak();
    nextState = states.getNight();
} else {
    previousState = states.getHalfPeak();
    currentState = states.getNight();
    nextState = states.getPeak();
}


previousStateName.innerText = previousState['stateName'];
previousPeriods.innerHTML = previousState['statePeriods'];

currentStateName.innerText = currentState['stateName'];
currentPeriods.innerHTML = currentState['statePeriods'];

nextStateName.innerText = nextState['stateName'];
nextPeriods.innerHTML = nextState['statePeriods'];
