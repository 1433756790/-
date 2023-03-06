import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/gobal/gobal.scss";

import {
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Toast,
  Tabbar,
  TabbarItem,
  Skeleton,
  SkeletonParagraph,
  SkeletonTitle,
  NavBar,
  Form,
  Field,
  CellGroup,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Tab,
  Tabs,
  List,
  Card,
  PullRefresh,
  Cell,
  Grid,
  GridItem,
  SubmitBar,
  Checkbox,
  Stepper,
  CheckboxGroup,
  SwipeCell,
  Dialog,
  ContactCard,AddressList ,AddressEdit ,Popup 
} from "vant";
// 2. 引入组件样式
import "amfe-flexible";
import "vant/lib/index.css";

const app = createApp(App);

app.config.globalProperties.$filter = {
  prefix(url) {
    if (url && url.startsWith("http")) {
      return url;
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`;
      return url;
    }
  },
};

app
  .use(Button)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Skeleton)
  .use(SkeletonParagraph)
  .use(SkeletonTitle)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(ActionBar)
  .use(ActionBarButton)
  .use(ActionBarIcon)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Card)
  .use(PullRefresh)
  .use(Cell)
  .use(Grid)
  .use(GridItem)
  .use(SubmitBar)
  .use(Checkbox)
  .use(Stepper)
  .use(SwipeCell)
  .use(CheckboxGroup)
  .use(Dialog).use(ContactCard).use(AddressList).use(AddressEdit).use(Popup);

app.use(store).use(router).mount("#app");

// http://47.99.134.126:5008/#/home
