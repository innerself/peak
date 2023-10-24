const previousStateContainer = document.getElementById('previous-state');
const previousStateName = document.getElementById('previous-state-name');
const previousPeriods = document.getElementById('previous-state-periods');

const currentStateContainer = document.getElementById('current-state');
const currentStateName = document.getElementById('current-state-name');
const currentPeriods = document.getElementById('current-state-periods');

const nextStateContainer = document.getElementById('next-state');
const nextStateName = document.getElementById('next-state-name');
const nextPeriods = document.getElementById('next-state-periods');

const currentDate = new Date();
const currHour = currentDate.getHours();


const stateOrders = {
    Previous: 'Previous',
    Current: 'Current',
    Next: 'Next',
}

const stateTimes = {
    Early: 'Early',
    Late: 'Late',
}


class StateOrderManager {
    constructor(stateOrder) {
        this.stateOrder = stateOrder
    }

    getPeriodClass() {
        if (this.stateOrder === stateOrders.Previous) {
            return '"previous-state-period"'
        } else if (this.stateOrder === stateOrders.Current) {
            return '"current-state-period"'
        } else if (this.stateOrder === stateOrders.Next) {
            return '"next-state-period"'
        } else {
            throw new Error(`Unknown state order ${this.stateOrder}`)
        }
    }
}


class States {
    getPeak(stateOrder, stateTime) {
        const orderManager = new StateOrderManager(stateOrder)
        let timeInterval = stateTime === stateTimes.Early ? '07.00 - 10.00' : '17.00 - 21.00'

        return {
            'stateName': 'Пик',
            'statePeriod': `<div class=${orderManager.getPeriodClass()}>${timeInterval}</div>`,
            'stateColor': '#f2c76e',
            'bodyColor': '#fae9c5',
            'borderColor': '#ecae2d',
        }
    }

    getHalfPeak(stateOrder, stateTime) {
        const orderManager = new StateOrderManager(stateOrder)
        let timeInterval = stateTime === stateTimes.Early ? '10.00 - 17.00' : '21.00 - 23.00'

        return {
            'stateName': 'Полупик',
            'statePeriod': `<div class=${orderManager.getPeriodClass()}>${timeInterval}</div>`,
            'stateColor': '#ebe8e7',
            'bodyColor': '#f7f6f5',
            'borderColor': '#c1b7b4',
        }
    }

    getNight(stateOrder) {
        const orderManager = new StateOrderManager(stateOrder)
        return {
            'stateName': 'Ночь',
            'statePeriod': `<div class=${orderManager.getPeriodClass()}>23.00 - 07.00</div>`,
            'stateColor': '#bd9dea',
            'bodyColor': '#e5d8f7',
            'borderColor': '#925ddc',
        }
    }
}

const states = new States();
let previousState;
let currentState;
let nextState;


if (7 <= currHour && currHour < 10) {
    previousState = states.getNight(stateOrders.Previous);
    currentState = states.getPeak(stateOrders.Current, stateTimes.Early);
    nextState = states.getHalfPeak(stateOrders.Next, stateTimes.Early);
} else if (10 <= currHour && currHour < 17) {
    previousState = states.getPeak(stateOrders.Previous, stateTimes.Early);
    currentState = states.getHalfPeak(stateOrders.Current, stateTimes.Early);
    nextState = states.getPeak(stateOrders.Next, stateTimes.Late);
} else if (17 <= currHour && currHour < 21) {
    previousState = states.getHalfPeak(stateOrders.Previous, stateTimes.Early);
    currentState = states.getPeak(stateOrders.Current, stateTimes.Late);
    nextState = states.getHalfPeak(stateOrders.Next, stateTimes.Late);
} else if (21 <= currHour && currHour < 23) {
    previousState = states.getPeak(stateOrders.Previous, stateTimes.Late);
    currentState = states.getHalfPeak(stateOrders.Current, stateTimes.Late);
    nextState = states.getNight(stateOrders.Next);
} else {
    previousState = states.getHalfPeak(stateOrders.Previous, stateTimes.Late);
    currentState = states.getNight(stateOrders.Current);
    nextState = states.getPeak(stateOrders.Next, stateTimes.Early);
}


document.body.style.backgroundColor = currentState['bodyColor'];

previousStateContainer.style.backgroundColor = previousState['stateColor'];
previousStateContainer.style.borderColor = previousState['borderColor'];
previousStateName.innerText = previousState['stateName'];
previousPeriods.innerHTML = previousState['statePeriod'];

currentStateContainer.style.backgroundColor = currentState['stateColor'];
currentStateContainer.style.borderColor = currentState['borderColor'];
currentStateName.innerText = currentState['stateName'];
currentPeriods.innerHTML = currentState['statePeriod'];

nextStateContainer.style.backgroundColor = nextState['stateColor'];
nextStateContainer.style.borderColor = nextState['borderColor'];
nextStateName.innerText = nextState['stateName'];
nextPeriods.innerHTML = nextState['statePeriod'];
