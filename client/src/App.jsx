// src/App.jsx
import React from 'react';
import ChristmasCountdown from './components/ChristmasCountdown';

function App() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
  return (
    <div className="App">
      <ChristmasCountdown />
    </div>
  );
}

export default App;
