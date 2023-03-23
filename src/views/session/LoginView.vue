<template>
  <MDBCard class="w-25">
    <MDBCardHeader><h4>Login</h4></MDBCardHeader>

    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <MDBCardBody
        class="d-flex flex-column"
        :style="{
          gap: '24px'
        }"
      >
        <div>
          <label>Email</label>
          <Field
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
          />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div>
          <MDBBtn color="primary" class="mb-3" :disabled="isSubmitting" type="submit">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Login
          </MDBBtn>
        </div>
      </MDBCardBody>
    </Form>
  </MDBCard>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody } from 'mdb-vue-ui-kit'

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
