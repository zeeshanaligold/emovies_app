export const format = number => {
  var parts = (+number).toFixed(2).split('.')
  var num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (+parts[1] ? '.' + parts[1] : '')
  return num
}
