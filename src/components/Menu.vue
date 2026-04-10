<script setup>
defineOptions({ name: "ToolbarComponentsMenu" });

import { ref } from "vue";
import BarComponent from "./BarComponent.vue";
import Group from "./Group.vue";
import { Dropdown, Button } from "@svar-ui/vue-core";

const props = defineProps({
	items: { default: () => [] },
	css: {},
	values: {},
	width: {},
	onclick: { type: Function },
	onchange: { type: Function },
});

const popup = ref(undefined);
const div = ref(null);

function oncancel() {
	popup.value = null;
}
function showMenu() {
	popup.value = true;
}
function menuClick(ev) {
	oncancel();
	props.onclick?.(ev);
}
</script>

<template>
	<div class="wx-menu" :class="css || ''" ref="div" data-id="$menu">
		<Button icon="wxi-dots-h" :onclick="showMenu" />
		<Dropdown
			v-if="popup"
			:width="`${width}px`"
			:oncancel="oncancel"
		>
			<div class="wx-drop-menu">
				<template v-for="item in items" :key="item.id">
					<Group
						v-if="item.items"
						:item="item"
						:values="values"
						:menu="true"
						:onclick="menuClick"
						:onchange="onchange"
					/>
					<BarComponent
						v-else
						:item="item"
						:values="values"
						:menu="true"
						:onclick="menuClick"
						:onchange="onchange"
					/>
				</template>
			</div>
		</Dropdown>
	</div>
</template>

<style scoped>
.wx-menu {
	position: absolute;
	overflow: visible;
	padding: 4px;
	right: 4px;
}

.wx-menu :deep(.wx-dropdown) {
	overflow: visible;
}
.wx-drop-menu {
	padding: 4px;
}
</style>
