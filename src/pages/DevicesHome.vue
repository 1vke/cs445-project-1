<script setup>
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import DeviceListItem from '../components/DeviceListItem.vue';
import { useDeviceStore } from '../stores/deviceStore';
import { useEventStore } from '../stores/eventStore';

const deviceStore = useDeviceStore();
const eventStore = useEventStore();
const { devices } = storeToRefs(deviceStore);

function handleToggle(deviceId) {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
        deviceStore.toggleDevice(deviceId);
        
        const actionText = device.isOn ? 'Turned On' : 'Turned Off';
        eventStore.addEvent(device.name, actionText);
    }
}
</script>

<template>
    <div class="devices-home flex flex-column h-full">
        <header class="app-bar flex align-items-center justify-content-between px-4 pt-5 pb-3">
            <h1 class="m-0 text-4xl font-medium text-color">Devices</h1>
            <Button icon="pi pi-plus" rounded aria-label="Add Device" />
        </header>

        <div class="device-list flex-1 overflow-y-auto pb-4">
            <DataView :value="devices" layout="list">
                <template #list="slotProps">
                    <div class="flex flex-column">
                        <DeviceListItem
                            v-for="(device, index) in slotProps.items"
                            :key="device.id"
                            :device="device"
                            @toggle="handleToggle"
                        />
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>

<style scoped>
.app-bar h1 {
    letter-spacing: 0px;
}
</style>
