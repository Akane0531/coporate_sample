const state = new Map();
const defaultState = { isEnter: false, isEnterBack: false, isLeave: false, isLeaveBack: false };

export const scrollTrigger = (element: HTMLElement, callbacks: { [key: string]: () => void }) => {
  const currentState = state.get(element) || { ...defaultState };
  state.set(element, currentState);

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
