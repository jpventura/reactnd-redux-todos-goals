// Library code
function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state;
  let listeners = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
}

// App code
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.contact([action.todo]);
  }

  return state;
}

const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is ', store.getState());
});

const unsubscribe = store.subscribe(() => {
  console.log('The store changed');
});
unsubscribe();

export default createStore;
