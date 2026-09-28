<script setup>
/**
 * @file Testbench.vue
 * @description Interactive testing environment for the SpinnerButton component.
 */
import { ref, onBeforeUnmount } from 'vue'
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

/**
 * Controls whether the SpinnerButton is interactive.
 * @type {import('vue').Ref<boolean>}
 */
const isDisabled = ref(false)

/**
 * Current visual and functional state of the SpinnerButton ('idle' | 'running' | 'done').
 * @type {import('vue').Ref<string>}
 */
const state = ref('idle')

/**
 * Holds reference to the active setTimeout timer.
 * @type {number|null}
 */
let timer = null

/**
 * Clears any active timer to prevent memory leaks and race conditions.
 * @returns {void}
 */
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

/**
 * Triggers the 10-second async execution flow when clicked in 'idle' state.
 * @returns {void}
 */
function handleStart() {
  if (isDisabled.value || state.value !== 'idle') return
  clearTimer()
  
  state.value = 'running'
  
  timer = setTimeout(() => {
    state.value = 'done'
    timer = null
  }, 10000)
}

/**
 * Explicitly updates the button state and cancels any running timer.
 * @param {string} newState - Target state to set ('idle' | 'running' | 'done').
 * @returns {void}
 */
function setState(newState) {
  clearTimer()
  state.value = newState
}

/**
 * Handles toggling the disabled state. Resets state to 'idle' and clears active timers when disabled.
 * @param {boolean} val - Disabled state boolean from checkbox.
 * @returns {void}
 */
function toggleDisabled(val) {
  isDisabled.value = val
  if (val) {
    clearTimer()
    state.value = 'idle'
  }
}

/**
 * Component unmount lifecycle hook to prevent dangling timers.
 */
onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <main class="container">
    <h1>SpinnerButton Testbench</h1>

    <div class="demo-area">
      <!-- Clean native API usage: :disabled, :state and native @click passing via $attrs -->
      <SpinnerButton
        :disabled="isDisabled"
        :state="state"
        @click="handleStart"
      >
        <span v-if="isDisabled">Disabled</span>
        <span v-else-if="state === 'running'">Wait...</span>
        <span v-else-if="state === 'done'">Done</span>
        <span v-else>Start</span>
      </SpinnerButton>
    </div>

    <div class="controls">
      <!-- Quick Reset / State Buttons -->
      <div class="select-wrapper">
        <span class="label-text">Quick Set / Reset:</span>
        <div class="state-btn-group">
          <button type="button" class="btn-action" @click="setState('idle')">Reset (Idle)</button>
          <button type="button" class="btn-action" @click="setState('done')">Done</button>
        </div>
      </div>

      <!-- Toggle Disabled -->
      <label class="cb-label">
        <CheckboxRoot 
          :model-value="isDisabled" 
          class="cb-root"
          @update:model-value="toggleDisabled"
        >
          <CheckboxIndicator class="cb-indicator">✓</CheckboxIndicator>
        </CheckboxRoot>
        Disabled
      </label>

      <!-- Select State Dropdown -->
      <div class="select-wrapper">
        <span class="label-text">State:</span>
        <SelectRoot 
          :model-value="state" 
          @update:model-value="setState"
        >
          <SelectTrigger class="select-trigger">
            <SelectValue placeholder="Select State" />
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