<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	type: 'board' | 'column' | 'card';
	name: string
}>();

const emit = defineEmits<{
	(e: 'cancel'): void;
}>();

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.CancelButton.');

const handleCancel = () => {
	emit('cancel');
};
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf(`ariaLabel.${props.type}`), { name: props.name })" color="error"
		variant="soft" @click="handleCancel" />
</template>