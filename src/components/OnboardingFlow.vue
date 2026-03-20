<template>
    <div :class="['onboarding-flow flex flex-column', { 'h-full': isMobile }]">
        <!-- Header Image / Icon Area -->
        <div class="bg-primary-500 text-white flex flex-column align-items-center justify-content-center p-5 text-center" :style="{ minHeight: isMobile ? '30vh' : '200px' }">
            <i :class="steps[currentStep].icon" class="text-6xl mb-3"></i>
            <h2 class="m-0 text-2xl font-bold px-2" style="white-space: normal; word-wrap: break-word;">{{ steps[currentStep].title }}</h2>
            <p class="mt-2 mb-0 opacity-90 line-height-3 px-2" style="white-space: normal; word-wrap: break-word;">{{ steps[currentStep].description }}</p>
        </div>

        <!-- Content Area -->
        <div class="p-4 flex-grow-1 flex flex-column align-items-center justify-content-center surface-0" :style="{ minHeight: isMobile ? '50vh' : '250px' }">
            <!-- Step 1: Welcome (No special preview) -->
            <div v-if="currentStep === 0" class="text-center text-700 w-full px-2" style="white-space: normal; word-wrap: break-word;">
                <p class="mb-3 line-height-3 text-lg font-medium">Welcome to your new Unified Smart Home Manager!</p>
                <p class="mb-3 line-height-3 text-base">Say goodbye to constantly switching between apps.</p>
                <p class="m-0 line-height-3 text-base">Manage all your smart plugs, lights, thermostats, and more from one single, clean dashboard.</p>
            </div>

            <!-- Step 2: Interactive Preview -->
            <div v-if="currentStep === 1" class="w-full max-w-sm">
                <p class="text-center text-600 mb-4 text-sm">
                    It's as easy as tapping a button. Try it out below!
                </p>
                <div class="border-1 surface-border border-round-xl overflow-hidden surface-ground shadow-1">
                    <DeviceListItem 
                        :device="demoDevice" 
                        @toggle="toggleDemoDevice" 
                        @manage="() => {}" 
                        @updateStatus="() => {}" 
                        @action="() => {}" 
                    />
                </div>
                <p v-if="demoDeviceToggled" class="text-center text-primary font-medium mt-3 text-sm animate-fadein">
                    Great job! You've got the hang of it.
                </p>
            </div>

            <!-- Step 3: Call to Action -->
            <div v-if="currentStep === 2" class="text-center w-full px-2" style="white-space: normal; word-wrap: break-word;">
                <div class="surface-100 border-round-xl p-4 mb-4">
                    <i class="pi pi-plus-circle text-4xl text-primary mb-3"></i>
                    <p class="m-0 text-700 text-base line-height-3">
                        Ready to take control? Tap the <strong>+</strong> button on the home screen to add your first device and assign it to a room.
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer / Navigation -->
        <div class="p-3 border-top-1 surface-border flex align-items-center justify-content-between surface-0 mt-auto">
            <div class="flex gap-2">
                <div 
                    v-for="(step, index) in steps" 
                    :key="index"
                    class="border-circle transition-colors transition-duration-200"
                    :class="currentStep === index ? 'bg-primary' : 'surface-300'"
                    style="width: 8px; height: 8px;"
                ></div>
            </div>
            
            <div class="flex gap-2">
                <Button 
                    v-if="currentStep < steps.length - 1" 
                    label="Skip" 
                    text 
                    severity="secondary" 
                    @click="finishOnboarding" 
                />
                <Button 
                    v-if="currentStep < steps.length - 1" 
                    label="Next" 
                    @click="nextStep" 
                />
                <Button 
                    v-else 
                    label="Get Started" 
                    icon="pi pi-check" 
                    iconPos="right" 
                    @click="finishOnboarding" 
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import DeviceListItem from './DeviceListItem.vue';
import { useSettingsStore } from '../stores/settingsStore';

const props = defineProps({
    isMobile: {
        type: Boolean,
        default: false
    }
});

const settingsStore = useSettingsStore();
const emit = defineEmits(['complete']);

const currentStep = ref(0);
const demoDeviceToggled = ref(false);

const demoDevice = ref({
    id: 'demo-1',
    name: 'Living Room Lamp',
    statusText: 'Living Room',
    controlType: 'toggle',
    isOn: false,
    icon: 'pi pi-lightbulb',
});

const steps = [
    {
        title: 'Unified Control',
        description: 'All your devices in one place.',
        icon: 'pi pi-home'
    },
    {
        title: 'Simple Interactions',
        description: 'Fast, frictionless control.',
        icon: 'pi pi-bolt'
    },
    {
        title: 'Setup Your Home',
        description: 'Organize by rooms and locations.',
        icon: 'pi pi-map-marker'
    }
];

function nextStep() {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++;
    }
}

function finishOnboarding() {
    settingsStore.completeOnboarding();
    emit('complete');
}

function toggleDemoDevice() {
    demoDevice.value.isOn = !demoDevice.value.isOn;
    demoDeviceToggled.value = true;
}
</script>

<style scoped>
.onboarding-flow {
    background-color: var(--surface-0);
    z-index: 1000;
}

.onboarding-flow.h-full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.animate-fadein {
    animation: fadein 0.3s ease-in-out;
}

@keyframes fadein {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
