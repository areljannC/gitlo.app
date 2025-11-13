import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { ToggleThemeButton } from '#components';
import { prefixer } from '~/shared/utils';
import ActionMenu from './ActionMenu.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.molecules.ActionMenu.');

describe('ActionMenu', () => {
	it('should render a button', async () => {
		const wrapper = await mountSuspended(ActionMenu, { props: { type: 'board' } });
		expect(wrapper.find('button')).toBeTruthy();
	});

	it('should open the menu when the button is clicked', async () => {
		const wrapper = await mountSuspended(ActionMenu, { props: { type: 'board' } });

		const openActionMenuButton = wrapper.find('button');
		expect(openActionMenuButton).toBeTruthy();
		expect(openActionMenuButton.attributes('aria-label')).toBe(pf('openMenu.ariaLabel.board'));

		await openActionMenuButton.trigger('click');
		expect(wrapper.findComponent(ToggleThemeButton).exists()).toBe(true);
		expect(wrapper.findAll('button').length).toBe(2);
	});

	it('should close the menu when the button is clicked again', async () => {
		const wrapper = await mountSuspended(ActionMenu, { props: { type: 'board' } });

		const openActionMenuButton = wrapper.find('button');
		expect(openActionMenuButton).toBeTruthy();
		expect(openActionMenuButton.attributes('aria-label')).toBe(pf('openMenu.ariaLabel.board'));

		await openActionMenuButton.trigger('click');
		expect(openActionMenuButton.attributes('aria-label')).toBe(pf('closeMenu.ariaLabel.board'));
		expect(wrapper.findComponent(ToggleThemeButton).exists()).toBe(true);
		expect(wrapper.findAll('button').length).toBe(2);

		const closeActionMenuButton = wrapper.findAll('button').at(1)!;
		await closeActionMenuButton.trigger('click');
		expect(openActionMenuButton.attributes('aria-label')).toBe(pf('openMenu.ariaLabel.board'));
		expect(wrapper.findComponent(ToggleThemeButton).exists()).toBe(false);
		expect(wrapper.findAll('button').length).toBe(1);
	});
});
