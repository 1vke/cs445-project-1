<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Dialog from 'primevue/dialog';
import DeviceListItem from '../components/DeviceListItem.vue';
import AddDeviceForm from '../components/AddDeviceForm.vue';
import ManageDeviceForm from '../components/ManageDeviceForm.vue';
import { useDeviceStore } from '../stores/deviceStore';
import { useEventStore } from '../stores/eventStore';

const deviceStore = useDeviceStore();
const eventStore = useEventStore();
const { devices } = storeToRefs(deviceStore);

const showAddDevice = ref(false);
const showManageDevice = ref(false);
const selectedDevice = ref(null);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= 768);

function updateWidth() {
    windowWidth.value = window.innerWidth;
}

onMounted(() => {
    window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});

function handleToggle(deviceId) {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
        deviceStore.toggleDevice(deviceId);
        
        const actionText = device.isOn ? 'Turned On' : 'Turned Off';
        eventStore.addEvent(device.name, actionText);
    }
}

function handleManage(deviceId) {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
        selectedDevice.value = device;
        showManageDevice.value = true;
    }
}
</script>

<template>
    <div class="devices-home flex flex-column h-full">
        <header class="app-bar flex align-items-center justify-content-between px-4 pt-5 pb-3">
            <h1 class="m-0 text-4xl font-medium text-color">Devices</h1>
            <Button icon="pi pi-plus" rounded aria-label="Add Device" @click="showAddDevice = true" />
        </header>

        <div class="device-list flex-1 overflow-y-auto pb-4">
            <div v-if="devices.length === 0" class="flex flex-column align-items-center justify-content-center h-full text-secondary py-8">
                <i class="pi pi-plus-circle text-6xl mb-3 opacity-50"></i>
                <p class="text-xl">No devices added yet.</p>
                <p class="text-sm opacity-70 text-center px-4">Tap the + button to add your first smart device.</p>
            </div>

            <DataView v-else :value="devices" layout="list">
                <template #list="slotProps">
                    <div class="flex flex-column">
                        <DeviceListItem
                            v-for="(device, index) in slotProps.items"
                            :key="device.id"
                            :device="device"
                            @toggle="handleToggle"
                            @manage="handleManage"
                        />
                    </div>
                </template>
            </DataView>
        </div>

        <!-- Add Device Modal/Page -->
        <Dialog 
            v-if="!isMobile"
            v-model:visible="showAddDevice" 
            modal 
            :closable="false"
            :showHeader="false"
            :style="{ width: '450px' }"
            class="p-0 overflow-hidden"
        >
            <AddDeviceForm :isMobile="false" @close="showAddDevice = false" />
        </Dialog>

        <Transition name="slide-up">
            <AddDeviceForm 
                v-if="isMobile && showAddDevice" 
                :isMobile="true" 
                @close="showAddDevice = false" 
            />
        </Transition>

        <!-- Manage Device Modal/Page -->
        <Dialog 
            v-if="!isMobile"
            v-model:visible="showManageDevice" 
            modal 
            :closable="false"
            :showHeader="false"
            :style="{ width: '450px' }"
            class="p-0 overflow-hidden"
        >
            <ManageDeviceForm v-if="selectedDevice" :device="selectedDevice" :isMobile="false" @close="showManageDevice = false" />
        </Dialog>

        <Transition name="slide-up">
            <ManageDeviceForm 
                v-if="isMobile && showManageDevice" 
                :device="selectedDevice"
                :isMobile="true" 
                @close="showManageDevice = false" 
            />
        </Transition>
    </div>
</template>

<style scoped>
.app-bar h1 {
    letter-spacing: 0px;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}
</style>
