<script setup>
defineOptions({ name: "ToolbarGroup" });

import { ref } from "vue";
import BarComponent from "./BarComponent.vue";
import { Dropdown } from "@svar-ui/vue-core";
import { collapseSeparators } from "../helpers";

const props = defineProps({
	item: {},
	values: { default: null },
	menu: { default: false },
	onchange: { type: Function },
	onclick: { type: Function },
});

const collapsedState = ref(true);

const onClick = (ev) => {
	oncancel();
	props.onclick && props.onclick(ev);
};

const show = () => (collapsedState.value = false);
const oncancel = () => (collapsedState.value = true);
</script>

<template>
	<div
		:class="[
			'wx-tb-group',
			item.css || '',
			{
				'wx-column': item.layout == 'column',
				'wx-group-collapsed': item.collapsed && !menu,
			},
		]"
	>
		<template v-if="item.collapsed && !menu">
			<div class="wx-collapsed" :onclick="show">
				<i v-if="item.icon" :class="['icon', item.icon]"></i>
				<div v-if="item.text" class="wx-label-text">
					{{ item.text }}
				</div>
				<i
					v-if="item.text && !item.icon"
					class="wx-label-arrow wxi-angle-down"
				></i>
			</div>
			<Dropdown v-if="!collapsedState" width="" :oncancel="oncancel">
				<div class="wx-drop-group">
					<Group
						:item="{ ...item, text: '', collapsed: false }"
						:values="values"
						:menu="menu"
						:onchange="onchange"
						:onclick="onClick"
					/>
				</div>
			</Dropdown>
		</template>
		<template v-else>
			<div class="wx-tb-body">
				<template
					v-for="sub in collapseSeparators(item.items)"
					:key="sub.id"
				>
					<Group
						v-if="sub.items"
						:item="sub"
						:values="values"
						:onclick="onClick"
						:onchange="onchange"
					/>
					<BarComponent
						v-else
						:item="sub"
						:values="values"
						:onclick="onClick"
						:onchange="onchange"
					/>
				</template>
			</div>
			<div v-if="item.text" class="wx-label">{{ item.text }}</div>
		</template>
	</div>
</template>

<style scoped>
.wx-tb-group {
	position: relative;
	display: flex;
	flex-flow: column;
}
.wx-group-collapsed {
	flex-flow: row;
}
.wx-collapsed {
	display: flex;
	padding: 10px;
	flex-flow: row;
	cursor: pointer;
}
.wx-group-collapsed .wx-collapsed {
	align-items: center;
}

.wx-label {
	font-weight: var(--wx-label-font-weight);
	font-size: var(--wx-font-size-sm);
	color: var(--wx-color-font);
	text-align: center;
	display: flex;
	padding: 4px 2px 4px 12px;
	align-items: center;
	justify-content: center;
	width: 100%;
}
.wx-tb-group :deep(.wx-dropdown) {
	overflow: inherit;
}
.wx-column {
	align-items: stretch;
}
.wx-column :deep(.wx-tb-element) {
	align-self: stretch;
}
.wx-tb-body {
	height: 100%;
	display: flex;
}
.wx-column > .wx-tb-body {
	flex-flow: column;
}
</style>
