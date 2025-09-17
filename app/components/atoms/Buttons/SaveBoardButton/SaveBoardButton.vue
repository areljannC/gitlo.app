<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useDataStore } from '~/stores';

const props = defineProps<{
	boardId: string
}>();

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.SaveBoardButton.');

const dataStore = useDataStore();
const isSavingBoard = ref(false);

const handleSaveBoard = async () => {
	isSavingBoard.value = true;
	try {
		await dataStore.saveBoard(props.boardId);
	} catch (error) {
		console.error('Failed to save board:', error);
	} finally {
		isSavingBoard.value = false;
	}
}

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf('ariaLabel'))" :loading="isSavingBoard" trailing
		:color="isSavingBoard ? 'neutral' : 'primary'" size="md" :class="[buttonClass, hoverEffectClass]"
		trailing-icon="heroicons:document-arrow-down-solid" @click="handleSaveBoard" :disabled="isSavingBoard" />
</template>