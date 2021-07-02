<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show Picker</cube-button>
    <cube-button @click="propsClickShow">show propsPicker</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { Picker } from 'cube-ui'
const column1 = [{ text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' }]
const column2 = [{ text: '输出', value: '输出' }, { text: '控制', value: '控制' },
  { text: '核心', value: '核心' }, { text: '爆发', value: '爆发' }]
const column3 = [{ text: '梅肯', value: '梅肯' }, { text: '秘法鞋', value: '秘法鞋' },
  { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' }]

const useDialog = (root: ComponentInstance) => {
  const picker = ref<Picker>()
  function selectHandle(selectedVal: [], selectedIndex: [], selectedText: []) {
    root.$createDialog({
      type: 'warn',
      content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
      icon: 'cubeic-alert'
    }).show()
  }
  function cancelHandle() {
    root.$createToast({
      type: 'correct',
      txt: 'Picker canceled',
      time: 1000
    }).show()
  }
  function valueChangeHandle(selectedVal: [], selectedIndex: [], selectedText: []) {
    console.log('valueChangeHandle', selectedVal, selectedIndex, selectedText)
    root.$createToast({
      type: 'correct',
      txt: 'value change',
      time: 1000
    }).show()
  }
  function changeHandle(index: number, selectedIndex: number) {
    console.log('index', index, selectedIndex, selectedIndex)
  }
  function clickShow() {
    if (!picker.value) {
      /**
       * TODO
       * cube-ui src/components/picker
       * pending: true 时，不能点击确定，不过在Picker props里好像没啥用
       */
      picker.value = root.$createPicker({
        title: 'Picker',
        subtitle: '英雄联盟',
        cancelTxt: 'cancel',
        confirmTxt: 'ok',
        swipeTime: 3000,
        alias: { value: 'text', text: 'value' },
        data: [column1],
        selectedIndex: [1],
        visible: true,
        zIndex: 90,
        maskClosable: true,
        onSelect: selectHandle,
        onCancel: cancelHandle,
        onValueChange: valueChangeHandle,
        onChange: changeHandle
      }).show()
    }
    setTimeout(() => {
      if (!picker.value) { return }
      picker.value.$updateProps({
        title: 'Updated',
        data: [column1, column2, column3],
        selectedIndex: [1, 2, 3]
      })
    }, 1000)
  }
  function propsClickShow() {
    root.$createPicker({
      $props: {
        title: 'Picker',
        data: [column1]
      },
      $events: {
        select: selectHandle,
        cancel: cancelHandle,
        'value-change': valueChangeHandle
      }
    }).show()
  }

  return {
    clickShow,
    propsClickShow
  }
}

export default defineComponent({
  setup(props, { root }) {
    console.log('root ', root)
    const { clickShow, propsClickShow } = useDialog(root)

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
