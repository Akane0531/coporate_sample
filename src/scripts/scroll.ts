const state = new Map();
const defaultState = { isEnter: false, isEnterBack: false, isLeave: false, isLeaveBack: false };

class StateManager {
  private states: Map<HTMLElement, any>;

  constructor() {
    this.states = new Map();
  }

  getState(element: HTMLElement) {
    let elementState = this.states.get(element);
    if (!elementState) {
      const defaultState = { isEnter: false, isEnterBack: false, isLeave: false, isLeaveBack: false };
      elementState = { ...defaultState };
      this.states.set(element, elementState);
    }
    return elementState;
  }

  setState(element: HTMLElement, state: any) {
    this.states.set(element, state);
    // ステートをクラスに集約すると、ページ遷移の度に追加されるネックがある
    // console.log('🚀 ~ StateManager ~ setState ~ this.states:', this.states);
  }

  resetStates() {
    this.states = new Map();
    // console.log('🚀 ~ StateManager ~ resetStates ~ resetStates:');
  }
}

const stateManager = new StateManager();

export const resetStates = () => stateManager.resetStates();

export const scrollTrigger = (element: HTMLElement, callbacks: { [key: string]: () => void }) => {
  // const currentState = state.get(element) || { ...defaultState };
  // state.set(element, currentState);

  const currentState = stateManager.getState(element);
  stateManager.setState(element, currentState);

  const rect = element.getBoundingClientRect();
  // TODO トリガー位置を柔軟に対応できるように改善
  const trigger = 0; // window 上部からの位置

  // Enter
  if (rect.top <= trigger && !currentState.isEnter) {
    currentState.isEnter = true;
    // console.log('enter');
    callbacks.isEnter && callbacks.isEnter();
  } else if (rect.top > trigger) {
    currentState.isEnter = false;
  }

  // enter back
  if (rect.top > trigger && !currentState.isEnterBack) {
    currentState.isEnterBack = true;
    // console.log('enter back');
    callbacks.isEnterBack && callbacks.isEnterBack();
  } else if (rect.top <= trigger) {
    currentState.isEnterBack = false;
  }

  // Leave
  if (rect.bottom <= trigger && !currentState.isLeave) {
    currentState.isLeave = true;
    // console.log('leave');
    callbacks.isLeave && callbacks.isLeave();
  } else if (rect.bottom > trigger) {
    currentState.isLeave = false;
  }

  // Leave back
  if (rect.bottom > trigger && !currentState.isLeaveBack) {
    currentState.isLeaveBack = true;
    // console.log('leave back');
    callbacks.isLeaveBack && callbacks.isLeaveBack();
  } else if (rect.bottom <= trigger) {
    currentState.isLeaveBack = false;
  }
};
