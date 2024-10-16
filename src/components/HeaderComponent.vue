<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 85px" class="shadow-2 rounded-borders">
      <q-header elevated>
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
            class="header-search"
            @keyup.enter="searchNotes"
            style="width: 500px;"
            outlined
            clearable
          >
            <template v-slot:append>
              <q-icon name="search" class="bg-primary btn-search" />
            </template>
          </q-input>
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

.header-search {
  margin: 15px;
  background-color: #ffffff;
  border-radius: 10px;
}
.q-field__label--float{
  border-radius: 10px;
}
.q-btn {
  color: white;
}
.btn-search {
  border-radius: 50px;
  width: 40px;
  height: 40px;
  color: white;
}
.btn-search:hover {
  background-color: rgb(8, 68, 172)
}
.q-header{
  background-color: #999;
  font-family: 'DM Sans';
}
</style>
