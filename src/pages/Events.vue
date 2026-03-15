<script setup>
import { storeToRefs } from 'pinia';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
const { events } = storeToRefs(eventStore);

function handleClear() {
    eventStore.clearEvents();
}

function getIcon(action) {
    if (action.toLowerCase().includes('on')) return 'pi pi-sun text-yellow-500';
    if (action.toLowerCase().includes('off')) return 'pi pi-moon text-blue-500';
    return 'pi pi-info-circle text-primary';
}
</script>

<template>
    <div class="events flex flex-column h-full">
        <header class="app-bar flex align-items-center justify-content-between px-4 pt-5 pb-3">
            <h1 class="m-0 text-4xl font-medium text-color">Events</h1>
            <Button 
                label="Clear" 
                icon="pi pi-trash" 
                size="small" 
                severity="danger" 
                text 
                rounded
                @click="handleClear" 
                :disabled="events.length === 0"
            />
        </header>

        <div class="events-content flex-1 overflow-y-auto pb-4">
            <div v-if="events.length === 0" class="flex flex-column align-items-center justify-content-center h-full text-secondary py-8">
                <i class="pi pi-history text-6xl mb-3 opacity-50"></i>
                <p class="text-xl">No events logged yet.</p>
                <p class="text-sm opacity-70">Control your devices to see activity here.</p>
            </div>
            
            <DataView v-else :value="events" layout="list">
                <template #list="slotProps">
                    <div class="flex flex-column">
                        <div v-for="(event, index) in slotProps.items" :key="event.id" class="event-item p-3 mx-2 my-1 border-round-lg transition-colors">
                            <div class="flex align-items-center justify-content-between gap-3">
                                <div class="flex align-items-center gap-3">
                                    <div class="event-icon-container flex align-items-center justify-content-center surface-100 border-round-md">
                                        <i :class="getIcon(event.action)" class="text-xl"></i>
                                    </div>
                                    <div class="flex flex-column">
                                        <span class="text-color text-base font-medium">{{ event.deviceName }}</span>
                                        <span class="text-500 text-sm mt-1">{{ event.action }}</span>
                                    </div>
                                </div>
                                <div class="text-right flex flex-column align-items-end">
                                    <span class="text-xs text-secondary opacity-70">{{ event.timestamp }}</span>
                                </div>
                            </div>
                            <div v-if="index < slotProps.items.length - 1" class="border-bottom-1 surface-border mt-3 mx-2"></div>
                        </div>
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

.event-icon-container {
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
}

.event-item:hover {
    background-color: var(--surface-hover);
}
</style>
