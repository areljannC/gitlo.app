<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const pf = prefixer('components.molecules.BoardPreview.');
const { t } = useI18n();

defineProps({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
	},
	tags: {
		type: Array as PropType<string[]>,
		default: []
	}
});

const emit = defineEmits(['view']);

const handleViewBoard = () => {
	emit('view');
};

const dimensionsClass = 'w-full h-fit sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]';
const nameClass = 'font-bold text-sm md:text-md lg:text-lg xl:text-xl';
const descriptionClass = 'text-sm md:text-md lg:text-lg break-all';
</script>

<template>
	<UCard :class="[dimensionsClass]">
		<template #header>
			<h2 :class="nameClass">{{ name }}</h2>
		</template>
		<div v-if="description !== '' || tags.length > 0" class="flex flex-col gap-4">
			<p v-if="description !== ''" :class="descriptionClass">{{ description }}</p>
			<ul v-if="tags.length > 0" class="flex flex-wrap gap-2" role="list">
				<li v-for="tag in [...tags]" :key="tag" role="listitem">
					<Tag :name="tag" />
				</li>
			</ul>
		</div>
		<template #footer>
			<UButton :label="t(pf('buttons.view.label'))" :aria-label="t(pf('buttons.view.ariaLabel'), { name })"
				color="secondary" variant="ghost" class="w-full flex justify-center" @click="handleViewBoard" />
		</template>
	</UCard>
</template>
