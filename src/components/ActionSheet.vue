<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show ActionSheet</cube-button>
    <cube-button @click="propsClickShow">show ActionSheet</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { ActionSheet } from 'cube-ui'
interface SelectActionSheetItem {
  content?: string;
  align?: string;
  class?: string;
}
const data = [
  {
    content: '舒适型',
    align: 'left',
    class: 'self'
  },
  {
    content: '七座商务',
    align: 'left',
    class: 'self'
  },
  {
    content: '豪华型',
    align: 'left',
    class: 'self'
  }
]
const useActionSheet = (root: ComponentInstance) => {
  const actionSheet = ref<ActionSheet>()
  const selectHandler = (item: SelectActionSheetItem, index: number) => {
    root.$createToast({
      txt: `Clicked ${item.content}, ${index}`,
      type: 'correct',
      time: 1000
    }).show()
  }
  const cancelHandler = () => {
    root.$createToast({
      txt: 'Clicked canceled',
      type: 'warn',
      time: 1000
    }).show()
  }
  function showActionSheet() {
    actionSheet.value = root.$createActionSheet({
      title: '我是标题~~~',
      active: 2,
      pickerStyle: true,
      cancelTxt: 'cancel',
      data: data,
      visible: true,
      maskClosable: true,
      zIndex: 99,
      onSelect: selectHandler,
      onCancel: cancelHandler
    })
    actionSheet.value.show()
  }
  function clickShow() {
    showActionSheet()
  }
  function propsClickShow() {
    actionSheet.value = root.$createActionSheet({
      $props: {
        title: '我是标题~~~',
        active: 2,
        pickerStyle: true,
        cancelTxt: 'cancel',
        data: data,
        visible: true,
        maskClosable: true,
        zIndex: 99
      },
      $events: {
        select: selectHandler,
        cancel: cancelHandler
      }
    })
    actionSheet.value.show()
  }

  return {
    clickShow,
    propsClickShow
  }
}

export default defineComponent({
  setup(props, { root }) {
    console.log('root ', root)
    const { clickShow, propsClickShow } = useActionSheet(root)

    return {
      clickShow,
      propsClickShow
    }
  }
})
</script>
<style lang="stylus">
@import "~common/stylus/variable.styl"
@import "~common/stylus/mixin.styl"
.demo-components
  height: 80px
  border-side-1px(#ccc, 'bottom', 'solid')
</style>
