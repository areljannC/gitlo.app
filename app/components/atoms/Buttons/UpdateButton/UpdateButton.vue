<script setup lang="ts">
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = defineProps<{
	type: 'board' | 'column' | 'card';
	name: string
}>();

const emit = defineEmits<{
	(e: 'update'): void;
}>();

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.UpdateButton.');

const handleUpdate = () => {
	emit('update');
};
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf(`ariaLabel.${props.type}`), { name: props.name })"
		color="primary" @click="handleUpdate" />
</template>