<template>
  <q-page class="q-pa-md">
    <div class="mynoteslogo">
      <img class="logo" src="../images/logo.svg" alt="logo mynotes">
      <h2>MyNotes</h2>
    </div>
    <div class="register-page q-gutter-md">
      <h1 class="text-h5">Bem-vindo à MyNotes</h1>
      <h2 class="text-h5">Já tem uma conta? <RouterLink to="/login" class="link">Logue-se</RouterLink></h2>

      <q-form @submit.prevent="handleRegister" class="q-gutter-md">
        <div>
          <h3 class="input-title">Nome</h3>
          <q-input
            v-model="account.name"
            placeholder="Insira seu nome"
            outlined
            rounded
            clearable
            required
            :disable="loading"
          />
          <div v-for="error in validationErrors.name" :key="error" class="text-negative">
            {{ error }}
          </div>
        </div>

        <div>
          <h3 class="input-title">Email</h3>
          <q-input
            v-model="account.email"
            type="email"
            placeholder="Insira seu email"
            outlined
            rounded
            clearable
            required
            :disable="loading"
          />
          <div v-for="error in validationErrors.email" :key="error" class="text-negative">
            {{ error }}
          </div>
        </div>

        <div>
          <h3 class="input-title">Senha</h3>
          <q-input
            v-model="account.password"
            type="password"
            placeholder="Insira sua senha"
            outlined
            rounded
            clearable
            required
            :disable="loading"
          />
          <div v-for="error in validationErrors.password" :key="error" class="text-negative">
            {{ error }}
          </div>
        </div>

        <div>
          <q-btn type="submit" label="Cadastrar" color="primary" :loading="loading" />
        </div>
      </q-form>

      <q-banner v-if="successMessage" class="msg text-positive">
        {{ successMessage }}
      </q-banner>

      <q-banner v-if="errorMessage" class="msg text-negative">
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

    async handleRegister() {
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
        const response = await apiClient.createUser(userData)
        this.successMessage = 'Usuário cadastrado com sucesso!'
        const { id, name, email } = response.data
        localStorage.setItem('user', JSON.stringify({ id, name, email }))
        sessionStorage.setItem('user', JSON.stringify({ id, name, email }))
        this.$router.push('/')
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
*{
  background-color: #E5E5E5;
}
.q-page {
  height: 100vh;
  overflow: hidden;
}
.register-page {
  max-width: 500px;
  margin: auto;
  padding: 10px;
  border-radius: 8px;
  font-family: 'DM Sans';
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

h1 {
  text-align: center;
  margin-bottom: 0px;
  font-weight: 700;
}

h2 {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 20px;
  margin-top: 10x;
}

.input-title {
  font-size: 1em;
  margin-bottom: 2px;
  color: #333;
}

.q-input {
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 50px;
}

.q-btn {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 50px;
}

.q-banner {
  margin-top: 15px;
  border-radius: 8px;
  padding: 10px;
}

.text-h5 {
  color: #333;
}

.register-page .text-white {
  color: #fff;
}

.mynoteslogo {
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.4em;
  opacity: 0.3;
  font-family: 'DM Sans';
}

.logo {
  width: 30px;
  height: auto;
  margin-right: 7px;
  display: flex;
  justify-content: center;
}

.msg{
  margin-top: 0px;
  padding: 0px;
  text-align: center;
  justify-content: center;
}
.link{
  color: #007bff;
  text-decoration: none;
}
</style>
