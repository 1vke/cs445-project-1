import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEventStore = defineStore('event', () => {
    const events = ref([]);

    function addEvent(deviceName, action) {
        events.value.unshift({
            id: Date.now(),
            deviceName,
            action,
            timestamp: new Date().toLocaleString(),
        });
        
        // Keep only last 50 events
        if (events.value.length > 50) {
            events.value = events.value.slice(0, 50);
        }
    }

    return { events, addEvent };
}, {
    persist: true,
});
