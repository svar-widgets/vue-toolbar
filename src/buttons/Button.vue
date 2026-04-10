<script setup>
defineOptions({ name: "ToolbarButtonsButton" });

import { Button } from "@svar-ui/vue-core";

const props = defineProps({
	icon: {},
	text: { default: "" },
	css: {},
	type: {},
	disabled: {},
	menu: {},
	onclick: { type: Function },
});
</script>

<template>
	<div v-if="menu" class="wx-item" :onclick="onclick">
		<i :class="`${icon || 'wxi-empty'} ${css || ''}`"></i>
		{{ text }}
	</div>
	<Button
		v-else
		:icon="icon"
		:type="type"
		:css="css"
		:text="text"
		:disabled="disabled"
		:onclick="onclick"
	/>
</template>

<style scoped>
i {
	margin-right: 8px;
	font-size: var(--wx-button-icon-size);
	color: var(--wx-icon-color);
}
.wx-item {
	cursor: pointer;
	white-space: nowrap;
	line-height: 26px;
}
</style>
