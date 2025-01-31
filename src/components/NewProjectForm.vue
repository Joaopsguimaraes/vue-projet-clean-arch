<script setup lang="ts">
import { useProjectForm } from '@/composables/useProjectForm'
import { ProjectStatusOptions } from '@/constants/ProjectStatusOptions'

const { name, description, releaseDate, status, errors, handleSubmit } = useProjectForm()

const emit = defineEmits<{
  (event: 'submit-success'): void
  (event: 'close-modal'): void
}>()

function cancel(): void {
  emit('close-modal')
}

async function onSubmit(): Promise<void> {
  await handleSubmit()
  emit('submit-success')
}
</script>

<template>
  <form class="min-w-lg flex flex-col justify-center items-center gap-4" @submit.prevent="onSubmit">
    <div class="flex w-full flex-col items-start gap-1">
      <label for="name" class="font-medium">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Ex. TODO with nuxt"
        v-model="name"
        class="w-full p-2 border border-green-700 rounded-md"
      />
      <span v-if="errors.name.length > 1" class="text-red-500 font-bold text-sm">{{
        errors.name
      }}</span>
    </div>

    <div class="flex w-full flex-col items-start gap-1">
      <label for="description" class="font-medium">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Ex. Project created with nuxt..."
        v-model="description"
        class="w-full p-2 border border-green-700 rounded-md"
      />
      <span v-if="errors.description.length > 1" class="text-red-500 font-bold text-sm">{{
        errors.description
      }}</span>
    </div>

    <div class="flex w-full flex-col items-start gap-1">
      <label for="releaseDate" class="font-medium">Release At:</label>
      <input
        type="date"
        name="releaseDate"
        id="releaseDate"
        v-model="releaseDate"
        class="w-full p-2 border border-green-700 rounded-md"
      />
      <span v-if="errors.releaseDate.length > 1" class="text-red-500 font-bold text-sm">{{
        errors.releaseDate
      }}</span>
    </div>

    <div class="flex w-full flex-col items-start gap-1">
      <label for="status" class="font-medium">Status</label>
      <select
        id="status"
        v-model="status"
        class="w-full p-2 rounded-md border border-green-700 focus:border-green-700 focus:ring-green-700"
      >
        <option value="" disabled>Select an option</option>
        <option v-for="option in ProjectStatusOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <span v-if="errors.status.length > 1" class="text-red-500 font-bold text-sm">{{
        errors.status
      }}</span>
    </div>
    <div class="flex w-full justify-end items-center gap-4">
      <button
        type="button"
        class="min-w-32 py-2 px-4 inline-flex items-center justify-center text-medium cursor-pointer hover:bg-green-50 border rounded-lg border-green-700"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="min-w-32 py-2 px-4 inline-flex rounded-lg items-center justify-center text-medium text-white cursor-pointer hover:bg-green-800 bg-green-700"
      >
        Create
      </button>
    </div>
  </form>
</template>
