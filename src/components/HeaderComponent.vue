<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders" style="height: 85px;">
      <q-header elevated>
        <q-toolbar class="toolbar-content">
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title class="toolbar-title">
            <q-icon name="sticky_note_2" color="bg-primary" />
            <strong>MyNotes</strong>
          </q-toolbar-title>
          <q-input
            v-model="searchQuery"
            label="Buscar Nota pelo Título"
            class="header-search"
            @keyup.enter="searchNotes"
            style="width: 500px;"
            outlined
            clearable
          >
            <template v-slot:append>
              <q-icon name="search" @click="searchNotes" class="bg-primary btn-search"  />
            </template>
          </q-input>
          <q-btn flat round dense icon="logout" @click="handleLogout" color="primary" class="q-ml-sm" />
          <q-btn
            flat
            round
            dense
            icon="account_circle"
            @click.stop="userMenu = !userMenu"
            color="primary"
            class="q-ml-sm"
            ref="userButton"
          />
          <q-menu
            v-model="userMenu"
            @hide="userMenu = false"
            transition-show="scale"
            transition-hide="scale"
            auto-close
            class="menu"
            anchor="top right"
            self="top right"
          >
            <q-list class="menu">
              <q-item clickable @click="EditDialog">
                <q-item-section>Editar Usuário</q-item-section>
              </q-item>
              <q-item clickable @click="deleteUser">
                <q-item-section class="text-negative">Deletar Usuário</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-toolbar>
      </q-header>
    </q-layout>

    <q-dialog v-model="openEditDialog">
      <q-card class="custom-card">
        <q-card-section class="dialog-header bg-primary text-white">
          <div class="text-h6">Editar Usuário</div>
        </q-card-section>

        <q-card-section class="q-pa-md dialog-content">
          <div class="column">
            <q-input
              v-model="name"
              label="Nome"
              filled
              class="input"
            />
            <q-input
              v-model="email"
              filled
              label="E-mail"
              class="input"
            />
          </div>
        </q-card-section>

        <q-banner v-if="successMessage" class="msg text-positive">
          {{ successMessage }}
        </q-banner>

        <q-banner v-if="errorMessage" class="msg text-negative">
          {{ errorMessage }}
        </q-banner>

        <q-card-actions >
          <q-btn style="color: black;" flat label="Fechar" @click="closeDialog" />
          <q-btn color="primary" label="OK" @click="handleEditUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import apiClient from 'src/services/api.js'
export default {
  name: 'HeaderComponent',
  data () {
    return {
      searchQuery: '',
      userMenu: false,
      openEditDialog: false,
      name: '',
      email: '',
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    searchNotes () {
      this.$emit('search', this.searchQuery)
    },
    handleLogout () {
      const user = JSON.parse(sessionStorage.getItem('user'))
      localStorage.removeItem('user', JSON.stringify(user))
      sessionStorage.removeItem('user', JSON.stringify(user))
      this.$router.push('/login')
    },
    async EditDialog () {
      const user = JSON.parse(sessionStorage.getItem('user'))
      this.name = user.user.name
      this.email = user.user.email
      this.openEditDialog = true
    },
    async handleEditUser () {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const userId = user.user.id

        const updatedUser = {
          ...(this.name ? { name: this.name } : {}),
          ...(this.email ? { email: this.email } : {})
        }

        if (Object.keys(updatedUser).length > 0) {
          await apiClient.updateUser(userId, updatedUser)
          this.successMessage = 'Usuário atualizado com sucesso!'
          this.errorMessage = ''
        } else {
          this.successMessage = 'Nenhuma alteração foi feita.'
          this.errorMessage = ''
        }
        this.closeDialog()
      } catch (error) {
        console.error(error)
        this.errorMessage = 'Erro ao atualizar o usuário: '
        this.successMessage = ''
      }
    },
    closeDialog () {
      this.openEditDialog = false
      this.name = ''
      this.email = ''
      this.successMessage = ''
      this.errorMessage = ''
    },
    async deleteUser () {
      try {
        const user = sessionStorage.getItem('user')
        const userId = Number(JSON.parse(user).user.id)
        await apiClient.deleteUser(userId)
        localStorage.removeItem('user')
        this.handleLogout()
      } catch (error) {
        console.error('Erro ao deletar o usuário:', error.message)
      }
    }

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

.toolbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.toolbar-title {
  font-family: 'DM Sans';
  color: #1976D2;
  margin: 0 16px;
}

.header-search {
  margin: 15px;
  background-color: #ffffff;
  border-radius: 10px;
}
.q-field__label--float {
  border-radius: 50px;
}

.q-btn {
  color: white;
}
.input{
  margin: 10px;
}
.custom-card {
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
.btn-search {
  border-radius: 50px;
  width: 40px;
  height: 40px;
  color: white;
}

.btn-search:hover {
  background-color: rgb(8, 68, 172);
}

.q-header {
  background-color: white;
  font-family: 'DM Sans';
  color: #1976D2;
}
</style>
