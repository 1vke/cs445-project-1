import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDeviceStore = defineStore('device', () => {
    const devices = ref([
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

    function toggleDevice(id) {
        const device = devices.value.find((d) => d.id === id);
        if (device) {
            device.isOn = !device.isOn;
        }
    }

    return { devices, toggleDevice };
}, {
    persist: true,
});
