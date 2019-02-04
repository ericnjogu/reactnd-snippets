function todos(state = [], action) {
    if (action.type === 'ADD') {
        state = state.concat(action.todo)
    }
    return state
}

function createStore() {
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
    // returns an object whose two props are functions
    return {getState, subscribe}
}

// two subscribers each returning a ref to an unsubscriber function
const store = createStore()
unsub1 = store.subscribe(()=> {
    console.log(`Listener 1: The new state is ${store.getState}`)
})

unsub2 = store.subscribe(()=> {
    console.log(`Listener 2: The new state is ${store.getState}`)
})