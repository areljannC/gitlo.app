import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import DeleteButton from './DeleteButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.DeleteButton.');

describe('DeleteButton', () => {
	it('should render the delete button with the correct label', async () => {
		const wrapper = await mountSuspended(DeleteButton, {
			props: { type: 'board', name: 'Test Board' }
		});
		expect(wrapper.text()).toContain(pf('label'));
	});

	it.each([
		{ type: 'board', name: 'BoardName' },
		{ type: 'column', name: 'ColumnName' },
		{ type: 'card', name: 'CardName' }
	])('should set the correct `aria-label` for type: $type', async ({ type, name }) => {
		const wrapper = await mountSuspended(DeleteButton, {
			props: { type: type as 'board' | 'column' | 'card', name }
		});
		const button = wrapper.find('button');
		expect(button.attributes('aria-label')).toBe(pf(`ariaLabel.${type}`));
	});

	it('should emit `delete` event when clicked', async () => {
		const wrapper = await mountSuspended(DeleteButton, {
			props: { type: 'board', name: 'Test Board' }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('delete')).toBeTruthy();
		expect(wrapper.emitted('delete')!.length).toBe(1);
	});
});
