// dsh-jingfang host half
//
// 中医经方问诊插件：把「问诊 → 辨证 → 文献核查 → 开方」做成可执行的状态机。
// 依赖全部内联，不 import @deepseek-ai/* —— 插件装进 profile 后没有那套依赖。

import { registerJingfangTools } from './tools.js'
import { PROMPT, POINTER } from './prompt.js'

/** Cordis 插件名，必须与 cordis.patch.yml 中的行名一致。 */
export const name = 'dsh-jingfang'

/**
 * 必需：工具注册表、系统提示词。
 * 可选：userQuestions（没有它时工具退化为「返回问题清单让模型代问」）。
 */
export const inject = { required: ['tools', 'systemPrompt'], optional: ['userQuestions', 'skills'] }

/** 运行时技能名：用户可用 `/jingfang` 直接唤起。 */
export const SKILL_NAME = 'jingfang'

/** 提示词段落名与顺序（100–199 是工具指引区）。 */
export const SECTION = { name: 'jingfang:workflow', order: 120 }

/**
 * @param {import('@deepseek-ai/cordis').Context} ctx
 */
export function apply(ctx) {
  // 全局只留一句「什么时候该用」，完整流程放进技能，避免污染普通会话
  ctx.systemPrompt.section({
    name: SECTION.name,
    order: SECTION.order,
    text: POINTER
  })
  registerJingfangTools(ctx)

  // 用户可输入 /jingfang 唤起；模型也可在识别到中医诉求时自行加载
  const skills = typeof ctx.get === 'function' ? ctx.get('skills') : ctx.skills
  if (skills !== undefined && typeof skills.register === 'function') {
    ctx.effect(() =>
      skills.register({
        name: SKILL_NAME,
        description: '中医经方接诊：先问诊（选项列表）→ 方证辨证 → 文献核查 → 确认后开方；含守正答辩。用户提到中医、经方、身体不适、想开方时使用。',
        whenToUse: '中医问诊、经方辨证、方剂咨询、症状自查',
        content: PROMPT,
        invocation: { modelInvocable: true, userInvocable: true }
      })
    )
  }
}

export { registerJingfangTools }
