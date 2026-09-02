<script setup>
import { Button } from "@svar-ui/vue-core";

const props = defineProps({
	css: {},
	disabled: {},
	options: {},
	onchange: { type: Function },
});

const value = defineModel("value");

function onClickHandler(id) {
	value.value = id;
	props.onchange && props.onchange({ value: id });
}
</script>

<template>
	<div class="wx-button-list" :class="props.css">
		<Button
			v-for="option in props.options"
			:key="option.id"
			:type="value === option.id ? 'primary' : ''"
			:disabled="props.disabled"
			:text="option.label"
			:onclick="() => onClickHandler(option.id)"
		/>
	</div>
</template>

<style scoped>
.wx-button-list {
	line-height: normal;
}
.wx-button-list :deep(button) {
	width: 100%;
}
.wx-button-list :deep(button:not(:first-child)) {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
.wx-button-list :deep(button:not(:last-child)) {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}
</style>
