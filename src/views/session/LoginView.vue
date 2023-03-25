<template>
  <div class="flex justify-center items-center w-full h-screen bg-gray-200">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
        <Field
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          :class="{ 'is-invalid': errors.password }"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
        <Field
          name="password"
          :class="{ 'is-invalid': errors.password }"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isSubmitting || !!errors.password || !!errors.email"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

import { useAuthStore } from '@/stores'

const schema = Yup.object().shape({
  email: Yup.string().email().required('Username is required'),
  password: Yup.string().required('Password is required')
})

function getSubmitFn<Schema extends Yup.ObjectSchema<Record<string, any>>>(
  _: Schema,
  callback: (values: Yup.InferType<Schema>) => void
) {
  return (values: Record<string, any>) => {
    return callback(values)
  }
}

const onSubmit = getSubmitFn(schema, (values) => {
  const authStore = useAuthStore()
  const { email, password } = values
  authStore.login(email, password)
})
</script>

<style>
.invalid-feedback {
  color: red;
}
</style>
