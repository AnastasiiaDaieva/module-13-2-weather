import { alert, notice, info, success, error, defaultModules } from '@pnotify/core/dist/PNotify.js'
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js'

import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/mobile/dist/PNotifyMobile.css'

defaultModules.set(PNotifyMobile, {})

export function setErrorMsg(msg) {
  return error({ text: msg })
}
export function setNoticeMsg(msg) {
  return notice({ text: msg })
}

export function setAlertMsg(msg) {
  return alert({ text: msg })
}
