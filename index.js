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

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOOGLE_TODO = 'TOOGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOOGLE_GOAL = 'TOOGLE_GOAL';

// App code
function todos(state = [], action) {
  if (action.type === ADD_TODO) {
    return state.concat([action.todo]);
  }

  if (action.type === REMOVE_TODO) {
    return state.filter(todo => todo.id !== action.id);
  }

  if (action.type === TOOGLE_TODO) {
    return state.map((todo) => {
      if (todo.id !== action.id) {
        return todo;
      }

      return Object.assign({}, todo, { complete: !todo.complete });
    });
  }

  return state;
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    case TOOGLE_GOAL:
      return state.map((goal) => {
        if (goal.id !== action.id) {
          return goal;
        }

        return Object.assign({}, goal, { complete: !goal.complete });
      });
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    goals: goals(state.goals, action),
    todos: todos(state.todos, action),
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is ', store.getState());
});

store.dispatch({
  todo: {
    complete: false,
    id: 0,
    name: 'Learn Redux',
  },
  type: 'ADD_TODO',
});

store.dispatch({
  todo: {
    complete: true,
    id: 1,
    name: 'Read a book',
  },
  type: 'ADD_TODO',
});

const unsubscribe = store.subscribe(() => {
  console.log('The store changed');
});
unsubscribe();

module.export = createStore;
