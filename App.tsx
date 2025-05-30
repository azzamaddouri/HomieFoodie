import React from 'react';
import '@unistyles/unistyles'; // Ensure unistyles is initialized
import Navigation from '@navigation/Navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@states/store';

const App = () => {
  return  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Delays rendering app until the persisted state has been restored from storage (like localStorage). */}
         <Navigation />
      </PersistGate>
    </Provider>
  )};

export default App;


/* 
** Hydration: Loading saved Redux state from storage.
** Rehydrated: Store has been fully loaded with saved state.
-> PersistGate waits for rehydration before rendering the app.

Imagine Redux store is like a car:

When you start the app, the car is empty (no passengers).

Hydration is like picking up saved passengers ( persisted state) from storage.

Once everyone’s back in the car (rehydrated), you’re ready to drive (render the app).
*/