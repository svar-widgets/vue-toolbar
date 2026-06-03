<script setup>
defineOptions({ name: "ToolbarComponentToolbar" });

import Menu from "./Menu.vue";
import Group from "./Group.vue";
import BarComponent from "./BarComponent.vue";

import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { normalizeToolbarItems } from "../helpers";

const props = defineProps({
	menuCss: { default: "" },
	css: { default: "" },
	overflow: { default: "menu" },
	layout: { default: "row" },
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
const menuItems = ref([]);

const barItems = computed(() => normalizeToolbarItems(items.value));

function getTotalWidth() {
	const nodes = div.value.children;
	let sum = 0;
	for (let i = 0; i < barItems.value.length; i++) {
		if (barItems.value[i].comp != "spacer") {
			sum += nodes[i]?.clientWidth || 0;
			if (barItems.value[i].comp == "separator") sum += 8;
		}
	}
	return sum;
}

function collapseGroups() {
	for (let i = barItems.value.length - 1; i >= 0; i--) {
		const it = barItems.value[i];
		// close rightmost open group
		if (it.items && !it.collapsed) {
			// replace item so Group re-renders; defineModel is not deep reactive
			const next = items.value.slice();
			next[i] = {
				...it,
				collapsed: true,
				$width: div.value.children[i].offsetWidth,
			};
			items.value = next;
			// check after dom update, maybe we need to close more
			nextTick().then(processOverflow);
			return;
		}
	}
}

function expandGroups(freeSpace) {
	for (let i = 0; i < barItems.value.length; i++) {
		const it = barItems.value[i];
		// open leftmost closed group that was collapsed by overflow
		if (it.collapsed && it.$width) {
			// check if group can fit in free space
			if (it.$width - div.value.children[i].offsetWidth < freeSpace + 10) {
				const next = items.value.slice();
				next[i] = { ...it, collapsed: false };
				items.value = next;
				// check after dom update, maybe we can open one more
				nextTick().then(processOverflow);
			}
			return;
		}
	}
}

function processOverflow() {
	if (props.overflow === "wrap") return;

	const nodes = div.value.children;
	// restore all items so widths can be measured
	for (let i = 0; i < barItems.value.length; i++) {
		if (nodes[i]) nodes[i].style.display = "";
	}

	const visibleWidth = div.value.clientWidth;
	const fullWidth = div.value.scrollWidth;
	const needMenu = fullWidth > visibleWidth;

	if (needMenu) {
		if (props.overflow === "collapse") return collapseGroups();

		// pinned items always stay visible
		let pinnedWidth = 0;
		for (let i = 0; i < barItems.value.length; i++) {
			if (barItems.value[i].pinned) pinnedWidth += nodes[i].clientWidth;
		}

		let sum = 0;
		for (let i = 0; i < barItems.value.length; i++) {
			if (barItems.value[i].pinned) continue;
			sum += nodes[i].clientWidth;
			if (barItems.value[i].comp == "separator") sum += 8;
			if (sum > visibleWidth - 40 - pinnedWidth) {
				// we need to hide nodes[i] and all next non-pinned nodes
				menuItems.value = [];
				for (let j = i; j < barItems.value.length; j++) {
					if (barItems.value[j].pinned) continue;
					menuItems.value.push(barItems.value[j]);
					nodes[j].style.display = "none";
				}
				// hide the ending separator
				if (
					i > 0 &&
					barItems.value[i - 1].comp == "separator" &&
					!barItems.value[i - 1].pinned
				) {
					nodes[i - 1].style.display = "none";
				}
				break;
			}
		}
	} else {
		const freeWidth = visibleWidth - getTotalWidth();
		if (freeWidth <= 0) return;
		if (props.overflow === "collapse") return expandGroups(freeWidth);

		if (menuItems.value.length) menuItems.value = [];
	}
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
</script>

<template>
	<div
		:class="[
			'wx-toolbar',
			css,
			{
				'wx-wrap': overflow === 'wrap',
				'wx-column': layout == 'column',
				'wx-has-menu': menuItems.length,
			},
		]"
		ref="div"
	>
		<template v-for="item in barItems" :key="item.id">
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
	min-height: 48px;
}
.wx-toolbar.wx-has-menu {
	padding-right: 48px;
}
.wx-toolbar.wx-wrap {
	flex-wrap: wrap;
}
.wx-column {
	flex-flow: column;
}
</style>
