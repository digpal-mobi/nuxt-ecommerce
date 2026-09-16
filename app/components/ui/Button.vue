<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"  
    :class="['ui-btn', `ui-btn--${variant}`, `ui-btn--${size}`]"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-family-sans);
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.ui-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sizes */
.ui-btn--sm {
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
}

.ui-btn--md {
  padding: 0.625rem 1.5rem;
  font-size: 1rem;
}

.ui-btn--lg {
  padding: 0.875rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.ui-btn--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  box-shadow: var(--shadow-primary);
  border: 1px solid var(--color-primary);

}

.ui-btn--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
}

.ui-btn--primary:active:not(:disabled) {
  background-color: var(--color-primary-active);
  transform: translateY(0);
}

.ui-btn--secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-contrast);
  box-shadow: var(--shadow-secondary);
  border: 1px solid var(--color-secondary);

}

.ui-btn--secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-hover);
  transform: translateY(-1px);
}

.ui-btn--secondary:active:not(:disabled) {
  background-color: var(--color-secondary-active);
  transform: translateY(0);
}

.ui-btn--outline {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.ui-btn--outline:hover:not(:disabled) {
  background-color: var(--color-primary-light);
}

.ui-btn--ghost {
  background-color: transparent;
  color: var(--color-secondary);
}

.ui-btn--ghost:hover:not(:disabled) {
  background-color: var(--color-secondary-subtle);
}
</style>

