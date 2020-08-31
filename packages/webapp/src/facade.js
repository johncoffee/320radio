export async function toggleFullScreenBrowser (enable) {
  if (!document.fullscreenElement || enable) {
    try {
      await document.querySelector('html').requestFullscreen()
    }
    catch {
      return false
    }
    return true
  }

  await document.exitFullscreen()
  return false
}
