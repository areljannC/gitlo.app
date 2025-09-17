<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	type: 'board' | 'column' | 'card';
	name: string
}>();

const emit = defineEmits<{
	(e: 'close'): void;
}>();

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.CloseButton.');

const handleClose = () => {
	emit('close');
};
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf(`ariaLabel.${props.type}`), { name: props.name })"
		color="neutral" variant="ghost" @click="handleClose" />
</template>