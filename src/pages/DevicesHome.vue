<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import DeviceListItem from '../components/DeviceListItem.vue';

const devicesStore = ref([
    {
        id: 1,
        name: 'Living Room Light',
        statusText: 'Supporting line text lorem ipsum dolor sit amet.',
        icon: 'pi pi-image',
        isOn: true,
    },
    {
        id: 2,
        name: 'Kitchen Thermostat',
        statusText: 'Supporting line text lorem ipsum dolor sit amet.',
        icon: 'pi pi-image',
        isOn: false,
    },
    {
        id: 3,
        name: 'Bedroom Light',
        statusText: 'Supporting line text lorem ipsum dolor sit amet.',
        icon: 'pi pi-image',
        isOn: true,
    },
    {
        id: 4,
        name: 'Front Door Lock',
        statusText: 'Supporting line text lorem ipsum dolor sit amet.',
        icon: 'pi pi-image',
        isOn: false,
    },
    {
        id: 5,
        name: 'Garage Camera',
        statusText: 'Supporting line text lorem ipsum dolor sit amet.',
        icon: 'pi pi-image',
        isOn: false,
    },
]);

function handleToggle(deviceId) {
    const device = devicesStore.value.find((d) => d.id === deviceId);
    if (device) {
        device.isOn = !device.isOn;
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
            <DataView :value="devicesStore" layout="list">
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
