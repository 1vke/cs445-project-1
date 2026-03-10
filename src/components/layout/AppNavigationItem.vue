<script setup>
defineProps({
    to: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <router-link :to="to" custom v-slot="{ navigate, isActive }">
        <div
            @click="navigate"
            class="nav-item flex flex-column align-items-center cursor-pointer p-2 border-round"
            :class="{ 'active-nav': isActive }"
        >
            <div
                class="icon-container flex align-items-center justify-content-center border-round-2xl transition-colors transition-duration-200"
            >
                <i
                    :class="[
                        icon,
                        'text-lg md:text-xl',
                        { 'text-primary': isActive, 'text-600': !isActive },
                    ]"
                ></i>
            </div>
            <span
                class="text-xs font-medium mt-1 transition-colors transition-duration-200"
                :class="{ 'text-primary': isActive, 'text-600': !isActive }"
                >{{ label }}</span
            >
        </div>
    </router-link>
</template>

<style scoped>
.icon-container {
    width: 2.5rem;
    height: 1.5rem;
}

@media (min-width: 769px) {
    .icon-container {
        width: 3.5rem;
        height: 2rem;
    }
}

.active-nav .icon-container {
    background-color: var(--primary-100);
}
</style>
