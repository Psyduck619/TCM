import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import qs from 'qs'
import less from 'less'
import '../src/assets/resetUI.css'
import { Tabbar, TabbarItem } from 'vant'
import { Search } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Lazyload } from 'vant'
import { Image as VanImage } from 'vant'
import { PullRefresh } from 'vant'
import { Icon } from 'vant'
import { Sticky } from 'vant'
import { Grid, GridItem } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Button } from 'vant'
import { NavBar } from 'vant'
import { Divider } from 'vant'
import { Field } from 'vant'
import { List } from 'vant'
import { Card } from 'vant'
import { Tab, Tabs } from 'vant'
import { Checkbox, CheckboxGroup } from 'vant'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { Tag } from 'vant'
import { Sku } from 'vant'
import { Popup } from 'vant'
import { Stepper } from 'vant'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { SubmitBar } from 'vant'
import { SwipeCell } from 'vant'
import { AddressEdit } from 'vant'
import { Area } from 'vant'
import { Sidebar, SidebarItem } from 'vant'
import { Skeleton } from 'vant'
import { Rate } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { Empty } from 'vant'

Vue.use(less)
Vue.use(Empty)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Rate)
Vue.use(Skeleton)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Area)
Vue.use(AddressEdit)
Vue.use(SwipeCell)
Vue.use(SubmitBar)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Stepper)
Vue.use(Popup)
Vue.use(Sku)
Vue.use(Tag)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Card)
Vue.use(List)
Vue.use(Field)
Vue.use(Divider)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Sticky)
Vue.use(Icon)
Vue.use(PullRefresh)
Vue.use(VanImage)
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Search)
Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Toast.setDefaultOptions({ duration: 1000 })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
