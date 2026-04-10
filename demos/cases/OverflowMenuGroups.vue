<script setup>
import { ref, markRaw } from "vue";
import { Toolbar, registerToolbarItem } from "../../src/index";
import { RichSelect } from "@svar-ui/vue-core";

registerToolbarItem("richselect", markRaw(RichSelect));

const message = ref("");
const width = ref(650);

const fontFamily = "Arial";
const fontFamilyData = [
	{ id: "Arial", label: "Arial" },
	{ id: "Tahoma", label: "Tahoma" },
	{ id: "Times New Roman", label: "Times" },
];
const fontSize = "14px";
const fontSizeData = [
	{ id: "12px", label: "12" },
	{ id: "14px", label: "14" },
	{ id: "16px", label: "16" },
	{ id: "18px", label: "18" },
];

function changeWidth() {
	width.value =
		width.value == 650 ? 450 : width.value == 450 ? 300 : 650;
}
function onClick(item) {
	message.value = "Button '" + item.id + "' clicked";
}
function onChange(item, value) {
	message.value = item.key + " changed: " + value;
}

const items = [
	{
		id: "width",
		comp: "button",
		text: "Change width",
		handler: changeWidth,
		type: "primary",
	},
	{ comp: "spacer" },
	{ id: "sep0", comp: "separator" },
	{
		items: [
			{
				id: "align-left",
				comp: "button",
				icon: "wxo-align-left",
				handler: onClick,
			},
			{
				id: "align-center",
				comp: "button",
				icon: "wxo-align-center",
				handler: onClick,
			},
			{
				id: "align-right",
				comp: "button",
				icon: "wxo-align-right",
				handler: onClick,
			},
			{
				id: "align-justify",
				comp: "button",
				icon: "wxo-align-justify",
				handler: onClick,
			},
		],
	},
	{ id: "sep1", comp: "separator" },
	{
		items: [
			{
				key: "font-family",
				comp: "richselect",
				css: "wideSelect",
				options: fontFamilyData,
				value: fontFamily,
				handler: onChange,
			},
			{
				key: "font-size",
				comp: "richselect",
				options: fontSizeData,
				value: fontSize,
				handler: onChange,
			},
		],
	},
];

const values = {};
</script>

<template>
	<div class="topbar" :style="{ width: width + 'px' }">
		<Toolbar :items="items" :values="values" />
		<div class="demo-status">{{ message }}</div>
	</div>
</template>

<style scoped>
.topbar {
	height: 100%;
	border-right: 1px solid #ddd;
}
.topbar :deep(.wideSelect) {
	--wx-input-width: 160px;
}
</style>
