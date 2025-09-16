<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useDataStore } from '~/stores';

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.LoadBoardButton.');

const dataStore = useDataStore();
const isLoadingBoard = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

const handleLoadBoard = (): void => {
	isLoadingBoard.value = true;
	fileInputRef.value?.click();
};

const handleSelectDirectory = async (event: Event): Promise<void> => {
	const files = (event.target as HTMLInputElement).files;
	if (!files || files.length === 0) {
		isLoadingBoard.value = false;
		return;
	}

	const file = files[0];
	try {
		const text = await file.text();
		const json = JSON.parse(text);
		await dataStore.loadBoard(json);
	} catch (error) {
		// TODO: Handle error more gracefully.
		alert('Invalid JSON file');
	} finally {
		isLoadingBoard.value = false;
	}
};

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf('ariaLabel'))" :loading="isLoadingBoard" trailing
		:color="isLoadingBoard ? 'neutral' : 'primary'" size="md" :class="[buttonClass, hoverEffectClass]"
		trailing-icon="heroicons:document-arrow-up-solid" @click="handleLoadBoard" :disabled="isLoadingBoard" />
	<input ref="fileInputRef" type="file" accept=".json" style="display: none" @change="handleSelectDirectory" />
</template>