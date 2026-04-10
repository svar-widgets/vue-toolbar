<script setup>
import { computed } from "vue";
import { setID } from "@svar-ui/lib-dom";
import { getItemHandler } from "../helpers";
import Separator from "../buttons/Separator.vue";
import Spacer from "../buttons/Spacer.vue";

const props = defineProps({
	item: { default: () => ({}) },
	menu: { default: false },
	values: {},
	onclick: { type: Function },
	onchange: { type: Function },
});

const itemComponent = computed(() => getItemHandler(props.item.comp || "label"));

function onClick() {
	if (props.item.handler) props.item.handler(props.item);
	props.onclick && props.onclick({ item: props.item });
}

const value = computed(() => {
	if (props.item.key && props.values && props.item.key in props.values)
		return props.values[props.item.key];
	return props.item.value;
});

function detectChange({ value }) {
	if (props.item.handler) props.item.handler(props.item, value);
	props.onchange && props.onchange({ value, item: props.item });
}

const text = computed(() =>
	props.menu ? props.item.menuText || props.item.text : props.item.text
);
</script>

<template>
	<Spacer v-if="props.item.comp == 'spacer'" />
	<Separator v-else-if="props.item.comp == 'separator'" :menu="props.menu" />
	<div
		v-else
		:class="['wx-tb-element', props.item.css || '', { 'wx-spacer': props.item.spacer, 'wx-in-menu': props.menu }]"
		:data-id="setID(props.item.id)"
	>
		<component
			:is="itemComponent"
			:value="value"
			:onchange="detectChange"
			:onclick="props.item.key ? undefined : onClick"
			:menu="props.menu"
			v-bind="props.item"
			:text="text"
		/>
	</div>
</template>

<style scoped>
.wx-spacer {
	flex: 1;
}
.wx-tb-element {
	padding: 4px;
	flex-shrink: 0;
	align-self: center;
	display: flex;
}
.wx-in-menu.wx-tb-element {
	height: 36px;
	line-height: 36px;
	padding: 2px 8px;
	background-color: var(--wx-background);
}

.wx-in-menu :deep(button) {
	width: 100%;
	background: transparent;
	text-align: left;
	padding-left: 0;
	font-weight: var(--wx-font-weight);
	font-size: var(--wx-font-size);
}
.wx-in-menu :deep(.wx-tb-element) {
	align-self: stretch;
}
.wx-in-menu.wx-tb-element :deep(button:hover) {
	background: var(--wx-background-alt);
}
.wx-in-menu :deep(button i) {
	margin-right: 4px;
	font-size: var(--wx-icon-size);
}
.wx-in-menu.wx-tb-element:hover {
	background: var(--wx-background-alt);
}
</style>
