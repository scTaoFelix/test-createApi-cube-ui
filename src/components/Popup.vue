<template>
  <div class="demo-components">
    <cube-button @click="showPopup">show popup</cube-button>
    <cube-button @click="propsClickShow">show popup Props</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { Popup } from 'cube-ui'

const useDialog = (root: ComponentInstance) => {
  const popup = ref<Popup>()
  function showPopup() {
    popup.value = root.$createPopup({
      visible: true,
      type: 'alert',
      mask: true,
      content: '我是正文',
      center: true,
      maskClosable: false,
      zIndex: 2,
      position: 'top',
      onMaskClick: () => {
        console.log('点击了背景')
        if (!popup.value) { return }
        popup.value.hide()
      }
    })
    console.log('333', popup.value.$updateProps)
    popup.value.show()
    setTimeout(() => {
      if (!popup.value) { return }
      popup.value.$updateProps({
        content: '111'
      })
    }, 2000)
  }

  function propsClickShow () {
    root.$createPopup({
      content: '我是正文',
      type: 'prompt',
      maskClosable: true,
      onMaskClick: (e: MouseEvent) => {
        console.log('点击了背景', e)
      }
    }).show()
  }
  return {
    showPopup,
    propsClickShow
  }
}

export default defineComponent({
  setup(props, { root }) {
    console.log('root ', root)
    const { showPopup, propsClickShow } = useDialog(root)

    return {
      showPopup,
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
