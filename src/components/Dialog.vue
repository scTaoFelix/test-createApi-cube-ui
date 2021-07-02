<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show dialog</cube-button>
    <cube-button style="margin-top: 20px;" @click="propsClickShow">show props dia</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { Dialog } from 'cube-ui'

const useDialog = (root: ComponentInstance) => {
  const dialog = ref<Dialog>()
  const closeHandler = (e: object) => {
    console.log(e)
    root.$createToast({
      type: 'warn',
      time: 1000,
      txt: '点击关闭按钮'
    }).show()
  }
  const cancleHandler = (e: object) => {
    console.log(e)
    root.$createToast({
      type: 'warn',
      time: 1000,
      txt: '点击取消按钮'
    }).show()
  }
  const confirmHandler = (e: object, val?: string|number) => {
    console.log(e)
    root.$createToast({
      type: 'correct',
      time: 1000,
      txt: '点击确认' + val
    }).show()
  }
  function showDialog() {
    dialog.value = root.$createDialog({
      type: 'prompt',
      icon: 'cubeic-alert',
      title: 'dialog 标题',
      content: '我是正文',
      showClose: true,
      confirmBtn: {
        text: '确认',
        active: false,
        disabled: true,
        href: 'https://didi.github.io/cube-ui/#/zh-CN/docs/dialog'
      },
      cancelBtn: '取消',
      visible: true,
      maskClosable: true,
      zIndex: 2,
      prompt: {
        value: 12,
        placeholder: '请输入'
      },
      onClose: closeHandler,
      onConfirm: confirmHandler,
      onCancel: cancleHandler
    })
    dialog.value.show()
  }
  function clickShow() {
    showDialog()
  }

  function showPropsDialog() {
    root.$createDialog({
      $props: {
        type: 'confirm',
        icon: 'cubeic-alert',
        title: 'dialog 标题',
        content: '我是正文',
        showClose: true,
        confirmBtn: {
          text: '确认'
        },
        cancelBtn: '取消',
        visible: true,
        maskClosable: true
      },
      $events: {
        close: closeHandler,
        confirm: confirmHandler,
        cancel: cancleHandler
      }
    }).show()
  }
  function propsClickShow() {
    showPropsDialog()
  }
  return {
    clickShow,
    propsClickShow
  }
}

export default defineComponent({
  setup(props, { root }) {
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
