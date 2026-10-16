<script setup lang="ts">
const input = ref('')
const loading = ref(false)
const chatId = crypto.randomUUID()

const { user } = useUserSession()

const greeting = computed(() => {
  const hour = new Date().getHours()
  let timeGreeting = 'Good evening'
  if (hour < 12) timeGreeting = 'Good morning'
  else if (hour < 18) timeGreeting = 'Good afternoon'

  const name = user.value?.name?.split(' ')[0] || user.value?.username

  return name ? `${timeGreeting}, ${name}` : `${timeGreeting}`
})

const {
  dropzoneRef,
  dragging,
  open,
  files,
  uploading,
  uploadedFiles,
  removeFile,
  clearFiles
} = useFileUploadWithStatus(chatId)

const { csrf, headerName } = useCsrf()

async function createChat(prompt: string) {
  input.value = prompt
  loading.value = true

  const parts: Array<{ type: string, text?: string, mediaType?: string, url?: string }> = [{ type: 'text', text: prompt }]

  if (uploadedFiles.value.length > 0) {
    parts.push(...uploadedFiles.value)
  }

  const chat = await $fetch('/api/chats', {
    method: 'POST',
    headers: { [headerName]: csrf },
    body: {
      id: chatId,
      message: {
        role: 'user',
        parts
      }
    }
  })

  refreshNuxtData('chats')
  navigateTo(`/chat/${chat?.id}`)
}

async function onSubmit() {
  await createChat(input.value)
  clearFiles()
}

const quickChats = [
  {
    label: 'Did Luther wrote that "The law of the letter is a law of sin" as a note to Romans 8:2, in his own Bible?',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Did Luther wrote that "the law of sin" is "the accusing and killing law" as a note to Romans 8:2, in his own Bible?',
    icon: 'i-logos-unjs'
  },
  {
    label: 'Did Luther wrote that "the law of Moses is a leaven" in his great interpretation of Galatians 5:9',
    icon: 'i-logos-vue'
  },
  {
    label: 'Where did Luther wrote this: "The law of the letter and the law of the Spirit differ, as the sign and the thing signified, as word and thing"?',
    icon: 'i-logos-vueuse'
  },
  {
    label: 'Does Luther use "the law of work" as synonym to "the law of Moses"?',
    icon: 'i-logos-tailwindcss-icon'
  },
  {
    label: 'Does Luther write about "a threefold law" in his disput with Erasmus? ("The law of nature, the law of works and the law of faith")',
    icon: 'i-lucide-sun'
  },
  {
    label: 'When we read "the mind" in the Bible wasn\'t Luther using a German word that means "soul" or "heart", and not "mind" (as we understand "mind")?',
    icon: 'i-lucide-line-chart'
  }
]
</script>

<template>
  <UDashboardPanel
    id="home"
    class="min-h-0"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <template #header>
      <Navbar />
    </template>

    <template #body>
      <div ref="dropzoneRef" class="flex flex-1">
        <DragDropOverlay :show="dragging" />

        <UContainer class="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-8">
          <h1 class="text-3xl sm:text-4xl text-highlighted font-bold">
            {{ greeting }}
          </h1>

          <ChatPrompt
            v-model="input"
            :disabled="loading"
            :files="files"
            :uploading="uploading"
            :open="open"
            class="[view-transition-name:chat-prompt]"
            @submit="onSubmit"
            @remove="removeFile"
          />

          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="quickChat in quickChats"
              :key="quickChat.label"
              :icon="quickChat.icon"
              :label="quickChat.label"
              size="sm"
              color="neutral"
              variant="outline"
              class="rounded-full"
              @click="createChat(quickChat.label)"
            />
          </div>
        </UContainer>
      </div>
    </template>
  </UDashboardPanel>
</template>
