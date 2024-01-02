// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//   },
//   plugins: [react()],
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/socket.io': {
        target: 'https://zainsocket.catalystt.co',
        ws: true,
      },
    },
  },
  plugins: [react()],
});

