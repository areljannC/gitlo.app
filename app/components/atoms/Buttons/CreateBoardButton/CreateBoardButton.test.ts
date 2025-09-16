import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import CreateBoardButton from './CreateBoardButton.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Buttons.CreateBoardButton.');

describe('CreateBoardButton', () => {
	it('should render the create board button with the correct label', async () => {
		const wrapper = await mountSuspended(CreateBoardButton, {
			props: { type: 'board', name: 'Test Board' }
		});
		expect(wrapper.text()).toContain(pf('label'));
	});

	it('should emit `create` event when clicked', async () => {
		const wrapper = await mountSuspended(CreateBoardButton, {
			props: { type: 'board', name: 'Test Board' }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('create')).toBeTruthy();
		expect(wrapper.emitted('create')!.length).toBe(1);
	});
});
