<script setup>
import AppNavigation from './components/layout/AppNavigation.vue';
</script>

<template>
    <div class="layout-wrapper flex h-screen overflow-hidden app-background">
        <div class="app-max-width flex flex-column-reverse md:flex-row w-full flex-1 mx-auto">
            <AppNavigation />

            <main class="main-content flex-1 flex md:pt-4 md:pr-3 min-w-0 min-h-0">
                <div
                    class="content-container flex-1 surface-card shadow-1 w-full overflow-hidden flex flex-column"
                >
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    padding: 0;
    background-color: var(--surface-ground);
    font-family:
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        Helvetica,
        Arial,
        sans-serif;
    color: var(--text-color);
}

.app-background {
    background-color: var(--surface-ground);
}

.app-max-width {
    max-width: 70rem;
}

.content-container {
    background-color: var(--surface-card);
    border-radius: 0;
}

@media (min-width: 769px) {
    .content-container {
        border-radius: 2rem 2rem 0 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
