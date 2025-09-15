import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	telemetry: false,
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	vite: { plugins: [tailwindcss()] },
	components: [{ path: '~/components', pathPrefix: false }],
	modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt', '@nuxt/ui', '@nuxt/icon', '@nuxtjs/i18n', '@nuxt/test-utils/module'],
	i18n: {
		defaultLocale: 'en',
		strategy: 'no_prefix',
		locales: [
			{ code: 'en', language: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
			{ code: 'fr', language: 'fr', name: 'Français', dir: 'ltr', file: 'fr.json' },
			{ code: 'es', language: 'es', name: 'Español', dir: 'ltr', file: 'es.json' }
		],
		detectBrowserLanguage: {
			useCookie: false,
			cookieKey: 'i18n_redirected',
			alwaysRedirect: false,
			fallbackLocale: 'en'
		}
	},
	nitro: { ignore: ['**/*.test.ts'] },
	app: {
		head: {
			title: 'gitlo.app',
			meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
		}
	}
});
