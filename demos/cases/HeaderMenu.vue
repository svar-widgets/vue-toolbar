<script setup>
import { ref } from "vue";
import { Toolbar } from "../../src/index";

let width = 480;
const message = ref("");

function onClick(item) {
	message.value = "Button '" + item.id + "' clicked";
}

let items = [
	{
		comp: "label",
		spacer: true,
		key: "name",
	},
	{ comp: "separator" },
	{
		icon: "wxi-dots-v",
		collapsed: true,
		layout: "column",
		items: [
			{
				id: "done",
				comp: "item",
				text: "Mark as finished task",
				handler: onClick,
			},
			{
				id: "delete",
				comp: "item",
				css: "danger",
				text: "Delete item",
				handler: onClick,
			},
			{ comp: "separator" },
			{
				id: "purge",
				comp: "button",
				type: "danger block",
				text: "Purge all data",
				handler: onClick,
			},
		],
	},
];
</script>

<template>
	<div class="column" :style="{ width: width + 'px' }">
		<Toolbar :items="items" :values="{ name: 'Item X12-A' }" />
		<div class="demo-status">{{ message }}</div>
	</div>
</template>

<style scoped>
.column {
	height: 100%;
	border-right: 1px solid #ddd;
}
:global(.wx-label.danger) {
	color: var(--wx-color-danger);
}
</style>
