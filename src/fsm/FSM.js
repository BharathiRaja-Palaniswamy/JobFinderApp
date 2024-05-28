class FSM {
    constructor(config) {
      this.config = config;
      this.currentState = config.initial;
    }
  
    transition(action) {
      const currentStateConfig = this.config.states[this.currentState];
      if (currentStateConfig.on && currentStateConfig.on[action]) {
        this.currentState = currentStateConfig.on[action];
        return this.currentState;
      }
      throw new Error(`Action "${action}" not allowed from state "${this.currentState}"`);
    }
  
    next() {
      return this.transition('NEXT');
    }
  
    prev() {
      return this.transition('PREV');
    }
  }
  
  export default FSM;
  