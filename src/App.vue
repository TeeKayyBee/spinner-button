<script setup>
import { ref } from 'vue'
import { 
  CheckboxRoot, 
  CheckboxIndicator, 
  SelectRoot, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from 'reka-ui'
import SpinnerButton from './components/SpinnerButton.vue'

const enabled = ref(true)
const state = ref('idle')

let timer = null

function handleStart() {
  if (!enabled.value || state.value !== 'idle') return
  if (timer) clearTimeout(timer)
  state.value = 'running'
  timer = setTimeout(() => {
    state.value = 'done'
  }, 10000)
}
</script>

<template>
  <main class="container">
    <h1>SpinnerButton Testbench</h1>

    <div class="demo-area">
      <SpinnerButton
        :spinner-enabled="enabled"
        :spinner-state="state"
        @click="handleStart"
        @activate="handleStart"
      >
        <span v-if="!enabled">Disabled</span>
        <span v-else-if="state === 'running'">Wait...</span>
        <span v-else-if="state === 'done'">Done</span>
        <span v-else>Start</span>
      </SpinnerButton>
    </div>

    <div class="controls">
      <!-- Reka UI Checkbox -->
      <label class="cb-label">
        <CheckboxRoot v-model="enabled" class="cb-root">
          <CheckboxIndicator class="cb-indicator">✓</CheckboxIndicator>
        </CheckboxRoot>
        Enabled
      </label>

      <!-- Reka UI Select -->
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

<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f4f4f9;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 220px;
}

.cb-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.cb-root {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
}

.cb-indicator {
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
}

.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.label-text {
  font-size: 0.9rem;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #000;
  background: #fff;
  font: inherit;
  cursor: pointer;
}

.select-content {
  background: #fff;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0.25rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.select-item {
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.select-item[data-highlighted] {
  background: #f0f0f0;
}
</style>