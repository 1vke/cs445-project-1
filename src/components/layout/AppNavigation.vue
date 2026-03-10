<script setup>
import AppNavigationItem from './AppNavigationItem.vue';
</script>

<template>
    <nav
        class="app-navigation flex md:flex-column align-items-center md:pt-7 p-2 md:justify-content-start justify-content-around w-full md:w-auto gap-2"
    >
        <AppNavigationItem to="/" icon="pi pi-home" label="Devices" />
        <AppNavigationItem to="/events" icon="pi pi-receipt" label="Events" />
        <AppNavigationItem to="/settings" icon="pi pi-cog" label="Settings" />
    </nav>
</template>

<style scoped>
.app-navigation {
    background-color: var(--surface-section);
    border-top: 1px solid var(--surface-border);
}

@media (min-width: 769px) {
    .app-navigation {
        width: 72px;
        background-color: transparent;
        border-top: none;
    }
}
</style>
