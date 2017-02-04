class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config){
            throw new Error();
        }
        this.initial = config.initial;
        this.states = config.states;
        this.currentState = this.initial;
        this.undoArray = [];
        this.redoArray = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.redoArray = [];
        this.undoArray.push(this.currentState);
        if(this.states[state]){
            this.currentState = state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.redoArray = [];
        this.undoArray.push(this.currentState);
        if(this.states[this.currentState].transitions[event]) {
            this.currentState = this.states[this.currentState].transitions[event]
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.initial;
    }
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        
        if(!event){
            return Object.keys(this.states);
        } else {
            var resArr = [];
            for (var cState in this.states){
                if(event in this.states[cState].transitions){
                    resArr.push(cState);
                }
            }
            return resArr;
        }
        return this.possibleStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.undoArray.length){
            this.redoArray.push(this.currentState);
            this.currentState =  this.undoArray.pop();
            return true;
        } else {
            return false;
        }
        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoArray.length){
            this.undoArray.push(this.currentState);
            this.currentState = this.redoArray.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoArray = [];
        this.redoArray = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
