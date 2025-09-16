<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, useColorMode } from '#imports';
import { prefixer } from '~/shared/utils';

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.ToggleThemeButton.');

const colorMode = useColorMode();
const icon = computed(() => colorMode.preference === 'light' ? 'heroicons:moon-solid' : 'heroicons:sun-solid');
const toggleTheme = () => {
	colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
}

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf('ariaLabel'))" color="secondary" size="md"
		:class="[buttonClass, hoverEffectClass]" :trailing-icon="icon" @click="toggleTheme" />
</template>