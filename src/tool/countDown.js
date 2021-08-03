/**
 * 计算总时间 返回数组['00','02','21']
 * @param {*} t 秒
 * @returns
 */
export function countDown(t) {
  let Hour = '00',
    Minute = '00',
    Second = '00'

  switch (true) {
    case t >= 3600:
      Hour =
        parseInt(t / 3600) < 10
          ? `0${parseInt(t / 3600)}`
          : `${parseInt(t / 3600)}`
      Minute =
        parseInt((t - 3600) / 60) < 10
          ? `0${parseInt((t - 3600) / 60)}`
          : `${parseInt((t - 3600) / 60)}`
      Second =
        t - 3600 - Minute * 60
          ? `0${t - 3600 - Minute * 60}`
          : `${t - 3600 - Minute * 60}`
      break
    case t >= 60:
      Minute =
        parseInt(t / 60) < 10 ? `0${parseInt(t / 60)}` : `${parseInt(t / 60)}`
      Second =
        t - Minute * 60 < 10 ? `0${t - Minute * 60}` : `${t - Minute * 60}`
      break
    default:
      Second = t < 10 ? `0${t}` : `${t}`
      break
  }
  return [Hour, Minute, Second]
}

/**
 * ['00','02','21']返回`00:02:21`格式
 * @param {*} arr
 * @returns
 */
export function newTime(arr) {
  let str = '00:00:00'
  switch (arr.length) {
    case 3:
      str =
        arr[0].length == 2
          ? `${arr[0]}:${arr[1]}:${arr[2]}`
          : `0${arr[0]}:${arr[1]}:${arr[2]}`

      break
    case 2:
      str =
        arr[0].length == 2
          ? `00:${arr[0]}:${arr[1]}`
          : `00:0${arr[0]}:${arr[1]}`

      break
    case 1:
      str = arr[0].length == 2 ? `00:00:${arr[0]}` : `00:00:0${arr[0]}`
      break
  }
  return str
}
