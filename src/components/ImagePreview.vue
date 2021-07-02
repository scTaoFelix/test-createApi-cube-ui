<template>
  <div class="demo-components">
    <cube-button @click="clickShow">show ImagePreview</cube-button>
    <cube-button @click="showPropsImagePreview">show PropsImagePreview</cube-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, ComponentInstance } from '@vue/composition-api'
import { CreateElement } from 'vue'
import { ImagePreview } from 'cube-ui'

const imgs = [
  'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg',
  'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0ncnnej21hc0zetxo.jpg',
  'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mqvu5j21hc0zkgzz.jpg',
  'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0m3ufuj21hc0zkqbj.jpg'
]

const useDialog = (root: ComponentInstance) => {
  const imagePreview = ref<ImagePreview>()
  const customIndex = ref<number>(3)
  function showImagePreview() {
    imagePreview.value = root.$createImagePreview({
      imgs: imgs,
      initialIndex: customIndex.value,
      loop: true,
      speed: 500,
      zIndex: 12,
      preventDefault: false,
      onChange: (i: number) => {
        customIndex.value = i
      },
      onHide: () => {
        console.log('hide')
      }
    }, (h: CreateElement) => {
      return h('div', {
        class: {
          'image-preview-custom-header': true
        },
        slot: 'header'
      }, (customIndex.value + 1).toString())
    })
    imagePreview.value.show()
  }
  function clickShow() {
    showImagePreview()
  }
  function showPropsImagePreview() {
    imagePreview.value = root.$createImagePreview({
      $props: {
        imgs: imgs,
        'initial-index': customIndex.value,
        loop: false,
        speed: 500,
        zIndex: 12,
        preventDefault: true
      },
      $events: {
        change: (i: number) => {
          customIndex.value = i
        },
        hide: () => {
          console.log('hide')
        }
      }
    }, (h) => {
      return h('div', {
        class: {
          'image-preview-custom-header': true
        },
        slot: 'header'
      }, (customIndex.value + 1).toString())
    })
    imagePreview.value.show()
  }
  return {
    clickShow,
    showPropsImagePreview
  }
}

export default defineComponent({
  setup(props, { root }) {
    console.log('root ', root)
    const { clickShow, showPropsImagePreview } = useDialog(root)

    return {
      clickShow,
      showPropsImagePreview
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
