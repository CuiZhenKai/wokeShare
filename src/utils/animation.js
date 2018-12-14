// 工具函数库
export function showToast (text, icon, image = null) {
  wx.showToast({
    title: text,
    icon: icon,
    image: image,
    duration: 2400
  })
}
