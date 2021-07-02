import { RouteConfig } from 'vue-router'
import Home from 'pages/home.vue'
import Toast from 'components/Toast.vue'
import CascadePicker from 'components/CascadePicker.vue'
import Popup from 'components/Popup.vue'
import Picker from 'components/Picker.vue'
import Dialog from 'components/Dialog.vue'
import ActionSheet from 'components/ActionSheet.vue'
import DatePicker from 'components/DatePicker.vue'
import ImagePreview from 'components/ImagePreview.vue'
import SegmentPicker from 'components/SegmentPicker.vue'
import TimePicker from 'components/TimePicker.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Toast',
    name: 'Toast',
    component: Toast
  },
  {
    path: '/CascadePicker',
    name: 'CascadePicker',
    component: CascadePicker
  },
  {
    path: '/Popup',
    name: 'Popup',
    component: Popup
  },
  {
    path: '/Picker',
    name: 'Picker',
    component: Picker
  },
  {
    path: '/Dialog',
    name: 'Dialog',
    component: Dialog
  },
  {
    path: '/ActionSheet',
    name: 'ActionSheet',
    component: ActionSheet
  },
  {
    path: '/DatePicker',
    name: 'DatePicker',
    component: DatePicker
  },
  {
    path: '/ImagePreview',
    name: 'ImagePreview',
    component: ImagePreview
  },
  {
    path: '/SegmentPicker',
    name: 'SegmentPicker',
    component: SegmentPicker
  },
  {
    path: '/TimePicker',
    name: 'TimePicker',
    component: TimePicker
  }
]

export default routes
