<template>
  <div></div>
</template>

<script setup lang="ts">
import { createEventHub, createStore } from '@/utils/common.ts'

// let EventHub = createEventHub()
// EventHub.on('hello', (data) => console.log(data))
// EventHub.fire('hello', 'jirengu.com')

/* redux1 */
// let store = createStore({ msg: 'jirengu' })

// store.subscribe(() => {
//   let state = store.getState()
//   console.log('ssssssssssssss', state)
// })

// store.changeState({ msg: 'cecece' })

/* redux2 */
function counter(state = 10, action) {
  switch (action.type) {
    case '+':
      return state + action.val
    case '-':
      return state - action.val
    default:
      return state
  }
}

let store = createStore(counter)

store.subscribe(() => console.log(store.getState()))

store.dispath({ type: '+', val: 10 })
store.dispath({ type: '-', val: 10 })
</script>

<style lang="scss" scoped></style>
