<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useSettingsStore } from '~/stores';

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.ToggleArchivedCardsButton.');

const settingsStore = useSettingsStore();
const showArchivedCards = computed(() => settingsStore.showArchivedCards);
const toggleArchivedCards = () => {
	settingsStore.setShowArchivedCards(!showArchivedCards.value);
};

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf(showArchivedCards ? 'hideArchivedCards.label' : 'showArchivedCards.label'))"
		:aria-label="t(pf(showArchivedCards ? 'hideArchivedCards.ariaLabel' : 'showArchivedCards.ariaLabel'))"
		color="secondary" size="md" :class="[buttonClass, hoverEffectClass]"
		:trailing-icon="showArchivedCards ? 'heroicons:eye-slash' : 'heroicons:eye'" @click="toggleArchivedCards" />
</template>
