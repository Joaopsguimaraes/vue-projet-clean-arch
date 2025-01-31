<script setup lang="ts">
import { ref } from 'vue'

interface ModalProps {
  title?: string
}

const props = defineProps<ModalProps>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const isOpen = ref<boolean>(false)

function openModal(): void {
  isOpen.value = true
}

function closeModal(): void {
  isOpen.value = false
  emit('close')
}

function confirmAction(): void {
  emit('confirm')
  closeModal()
}

defineExpose<{
  openModal: () => void
  closeModal: () => void
}>({
  openModal,
  closeModal,
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed flex items-center justify-center inset-0 z-50 bg-black/80">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold mb-3">{{ props.title }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div class="mb-4">
          <slot></slot>
        </div>
        <div class="flex gap-2 mt-2 justify-end">
          <button
            @click="closeModal"
            type="button"
            class="min-w-32 hidden text-center font-medium py-2 px-4 items-center justify-center text-medium cursor-pointer hover:bg-green-50 border rounded-lg border-green-700"
          >
            Cancel
          </button>
          <button
            @click="confirmAction"
            type="button"
            class="min-w-32 py-2 px-4 text-center font-medium hidden rounded-lg items-center justify-center text-medium text-white cursor-pointer hover:bg-green-800 bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
