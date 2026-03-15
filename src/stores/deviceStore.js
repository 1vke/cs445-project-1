import { defineStore } from 'pinia';
import { ref } from 'vue';
import { INITIAL_DEVICES } from '../data/deviceDefinitions';

export const useDeviceStore = defineStore('device', () => {
    const devices = ref(INITIAL_DEVICES);

    function toggleDevice(id) {
        const device = devices.value.find((d) => d.id === id);
        if (device) {
            if (device.controlType === 'toggle') {
                device.isOn = !device.isOn;
            } else if (device.controlType === 'lock') {
                device.isLocked = !device.isLocked;
            }
        }
    }

    function updateDeviceStatus(id, value) {
        const device = devices.value.find((d) => d.id === id);
        if (device) {
            device.value = value;
        }
    }

    function addDevice(device) {
        devices.value.push({
            id: Date.now(),
            isOn: false,
            isLocked: true,
            value: 72,
            ...device
        });
    }

    function updateDevice(id, updatedData) {
        const index = devices.value.findIndex(d => d.id === id);
        if (index !== -1) {
            devices.value[index] = { ...devices.value[index], ...updatedData };
        }
    }

    function removeDevice(id) {
        devices.value = devices.value.filter(d => d.id !== id);
    }

    return { 
        devices, 
        toggleDevice, 
        updateDeviceStatus, 
        addDevice, 
        updateDevice, 
        removeDevice 
    };
}, {
    persist: true,
});
