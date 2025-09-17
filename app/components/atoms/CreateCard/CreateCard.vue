<script setup lang="ts">
import { defineProps, useTemplateRef, reactive, ref } from 'vue';
import * as v from 'valibot';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useCardsStore } from '~/stores';
import * as cardSchema from '~/schemas/cardSchema';
import type { FormSubmitEvent } from '@nuxt/ui';

const props = defineProps<{
	columnId: string
}>();

const pf = prefixer('components.atoms.CreateCard.');
const { t } = useI18n();

const cardsStore = useCardsStore();
const createCardForm = useTemplateRef<HTMLFormElement>('createCardForm');
const createCardFormSchema = v.object({ name: cardSchema.getNameValidator(t) });
const createCardFormState = reactive({ name: '' });
const isEditingCardName = ref(false);

const handleStartEditingCardName = () => {
	isEditingCardName.value = true;
};

const handleStopEditingCardName = () => {
	isEditingCardName.value = false;
	createCardForm.value?.submit();
};

const handleSubmit = (event: FormSubmitEvent<v.InferOutput<typeof createCardFormSchema>>) => {
	try {
		if (event.data.name.trim().length > 0) {
			cardsStore.createCard(props.columnId, { name: event.data.name.trim() });
			createCardFormState.name = '';
		}
	} catch (error) {
		console.error(error);
	}
};

const baseClass = 'rounded-md flex-shrink-0 p-2 opacity-50 hover:opacity-100 transition-opacity duration-200 ease-in-out';
const dimensionClass = 'w-full h-fit min-h-13'
const lightThemeClass = 'bg-gray-100'
const darkThemeClass = 'dark:bg-gray-600';
</script>

<template>
	<div :class="[baseClass, dimensionClass, lightThemeClass, darkThemeClass]">
		<UForm ref="createCardForm" :schema="createCardFormSchema" :state="createCardFormState" @submit="handleSubmit">
			<UFormField name="name" size="lg">
				<UTextarea v-model="createCardFormState.name" :placeholder="t(pf('input.placeholder'))"
					:aria-label="t(pf('input.ariaLabel'))" color="secondary" icon="heroicons:plus-solid"
					:highlight="isEditingCardName" class="w-full font-bold" size="lg"
					:variant="isEditingCardName ? 'soft' : 'ghost'" :rows="1" :maxrows="0" autoresize
					:autoresizeDelay="0" @focus="handleStartEditingCardName" @blur="handleStopEditingCardName"
					@keydown.enter.prevent="handleStopEditingCardName" />
			</UFormField>
		</UForm>
	</div>
</template>