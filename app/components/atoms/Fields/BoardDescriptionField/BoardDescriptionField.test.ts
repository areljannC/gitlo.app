import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import BoardDescriptionField from './BoardDescriptionField.vue';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Fields.BoardDescriptionField.');

describe('BoardDescriptionField', () => {
	it('renders label, description, and placeholder', async () => {
		const wrapper = await mountSuspended(BoardDescriptionField, {
			props: {
				modelValue: 'Test Description',
				name: 'description'
			}
		});

		const html = wrapper.html();
		expect(html).toContain(pf('label'));
		expect(html).toContain(pf('description'));
	});

	it('sets the input value from `modelValue`', async () => {
		const wrapper = await mountSuspended(BoardDescriptionField, {
			props: {
				modelValue: 'Test Board',
				name: 'name'
			}
		});
		const input = wrapper.find('input');
		expect(input.element.value).toBe('Test Board');
	});

	it('emits update:modelValue when input changes', async () => {
		const wrapper = await mountSuspended(BoardDescriptionField, {
			props: {
				modelValue: '',
				name: 'name'
			}
		});
		const input = wrapper.find('input');
		await input.setValue('New Description');
		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
		expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New Description']);
	});
});
