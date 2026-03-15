export const DEVICE_TYPES = [
    { 
        label: 'Light bulb', 
        value: 'light', 
        icon: 'pi pi-lightbulb', 
        controlType: 'toggle',
        defaultStatus: 'Off'
    },
    { 
        label: 'Socket switch', 
        value: 'socket', 
        icon: 'pi pi-bolt', 
        controlType: 'toggle',
        defaultStatus: 'Off'
    },
    { 
        label: 'LED Lights', 
        value: 'led', 
        icon: 'pi pi-sparkles', 
        controlType: 'toggle',
        defaultStatus: 'Off'
    },
    { 
        label: 'Thermostat', 
        value: 'thermostat', 
        icon: 'pi pi-sliders-h', 
        controlType: 'temperature',
        defaultStatus: '72°F'
    },
    { 
        label: 'Lock', 
        value: 'lock', 
        icon: 'pi pi-lock', 
        controlType: 'lock',
        defaultStatus: 'Locked'
    },
    { 
        label: 'Camera', 
        value: 'camera', 
        icon: 'pi pi-video', 
        controlType: 'action',
        actionLabel: 'View',
        defaultStatus: 'Online'
    },
    { 
        label: 'Air fryer', 
        value: 'airfryer', 
        icon: 'pi pi-box', 
        controlType: 'action',
        actionLabel: 'Start',
        defaultStatus: 'Idle'
    }
];

export const INITIAL_DEVICES = [
];
