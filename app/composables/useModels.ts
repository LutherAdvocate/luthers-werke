import { MODELS } from '#shared/utils/models'

export function useModels() {
  const model = useCookie<string>('model', { default: () => 'google/gemini-3.5-flash-lite' })

  return {
    models: MODELS,
    model
  }
}

/*
Original
default: () => 'anthropic/claude-haiku-4.5' })
*/
