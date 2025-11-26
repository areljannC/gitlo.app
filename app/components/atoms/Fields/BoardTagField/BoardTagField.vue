<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	modelValue: string;
	name: string;
	onEnter: () => void;
}>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void;
}>();

const pf = prefixer('components.atoms.Fields.BoardTagField.');
const { t } = useI18n();
</script>

<template>
	<UFormField :name="props.name" :label="t(pf('label'))" :description="t(pf('description'))" size="lg">
		<UInput :model-value="props.modelValue"
			@update:model-value="(value: string) => emit('update:modelValue', value)" type="text"
			:placeholder="t(pf('placeholder'))" @keydown.enter.prevent="props.onEnter" class="w-full" />
	</UFormField>
</template>