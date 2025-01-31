<script setup lang="ts">
import Modal from '@/components/AppModal.vue'
import { onMounted, ref } from 'vue'
import { SquarePenIcon, TrashIcon } from 'lucide-vue-next'
import NewProjectForm from './NewProjectForm.vue'
import { useProject } from '@/composables/useProject'

const { projects, findAllProject } = useProject()

const taskModal = ref<InstanceType<typeof Modal> | null>(null)

function openNewProjectModal(): void {
  taskModal.value?.openModal()
}

function closeNewProjectModal(): void {
  taskModal.value?.closeModal()
}

function onFormSubmitSuccess(): void {
  closeNewProjectModal()
}

onMounted(async () => {
  await findAllProject()
})
</script>
<template>
  <section class="size-full flex flex-col gap-10 p-4">
    <div class="flex w-full justify-between p-4 rounded-lg shadow-lg bg-gray-200">
      <span class="text-2xl font-medium">List of projects</span>
      <button
        class="min-w-32 py-2 px-4 inline-flex rounded-lg items-center justify-center text-medium text-white cursor-pointer hover:bg-green-800 bg-green-700"
        @click="openNewProjectModal"
        type="button"
      >
        New Project
      </button>
      <Modal ref="taskModal" title="Register project" @confirm="closeNewProjectModal">
        <NewProjectForm @submit-success="onFormSubmitSuccess" @close-modal="closeNewProjectModal" />
      </Modal>
    </div>
    <div class="relative overflow-x-auto shadow-lg rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs text-gray-50 uppercase bg-gray-600 text-center">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Release</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr
            v-for="item in projects"
            :key="item.name"
            class="border-b bg-gray-200 border-gray-500"
          >
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item.name }}
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item.releaseDate }}
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <div class="w-24 mx-auto px-2 py-1 bg-green-700 text-gray-900 rounded-lg text-center">
                <span class="text-white">{{ item.status?.toUpperCase() }}</span>
              </div>
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <button class="mx-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-100 cursor-pointer">
                <SquarePenIcon class="text-gray-700 size-5" />
              </button>
              <button class="mx-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-100 cursor-pointer">
                <TrashIcon class="text-gray-700 size-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
