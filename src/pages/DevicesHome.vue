<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import DeviceListItem from '../components/DeviceListItem.vue';
import AddDeviceForm from '../components/AddDeviceForm.vue';
import ManageDeviceForm from '../components/ManageDeviceForm.vue';
import OnboardingFlow from '../components/OnboardingFlow.vue';
import { useDeviceStore } from '../stores/deviceStore';
import { useEventStore } from '../stores/eventStore';
import { useSettingsStore } from '../stores/settingsStore';

const deviceStore = useDeviceStore();
const eventStore = useEventStore();
const settingsStore = useSettingsStore();
const toast = useToast();
const { devices } = storeToRefs(deviceStore);

const showAddDevice = ref(false);
const showManageDevice = ref(false);
const showOnboarding = ref(!settingsStore.hasCompletedOnboarding);
const selectedDevice = ref(null);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= 768);

function updateWidth() {
    windowWidth.value = window.innerWidth;
}

function handleOnboardingComplete() {
    showOnboarding.value = false;
    showAddDevice.value = true;
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
        
        let actionText = '';
        if (device.controlType === 'toggle') actionText = device.isOn ? 'Turned On' : 'Turned Off';
        if (device.controlType === 'lock') actionText = device.isLocked ? 'Locked' : 'Unlocked';

        eventStore.addEvent(device.name, actionText);
    }
}

function handleUpdateStatus({ id, value }) {
    const device = devices.value.find((d) => d.id === id);
    if (device) {
        deviceStore.updateDeviceStatus(id, value);
        eventStore.addEvent(device.name, `Changed to ${value}°F`);
    }
}

function handleAction(deviceId) {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
        const action = device.actionLabel || 'Performed Action';
        eventStore.addEvent(device.name, action);
        
        toast.add({
            severity: 'info',
            summary: device.name,
            detail: `${action} successful`,
            life: 3000
        });
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
        <Toast />
        <header class="app-bar flex align-items-center justify-content-between px-4 pt-5 pb-3">
            <h1 class="m-0 text-4xl font-medium text-color">Devices</h1>
            <Button icon="pi pi-plus" rounded aria-label="Add Device" @click="showAddDevice = true" />
        </header>

        <div class="device-list flex-1 overflow-y-auto pb-4">
            <div v-if="devices.length === 0" class="flex flex-column align-items-center justify-content-center h-full text-secondary py-8 px-4 text-center">
                <i class="pi pi-plus-circle text-6xl mb-3 text-primary opacity-80"></i>
                <p class="text-xl font-medium mb-2">You don't have any devices yet.</p>
                <p class="text-sm opacity-70 mb-4">Add one to get started and take control of your smart home!</p>
                <Button label="Add Device" icon="pi pi-plus" rounded @click="showAddDevice = true" />
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
                            @updateStatus="handleUpdateStatus"
                            @action="handleAction"
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
            :pt="{ content: { class: 'p-0' } }"
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
            :pt="{ content: { class: 'p-0' } }"
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

        <Dialog 
            v-if="!isMobile"
            v-model:visible="showOnboarding"
            modal 
            :closable="false"
            :showHeader="false"
            :style="{ width: '450px' }"
            :pt="{ content: { class: 'p-0' } }"
            class="p-0 overflow-hidden"
        >
            <OnboardingFlow :isMobile="false" @complete="handleOnboardingComplete" />
        </Dialog>

        <Transition name="slide-up">
            <OnboardingFlow 
                v-if="isMobile && showOnboarding" 
                :isMobile="true" 
                @complete="handleOnboardingComplete" 
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
