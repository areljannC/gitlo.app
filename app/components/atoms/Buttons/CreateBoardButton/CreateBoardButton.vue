<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const emit = defineEmits<{
	(e: 'create'): void;
}>();

const handleCreate = () => {
	emit('create');
};

const { t } = useI18n();
const pf = prefixer('components.atoms.Buttons.CreateBoardButton.');

const buttonClass = 'text-lg';
const hoverEffectClass = 'hover:shadow-md hover:-translate-y-0.25 transition-transform duration-50 ease-in-out';
</script>

<template>
	<UButton :label="t(pf('label'))" :aria-label="t(pf('ariaLabel'))" color="secondary" size="md"
		:class="[buttonClass, hoverEffectClass]" trailing-icon="heroicons:plus-solid" @click="handleCreate" />
</template>