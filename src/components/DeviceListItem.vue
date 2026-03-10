<template>
    <div
        class="device-list-item flex align-items-center justify-content-between p-3 select-none transition-colors transition-duration-200 border-round-lg mx-2 my-1"
    >
        <div class="flex align-items-center gap-3">
            <div
                class="device-icon flex align-items-center justify-content-center overflow-hidden surface-200 text-600 border-round-md"
            >
                <i :class="icon" class="text-2xl"></i>
            </div>

            <div class="flex flex-column">
                <span class="text-color text-base font-medium">{{ title }}</span>
                <span class="text-500 text-sm mt-1">{{ description }}</span>
            </div>
        </div>

        <div class="action-container" @click.stop="toggleStatus">
            <Button
                v-if="isActive"
                icon="pi pi-sun"
                rounded
                severity="primary"
                aria-label="Toggle Device Off"
            />
            <Button
                v-else
                icon="pi pi-moon"
                rounded
                severity="secondary"
                outlined
                aria-label="Toggle Device On"
            />
        </div>
    </div>
    <div class="border-bottom-1 surface-border mx-3"></div>
</template>

<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    device: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['toggle']);

const title = computed(() => props.device.name);
const description = computed(() => props.device.statusText || 'Offline');
const icon = computed(() => props.device.icon || 'pi pi-box');
const isActive = computed(() => props.device.isOn);

function toggleStatus() {
    emit('toggle', props.device.id);
}
</script>

<style scoped>
.device-icon {
    background-color: var(--surface-200);
    width: 3.5rem; /* 56px */
    height: 3.5rem;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
}
</style>
