<script setup lang="ts">
import { defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const emit = defineEmits<{
	(e: 'edit'): void;
}>();

const handleEdit = () => {
	emit('edit');
};

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.EditBoardButton.');

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf('ariaLabel'))" color="secondary" size="md"
		:class="[buttonClass, hoverEffectClass]" trailing-icon="heroicons:pencil-solid" @click="handleEdit" />
</template>