<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 50px" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-space></q-space>
          <q-toolbar-title>
            <strong>MyNotes</strong>
          </q-toolbar-title>
          <q-space></q-space>
          <q-input
            v-model="searchQuery"
            label="Buscar Nota pelo Título"
            debounce="300"
            outlined
            class="header-search"
            @keyup.enter="searchNotes"
            style="width: 500px;"
          />
          <q-btn icon="search" @click="searchNotes" class="q-mr-xs" flat round dense />
          <q-btn flat round dense icon="logout" @click="handleLogout" />
        </q-toolbar>
      </q-header>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data () {
    return {
      searchQuery: ''
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
    }
  }
}
</script>

<style scoped>
.header-search {
  margin: 0 16px;
}
</style>
