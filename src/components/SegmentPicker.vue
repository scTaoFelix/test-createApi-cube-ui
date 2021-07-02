<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show segmentPicker</cube-button>
    <cube-button @click="propsClickShow">show propsSegmentPicker</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { SegmentPicker } from 'cube-ui'
const dateSegmentData = [
  {
    is: 'cube-date-picker',
    title: '入学时间',
    min: new Date(2000, 0, 1),
    max: new Date(2030, 11, 31)
  },
  {
    is: 'cube-date-picker',
    title: '毕业时间',
    min: new Date(2000, 0, 1),
    max: new Date(2030, 11, 31)
  }
]

const useSegmentPicker = (root: ComponentInstance) => {
  const segmentPicker = ref<SegmentPicker>()
  const selectHandler = (selectedDates: [], selectedVals: [], selectedTexts: Array<[]>) => {
    console.log('selectedDates: ', selectedDates)
    console.log('selectedVals: ', selectedVals)
    console.log('selectedTexts: ', selectedTexts)
    root.$createDialog({
      type: 'warn',
      content: `Selected Items: <br/> - 入学时间: ${selectedTexts[0].join('')} <br/> - 毕业时间: ${selectedTexts[1].join('')}`,
      icon: 'cubeic-alert'
    }).show()
  }
  const nextHandler = (i: number, selectedDate: Date, selectedValue: number[], selectedText: string[]) => {
    console.log('nextHandler i', i)

    if (!segmentPicker.value) return
    console.log(i, selectedDate, selectedValue, selectedText)
    dateSegmentData[1].min = selectedDate
    if (i === 0) {
      segmentPicker.value.$updateProps({
        data: dateSegmentData
      })
    }
  }
  const changeHandler = (pickerIndex: number, index: number, selectedIndex: number) => {
    return console.log(pickerIndex, index, selectedIndex)
  }
  const prevHandler = (pickerIndex: number) => {
    console.log('prevHandler pickerIndex', pickerIndex)
  }
  const cancelHandler = () => {
    console.log('cancel')
  }

  function showSegmentPicker() {
    if (!segmentPicker.value) {
      segmentPicker.value = root.$createSegmentPicker({
        data: dateSegmentData,
        nextTxt: '下一个',
        prevTxt: '上一个',
        title: 'segmentPicker',
        subtitle: 'subtitle',
        cancelTxt: 'cancel',
        confirmTxt: 'ok',
        swipeTime: 2300,
        visible: false,
        maskClosable: true,
        zIndex: 90,
        onSelect: selectHandler,
        onNext: nextHandler,
        onChange: changeHandler,
        onPrev: prevHandler,
        onCancel: cancelHandler
      })
    }
    segmentPicker.value.show()
  }

  function clickShow() {
    showSegmentPicker()
    // if (!TimePicker.value) return
    // TimePicker.value.show()
  }
  function propsClickShow () {
    root.$createSegmentPicker({
      $props: {
        data: dateSegmentData,
        nextTxt: '下一个',
        prevTxt: '上一个',
        title: 'segmentPicker',
        subtitle: 'subtitle',
        cancelTxt: 'cancel',
        confirmTxt: 'ok',
        swipeTime: 2300,
        visible: false,
        maskClosable: false,
        zIndex: 90
      },
      $events: {
        select: selectHandler,
        next: nextHandler,
        change: changeHandler,
        prev: prevHandler,
        cancel: cancelHandler
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
    const { clickShow, propsClickShow } = useSegmentPicker(root)

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
