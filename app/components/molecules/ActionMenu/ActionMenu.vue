<script setup lang="ts">
import { defineProps, ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	type: 'board' | 'boards';
}>();

const pf = prefixer('components.molecules.ActionMenu.');
const { t } = useI18n();

const isOpen = ref(false);
const handleOpenMenu = () => {
	isOpen.value = true;
};
const handleCloseMenu = () => {
	isOpen.value = false;
};

const target = useTemplateRef<HTMLElement>('target');
onClickOutside(target, () => {
	if (isOpen.value) {
		handleCloseMenu();
	}
});

const buttonClass = 'text-lg rounded-full';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<div ref="target" class="fixed bottom-8 right-8 flex flex-col gap-4 justify-end items-end">
		<ToggleThemeButton v-if="isOpen" />
		<slot v-if="isOpen" :class="[hoverEffectClass]" />
		<UButton color="secondary" size="xl" :class="[buttonClass, hoverEffectClass]"
			:trailing-icon="isOpen ? 'heroicons:x-mark-solid' : 'heroicons:squares-plus'"
			:aria-label="t(pf(isOpen ? `closeMenu.ariaLabel.${props.type}` : `openMenu.ariaLabel.${props.type}`))"
			@click="isOpen ? handleCloseMenu() : handleOpenMenu()" />
	</div>
</template>