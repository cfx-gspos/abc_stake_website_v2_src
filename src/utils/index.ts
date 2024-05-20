import dayjs from 'dayjs'

export function formatAddress(addr: string) {
  if (addr.length < 6) return addr
  const prefix = addr.slice(0, 6)
  const suffix = addr.slice(addr.length - 4)
  return `${prefix}...${suffix}`
}

// 数字格式化 逗号分隔
export function formatNumberByComma(num: number | string, precision: number = 0) {
  if (typeof num === 'string') {
    num = Number(num)
  }
  return Intl.NumberFormat('en', {
    maximumFractionDigits: precision
  }).format(num)
}

//  截断数字到8位小数
export function truncateTo8Decimals(num: number | string, precision: number = 8) {
  const str = typeof num === 'string' ? num : String(num)
  const index = str.indexOf('.')
  if (index === -1 || str.length - index - 1 <= precision) {
    return str
  }
  return str.substring(0, index + precision + 1)
}

// 去除科学计数法
export function toNonExponential(num: number) {
  // 检查数字是否使用科学计数法表示
  if (Math.abs(num) < 1.0) {
    let e = parseInt(num.toExponential().split('e-')[1])
    let z = ''
    for (let i = 0; i < e; i++) {
      z += '0'
    }
    return '0.' + z + num.toFixed(e).substring(2)
  } else {
    let e = parseInt(num.toExponential().split('+')[1])
    let z = ''
    for (let i = 0; i < e; i++) {
      z += '0'
    }
    return num.toFixed(e).substring(0, e) + z + num.toFixed(e).substring(e + 1)
  }
}

export function formatTime(timestamp: string | number) {
  if (typeof timestamp === 'string') {
    timestamp = Number(timestamp)
  }
  if (timestamp < 1000000000000) {
    timestamp *= 1000
  }
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}
