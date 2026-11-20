// 汉代度量衡折算
//
// 全库统一采用「1 两 = 3 克」的折算标准（用户指定）。
// 其余单位按汉制与两的进位关系换算：
//   1 斤 = 16 两
//   1 两 = 24 铢
// 枚 / 个 / 升 / 合 等容量、计数量无法精确折算，数据里直接给 `grams` 估值。

/** 一两折合克数。改这一个常量即可切换全库剂量体系。 */
export const GRAMS_PER_LIANG = 3

/** 一斤折合克数。 */
export const GRAMS_PER_JIN = GRAMS_PER_LIANG * 16

/** 一铢折合克数。 */
export const GRAMS_PER_ZHU = GRAMS_PER_LIANG / 24

/** 去掉浮点噪声，最多保留一位小数。 */
export function round1(n) {
  return Math.round(n * 10) / 10
}

/** 克数 → 展示文案（整数不带小数点）。 */
export function formatGrams(n) {
  const v = round1(n)
  return Number.isInteger(v) ? String(v) : String(v)
}

/**
 * 单味药的剂量展示。
 * @param {{herb:string, liang?:number, zhu?:number, jin?:number, count?:number, unit?:string, text?:string, grams?:string}} part
 * @returns {{ancient:string, modern:string, grams:number|null}}
 */
export function doseOf(part) {
  if (typeof part.liang === 'number') {
    const grams = part.liang * GRAMS_PER_LIANG
    return { ancient: `${num(part.liang)}两`, modern: `≈${formatGrams(grams)}g`, grams }
  }
  if (typeof part.zhu === 'number') {
    const grams = part.zhu * GRAMS_PER_ZHU
    return { ancient: `${num(part.zhu)}铢`, modern: `≈${formatGrams(grams)}g`, grams }
  }
  if (typeof part.jin === 'number') {
    const grams = part.jin * GRAMS_PER_JIN
    return { ancient: `${num(part.jin)}斤`, modern: `≈${formatGrams(grams)}g`, grams }
  }
  if (typeof part.count === 'number') {
    return { ancient: `${num(part.count)}${part.unit ?? '枚'}`, modern: '', grams: null }
  }
  const ancient = part.text ?? ''
  const modern = typeof part.grams === 'string' ? `≈${part.grams}` : ''
  return { ancient, modern, grams: null }
}

/** 数字展示：整数不带小数，0.5 这类保留。 */
function num(n) {
  return Number.isInteger(n) ? String(n) : String(n)
}

/**
 * 一行剂量：「桂枝 三两（≈9g）」。
 * @param {object} part
 */
export function doseText(part) {
  const { ancient, modern } = doseOf(part)
  if (ancient === '' && modern === '') return part.prep === undefined ? part.herb : `${part.herb}（${part.prep}）`
  const prep = part.prep === undefined ? '' : `，${part.prep}`
  return modern === '' ? `${part.herb} ${ancient}${prep}` : `${part.herb} ${ancient}（${modern}）${prep}`
}
