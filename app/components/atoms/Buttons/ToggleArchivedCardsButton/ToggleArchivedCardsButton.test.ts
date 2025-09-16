import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import { useSettingsStore } from '~/stores';
import ToggleArchivedCardsButton from './ToggleArchivedCardsButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.ToggleArchivedCardsButton.');

describe('ToggleArchivedCardsButton', () => {
	let pinia: any;

	beforeEach(() => {
		vi.resetAllMocks();
		pinia = createPinia();
		setActivePinia(pinia);
	});

	it('renders "Show archived cards" when `showArchivedCards` is `false`', async () => {
		const settingsStore = useSettingsStore();
		const wrapper = await mountSuspended(ToggleArchivedCardsButton, { global: { plugins: [pinia] } });
		expect(settingsStore.showArchivedCards).toBe(false);
		expect(wrapper.text()).toContain(pf('showArchivedCards.label'));
	});

	it('renders "Hide archived cards" when `showArchivedCards` is `true`', async () => {
		const settingsStore = useSettingsStore();
		settingsStore.setShowArchivedCards(true);
		const wrapper = await mountSuspended(ToggleArchivedCardsButton, { global: { plugins: [pinia] } });
		expect(wrapper.text()).toContain(pf('hideArchivedCards.label'));
		expect(settingsStore.showArchivedCards).toBe(true);
	});

	it('toggles `showArchivedCards` on click', async () => {
		const settingsStore = useSettingsStore();
		const wrapper = await mountSuspended(ToggleArchivedCardsButton, { global: { plugins: [pinia] } });
		const button = wrapper.find('button');
		await button.trigger('click');
		expect(settingsStore.showArchivedCards).toBe(true);
		await button.trigger('click');
		expect(settingsStore.showArchivedCards).toBe(false);
	});
});
