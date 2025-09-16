<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useSettingsStore } from '~/stores';

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.ToggleArchivedBoardsButton.');

const settingsStore = useSettingsStore();
const showArchivedBoards = computed(() => settingsStore.showArchivedBoards);
const toggleArchivedBoards = () => {
	settingsStore.setShowArchivedBoards(!showArchivedBoards.value);
};

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf(showArchivedBoards ? 'hideArchivedBoards.label' : 'showArchivedBoards.label'))"
		:aria-label="t(pf(showArchivedBoards ? 'hideArchivedBoards.ariaLabel' : 'showArchivedBoards.ariaLabel'))"
		color="secondary" size="md" :class="[buttonClass, hoverEffectClass]"
		:trailing-icon="showArchivedBoards ? 'heroicons:eye-slash' : 'heroicons:eye'" @click="toggleArchivedBoards" />
</template>
