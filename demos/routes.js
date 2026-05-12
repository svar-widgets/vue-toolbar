import BasicInit from "./cases/BasicInit.vue";
import OverflowMenu from "./cases/OverflowMenu.vue";
import OverflowMenuPinned from "./cases/OverflowMenuPinned.vue";
import OverflowMenuGroups from "./cases/OverflowMenuGroups.vue";
import OverflowCollapsed from "./cases/OverflowCollapsed.vue";
import MultiLine from "./cases/MultiLine.vue";
import OverflowWrap from "./cases/OverflowWrap.vue";
import CollapsedGroups from "./cases/CollapsedGroups.vue";
import Buttons from "./cases/Buttons.vue";
import Values from "./cases/Values.vue";
import Ribbon from "./cases/Ribbon.vue";
import HeaderMenu from "./cases/HeaderMenu.vue";

export const links = [
	["/base/:skin", "Toolbar basic", BasicInit, "BasicInit"],
	["/multiline/:skin", "Multiline", MultiLine, "MultiLine"],
	[
		"/collapsed/:skin",
		"Collapsed sections",
		CollapsedGroups,
		"CollapsedGroups",
	],
	["/ribbon/:skin", "Ribbon", Ribbon, "Ribbon"],
	["/buttons/:skin", "Button types", Buttons, "Buttons"],
	["/values/:skin", "Binding values", Values, "Values"],
	["/menu/:skin", "Overflow menu", OverflowMenu, "OverflowMenu"],
	[
		"/menu-pinned/:skin",
		"Overflow menu pinned",
		OverflowMenuPinned,
		"OverflowMenuPinned",
	],
	["/wrap/:skin", "Overflow wrap", OverflowWrap, "OverflowWrap"],
	[
		"/menu-groups/:skin",
		"Overflow menu groups",
		OverflowMenuGroups,
		"OverflowMenuGroups",
	],
	[
		"/sections/:skin",
		"Overflow collapse",
		OverflowCollapsed,
		"OverflowCollapsed",
	],
	["/header/:skin", "Header menu", HeaderMenu, "HeaderMenu"],
];
