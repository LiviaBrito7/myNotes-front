<template>
  <q-page class="q-pa-md">
    <div class="register-page q-gutter-md">
      <h1 class="text-h5">Cadastro de Usuário</h1>

      <q-form @submit.prevent="handleRegister" class="q-gutter-md">
        <q-input
          v-model="account.name"
          label="Nome"
          outlined
          clearable
          required
          :disable="loading"
        />
        <div v-for="error in validationErrors.name" :key="error" class="text-negative">
          {{ error }}
        </div>

        <q-input
          v-model="account.email"
          label="Email"
          type="email"
          outlined
          clearable
          required
          :disable="loading"
        />
        <div v-for="error in validationErrors.email" :key="error" class="text-negative">
          {{ error }}
        </div>

        <q-input
          v-model="account.password"
          label="Senha"
          type="password"
          outlined
          clearable
          required
          :disable="loading"
        />
        <div v-for="error in validationErrors.password" :key="error" class="text-negative">
          {{ error }}
        </div>

        <div>
          <q-btn type="submit" label="Cadastrar" color="primary" :loading="loading" />
          <q-btn type="reset" label="Limpar" color="secondary" flat />
        </div>
      </q-form>

      <q-banner v-if="successMessage" class="bg-positive text-white">
        {{ successMessage }}
      </q-banner>

      <q-banner v-if="errorMessage" class="bg-negative text-white">
        {{ errorMessage }}
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import apiClient from 'src/services/api.js'

export default {
  name: 'RegisterPage',
  data () {
    return {
      loading: false,
      successMessage: '',
      errorMessage: '',
      account: {
        name: '',
        email: '',
        password: ''
      },
      validationErrors: {
        name: [],
        email: [],
        password: []
      }
    }
  },
  methods: {
    validateFields () {
      if (!this.account.name) {
        this.validationErrors.name.push('O campo nome é obrigatório.')
      } else if (this.account.name.length > 50) {
        this.validationErrors.name.push('O campo nome não pode ter mais de 40 caracteres.')
      }

      if (!this.account.email) {
        this.validationErrors.email.push('O campo email é obrigatório.')
      } else if (this.account.email.length > 50) {
        this.validationErrors.email.push('O campo email não pode ter mais de 50 caracteres.')
      }

      if (!this.account.password) {
        this.validationErrors.password.push('O campo senha é obrigatório.')
      } else if (this.account.password.length < 8) {
        this.validationErrors.password.push('Sua senha deve ter pelo menos 8 dígitos.')
      } else if (!/[@!\-_#.]/.test(this.account.password)) {
        this.validationErrors.password.push("Sua senha deve ter algum dos caracteres especiais '#, -, !, _, @, .'")
      }
    },

    async handleRegister () {
      this.loading = true
      this.successMessage = ''
      this.errorMessage = ''

      this.validateFields()

      if (Object.values(this.validationErrors).some(errors => errors.length > 0)) {
        this.loading = false
        return
      }

      const userData = {
        name: this.account.name,
        email: this.account.email,
        password: this.account.password
      }

      try {
        await apiClient.createUser(userData)
        this.successMessage = 'Usuário cadastrado com sucesso!'
      } catch (error) {
        this.errorMessage = 'Erro ao cadastrar o usuário. Tente novamente.'
        console.error('Erro ao cadastrar:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  max-width: 500px;
  margin: 0 auto;
}
</style>
