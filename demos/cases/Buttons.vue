<script setup>
import { ref, markRaw } from "vue";
import { Toolbar } from "../../src/index";
import {
	Slider,
	Text,
	CheckboxGroup,
	RichSelect,
	DatePicker,
	ColorPicker,
	ColorSelect,
	Checkbox,
	Tabs,
	Pager,
	Segmented,
	Switch,
	TwoState,
	Combo,
	MultiCombo,
} from "@svar-ui/vue-core";

const message = ref("");
const handler = ev => {
	const { value, item } = ev;
	message.value = `${item.key} changed: ${value}`;
};

const RawSlider = markRaw(Slider);
const RawText = markRaw(Text);
const RawCheckboxGroup = markRaw(CheckboxGroup);
const RawRichSelect = markRaw(RichSelect);
const RawDatePicker = markRaw(DatePicker);
const RawColorPicker = markRaw(ColorPicker);
const RawColorSelect = markRaw(ColorSelect);
const RawCheckbox = markRaw(Checkbox);
const RawTabs = markRaw(Tabs);
const RawPager = markRaw(Pager);
const RawSegmented = markRaw(Segmented);
const RawSwitch = markRaw(Switch);
const RawTwoState = markRaw(TwoState);
const RawCombo = markRaw(Combo);
const RawMultiCombo = markRaw(MultiCombo);
</script>

<template>
<div class="demo-status">{{ message }}</div>

<div v-memo="[]">
	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Slider' },
				{ comp: 'spacer' },
				{ comp: RawSlider, min: 0, max: 100, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: 15 }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Text' },
				{ comp: 'spacer' },
				{ comp: RawText, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: 'some' }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Tabs' },
				{ comp: 'spacer' },
				{
					comp: RawTabs,
					key: 'x',
					options: [
						{ id: 1, label: 'One' },
						{ id: 2, label: 'Two' },
					],
				},
			]"
			css="demo-toolbar tabs"
			:values="{ x: 1 }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Segmented' },
				{ comp: 'spacer' },
				{
					comp: RawSegmented,
					key: 'x',
					options: [
						{ id: 1, label: 'One' },
						{ id: 2, label: 'Two' },
					],
				},
			]"
			css="demo-toolbar"
			:values="{ x: 1 }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Switch' },
				{ comp: 'spacer' },
				{ comp: RawSwitch, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: true }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Checkbox' },
				{ comp: 'spacer' },
				{ comp: RawCheckbox, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: true }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Checkboxes' },
				{ comp: 'spacer' },
				{
					comp: RawCheckboxGroup,
					options: [
						{ label: 'One', id: 1 },
						{ label: 'Two', id: 2 },
					],
					value: [2],
					type: 'inline',
					key: 'x',
				},
			]"
			css="demo-toolbar"
			:values="{ x: [2] }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'TwoState' },
				{ comp: 'spacer' },
				{
					comp: RawTwoState,
					text: 'Button',
					textActive: 'Pressed',
					key: 'x',
				},
			]"
			css="demo-toolbar"
			:values="{ x: false }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'ColorPicker' },
				{ comp: 'spacer' },
				{ comp: RawColorPicker, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: '#e7a90b' }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'ColorSelect' },
				{ comp: 'spacer' },
				{ comp: RawColorSelect, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: '#e7a90b' }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'DatePicker' },
				{ comp: 'spacer' },
				{ comp: RawDatePicker, key: 'x' },
			]"
			css="demo-toolbar"
			:values="{ x: new Date() }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'RichSelect' },
				{ comp: 'spacer' },
				{
					comp: RawRichSelect,
					text: 'RichSelect',
					key: 'x',
					options: [
						{ id: 1, label: 'One' },
						{ id: 2, label: 'Two' },
					],
				},
			]"
			css="demo-toolbar"
			:values="{ x: 2 }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Combo' },
				{ comp: 'spacer' },
				{
					comp: RawCombo,
					text: 'Combo',
					key: 'x',
					options: [
						{ id: 1, label: 'One' },
						{ id: 2, label: 'Two' },
					],
				},
			]"
			css="demo-toolbar"
			:values="{ x: 2 }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'MultiCombo' },
				{ comp: 'spacer' },
				{
					comp: RawMultiCombo,
					text: 'MultiCombo',
					key: 'x',
					options: [
						{ id: 1, label: 'One' },
						{ id: 2, label: 'Two' },
					],
				},
			]"
			css="demo-toolbar"
			:values="{ x: [2] }"
			:onchange="handler"
		/>
	</div>

	<div class="demo-box">
		<Toolbar
			:items="[
				{ text: 'Pager' },
				{ comp: 'spacer' },
				{ comp: RawPager, key: 'x', total: 100 },
			]"
			css="demo-toolbar"
			:values="{ x: 2 }"
			:onchange="handler"
		/>
	</div>
</div>
</template>

<style scoped>
.demo-box {
	--wx-input-width: 234px;
}
</style>
