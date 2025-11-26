import { describe, it, expect, vi } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import BoardTagField from './BoardTagField.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Fields.BoardTagField.');

describe('BoardTagField', () => {
	it('renders label, description, and placeholder', async () => {
		const wrapper = await mountSuspended(BoardTagField, {
			props: {
				modelValue: 'Test Tag',
				name: 'tag',
				onEnter: vi.fn()
			}
		});
		const html = wrapper.html();
		expect(html).toContain(pf('label'));
		expect(html).toContain(pf('description'));
	});

	it('sets the input value from `modelValue`', async () => {
		const wrapper = await mountSuspended(BoardTagField, {
			props: {
				modelValue: 'Test Tag',
				name: 'tag',
				onEnter: vi.fn()
			}
		});
		const input = wrapper.find('input');
		expect(input.element.value).toBe('Test Tag');
	});

	it('emits `update:modelValue` when input changes', async () => {
		const wrapper = await mountSuspended(BoardTagField, {
			props: {
				modelValue: '',
				name: 'tag',
				onEnter: vi.fn()
			}
		});
		const input = wrapper.find('input');
		await input.setValue('New Tag');
		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
		expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New Tag']);
	});

	it('calls `onEnter` when Enter is pressed', async () => {
		const onEnter = vi.fn();
		const wrapper = await mountSuspended(BoardTagField, {
			props: {
				modelValue: '',
				name: 'tag',
				onEnter
			}
		});
		const input = wrapper.find('input');
		await input.trigger('keydown.enter');
		expect(onEnter).toHaveBeenCalled();
	});
});
