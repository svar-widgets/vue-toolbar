import { Button } from "@svar-ui/vue-core";
import Toolbar from "./components/Toolbar.vue";
import { registerToolbarItem } from "./helpers.js";

import Separator from "./buttons/Separator.vue";
import Spacer from "./buttons/Spacer.vue";
import ButtonList from "./buttons/ButtonList.vue";
import Label from "./buttons/Label.vue";
import Icon from "./buttons/Icon.vue";
import Item from "./buttons/Item.vue";

registerToolbarItem("button", Button);
registerToolbarItem("button", Icon, { menu: true });
registerToolbarItem("separator", Separator);
registerToolbarItem("spacer", Spacer);
registerToolbarItem("label", Label);
registerToolbarItem("item", Item);
registerToolbarItem("icon", Icon);

export { Toolbar, ButtonList, registerToolbarItem };
