<script setup>
defineOptions({ name: "ToolbarButtonsLabel" });

const props = defineProps({
	text: {},
	value: {},
});
</script>

<template>
	<div class="wx-label" v-if="$slots.default">
		<slot />
	</div>
	<div class="wx-label" v-else>{{ value || text }}</div>
</template>

<style scoped>
.wx-label {
	width: auto;
	font-weight: var(--wx-label-font-weight);
	color: var(--wx-input-font-color);
	padding: var(--wx-input-padding);
	overflow: hidden;
}
</style>
