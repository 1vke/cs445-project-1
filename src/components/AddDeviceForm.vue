<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import { useDeviceStore } from '../stores/deviceStore';
import { useEventStore } from '../stores/eventStore';
import { useSettingsStore } from '../stores/settingsStore';
import { DEVICE_TYPES } from '../data/deviceDefinitions';

const props = defineProps({
    isMobile: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close']);

const deviceStore = useDeviceStore();
const eventStore = useEventStore();
const settingsStore = useSettingsStore();

const newDevice = ref({
    name: '',
    type: null,
    location: null
});

function handleCreate() {
    if (!newDevice.value.name || !newDevice.value.type) return;

    const deviceData = {
        name: newDevice.value.name,
        type: newDevice.value.type.value,
        controlType: newDevice.value.type.controlType,
        actionLabel: newDevice.value.type.actionLabel,
        statusText: newDevice.value.location || 'Unknown location',
        icon: newDevice.value.type.icon,
        value: 72,
        isLocked: true,
        isOn: false
    };

    deviceStore.addDevice(deviceData);
    eventStore.addEvent(deviceData.name, 'Added to system');
    
    emit('close');
}
</script>

<template>
    <div :class="['add-device-form flex flex-column', { 'h-full': isMobile }]">
        <header class="app-bar flex align-items-center justify-content-between px-4 pt-5 pb-3">
            <div class="flex align-items-center gap-2">
                <Button v-if="isMobile" icon="pi pi-chevron-left" text rounded @click="$emit('close')" aria-label="Back" />
                <h1 class="m-0 text-2xl font-medium text-color">Add device</h1>
            </div>
            <Button icon="pi pi-times" text rounded @click="$emit('close')" aria-label="Close" />
        </header>

        <div class="form-content flex-1 overflow-y-auto px-4 py-4 flex flex-column gap-6">
            <div class="flex flex-column gap-5">
                <FloatLabel>
                    <Select
                        id="deviceType"
                        v-model="newDevice.type"
                        :options="DEVICE_TYPES"
                        optionLabel="label"
                        class="w-full"
                    >
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <i :class="slotProps.option.icon"></i>
                                <span>{{ slotProps.option.label }}</span>
                            </div>
                        </template>
                    </Select>
                    <label for="deviceType">Device type</label>
                </FloatLabel>

                <div class="flex flex-column gap-2">
                    <FloatLabel>
                        <InputText id="deviceName" v-model="newDevice.name" class="w-full" />
                        <label for="deviceName">Device name</label>
                    </FloatLabel>
                    <small class="text-secondary px-1">Enter a friendly name for your device.</small>
                </div>

                <FloatLabel>
                    <Select id="location" v-model="newDevice.location" :options="settingsStore.locations" class="w-full" />
                    <label for="location">Device location</label>
                </FloatLabel>
            </div>

            <div class="mt-auto pt-4 flex justify-content-center">
                <Button 
                    label="Create device" 
                    icon="pi pi-plus" 
                    rounded 
                    class="w-full max-w-20rem py-3"
                    :disabled="!newDevice.name || !newDevice.type"
                    @click="handleCreate"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-device-form {
    background-color: var(--p-content-background, white);
}

@media (max-width: 768px) {
    .add-device-form {
        background-color: var(--p-content-background, white);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
    }
}
</style>
