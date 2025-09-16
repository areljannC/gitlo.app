import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import { useSettingsStore } from '~/stores';
import ToggleArchivedBoardsButton from './ToggleArchivedBoardsButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.ToggleArchivedBoardsButton.');

describe('ToggleArchivedBoardsButton', () => {
	let pinia: any;

	beforeEach(() => {
		vi.resetAllMocks();
		pinia = createPinia();
		setActivePinia(pinia);
	});

	it('renders "Show archived boards" when `showArchivedBoards` is `false`', async () => {
		const settingsStore = useSettingsStore();
		const wrapper = await mountSuspended(ToggleArchivedBoardsButton, { global: { plugins: [pinia] } });
		expect(wrapper.text()).toContain(pf('showArchivedBoards.label'));
		expect(settingsStore.showArchivedBoards).toBe(false);
	});

	it('renders "Hide archived boards" when `showArchivedBoards` is `true`', async () => {
		const settingsStore = useSettingsStore();
		settingsStore.setShowArchivedBoards(true);
		const wrapper = await mountSuspended(ToggleArchivedBoardsButton, { global: { plugins: [pinia] } });
		expect(wrapper.text()).toContain(pf('hideArchivedBoards.label'));
		expect(settingsStore.showArchivedBoards).toBe(true);
	});

	it('toggles `showArchivedBoards` on click', async () => {
		const settingsStore = useSettingsStore();
		const wrapper = await mountSuspended(ToggleArchivedBoardsButton, { global: { plugins: [pinia] } });
		const button = wrapper.find('button');
		await button.trigger('click');
		expect(settingsStore.showArchivedBoards).toBe(true);
		await button.trigger('click');
		expect(settingsStore.showArchivedBoards).toBe(false);
	});
});
