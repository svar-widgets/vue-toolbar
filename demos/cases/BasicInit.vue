<script setup>
import { ref } from "vue";
import { Toolbar } from "../../src/index";

const message = ref("");

function onClick(item) {
	message.value = "Button '" + item.id + "' clicked";
}

const items = [
	{ id: "label", text: "Toolbar with icon buttons" },
	{
		id: "search",
		comp: "button",
		icon: "wxi-search",
		css: "right",
		handler: onClick,
	},
	{ comp: "spacer" },
	{
		id: "edit",
		comp: "button",
		icon: "wxi-edit-outline",
		handler: onClick,
	},
	{
		id: "copy",
		comp: "icon",
		icon: "wxi-content-copy",
		handler: onClick,
	},
	{
		id: "delete",
		comp: "button",
		icon: "wxi-delete-outline",
		handler: onClick,
	},
];
</script>

<template>
	<Toolbar :items="items" />
	<div class="demo-status">{{ message }}</div>
</template>
