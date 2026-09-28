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