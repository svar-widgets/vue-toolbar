<script setup>
defineOptions({ name: "ToolbarComponentToolbar" });

import Menu from "./Menu.vue";
import Group from "./Group.vue";
import BarComponent from "./BarComponent.vue";

import { uid } from "@svar-ui/lib-dom";
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";

const props = defineProps({
	menuCss: { default: "" },
	css: { default: "" },
	overflow: { default: "menu" },
	values: { default: null },
	onclick: { type: Function },
	onchange: { type: Function },
});

const items = defineModel("items", { default: () => [] });

const values = computed(() => props.values);

function handleChange(ev) {
	if (values.value) {
		values.value[ev.item.key] = ev.value;
	}
	props.onchange && props.onchange(ev);
}

const div = ref(null);
let lastToolbarState = -1;
const menuItems = ref([]);

function processOverflow() {
	if (props.overflow === "wrap") return;

	const visibleWidth = div.value.clientWidth;
	const fullWidth = div.value.scrollWidth;
	const needMenu = fullWidth > visibleWidth;

	if (needMenu) {
		if (props.overflow === "collapse") return collapseGroups(visibleWidth);
		// we need to decide how many nodes need to be
		const nodes = div.value.children;
		let sum = 0;

		for (let i = 0; i < items.value.length; i++) {
			sum += nodes[i].clientWidth;
			if (items.value[i].comp == "separator") sum += 8;
			if (sum > visibleWidth - 40) {
				// skip updates, as visibility state was not changed
				if (lastToolbarState === i) return;
				lastToolbarState = i;

				// we need to hide nodes[i] and all next nodes
				menuItems.value = [];
				for (let j = i; j < items.value.length; j++) {
					menuItems.value.push(items.value[j]);
					nodes[j].style.visibility = "hidden";
				}
				// hide the ending separator
				if (i > 0 && items.value[i - 1].comp == "separator") {
					nodes[i - 1].style.visibility = "hidden";
				}
				break;
			}
			nodes[i].style.visibility = "";
		}
	} else {
		const freeWidth = visibleWidth - getTotalWidth();
		if (freeWidth <= 0) return;
		if (props.overflow === "collapse") return expandGroups(freeWidth);

		if (menuItems.value.length) {
			lastToolbarState = null;
			const nodes = div.value.children;
			for (let i = 0; i < items.value.length; i++) {
				nodes[i].style.visibility = "";
			}
			menuItems.value = [];
		}
	}
}

function getTotalWidth() {
	const nodes = div.value.children;
	let sum = 0;
	for (let i = 0; i < items.value.length; i++) {
		if (items.value[i].comp != "spacer") {
			sum += nodes[i].clientWidth;
			if (items.value[i].comp == "separator") sum += 8;
		}
	}
	return sum;
}

function collapseGroups() {
	for (let i = items.value.length - 1; i >= 0; i--) {
		// close rightmost open group
		if (items.value[i].items && !items.value[i].collapsed) {
			items.value[i].collapsed = true;
			items.value[i].$width = div.value.children[i].offsetWidth;
			// check after dom update, maybe we need to close more
			nextTick().then(processOverflow);

			// items are not deep reactive, so we need to trigger the update
			items.value = [...items.value];
			return;
		}
	}
}

function expandGroups(freeSpace) {
	for (let i = 0; i < items.value.length; i++) {
		// close leftmost closed group, that was closed previously
		if (items.value[i].collapsed && items.value[i].$width) {
			// check if group can fit in free space
			if (
				items.value[i].$width - div.value.children[i].offsetWidth <
				freeSpace + 10
			) {
				items.value[i].collapsed = false;
				// check after dom update, maybe we can open one more
				nextTick().then(processOverflow);
			}

			items.value = [...items.value];
			return;
		}
	}
}

// rebuild toolbar items, inject group nodes
function normalize(items) {
	items.forEach(item => {
		if (!item.id) item.id = uid();
	});
	return items;
}

let resizeObserver;

onMounted(() => {
	resizeObserver = new ResizeObserver(() => processOverflow());
	if (div.value) resizeObserver.observe(div.value);
});

onBeforeUnmount(() => {
	if (resizeObserver) {
		resizeObserver.disconnect();
	}
});

const visibleItems = computed(() => normalize(items.value));
</script>

<template>
	<div
		:class="['wx-toolbar', css, { 'wx-wrap': overflow === 'wrap' }]"
		ref="div"
	>
		<template v-for="item in visibleItems" :key="item.id">
			<Group
				v-if="item.items"
				:item="item"
				:values="values"
				:onclick="onclick"
				:onchange="handleChange"
			/>
			<BarComponent
				v-else
				:item="item"
				:values="values"
				:onclick="onclick"
				:onchange="handleChange"
			/>
		</template>
		<Menu
			v-if="menuItems.length"
			:items="menuItems"
			:css="menuCss"
			:values="values"
			:onclick="onclick"
			:onchange="handleChange"
		/>
	</div>
</template>

<style scoped>
.wx-toolbar {
	width: 100%;
	flex-wrap: nowrap;
	display: flex;
	align-items: stretch;
	padding: 4px;
	position: relative;
}
.wx-toolbar.wx-wrap {
	flex-wrap: wrap;
}
</style>
