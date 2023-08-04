<script setup lang="ts">
import { ref } from 'vue'

const routes = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    icon: 'home'
  },
  {
    id: 2,
    name: 'Users',
    path: '/users',
    icon: 'people'
  },
  {
    id: 3,
    name: 'Posts',
    path: '/posts',
    icon: 'description'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item v-for="route in routes" :key="route.id" :to="route.path">
          <q-item-section>
            <q-icon :name="route.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ route.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
