<script setup>
import { ref, markRaw } from "vue";
import { Toolbar } from "../../src/index";
import { Slider, Button } from "@svar-ui/vue-core";

let message = ref("");
let values1 = ref({ x1: 15, x2: 15 });
let values2 = ref({ x1: 15 });


const handler1 = ev => {
	const { value, item } = ev;
	message.value = `${item.key} changed: ${value}`;

	values1[item.key] = value;
};
const handler2 = ev => {
	const { value, item } = ev;
	message.value = `${item.key} changed: ${value}`;

	values2[item.key] = value;
};

</script>

<template>
	<div class="demo-status">{{ message }}</div>

	<div class="demo-box">
		<h3>Binding different values</h3>
		<Toolbar
			:items="[
				{ id: 's1', comp: markRaw(Slider), min: 0, max: 100, key: 'x1' },
				{ comp: 'spacer' },
				{ id: 's2', comp: markRaw(Slider), min: 0, max: 100, key: 'x2' },
			]"
			css="demo-toolbar"
			:values="values1"
			:onchange="handler1"
		/>
		<span class="demo-code">{{ JSON.stringify(values1) }}</span>
		<br />
		<Button text="Reset x1" :onclick="() => { values1.x1 = 1 }" />
		<Button text="Reset x2" :onclick="() => { values1.x2 = 1 }" />
	</div>

	<div class="demo-box">
		<h3>Binding the same value</h3>
		<Toolbar
			:items="[
				{ id: 's1', comp: markRaw(Slider), min: 0, max: 100, key: 'x1' },
				{ comp: 'spacer' },
				{ id: 's2', comp: markRaw(Slider), min: 0, max: 100, key: 'x1' },
			]"
			css="demo-toolbar"
			:values="values2"
			:onchange="handler2"
		/>
	</div>
</template>
