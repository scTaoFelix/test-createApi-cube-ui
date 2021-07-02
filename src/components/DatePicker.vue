<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show DatePicker</cube-button>
    <cube-button @click="propsClickShow">show propsDatePicker</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { DatePicker } from 'cube-ui'

const useDatePicker = (root: ComponentInstance) => {
  const datePicker = ref<DatePicker>()
  function selectHandle(date: Date, selectedVal: [], selectedText: []) {
    console.log('date: ', date.getTime())
    root.$createDialog({
      type: 'warn',
      content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
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
  function showDatePicker() {
    if (!datePicker.value) {
      datePicker.value = root.$createDatePicker({
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        title: 'Date Picker',
        value: new Date(),
        startColumn: 'year',
        columnCount: 3,
        format: {
          year: 'YYYY年',
          month: 'MM月',
          date: '第 D 日',
          hour: 'hh',
          minute: 'mm',
          second: 's'
        },
        subtitle: 'no props',
        cancelTxt: '返回',
        confirmTxt: '选择',
        swipeTime: 2300,
        visible: true,
        maskClosable: true,
        zIndex: 90,
        columnOrder: ['month', 'date', 'year'],
        onSelect: selectHandle,
        onCancel: cancelHandle,
        onChange: (i, si) => {
          console.log('change', i, si)
        }
      })
    }
    datePicker.value.show()
    setTimeout(() => {
      if (!datePicker.value) {
        return
      }
      datePicker.value.$updateProps({
        title: 'updated',
        value: new Date(2010, 9, 1)
      })
    }, 1000)
  }

  function clickShow() {
    showDatePicker()
  }

  function propsClickShow() {
    root.$createDatePicker({
      $props: {
        title: 'Date Picker',
        min: [2008, 7, 8],
        max: [new Date().getFullYear() + 1, 12, 31, 23, 59, 59],
        value: new Date(),
        columnCount: 6,
        format: {
          year: 'YYYY年',
          month: 'MM月',
          date: '第 D 日'
        },
        columnOrder: ['month', 'date', 'year']
      },
      $events: {
        select: selectHandle,
        cancel: cancelHandle,
        change: (i, si) => {
          console.log('change', i, si)
        }
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
    const { clickShow, propsClickShow } = useDatePicker(root)

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
