import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDeviceStore = defineStore('device', () => {
    const devices = ref([]);

    function toggleDevice(id) {
        const device = devices.value.find((d) => d.id === id);
        if (device) {
            device.isOn = !device.isOn;
        }
    }

    function addDevice(device) {
        devices.value.push({
            id: Date.now(),
            isOn: false,
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

    return { devices, toggleDevice, addDevice, updateDevice, removeDevice };
}, {
    persist: true,
});
