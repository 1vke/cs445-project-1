<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import FloatLabel from 'primevue/floatlabel';
import { useSettingsStore } from '../stores/settingsStore';

const settingsStore = useSettingsStore();
const { theme, notificationsEnabled, userName, locations } = storeToRefs(settingsStore);

const newLocationName = ref('');

function handleAddLocation() {
    if (newLocationName.value.trim()) {
        settingsStore.addLocation(newLocationName.value.trim());
        newLocationName.value = '';
    }
}

const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' }
];
</script>

<template>
    <div class="settings flex flex-column h-full">
        <header class="app-bar px-4 pt-5 pb-3">
            <h1 class="m-0 text-4xl font-medium text-color">Settings</h1>
        </header>

        <div class="settings-content flex-1 overflow-y-auto px-4 pb-4 pt-4">
            <div class="flex flex-column gap-6">
                <!-- Profile Section -->
                <section>
                    <h2 class="text-xl font-medium mb-4">Profile</h2>
                    <div class="flex flex-column gap-4">
                        <FloatLabel>
                            <InputText id="username" v-model="userName" class="w-full" />
                            <label for="username">Your Name</label>
                        </FloatLabel>
                    </div>
                </section>

                <!-- Preferences Section -->
                <section>
                    <h2 class="text-xl font-medium mb-4">Preferences</h2>
                    <div class="flex flex-column gap-5">
                        <div class="flex align-items-center justify-content-between">
                            <label for="notifications" class="text-lg">Enable Notifications</label>
                            <ToggleSwitch id="notifications" v-model="notificationsEnabled" />
                        </div>
                        
                        <div class="flex flex-column gap-3">
                            <label class="text-lg">Appearance</label>
                            <SelectButton v-model="theme" :options="themeOptions" optionLabel="label" optionValue="value" class="w-full" />
                        </div>
                    </div>
                </section>

                <!-- Locations Section -->
                <section>
                    <h2 class="text-xl font-medium mb-4">Locations</h2>
                    <div class="flex flex-column gap-4">
                        <div class="flex gap-2">
                            <FloatLabel class="flex-1">
                                <InputText id="new-location" v-model="newLocationName" class="w-full" @keyup.enter="handleAddLocation" />
                                <label for="new-location">New Location Name</label>
                            </FloatLabel>
                            <Button icon="pi pi-plus" rounded @click="handleAddLocation" :disabled="!newLocationName.trim()" />
                        </div>
                        
                        <div class="flex flex-wrap gap-2 pt-2">
                            <div v-for="location in locations" :key="location" class="flex align-items-center gap-2 px-3 py-2 surface-100 border-round-3xl">
                                <span>{{ location }}</span>
                                <i class="pi pi-times-circle cursor-pointer opacity-60 hover:opacity-100" @click="settingsStore.removeLocation(location)"></i>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Information Section -->
                <section class="mt-4">
                    <p class="text-sm text-secondary">
                        Version: 1.0.0<br />
                        Data is stored locally in your browser and will persist between sessions. Shoutout pinia.
                    </p>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-bar h1 {
    letter-spacing: 0px;
}
</style>
