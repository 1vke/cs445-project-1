<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import DeviceListItem from './DeviceListItem.vue';
import { useDeviceStore } from '../stores/deviceStore';
import { useEventStore } from '../stores/eventStore';
import { useSettingsStore } from '../stores/settingsStore';

const props = defineProps({
    device: {
        type: Object,
        required: true
    },
    isMobile: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close']);

const deviceStore = useDeviceStore();
const eventStore = useEventStore();
const settingsStore = useSettingsStore();

const editedDevice = ref({
    name: props.device.name,
    location: props.device.statusText
});

// Computed object to pass to the preview component
const previewDevice = computed(() => ({
    ...props.device,
    name: editedDevice.value.name || 'Device Name',
    statusText: editedDevice.value.location || 'Location'
}));

function handleUpdate() {
    if (!editedDevice.value.name) return;

    deviceStore.updateDevice(props.device.id, {
        name: editedDevice.value.name,
        statusText: editedDevice.value.location
    });

    eventStore.addEvent(editedDevice.value.name, 'Updated settings');
    emit('close');
}

function handleDelete() {
    deviceStore.removeDevice(props.device.id);
    eventStore.addEvent(props.device.name, 'Removed from system');
    emit('close');
}
</script>

<template>
    <div :class="['manage-device-form flex flex-column', { 'h-full': isMobile }]">
        <header class="app-bar flex align-items-center justify-content-between px-4 pt-5 pb-3">
            <h1 class="m-0 text-2xl font-medium text-color">Manage device</h1>
            <Button icon="pi pi-times" text rounded @click="$emit('close')" aria-label="Close" />
        </header>

        <div class="form-content flex-1 overflow-y-auto px-4 py-4 flex flex-column gap-6">
            <div class="flex flex-column gap-5">
                <!-- Live Preview -->
                <div class="flex flex-column gap-2">
                    <span class="text-sm text-secondary font-medium px-1">Preview</span>
                    <div class="preview-container border-1 surface-border border-round-lg overflow-hidden">
                        <DeviceListItem :device="previewDevice" />
                    </div>
                </div>

                <div class="flex flex-column gap-2 mt-2">
                    <FloatLabel>
                        <InputText id="deviceName" v-model="editedDevice.name" class="w-full" />
                        <label for="deviceName">Device name</label>
                    </FloatLabel>
                </div>

                <FloatLabel>
                    <Select id="location" v-model="editedDevice.location" :options="settingsStore.locations" class="w-full" />
                    <label for="location">Device location</label>
                </FloatLabel>
            </div>

            <div class="mt-auto pt-4 flex flex-column gap-3">
                <Button 
                    label="Save changes" 
                    icon="pi pi-check" 
                    rounded 
                    class="w-full py-3"
                    :disabled="!editedDevice.name"
                    @click="handleUpdate"
                />
                <Button 
                    label="Delete device" 
                    icon="pi pi-trash" 
                    rounded 
                    severity="danger" 
                    variant="text"
                    class="w-full py-3"
                    @click="handleDelete"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.manage-device-form {
    background-color: var(--p-content-background, white);
}

.size-3rem {
    width: 3rem;
    height: 3rem;
}

@media (max-width: 768px) {
    .manage-device-form {
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
