<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue';
import { useI18n } from '#imports';
import { prefixer } from '~/shared/utils';

const props = withDefaults(defineProps<{
	name: string,
	color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "neutral",
	variant?: "solid" | "outline" | "subtle" | "soft",
	size?: "xs" | "sm" | "md" | "lg" | "xl",
	deleteable?: boolean
}>(), {
	color: 'info',
	variant: 'soft',
	size: 'md',
	deleteable: false
});

const emit = defineEmits(['delete'])

const { t } = useI18n();
const pf = prefixer('components.atoms.Tag.');

const handleDelete = () => {
	emit('delete')
};
</script>

<template>
	<UBadge :label="props.name" :aria-label="t(pf('ariaLabel'), { name: props.name })"
		:color="props.color" :variant="props.variant" :size="props.size">
		<template v-if="props.deleteable" #trailing>
			<UButton :aria-label="t(pf('button.ariaLabel'), { name: props.name })" :color="props.color"
				icon="heroicons:x-mark-solid" variant="ghost" square :size="props.size" @click="handleDelete" />
		</template>
	</UBadge>
</template>