import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import { useSettingsStore } from '~/stores';
import ToggleArchivedColumnsButton from './ToggleArchivedColumnsButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.ToggleArchivedColumnsButton.');

describe('ToggleArchivedColumnsButton', () => {
	let pinia: any;

	beforeEach(() => {
		vi.resetAllMocks();
		pinia = createPinia();
		setActivePinia(pinia);
	});

	it('renders "Show archived columns" when `showArchivedColumns` is `false`', async () => {
		const settingsStore = useSettingsStore();
		const wrapper = await mountSuspended(ToggleArchivedColumnsButton, { global: { plugins: [pinia] } });
		expect(wrapper.text()).toContain(pf('showArchivedColumns.label'));
		expect(settingsStore.showArchivedColumns).toBe(false);
	});

	it('renders "Hide archived columns" when `showArchivedColumns` is `true`', async () => {
		const settingsStore = useSettingsStore();
		settingsStore.setShowArchivedColumns(true);
		const wrapper = await mountSuspended(ToggleArchivedColumnsButton, { global: { plugins: [pinia] } });
		expect(wrapper.text()).toContain(pf('hideArchivedColumns.label'));
		expect(settingsStore.showArchivedColumns).toBe(true);
	});

	it('toggles `showArchivedColumns` on click', async () => {
		const settingsStore = useSettingsStore();
		const wrapper = await mountSuspended(ToggleArchivedColumnsButton, { global: { plugins: [pinia] } });
		const button = wrapper.find('button');
		await button.trigger('click');
		expect(settingsStore.showArchivedColumns).toBe(true);
		await button.trigger('click');
		expect(settingsStore.showArchivedColumns).toBe(false);
	});
});
