<template>
  <div>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="../images/logo.svg">
        </q-avatar>
        <q-toolbar-title>MyNotes</q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>
<style scoped>
.q-header {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
