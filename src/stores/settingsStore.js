import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const theme = ref('light');
    const notificationsEnabled = ref(true);
    const userName = ref('User');

    function updateTheme(newTheme) {
        theme.value = newTheme;
    }

    function toggleNotifications() {
        notificationsEnabled.value = !notificationsEnabled.value;
    }

    function updateUserName(name) {
        userName.value = name;
    }

    return { 
        theme, 
        notificationsEnabled, 
        userName, 
        updateTheme, 
        toggleNotifications, 
        updateUserName 
    };
}, {
    persist: true,
});
