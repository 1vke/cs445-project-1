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

        <div class="action-container flex align-items-center gap-2">
            <Button
                icon="pi pi-ellipsis-v"
                text
                rounded
                severity="secondary"
                aria-label="Manage Device"
                @click.stop="$emit('manage', device.id)"
            />

            <!-- Toggle Controls (Lights, Sockets) -->
            <div v-if="device.controlType === 'toggle'" @click.stop="$emit('toggle', device.id)">
                <Button
                    v-if="device.isOn"
                    icon="pi pi-sun"
                    rounded
                    severity="primary"
                    aria-label="Toggle Off"
                />
                <Button
                    v-else
                    icon="pi pi-moon"
                    rounded
                    severity="secondary"
                    outlined
                    aria-label="Toggle On"
                />
            </div>

            <!-- Lock Controls -->
            <div v-else-if="device.controlType === 'lock'" @click.stop="$emit('toggle', device.id)">
                <Button
                    v-if="device.isLocked"
                    icon="pi pi-lock"
                    rounded
                    severity="danger"
                    aria-label="Unlock"
                />
                <Button
                    v-else
                    icon="pi pi-lock-open"
                    rounded
                    severity="success"
                    aria-label="Lock"
                />
            </div>

            <!-- Temperature Controls -->
            <div v-else-if="device.controlType === 'temperature'" class="flex align-items-center gap-2" @click.stop>
                <span class="text-lg font-medium mr-2">{{ device.value }}°</span>
                <Button
                    icon="pi pi-minus"
                    rounded
                    size="small"
                    severity="secondary"
                    outlined
                    @click="updateTemp(-1)"
                />
                <Button
                    icon="pi pi-plus"
                    rounded
                    size="small"
                    severity="secondary"
                    outlined
                    @click="updateTemp(1)"
                />
            </div>

            <!-- Action Controls (Camera, Air Fryer) -->
            <div v-else-if="device.controlType === 'action'" @click.stop>
                <Button
                    :label="device.actionLabel || 'Action'"
                    size="small"
                    rounded
                    severity="secondary"
                    outlined
                    @click="$emit('action', device.id)"
                />
            </div>
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

const emit = defineEmits(['toggle', 'manage', 'updateStatus', 'action']);

const title = computed(() => props.device.name);
const description = computed(() => {
    if (props.device.controlType === 'temperature') return `${props.device.statusText} • ${props.device.value}°F`;
    if (props.device.controlType === 'lock') return `${props.device.statusText} • ${props.device.isLocked ? 'Locked' : 'Unlocked'}`;
    if (props.device.controlType === 'toggle') return `${props.device.statusText} • ${props.device.isOn ? 'On' : 'Off'}`;
    return props.device.statusText || 'Offline';
});
const icon = computed(() => props.device.icon || 'pi pi-box');

function updateTemp(delta) {
    const newVal = (props.device.value || 72) + delta;
    emit('updateStatus', { id: props.device.id, value: newVal });
}
</script>

<style scoped>
.device-icon {
    background-color: var(--surface-200);
    width: 3.5rem;
    height: 3.5rem;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
}
</style>
