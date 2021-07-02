<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show CascadePicker</cube-button>
    <cube-button @click="setPickerData">setCascadePickerData</cube-button>
    <cube-button @click="propsClickShow">show propsCascadePicker</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { CascadePicker } from 'cube-ui'

const cascadeData = [
  {
    value1: 'Fruit1',
    text1: 'Fruit1',
    children: [
      {
        value1: 'Apple',
        text1: 'Apple',
        children: [{ value1: 1, text1: 'One' }, { value1: 2, text1: 'Two' }]
      },
      {
        value1: 'Orange',
        text1: 'Orange',
        children: [{ value1: 3, text1: 'Three' }, { value1: 4, text1: 'Four' }]
      }
    ]
  },
  {
    value1: 'Drink',
    text1: 'Drink',
    children: [
      {
        value1: 'Coffee',
        text1: 'Coffee',
        children: [{ value1: 1, text1: 'One' }, { value1: 2, text1: 'Two' }]
      },
      {
        value1: 'Tea',
        text1: 'Tea',
        children: [{ value1: 1, text1: 'One' }, { value1: 3, text1: 'Three' }]
      }
    ]
  }
]

const useDialog = (root: ComponentInstance) => {
  const cascadePicker = ref<CascadePicker>()
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
  function clickShow() {
    if (cascadePicker.value) {
      cascadePicker.value.show()
      return
    }
    cascadePicker.value = root.$createCascadePicker({
      title: 'Cascade Picker',
      data: cascadeData,
      selectedIndex: [0, 1, 0],
      alias: {
        value: 'value1',
        text: 'text1'
      },
      onSelect: selectHandle,
      onCancel: cancelHandle,
      onChange: (index: number, selectedIndex: number) => {
        console.log('change', index, selectedIndex)
      }
    }).show()
  }
  function setPickerData() {
    console.log('准备设置数据')
    if (!cascadePicker.value) return
    cascadePicker.value.setData(cascadeData, [0, 0, 0])
    console.log('数据设置完成')
  }
  function propsClickShow () {
    root.$createCascadePicker({
      $props: {
        title: 'Cascade Picker',
        data: cascadeData,
        selectedIndex: [0, 1, 0],
        alias: {
          value: 'value1',
          text: 'text1'
        }
      },
      $events: {
        select: selectHandle,
        cancel: cancelHandle
      }
    }).show()
  }
  return {
    clickShow,
    setPickerData,
    propsClickShow
  }
}

export default defineComponent({
  setup(props, { root }) {
    const { clickShow, setPickerData, propsClickShow } = useDialog(root)

    return {
      clickShow,
      setPickerData,
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
