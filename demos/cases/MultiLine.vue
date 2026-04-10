<script setup>
import { ref, markRaw } from "vue";
import { Toolbar, registerToolbarItem } from "../../src/index";
import { RichSelect } from "@svar-ui/vue-core";

registerToolbarItem("richselect", markRaw(RichSelect));

const message = ref("");

const fontFamilyData = [
	{ id: "Arial", label: "Arial" },
	{ id: "Tahoma", label: "Tahoma" },
	{ id: "Times New Roman", label: "Times" },
];
const fontSizeData = [
	{ id: "12px", label: "12" },
	{ id: "14px", label: "14" },
	{ id: "16px", label: "16" },
	{ id: "18px", label: "18" },
];

const values = {
	"font-family": "Arial",
	"font-size": "14px",
};
function onClick(item) {
	message.value = "Button '" + item.id + "' clicked";
}
function onChange(item, value) {
	message.value = item.key + " changed: " + value;
}

const items = [
	{ id: "label", text: "Multi-line toolbar" },
	{ comp: "separator" },
	{
		layout: "column",
		text: "Font",
		items: [
			{
				items: [
					{
						key: "font-family",
						comp: "richselect",
						css: "wideSelect",
						options: fontFamilyData,
						handler: onChange,
					},
					{
						key: "font-size",
						comp: "richselect",
						options: fontSizeData,
						handler: onChange,
					},
				],
			},
			{
				items: [
					{
						id: "font-bold",
						comp: "button",
						icon: "wxo-bold",
						handler: onClick,
					},
					{
						id: "font-italic",
						comp: "button",
						icon: "wxo-italic",
						handler: onClick,
					},
					{
						id: "font-underline",
						comp: "button",
						icon: "wxo-underline",
						handler: onClick,
					},
				],
			},
		],
	},
	{ comp: "separator" },
	{
		layout: "column",
		text: "Align",
		items: [
			{
				items: [
					{
						id: "align-left",
						comp: "button",
						icon: "wxo-align-left",
						handler: onClick,
					},
					{
						id: "align-right",
						comp: "button",
						icon: "wxo-align-right",
						handler: onClick,
					},
				],
			},
			{
				items: [
					{
						id: "align-center",
						comp: "button",
						icon: "wxo-align-center",
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
		],
	},
];
</script>

<template>
	<div class="topbar">
		<Toolbar :items="items" :values="values" :group-popups="true" />
	</div>
	<div class="demo-status">{{ message }}</div>
</template>

<style scoped>
.topbar :deep(.wideSelect) {
	--wx-input-width: 160px;
}
</style>
