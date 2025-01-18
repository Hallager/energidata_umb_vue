import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})



// import vue from '@vitejs/plugin-vue'
// import { defineConfig } from 'vite'
// import { resolve } from 'path'
// import { getAspDotNetCertificate } from './build/certs';

// export default defineConfig(async ({ mode }) => {
//     console.log(`Configuring Vite for ${mode} mode.`);

//     const config = {
//       server: {
//       },
//       plugins: [vue()],
//       css: {
//           devSourcemap: true,
//       },
//       build: {
//           outDir: '../energidata_umb/wwwroot/app',
//           emptyOutDir: true,
//           rollupOptions: {
//           input: {
//               main: resolve(__dirname, 'src/main.ts'),
//           },
//           },
//       },
//     };

//     if (mode === 'development') {
//     // only get the certificate if we're in development mode
//     const cert = getAspDotNetCertificate();

//       config.server = {
//           strictPort: true,
//           hmr: {
//             clientPort: 5173,
//           },
//           https: {
//             cert: cert.certificate,
//             key: cert.privateKey,
//           },
//       };
//     }

//     return config;
// });