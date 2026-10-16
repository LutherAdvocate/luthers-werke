export const MODELS = [
  { label: 'Gemini', value: 'google/gemini-3.5-flash-lite', icon: 'i-simple-icons-google' },
  { label: 'OpenAI', value: 'openai/gpt-5-nano', icon: 'i-simple-icons-openai' },
  { label: 'Inclusionai', value: 'inclusionai/ling-3.0-flash', icon: 'i-simple-icons-anthropic' }
]

// Streaming speech-to-text model used for dictation, served through the AI Gateway
export const TRANSCRIPTION_MODEL = 'openai/gpt-realtime-whisper'

/*
Backup old code:
  // { label: 'Anthropic', value: 'anthropic/claude-haiku-5.5', icon: 'i-simple-icons-anthropic' }
Removed temporary:
  { label: 'OpenAI', value: 'openai/gpt-40-mini', icon: 'i-simple-icons-openai' }
*/
