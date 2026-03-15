import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDeviceStore = defineStore('device', () => {
    const devices = ref([
        {
            id: 1,
            name: 'Living Room Light',
            statusText: 'Living Room',
            icon: 'pi pi-lightbulb',
            type: 'Light bulb',
            isOn: true,
        },
        {
            id: 2,
            name: 'Kitchen Thermostat',
            statusText: 'Kitchen',
            icon: 'pi pi-thermometer',
            type: 'Thermostat',
            isOn: false,
        },
    ]);

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

    function removeDevice(id) {
        devices.value = devices.value.filter(d => d.id !== id);
    }

    return { devices, toggleDevice, addDevice, removeDevice };
}, {
    persist: true,
});
