<script setup>
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = defineProps({
  spinnerEnabled: { 
    type: Boolean, 
    default: false 
  },
  spinnerState: { 
    type: String, 
    default: 'idle',
    validator: (value) => ['idle', 'running', 'done'].includes(value)
  },
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => !props.spinnerEnabled || props.spinnerState !== 'idle')

const visual = computed(() => {
  if (!props.spinnerEnabled) return 'disabled'
  return props.spinnerState
})

function handleClick() {
  if (!isDisabled.value) emit('click')
}
</script>

<template>
  <div class="spinner-btn" :class="`is-${visual}`">
    <Primitive
      as="button"
      type="button"
      class="inner-btn"
      :disabled="isDisabled"
      :aria-busy="props.spinnerState === 'running'"
      :aria-disabled="isDisabled"
      @click="handleClick"
    >
      <slot>btn</slot>
    </Primitive>

    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle class="outer" cx="60" cy="60" r="58.5" />
      <circle class="ring" cx="60" cy="60" r="50" pathLength="360" />
    </svg>
  </div>
</template>

<style scoped>
.spinner-btn {
  --size: 120px;
  --bg: #fff;
  --green: #82b366;
  --gray: #999;
  --line: #000;
  --arc: 90;
  --gap: 270;
  --cycle: 1500ms;

  position: relative;
  width: var(--size);
  aspect-ratio: 1;
}

svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.outer {
  fill: var(--bg);
  stroke: var(--line);
  stroke-width: 3;
}

.ring {
  fill: none;
  stroke-width: 14;
  stroke: transparent;
  stroke-dasharray: 0 360;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke 120ms ease, stroke-dasharray 120ms ease;
}

.inner-btn {
  position: absolute;
  inset: 14%;
  z-index: 1;
  border-radius: 50%;
  border: calc(var(--size) * 0.025) solid var(--line);
  background: var(--bg);
  font: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.inner-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.inner-btn:not(:disabled):active {
  transform: scale(0.97);
}

.inner-btn:not(:disabled):active ~ svg .ring {
  stroke: var(--green);
  stroke-dasharray: 360 0;
  animation: press-glow 600ms ease-in-out infinite;
}

.is-done .ring {
  stroke: var(--green);
  stroke-dasharray: 360 0;
}

.is-running .ring {
  stroke: var(--green);
  stroke-dasharray: var(--arc) var(--gap);
  animation: spin var(--cycle) linear infinite;
}

.is-disabled .ring {
  stroke: var(--gray);
  stroke-dasharray: 360 0;
}

@keyframes press-glow {
  0%, 100% { filter: drop-shadow(0 0 3px var(--green)); }
  50%      { filter: drop-shadow(0 0 9px var(--green)); }
}

@keyframes spin {
  from { transform: rotate(-90deg); }
  to   { transform: rotate(270deg); }
}
</style>