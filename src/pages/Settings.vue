<script setup>
import { storeToRefs } from 'pinia';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import FloatLabel from 'primevue/floatlabel';
import { useSettingsStore } from '../stores/settingsStore';

const settingsStore = useSettingsStore();
const { theme, notificationsEnabled, userName } = storeToRefs(settingsStore);

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
