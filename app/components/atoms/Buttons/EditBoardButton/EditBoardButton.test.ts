import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import EditBoardButton from './EditBoardButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.EditBoardButton.');

describe('EditBoardButton', () => {
	it('should render the edit board button with the correct label', async () => {
		const wrapper = await mountSuspended(EditBoardButton, {
			props: { type: 'board', name: 'Test Board' }
		});
		expect(wrapper.text()).toContain(pf('label'));
	});

	it('should emit `edit` event when clicked', async () => {
		const wrapper = await mountSuspended(EditBoardButton, {
			props: { type: 'board', name: 'Test Board' }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('edit')).toBeTruthy();
		expect(wrapper.emitted('edit')!.length).toBe(1);
	});
});
