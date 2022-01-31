export default {
    saveSelectBarValue (state, selectBarValue) {
      state.selectBarValue = selectBarValue
      sessionStorage.setItem('selectBarValue', selectBarValue)
    }
}