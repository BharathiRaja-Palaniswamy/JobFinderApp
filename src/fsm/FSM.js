/**
 * Finite State Machine class representing a state machine with transitions.
 */
class FSM {
  /**
   * Creates an instance of FSM.
   * @param {Object} config - Configuration object for the FSM.
   * @param {string} config.initial - Initial state of the FSM.
   * @param {Object} config.states - States and their transitions defined in the FSM.
   */
  constructor(config) {
    /**
     * Configuration object for the FSM.
     * @type {Object}
     */
    this.config = config;
    /**
     * Current state of the FSM.
     * @type {string}
     */
    this.currentState = config.initial;
  }

  /**
   * Transition to the next state based on the provided action.
   * @param {string} action - Action triggering the transition.
   * @returns {string} - The new current state after transition.
   * @throws {Error} - Throws an error if the action is not allowed from the current state.
   */
  transition(action) {
    const currentStateConfig = this.config.states[this.currentState];
    if (currentStateConfig.on && currentStateConfig.on[action]) {
      this.currentState = currentStateConfig.on[action];
      return this.currentState;
    }
    throw new Error(
      `Action "${action}" not allowed from state "${this.currentState}"`
    );
  }

  /**
   * Transition to the next state.
   * @returns {string} - The new current state after transition.
   */
  next() {
    return this.transition("NEXT");
  }

  /**
   * Transition to the previous state.
   * @returns {string} - The new current state after transition.
   */
  prev() {
    return this.transition("PREV");
  }
}

export default FSM;
