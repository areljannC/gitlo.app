import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import BoardColumnsField from './BoardColumnsField.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Fields.BoardColumnsField.');

describe('BoardColumnsField', () => {
	it('renders label, description, and placeholder', async () => {
		const wrapper = await mountSuspended(BoardColumnsField, {
			props: {
				modelValue: 3,
				name: 'columns'
			}
		});
		const html = wrapper.html();
		expect(html).toContain(pf('label'));
		expect(html).toContain(pf('description'));
	});

	it('sets the input value from `modelValue`', async () => {
		const wrapper = await mountSuspended(BoardColumnsField, {
			props: {
				modelValue: 3,
				name: 'columns'
			}
		});
		const input = wrapper.find('input');
		expect(input.element.value).toBe('3');
	});

	it('emits `update:modelValue` when input changes', async () => {
		const wrapper = await mountSuspended(BoardColumnsField, {
			props: {
				modelValue: 3,
				name: 'columns'
			}
		});
		const input = wrapper.find('input');
		await input.setValue(5);
		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([5]);
	});
});
