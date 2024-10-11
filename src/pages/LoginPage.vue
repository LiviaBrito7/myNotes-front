<template>
  <q-page class="q-pa-md">
    <div class="mynoteslogo">
      <img class="logo" src="../images/logo.svg" alt="logo mynotes">
      <h2>MyNotes</h2>
    </div>
    <div class="login-page q-gutter-md">
      <h1 class="text-h5">Faça login em sua conta!</h1>
      <h2 class="text-h5">Ainda não tem uma conta? <RouterLink to="/register" class="link">Registre-se</RouterLink></h2>

      <q-form @submit.prevent="handleLogin" class="q-gutter-md">
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
        </div>

        <div>
          <q-btn type="submit" label="Entrar" color="primary" :loading="loading" />
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
  name: 'LoginPage',
  data () {
    return {
      loading: false,
      successMessage: '',
      errorMessage: '',
      account: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      this.loading = true
      this.successMessage = ''
      this.errorMessage = ''

      const credentials = {
        email: this.account.email,
        password: this.account.password
      }

      try {
        const response = await apiClient.loginUser(credentials)
        const token = response.data.token
        const user = response.data
        localStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('user', JSON.stringify(user))
        this.$router.push('/home')
        localStorage.setItem('token', token)
        sessionStorage.setItem('token', token)
        this.successMessage = 'Usuário logado com sucesso!'
      } catch (error) {
        this.errorMessage = 'Erro ao logar o usuário. Tente novamente.'
        console.error('Erro ao logar:', error)
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
.login-page {
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
  margin-top: 10px;
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

.login-page .text-white {
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

.msg {
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
