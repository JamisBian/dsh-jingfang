// 处方笺生成

import { doseText, doseOf, GRAMS_PER_LIANG } from './dose.js'
import { herbWarnings } from '../data/index.js'
import { huangNote } from '../data/huang-notes.js'
import { caseSummary } from './case.js'

/**
 * 组成明细。
 * @param {object} formula
 */
export function compositionLines(formula) {
  const basis = formula.doseBasis ?? 'han'
  return formula.composition.map((part) => {
    const { ancient, modern } = doseOf(part)
    return {
      herb: part.herb,
      ancient,
      // 比例配伍的丸散：折算克数无临床意义，一律留空
      modern: basis === 'ratio' ? '' : modern.replace(/^≈/, ''),
      prep: part.prep ?? '',
      text: doseText(part)
    }
  })
}

/** 三档剂量的说明文案。 */
export const DOSE_BASIS = {
  han: {
    label: '汉制原量',
    conversion: () => `原方剂量按 1 两 = 3 克折算；枚/升/合等按汉制估值，仅供临床参考。`
  },
  modern: {
    label: '经验剂量',
    conversion: () =>
      '本方宋校剂量（钱/分）或折算值与临床不符，组成按现代经验剂量列出；仍需由医师按证加减。'
  },
  ratio: {
    label: '原方比例',
    conversion: () =>
      '本方为等分/比例配伍的丸散，折算克数没有临床意义；请按原方比例或医师经验剂量使用。'
  }
}

/**
 * 生成处方笺。
 * @param {object} caseData
 * @param {object} formula
 * @param {{modifications?:string[], notes?:string, evidence?:object}} [options]
 */
export function buildSheet(caseData, formula, options = {}) {
  const composition = compositionLines(formula)
  const additions = (options.modifications ?? []).filter((m) => typeof m === 'string' && m.trim() !== '')
  const capNotes = Object.entries(formula.doseCap ?? {}).map(
    ([herb, max]) => `本方原方 ${herb} 用量偏大，现代临床建议不超过 ${max}g，须由医师按体质调整。`
  )
  const schoolNote =
    formula.school === 'shifang'
      ? ['本方为后世方/经验方，依据为黄煌《经方使用手册》的方证与临床经验，非仲景原文；请结合辨证使用。']
      : []
  const allergyNote =
    caseData.allergy === '' ? [] : [`患者自述药物过敏史：${caseData.allergy}。开方前须逐味核对，必要时做过敏试验。`]
  const warnings = [...allergyNote, ...schoolNote, ...capNotes, ...herbWarnings(formula), ...(formula.safety ?? [])]
  const basis = formula.doseBasis === undefined ? 'han' : formula.doseBasis
  const huang = huangNote(formula.id)
  const sheet = {
    title: `${formula.name} 处方笺`,
    formula: { id: formula.id, name: formula.name, source: formula.source, six: formula.six, school: formula.school ?? 'jingfang' },
    patient: caseData.patient,
    summary: caseSummary(caseData),
    pattern: formula.pattern,
    composition,
    additions,
    decoction: formula.decoction,
    doseBasis: basis,
    doseBasisLabel: (DOSE_BASIS[basis] ?? DOSE_BASIS.han).label,
    conversion: (DOSE_BASIS[basis] ?? DOSE_BASIS.han).conversion(),
    advice: [
      '每日一剂，水煎分二次温服（或遵煎服法）',
      '服药期间忌生冷、油腻、辛辣，注意保暖',
      '服药 3 剂后复诊，若症状加重或出现新不适立即停药并就医'
    ],
    warnings: [...new Set(warnings)],
    ...(huang?.modifications === undefined ? {} : { modificationsReference: huang.modifications }),
    ...(huang?.constitution === undefined ? {} : { constitutionReference: clip(huang.constitution, 160) }),
    notes: options.notes ?? '',
    disclaimer:
      '本处方由 AI 依据《伤寒论》《金匮要略》方证对应原则整理，仅供中医师参考，不能替代面诊与执业医师处方。孕妇、儿童、老人及慢性病用药者须由医师面诊后调整。'
  }
  sheet.markdown = sheetText(sheet)
  return sheet
}

/** 截断长文本，避免卡片过长。 */
function clip(text, max) {
  return text.length <= max ? text : `${text.slice(0, max)}…`
}

/**
 * 处方笺 Markdown。
 * @param {ReturnType<typeof buildSheet>} sheet
 */
export function sheetText(sheet) {
  const lines = []
  lines.push(`# ${sheet.title}`)
  lines.push(`**出处**：${sheet.formula.source}　**六经**：${sheet.formula.six}`)
  lines.push('')
  lines.push('## 病历摘要')
  lines.push(sheet.summary.split('\n').map((l) => `> ${l}`).join('\n'))
  lines.push('')
  lines.push('## 辨证要点')
  lines.push(sheet.pattern.map((p) => `- ${p}`).join('\n'))
  lines.push('')
  lines.push('## 处方')
  lines.push(
    sheet.doseBasis === 'han' ? '| 药物 | 原方用量 | 折算(1两=3g) | 炮制 |' : '| 药物 | 用量 | 折算 | 炮制 |'
  )
  lines.push('| --- | --- | --- | --- |')
  for (const part of sheet.composition) {
    lines.push(`| ${part.herb} | ${part.ancient} | ${part.modern === '' ? '—' : part.modern} | ${part.prep === '' ? '—' : part.prep} |`)
  }
  if (sheet.additions.length > 0) {
    lines.push('')
    lines.push(`**加减**：${sheet.additions.join('；')}`)
  }
  lines.push('')
  lines.push(`> **${sheet.doseBasisLabel}**：${sheet.conversion}`)
  lines.push('')
  lines.push('## 煎服法')
  lines.push(sheet.decoction)
  lines.push('')
  lines.push('## 医嘱')
  lines.push(sheet.advice.map((a) => `- ${a}`).join('\n'))
  if (sheet.warnings.length > 0) {
    lines.push('')
    lines.push('## 用药警示')
    lines.push(sheet.warnings.map((w) => `- ⚠️ ${w}`).join('\n'))
  }
  if (sheet.modificationsReference !== undefined) {
    lines.push('')
    lines.push('## 随证加减（参考）')
    lines.push(sheet.modificationsReference)
  }
  if (sheet.notes !== '') {
    lines.push('')
    lines.push('## 备注')
    lines.push(sheet.notes)
  }
  lines.push('')
  lines.push(`---\n${sheet.disclaimer}`)
  return lines.join('\n')
}
