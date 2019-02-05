function createStore(reducer) {
    // variables whose value can change are declared by the let keyword in ES6
    let state
    let listeners = []

    // functions are declared by the const keyword since their value will not be modified
    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.map(listener => listener())
    }

    // returns an object whose two props are functions
    return {getState, subscribe, dispatch}
}

// pure function (reducer) to modify and return new state
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD':
            return state = state.concat(action.todo)
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id)
        case 'TOGGLE':
            return state.map(todo => {
                if (todo.id === action.id) {
                    todo.complete = !todo.complete
                }
                return todo
            })
        default:
            return state
    }
}

// two subscribers each returning a ref to an unsubscriber function
const store = createStore(todos)
unsub1 = store.subscribe(()=> {
    console.log(`Listener 1: The new state is ${JSON.stringify(store.getState())}`)
})

unsub2 = store.subscribe(()=> {
    console.log(`Listener 2: The new state is ${JSON.stringify(store.getState())}`)
})

store.dispatch({
    type: 'ADD',
    todo: {
        id:1,
        title: 'Run 40k',
        complete: false
    }
})

unsub1();

store.dispatch({
    type: 'ADD',
    todo: {
        id:2,
        title: 'Run 10k',
        complete: false
    }
})

console.log(`the state is now ${JSON.stringify(store.getState())}`)

store.dispatch({
    type:'REMOVE',
    id:1
})

store.dispatch({
    type:'TOGGLE',
    id:2
})
