import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const theme = ref('auto');
    const accentColor = ref('emerald');
    const notificationsEnabled = ref(true);
    const userName = ref('User');
    const locations = ref(['Living room', 'Kitchen', 'Master bedroom', 'Guest bedroom', 'Bathroom', 'Garage']);

    function updateTheme(newTheme) {
        theme.value = newTheme;
    }
    
    function updateAccentColor(newColor) {
        accentColor.value = newColor;
    }

    function toggleNotifications() {
        notificationsEnabled.value = !notificationsEnabled.value;
    }

    function updateUserName(name) {
        userName.value = name;
    }

    function addLocation(location) {
        if (location && !locations.value.includes(location)) {
            locations.value.push(location);
        }
    }

    function removeLocation(location) {
        locations.value = locations.value.filter(l => l !== location);
    }

    return { 
        theme, 
        accentColor,
        notificationsEnabled, 
        userName, 
        locations,
        updateTheme, 
        updateAccentColor,
        toggleNotifications, 
        updateUserName,
        addLocation,
        removeLocation
    };
}, {
    persist: true,
});
