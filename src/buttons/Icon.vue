<script setup>
defineOptions({ name: "ToolbarButtonsIcon" });

import { Button } from "@svar-ui/vue-core";

const props = defineProps({
	icon: {},
	title: {},
	text: {},
	tooltip: {},
	css: {},
	type: {},
	disabled: {},
	menu: {},
	onclick: { type: Function },
});
</script>

<template>
	<div v-if="props.menu" class="wx-item" :onclick="props.onclick">
		<i v-if="props.icon" :class="`${props.icon} ${props.css}`"></i>
		{{ props.text }}
	</div>
	<Button
		v-else
		:icon="props.icon"
		:type="props.type"
		:css="props.css"
		:disabled="props.disabled"
		:title="props.title"
		:tooltip="props.tooltip"
		:onclick="props.onclick"
	/>
</template>

<style scoped>
i {
	margin-right: 8px;
	font-size: var(--wx-icon-size);
	color: var(--wx-color-font);
}
.wx-item {
	cursor: pointer;
	white-space: nowrap;
	line-height: 36px;
	height: 36px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}
</style>
