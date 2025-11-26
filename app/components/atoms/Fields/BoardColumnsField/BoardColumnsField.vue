<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	modelValue: number;
	name: string;
}>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: number): void;
}>();

const pf = prefixer('components.atoms.Fields.BoardColumnsField.');
const { t } = useI18n();
</script>

<template>
	<UFormField :name="props.name" :label="t(pf('label'))" :description="t(pf('description'))" size="lg">
		<UInput :model-value="props.modelValue"
			@update:model-value="(value: number) => emit('update:modelValue', value)" type="number"
			:placeholder="t(pf('placeholder'))" class="w-full" />
	</UFormField>
</template>