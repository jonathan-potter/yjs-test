import * as Y from 'yjs'
// import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import * as awarenessProtocol from 'y-protocols/awareness.js'
import sample from 'lodash/sample'

const { random } = Math

const ADD_SOMETHING = document.getElementById('add-something')
const CHANGE_SOMETHING = document.getElementById('change-something')
const RERENDER = document.getElementById('rerender')
const PRE_1 = document.getElementById('pre-1')
const PRE_2 = document.getElementById('pre-2')
const USER_LIST = document.getElementById('user-list')

const ydoc = new Y.Doc()

// const provider = new WebrtcProvider('yjs-initial-test-0', ydoc)
const { awareness } = new WebsocketProvider('ws://localhost:1234', 'my-roomname9', ydoc, {
    awareness: new awarenessProtocol.Awareness(ydoc)
})

awareness.setLocalStateField('user', {
    name: sample(['fred', 'bill', 'airiel', 'erica', 'bob']),
    color: sample(['red', 'blue', 'green', 'yellow'])
})

const awarenessStates = awareness.getStates()

awareness.on('update', reRender)
awareness.on('change', reRender)

console.log(awarenessStates)

const ymap = ydoc.getMap('a map')

ymap.observeDeep(reRender)
ADD_SOMETHING.addEventListener('click', addSomething)
CHANGE_SOMETHING.addEventListener('click', changeSomething)
RERENDER.addEventListener('click', reRender)

function reRender() {
    PRE_1.innerHTML = JSON.stringify(ymap.toJSON(), null, 2)

    USER_LIST.innerHTML = Array.from(awarenessStates.entries())
        .map(([key, value]) => value.user)
        .map(user => `
            <li>
                <div style="background: ${user.color}">${user.name}</div>
            </li>
        `)

}

let lastKey = random()
let lastObject = random()
function addSomething () {
    lastKey = random()
    lastObject = random()
    ymap.set(lastKey, lastObject)
}

function changeSomething () {
    ymap.set(lastKey, random())
}

reRender()
