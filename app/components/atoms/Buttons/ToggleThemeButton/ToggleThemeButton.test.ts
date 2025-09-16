import { describe, it, expect } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { useColorMode } from '#imports';
import { prefixer } from '~/shared/utils';
import ToggleThemeButton from './ToggleThemeButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.ToggleThemeButton.');

mockNuxtImport('useColorMode', () => {
	const preference = ref('light');
	return () => ({
		get preference() {
			return preference.value;
		},
		set preference(val) {
			preference.value = val;
		}
	});
});

describe('ToggleThemeButton', () => {
	it('should render a button with the correct label', async () => {
		const wrapper = await mountSuspended(ToggleThemeButton);
		expect(wrapper.find('button').text()).toContain(pf('label'));
	});

	it('should toggle the theme when clicked', async () => {
		const wrapper = await mountSuspended(ToggleThemeButton);
		const button = wrapper.find('button');
		const colorMode = useColorMode();
		
		await button.trigger('click');
		expect(colorMode.preference).toBe('dark');
		await button.trigger('click');
		expect(colorMode.preference).toBe('light');
		await button.trigger('click');
		expect(colorMode.preference).toBe('dark');
		await button.trigger('click');
		expect(colorMode.preference).toBe('light');
		await button.trigger('click');
		expect(colorMode.preference).toBe('dark');
		await button.trigger('click');
		expect(colorMode.preference).toBe('light');
	});
});
