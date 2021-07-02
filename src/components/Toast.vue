<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show toast</cube-button>
    <cube-button @click="propsClickShow">show toast Props</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { Toast } from 'cube-ui'

const useDialog = (root: ComponentInstance) => {
  const toast = ref<Toast>()
  function clickShow() {
    toast.value = root.$createToast({
      visible: true,
      type: 'error',
      mask: true,
      txt: '加载出错啦',
      time: 0,
      maskClosable: true,
      zIndex: 2,
      onTimeout: () => {
        console.log('Timeout')
      }
    }).show()
    setTimeout(() => {
      if (!toast.value) {
        return
      }
      toast.value.hide()
    }, 2000)
  }

  function propsClickShow () {
    root.$createToast({
      $props: {
        visible: true,
        type: 'loading'
      },
      $events: {
        timeout: () => {
          console.log('Timeout111')
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
  padding: 0 15px
  border-side-1px(#ccc, 'bottom', 'solid')
.cube-btn
  margin-top: 15px
</style>
