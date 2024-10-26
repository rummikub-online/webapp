export const useLightMode = () => {
  // Clear localStorage value is necessary to apply nuxt config
  onMounted(()=>{
    localStorage.removeItem('nuxt-color-mode')
  })
}