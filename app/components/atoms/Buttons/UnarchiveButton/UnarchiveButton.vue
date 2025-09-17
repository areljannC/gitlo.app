<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	type: 'board' | 'column' | 'card';
	name: string
}>();

const emit = defineEmits<{
	(e: 'unarchive'): void;
}>();

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.UnarchiveButton.');

const handleUnarchive = () => {
	emit('unarchive');
};
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf(`ariaLabel.${props.type}`), { name: props.name })"
		color="secondary" variant="ghost" @click="handleUnarchive" />
</template>