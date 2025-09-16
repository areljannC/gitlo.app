<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useSettingsStore } from '~/stores';

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.ToggleArchivedColumnsButton.');

const settingsStore = useSettingsStore();
const showArchivedColumns = computed(() => settingsStore.showArchivedColumns);
const toggleArchivedColumns = () => {
	settingsStore.setShowArchivedColumns(!showArchivedColumns.value);
};

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf(showArchivedColumns ? 'hideArchivedColumns.label' : 'showArchivedColumns.label'))"
		:aria-label="t(pf(showArchivedColumns ? 'hideArchivedColumns.ariaLabel' : 'showArchivedColumns.ariaLabel'))"
		color="secondary" size="md" :class="[buttonClass, hoverEffectClass]"
		:trailing-icon="showArchivedColumns ? 'heroicons:eye-slash' : 'heroicons:eye'" @click="toggleArchivedColumns" />
</template>
