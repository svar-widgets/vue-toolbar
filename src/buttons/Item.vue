<script setup>
defineOptions({ name: "ToolbarButtonsItem" });

const props = defineProps({
	id: { default: "" },
	text: { default: "" },
	css: { default: "" },
	icon: { default: "" },
	onclick: { type: Function },
});

function handleClick() {
	props.onclick?.({ id: props.id });
}
</script>

<template>
	<div :class="['wx-label', css]" @click="handleClick">
		<i v-if="icon" :class="icon"></i>
		{{ text }}
	</div>
</template>

<style scoped>
.wx-label {
	width: 100%;
	white-space: nowrap;
	color: var(--wx-input-font-color);
	padding: var(--wx-input-padding);
	overflow: hidden;
	cursor: pointer;
	display: flex;
	align-items: center;
}
i {
	margin-right: 8px;
	font-size: var(--wx-icon-size);
}

.wx-label:hover {
	background-image: linear-gradient(
		rgba(0, 0, 0, 0.1) 0%,
		rgba(0, 0, 0, 0.1) 100%
	);
}
</style>
