<template>
  <div class="create-note-container">
    <q-btn
      class="open-dialog-btn"
      color="primary"
      round
      icon="add_circle"
      @click="openDialog = true"
      size="xl"
    />
    <q-dialog v-model="openDialog">
      <q-card class="custom-card">
        <q-card-section class="dialog-header bg-primary text-white">
          <div class="text-h6">Criar Nota</div>
        </q-card-section>

        <q-card-section class="q-pa-md dialog-content">
          <div class="column">
            <q-input
              v-model="title"
              label="Título"
              filled
              class="input-title"
            />
            <q-input
              v-model="content"
              filled
              type="textarea"
              label="Conteúdo"
              class="input-content"
            />
          </div>
        </q-card-section>
        <q-banner v-if="successMessage" class="msg text-positive">
        {{ successMessage }}
        </q-banner>

        <q-banner v-if="errorMessage" class="msg text-negative">
        {{ errorMessage }}
        </q-banner>

        <q-card-actions>
          <q-btn flat label="Fechar" @click="closeDialog" />
          <q-btn color="primary" label="OK" @click="handleCreateNote" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import apiClient from 'src/services/api.js'
export default {
  name: 'CreateNoteComponent',
  data () {
    return {
      openDialog: false,
      title: '',
      content: '',
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {

    async handleCreateNote () {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const noteData = {
          title: this.title,
          content: this.content,
          userId: user.user.id
        }
        if (user) {
          const response = await apiClient.createNote(noteData)
          console.log(response)
          this.closeDialog()
          this.successMessage = 'Nota criada com sucesso!'
          this.$emit('noteCreated')
          this.clearFields()
        }
      } catch (error) {
        console.error('Erro ao buscar notas', error)
        this.errorMessage = 'Erro ao salvar a nota, tente novamente.'
      }
    },
    closeDialog () {
      this.openDialog = false
    },
    clearFields () {
      this.title = ''
      this.content = ''
      this.successMessage = ''
      this.errorMessage = ''
    }
  }
}
</script>

<style scoped>
.create-note-container {
  position: relative;
}

.open-dialog-btn {
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 1000;
}

.my-card {
  height: 250px;
  margin: 20px;
  font-family: 'DM Sans';
}
.custom-card {
  width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
.dialog-header {
  border-bottom: 1px solid #e0e0e0;
}

.input-title,
.input-content {
  margin-bottom: 16px;
}
</style>
