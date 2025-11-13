import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { prefixer } from '~/shared/utils';
import Tag from './Tag.vue';

const MOCK_TAG_NAME = 'MOCK_TAG_NAME';

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));
const pf = prefixer('components.atoms.Tag.');

describe('Tag', () => {
	describe('props', () => {
		it('should have default props', async () => {
			const wrapper = await mountSuspended(Tag, { props: { name: MOCK_TAG_NAME } });
			const props = wrapper.props();
			expect(props).toHaveProperty('name', MOCK_TAG_NAME);
			expect(props).toHaveProperty('color', 'info');
			expect(props).toHaveProperty('variant', 'soft');
			expect(props).toHaveProperty('size', 'md');
			expect(props).toHaveProperty('deleteable', false);
		});

		describe('name', () => {
			it('should receive and render the `name` prop', async () => {
				const wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME
					}
				});
				expect(wrapper.props()).toHaveProperty('name', MOCK_TAG_NAME);
				expect(wrapper.text()).toContain(MOCK_TAG_NAME);
			});
		});

		describe('color', () => {
			it('should receive the `color` prop', async () => {
				let MOCK_COLOR: string = '';
				let wrapper: any;

				MOCK_COLOR = 'primary';
				wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						color: MOCK_COLOR
					}
				});
				expect(wrapper.props()).toHaveProperty('color', MOCK_COLOR);
				expect(wrapper.classes().some((className: string) => className.includes(MOCK_COLOR))).toBe(true);

				MOCK_COLOR = 'secondary';
				wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						color: MOCK_COLOR
					}
				});
				expect(wrapper.props()).toHaveProperty('color', MOCK_COLOR);
				expect(wrapper.classes().some((className: string) => className.includes(MOCK_COLOR))).toBe(true);
			});
		});

		describe('variant', () => {
			it('should receive the `variant` prop', async () => {
				let MOCK_VARIANT: string = '';
				let wrapper: any;

				MOCK_VARIANT = 'soft';
				wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						variant: MOCK_VARIANT
					}
				});
				expect(wrapper.props()).toHaveProperty('variant', MOCK_VARIANT);

				MOCK_VARIANT = 'solid';
				wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						variant: MOCK_VARIANT
					}
				});
				expect(wrapper.props()).toHaveProperty('variant', MOCK_VARIANT);
			});
		});

		describe('size', () => {
			it('should receive the `size` prop', async () => {
				let MOCK_SIZE: string = '';
				let wrapper: any;

				MOCK_SIZE = 'sm';
				wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						size: MOCK_SIZE
					}
				});
				expect(wrapper.props()).toHaveProperty('size', MOCK_SIZE);
				expect(wrapper.classes().some((className: string) => className.includes(MOCK_SIZE))).toBe(true);

				MOCK_SIZE = 'md';
				wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						size: MOCK_SIZE
					}
				});
				expect(wrapper.props()).toHaveProperty('size', MOCK_SIZE);
				expect(wrapper.classes().some((className: string) => className.includes(MOCK_SIZE))).toBe(true);
			});
		});

		describe('deleteable', () => {
			it('should render a button when `deleteable` is `true`', async () => {
				const wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						deleteable: true
					}
				});
				expect(wrapper.props()).toHaveProperty('name', MOCK_TAG_NAME);
				expect(wrapper.props()).toHaveProperty('deleteable', true);
				expect(wrapper.text()).toContain(MOCK_TAG_NAME);
				expect(wrapper.find('button').exists()).toBe(true);
			});

			it('should not render a button when `deleteable` is `false`', async () => {
				const wrapper = await mountSuspended(Tag, {
					props: {
						name: MOCK_TAG_NAME,
						deleteable: false
					}
				});
				expect(wrapper.props()).toHaveProperty('name', MOCK_TAG_NAME);
				expect(wrapper.props()).toHaveProperty('deleteable', false);
				expect(wrapper.text()).toContain(MOCK_TAG_NAME);
				expect(wrapper.find('button').exists()).toBe(false);
			});
		});
	});

	describe('emits', () => {
		it('should emit `delete` when the delete button is clicked', async () => {
			const wrapper = await mountSuspended(Tag, {
				props: {
					name: MOCK_TAG_NAME,
					deleteable: true
				}
			});
			expect(wrapper.props()).toHaveProperty('name', MOCK_TAG_NAME);
			expect(wrapper.props()).toHaveProperty('deleteable', true);
			expect(wrapper.text()).toContain(MOCK_TAG_NAME);
			expect(wrapper.find('button').exists()).toBe(true);
			await wrapper.find('button').trigger('click');
			expect(wrapper.emitted()).toHaveProperty('delete');
		});
	});
});
