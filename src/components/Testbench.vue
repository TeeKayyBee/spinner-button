<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { 
  CheckboxRoot, 
  CheckboxIndicator, 
  SelectRoot, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from 'reka-ui'
import SpinnerButton from './SpinnerButton.vue'

const enabled = ref(true)
const state = ref('idle')

let timer = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function handleStart() {
  if (!enabled.value || state.value !== 'idle') return
  clearTimer()
  
  state.value = 'running'
  
  timer = setTimeout(() => {
    state.value = 'done'
    timer = null
  }, 10000)
}

function setState(newState) {
  clearTimer()
  state.value = newState
}

watch(state, (newState) => {
  if (newState !== 'running') {
    clearTimer()
  }
})

watch(enabled, (isEnabled) => {
  if (!isEnabled) {
    clearTimer()
    state.value = 'idle'
  }
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <main class="container">
    <h1>SpinnerButton Testbench</h1>

    <div class="demo-area">
      <SpinnerButton
        :spinner-enabled="enabled"
        :spinner-state="state"
        @click="handleStart"
      >
        <span v-if="!enabled">Disabled</span>
        <span v-else-if="state === 'running'">Wait...</span>
        <span v-else-if="state === 'done'">Done</span>
        <span v-else>Start</span>
      </SpinnerButton>
    </div>

    <div class="controls">
      <div class="select-wrapper">
        <span class="label-text">Quick Set / Reset:</span>
        <div class="state-btn-group">
          <button type="button" class="btn-action" @click="setState('idle')">Reset (Idle)</button>
          <button type="button" class="btn-action" @click="setState('done')">Done</button>
        </div>
      </div>

      <label class="cb-label">
        <CheckboxRoot v-model="enabled" class="cb-root">
          <CheckboxIndicator class="cb-indicator">✓</CheckboxIndicator>
        </CheckboxRoot>
        Enabled
      </label>

      <div class="select-wrapper">
        <span class="label-text">State:</span>
        <SelectRoot v-model="state">
          <SelectTrigger class="select-trigger">
            <SelectValue placeholder="State wählen" />
          </SelectTrigger>
          <SelectContent class="select-content">
            <SelectItem value="idle" class="select-item">idle</SelectItem>
            <SelectItem value="running" class="select-item">running</SelectItem>
            <SelectItem value="done" class="select-item">done</SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>
    </div>
  </main>
</template>