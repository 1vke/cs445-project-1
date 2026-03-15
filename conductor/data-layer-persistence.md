# Implementation Plan - Data Layer Persistence

The goal is to implement a robust yet simple data layer for the universal smart device controller project, ensuring that devices, events, and settings persist across browser sessions.

## Objective
- Introduce a global state management system using **Pinia**.
- Enable automatic persistence to the browser's `localStorage` using `pinia-plugin-persistedstate`.
- Refactor the current hardcoded data into centralized stores.

## Key Files & Context
- `package.json`: Need to add `pinia` and `pinia-plugin-persistedstate`.
- `src/main.js`: Setup Pinia and the persistence plugin.
- `src/stores/`: New directory for state stores.
- `src/pages/DevicesHome.vue`: Update to use the global device store.
- `src/pages/Events.vue`: Connect to the event log store.
- `src/pages/Settings.vue`: Connect to the settings store.

## Implementation Steps

### Phase 1: Environment Setup
1.  Install dependencies: `npm install pinia pinia-plugin-persistedstate`.
2.  Modify `src/main.js` to create and use the Pinia instance with the persistence plugin.

### Phase 2: Create Data Stores
1.  **Device Store (`src/stores/deviceStore.js`)**:
    -   Define the `useDeviceStore`.
    -   State: Initial list of devices (from current `DevicesHome.vue`).
    -   Actions: `toggleDevice(id)`.
    -   Enable persistence.
2.  **Event Store (`src/stores/eventStore.js`)**:
    -   State: `events` array.
    -   Actions: `addEvent(name, status)`.
    -   Enable persistence.
3.  **Settings Store (`src/stores/settingsStore.js`)**:
    -   State: User preferences (e.g., `theme`, `notifications`).
    -   Enable persistence.

### Phase 3: Component Integration
1.  **Refactor `DevicesHome.vue`**:
    -   Import `useDeviceStore` and `useEventStore`.
    -   Replace local `devicesStore` ref with the Pinia store.
    -   Update `handleToggle` to call the store's action and log an event.
2.  **Implement `Events.vue`**:
    -   Display the list of events from `eventStore`.
3.  **Implement `Settings.vue`**:
    -   Allow users to modify and persist basic settings.

## Verification & Testing
1.  Open the application in a browser.
2.  Toggle several devices on and off.
3.  Refresh the page; verify the toggle states are preserved.
4.  Navigate to the Events page; verify the actions were logged.
5.  Close the tab and reopen it; verify all data remains.
