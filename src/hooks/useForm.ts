import { reactive } from 'vue'

export function useForm<T>(initialValues: T, onSubmit: (values: T) => Promise<void>) {
  const form = reactive({
    values: initialValues,
    errors: {} as Record<keyof T, string>
  })

  const isLoading = reactive({ value: false })

  async function submit() {
    isLoading.value = true
    try {
      const formValues = form.values as T
      await onSubmit(formValues)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    isLoading,
    submit
  }
}
