<script setup lang="ts">
import { defineProps, computed, reactive, useTemplateRef, ref, watch } from 'vue';
import * as v from 'valibot';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';
import { useCardsStore } from '~/stores';
import * as cardSchema from '~/schemas/cardSchema';
import type { FormSubmitEvent } from '@nuxt/ui';

const props = defineProps<{
	cardId: string
}>();

const pf = prefixer('components.atoms.Card.');
const { t } = useI18n();

const cardsStore = useCardsStore();
const card = computed(() => cardsStore.getCardById(props.cardId));
const cardForm = useTemplateRef<HTMLFormElement>('cardForm');
const cardFormSchema = v.object({ name: cardSchema.getNameValidator(t) });
const cardFormState = reactive({ name: card.value?.name });
const isEditingCardName = ref(false);

watch(card, updatedCard => {
	cardFormState.name = updatedCard?.name;
});

const handleStartEditingCardName = () => {
	isEditingCardName.value = true;
};

const handleStopEditingCardName = (event: KeyboardEvent) => {
	(event.target as HTMLTextAreaElement).blur();
	isEditingCardName.value = false;
	cardForm.value?.submit();
};

const handleSubmit = (event: FormSubmitEvent<v.InferOutput<typeof cardFormSchema>>) => {
	try {
		cardsStore.updateCard(props.cardId, { name: event.data.name.trim() });
	} catch (error) {
		console.error(error);
	}
};

const handleExpandCard = () => {
	cardsStore.expandCard(props.cardId);
};

const baseClass = 'rounded-md flex-shrink-0 p-2';
const dimensionClass = 'w-full h-fit min-h-13 max';
const lightThemeClass = 'bg-gray-100';
const darkThemeClass = 'dark:bg-gray-600';
</script>

<template>
	<div v-if="card" :class="[baseClass, dimensionClass, lightThemeClass, darkThemeClass]">
		<div class="w-full flex justify-between items-start gap-1 pr-2">
			<UForm ref="cardForm" :schema="cardFormSchema" :state="cardFormState" @submit="handleSubmit">
				<UFormField name="name" size="lg">
					<UTextarea v-model="cardFormState.name" :placeholder="t(pf('input.placeholder'))"
						:aria-label="t(pf('input.ariaLabel'))" color="secondary" :highlight="isEditingCardName"
						class="w-full font-bold" size="lg" :variant="isEditingCardName ? 'soft' : 'ghost'" :rows="1"
						:maxrows="0" autoresize :autoresizeDelay="0" @focus="handleStartEditingCardName"
						@blur="handleStopEditingCardName" @keydown.enter.prevent="handleStopEditingCardName" />
				</UFormField>
			</UForm>

			<div class="w-fit h-fit flex gap-1 items-center">
				<UButton icon="heroicons:arrows-pointing-out-20-solid" :aria-label="t(pf('buttons.expand.ariaLabel'))"
					class="size-5 w-fit h-fit cursor-pointer" variant="ghost" color="neutral"
					@click="handleExpandCard" />
				<UIcon name="heroicons:arrows-up-down-solid" :aria-label="t(pf('buttons.drag.ariaLabel'))"
					class="size-5 draggable-card md:hidden hover:cursor-grab active:cursor-grabbing" />
				<UIcon name="icon-park-outline:direction-adjustment-two" :aria-label="t(pf('buttons.drag.ariaLabel'))"
					class="size-5 draggable-card cursor-move hidden md:block hover:cursor-grab active:cursor-grabbing" />
			</div>
		</div>
	</div>
</template>