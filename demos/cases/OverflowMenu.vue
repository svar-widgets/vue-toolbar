<script setup>
import { ref } from "vue";
import { Toolbar, ButtonList, registerToolbarItem } from "../../src/index";
import { Segmented } from "@svar-ui/vue-core";
registerToolbarItem("segmented", Segmented);
registerToolbarItem("segmented", ButtonList, { menu: true });

const width = ref(270);
const message = ref("");

function onClick(item) {
	message.value = "Button '" + item.id + "' clicked";
}
function changeWidth() {
	width.value = width.value == 500 ? 350 : width.value == 350 ? 250 : 500;
}

const items = [
	{
		id: "width",
		comp: "button",
		text: "Resize column",
		handler: changeWidth,
		type: "primary",
	},
	{
		id: "search",
		comp: "icon",
		icon: "wxi-search",
		text: "",
		css: "right",
		handler: onClick,
	},
	{ comp: "spacer" },
	{
		id: "info",
		comp: "icon",
		icon: "wxi-information-outline",
		handler: onClick,
		text: "Info",
	},
	{ comp: "separator" },
	{ comp: "separator" },
	{ comp: "separator" },
	{
		id: "copy",
		comp: "icon",
		icon: "wxi-content-copy",
		handler: onClick,
		text: "Copy",
		title: "Ctrl+C",
	},
	{
		id: "edit",
		comp: "icon",
		icon: "wxi-edit-outline",
		handler: onClick,
		text: "Edit",
		title: "Ctrl+E",
	},
	{
		id: "mode",
		comp: "segmented",
		value: "1",
		options: [
			{ id: "1", label: "All" },
			{ id: "2", label: "Active" },
		],
		handler: onClick,
	},
];
</script>

<template>
	<div class="column" :style="{ width: width + 'px' }">
		<Toolbar :items="items" />
		<div class="demo-status">{{ message }}</div>
	</div>
</template>

<style scoped>
.column {
	height: 100%;
	border-right: 1px solid #ddd;
}
</style>
