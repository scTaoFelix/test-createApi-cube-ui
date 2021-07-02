import VueRouter, { Route } from 'vue-router'
import { getCurrentInstance } from '@vue/composition-api'

export function useRoute(): Route {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  return vm.proxy.$route
}

export function useRouter(): VueRouter {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  return vm.proxy.$router
}
