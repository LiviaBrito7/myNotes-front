<template>
  <div class="home-background">
    <HeaderComponent @search="handleSearch" />
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <div v-if="filteredNotes.length === 0" class="col-12 not-found">
          <p>Você ainda não adicionou nenhuma nota.</p>
        </div>
        <div v-for="note in filteredNotes" :key="note.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card
            flat
            bordered
            class="my-card custom-card-bg"
          >
            <q-card-section class="custom-card-section">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6 title">{{ note.title }}</div>
                </div>
                <q-separator dark />
                <div class="col-auto">
                  <q-btn class="options" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list class="menu">
                        <q-item clickable @click="handleDeleteNote(note.id)">
                          <q-item-section>Deletar</q-item-section>
                        </q-item>
                        <q-item clickable @click="openEditDialog(note)">
                          <q-item-section>Editar</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="custom-card-section">
              <p class="content">{{ note.content }}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12">
          <CreateNoteComponent @noteCreated="fetchNotes" />
          <q-dialog v-model="openEditDialogFlag" class="dialog-margin">
            <q-card class="custom-card">
              <q-card-section class="dialog-header bg-primary text-white">
                <div class="text-h6">Editar Nota</div>
              </q-card-section>

              <q-card-section class="q-pa-md dialog-content">
                <div class="column">
                  <q-input v-model="editTitle" label="Título" filled class="input-title" />
                  <q-input v-model="editContent" filled type="textarea" label="Conteúdo" class="input-content" />
                </div>
              </q-card-section>

              <q-banner v-if="successMessage" class="msg text-positive">
                {{ successMessage }}
              </q-banner>

              <q-banner v-if="errorMessage" class="msg text-negative">
                {{ errorMessage }}
              </q-banner>

              <q-card-actions>
                <q-btn label="Fechar" @click="closeEditDialog" />
                <q-btn color="primary" label="Salvar" @click="handleUpdateNote" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from 'src/services/api.js'
import CreateNoteComponent from 'src/components/CreateNoteComponent.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'

export default {
  name: 'HomePage',
  components: {
    CreateNoteComponent,
    HeaderComponent
  },
  data () {
    return {
      notes: [],
      searchQuery: '',
      openEditDialogFlag: false,
      selectedNoteId: null,
      editTitle: '',
      editContent: '',
      successMessage: '',
      errorMessage: ''
    }
  },
  computed: {
    filteredNotes () {
      return this.notes.filter(note =>
        note.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    async fetchNotes () {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (user) {
          const response = await apiClient.getAllNotes('/notes')
          this.notes = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else {
          this.notes = []
          this.$router.push('/login')
        }
      } catch (error) {
        console.error('Erro ao buscar notas', error)
      }
    },
    handleSearch (query) {
      this.searchQuery = query
    },
    async handleDeleteNote (noteId) {
      try {
        await apiClient.deleteNoteById(noteId)
        this.fetchNotes()
      } catch (error) {
        console.error('Erro ao deletar a nota', error)
      }
    },
    openEditDialog (note) {
      this.selectedNoteId = note.id
      this.editTitle = note.title
      this.editContent = note.content
      this.openEditDialogFlag = true
      this.successMessage = ''
      this.errorMessage = ''
    },
    async handleUpdateNote () {
      try {
        const noteData = { title: this.editTitle, content: this.editContent }
        await apiClient.updateNoteById(this.selectedNoteId, noteData)
        this.successMessage = 'Nota atualizada com sucesso!'
        this.closeEditDialog()
        this.fetchNotes()
      } catch (error) {
        console.error('Erro ao atualizar a nota', error)
        this.errorMessage = 'Erro ao atualizar a nota, tente novamente.'
      }
    },
    closeEditDialog () {
      this.openEditDialogFlag = false
      this.selectedNoteId = null
      this.editTitle = ''
      this.editContent = ''
      this.successMessage = ''
      this.errorMessage = ''
    }
  },
  created () {
    this.fetchNotes()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
* {
  margin: 0;
  padding: 0;
}
.home-background {
  background-color: #E5E5E5;
  min-height: 100vh;
}
.not-found {
  text-align: center;
  margin: 30px;
  font-size: 2em;
  font-weight: bold;
}
.title {
  font-size: 1.8em;
  margin: 10px;
  color: black;
  font-weight: bold;
}
.content {
  font-size: 1.5em;
  color: black;
  margin: 10px;
}
.my-card {
  height: 350px;
  margin: 10px;
  font-family: 'DM Sans';
  background-color: white !important;
  border: 1.5px solid #ccc;
  border-radius: 13px;
}
.custom-card {
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
.dialog-header {
  border-bottom: 1px solid #e0e0e0;
}
.dialog-margin{
  margin: 20px;
}
.input-title,
.input-content {
  margin-bottom: 16px;
}
.options{
  color: #007bff;
}
.menu{
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
