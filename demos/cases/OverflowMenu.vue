<script setup>
import { ref } from "vue";
import { Toolbar } from "../../src/index";

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
	{
		id: "copy",
		comp: "icon",
		icon: "wxi-content-copy",
		handler: onClick,
		text: "Ctrl+C",
		menuText: "Copy",
	},
	{
		id: "edit",
		comp: "icon",
		icon: "wxi-edit-outline",
		handler: onClick,
		text: "Ctrl+E",
		menuText: "Edit",
	},
	{ id: "delete", comp: "button", text: "Delete", handler: onClick },
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
