<template>
  <div class="app-shell">
    <NavBar />
    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
}

.app-main {
  min-height: calc(100vh - 72px);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
