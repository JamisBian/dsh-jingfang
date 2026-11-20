// 症状 / 舌象 / 脉象 目录（经方问诊选项库）
//
// 每个条目：{ id, label, cat, aliases? }
//  - id      稳定 ASCII 标识，供辨证引擎匹配
//  - label   面向患者的选项文案（选填时原样显示）
//  - cat     分类，用于分批提问
//  - aliases 同义说法，供模型/自由文本回填时识别

/** 分类顺序＝问诊分段的顺序。 */
export const CATEGORIES = [
  { id: 'cold_heat', label: '寒热' },
  { id: 'sweat', label: '汗出' },
  { id: 'head_body', label: '头身' },
  { id: 'chest_abdomen', label: '胸腹' },
  { id: 'digestion', label: '饮食口味' },
  { id: 'stool_urine', label: '二便' },
  { id: 'sleep_mind', label: '睡眠情志' },
  { id: 'respiratory', label: '咳喘咽喉' },
  { id: 'other', label: '其他' },
  { id: 'tongue', label: '舌象' },
  { id: 'pulse', label: '脉象' }
]

/** 主症（问诊清单）条目。 */
export const SYMPTOMS = [
  // 寒热
  { id: 'aversion_cold', label: '恶寒怕冷', cat: 'cold_heat', aliases: ['怕冷', '恶寒'] },
  { id: 'aversion_wind', label: '恶风（遇风不适）', cat: 'cold_heat', aliases: ['怕风', '恶风'] },
  { id: 'fever', label: '发热', cat: 'cold_heat', aliases: ['发烧', '身热', '低热', '壮热'] },
  { id: 'no_fever', label: '不发热', cat: 'cold_heat' },
  { id: 'alternating', label: '往来寒热（忽冷忽热）', cat: 'cold_heat', aliases: ['忽冷忽热', '寒热往来'] },
  { id: 'tidal_fever', label: '潮热（定时发热）', cat: 'cold_heat', aliases: ['潮热'] },
  { id: 'cold_limbs', label: '手足厥冷', cat: 'cold_heat', aliases: ['手脚冰凉', '手足冷', '四逆'] },
  { id: 'hot_palms', label: '手足心热', cat: 'cold_heat', aliases: ['五心烦热'] },
  { id: 'chill_body', label: '畏寒肢冷（全身怕冷）', cat: 'cold_heat', aliases: ['畏寒'] },
  { id: 'face_red', label: '面赤/颜面潮红', cat: 'cold_heat', aliases: ['面正赤', '面色赤', '两颧潮红', '面红'] },

  // 汗
  { id: 'no_sweat', label: '无汗', cat: 'sweat' },
  { id: 'spontaneous_sweat', label: '自汗（动则汗出）', cat: 'sweat', aliases: ['自汗', '汗出'] },
  { id: 'night_sweat', label: '盗汗（睡中汗出）', cat: 'sweat', aliases: ['盗汗'] },
  { id: 'profuse_sweat', label: '大汗出', cat: 'sweat', aliases: ['大汗'] },
  { id: 'sticky_sweat', label: '汗出黏腻', cat: 'sweat' },

  // 头身
  { id: 'headache', label: '头痛', cat: 'head_body', aliases: ['头疼'] },
  { id: 'dizziness', label: '头晕目眩', cat: 'head_body', aliases: ['头晕', '眩', '目眩', '眩晕', '头昏'] },
  { id: 'stiff_neck', label: '颈项强痛', cat: 'head_body', aliases: ['项强', '脖子僵'] },
  { id: 'body_ache', label: '周身疼痛', cat: 'head_body', aliases: ['身疼', '身体酸痛'] },
  { id: 'back_ache', label: '腰背疼痛', cat: 'head_body', aliases: ['腰痛', '腰酸'] },
  { id: 'joint_pain', label: '关节疼痛', cat: 'head_body', aliases: ['骨节疼痛', '关节痛'] },
  { id: 'heavy_body', label: '身重乏力', cat: 'head_body', aliases: ['身重', '一身尽重'] },
  { id: 'edema', label: '浮肿', cat: 'head_body', aliases: ['水肿', '面目浮肿'] },

  // 胸腹
  { id: 'chest_oppression', label: '胸闷', cat: 'chest_abdomen', aliases: ['胸满', '胸中窒'] },
  { id: 'chest_pain', label: '胸痛彻背', cat: 'chest_abdomen', aliases: ['心痛彻背', '胸痹'] },
  { id: 'palpitation', label: '心悸', cat: 'chest_abdomen', aliases: ['心动悸', '心慌', '怔忡', '心跳'] },
  { id: 'hypochondriac', label: '胁肋胀满疼痛', cat: 'chest_abdomen', aliases: ['胸胁苦满', '胁痛', '胁满', '胁肋胀满', '胁下满'] },
  { id: 'epigastric_distention', label: '心下（胃脘）痞满', cat: 'chest_abdomen', aliases: ['心下痞', '胃胀', '心下满'] },
  { id: 'epigastric_pain', label: '胃脘疼痛', cat: 'chest_abdomen', aliases: ['胃痛', '心下痛'] },
  { id: 'abdominal_pain', label: '腹痛', cat: 'chest_abdomen', aliases: ['腹中痛'] },
  { id: 'lower_abdomen', label: '少腹急结疼痛', cat: 'chest_abdomen', aliases: ['少腹痛', '小腹痛'] },
  { id: 'abdominal_fullness', label: '腹部胀满', cat: 'chest_abdomen', aliases: ['腹满', '腹胀'] },
  { id: 'rigidity', label: '腹硬拒按', cat: 'chest_abdomen', aliases: ['拒按', '腹硬'] },
  { id: 'mass_abdomen', label: '腹中包块', cat: 'chest_abdomen', aliases: ['癥块', '痞块'] },
  { id: 'qi_rush', label: '气从少腹上冲胸', cat: 'chest_abdomen', aliases: ['气上冲胸', '奔豚', '气从少腹上至心'] },
  { id: 'lower_abdomen_throb', label: '脐下悸动', cat: 'chest_abdomen', aliases: ['脐下悸', '脐下跳动'] },

  // 饮食口味
  { id: 'bitter_mouth', label: '口苦', cat: 'digestion', aliases: ['口苦咽干'] },
  { id: 'dry_mouth', label: '口干咽干', cat: 'digestion', aliases: ['口干', '咽干', '口燥', '咽燥'] },
  { id: 'thirst', label: '口渴', cat: 'digestion', aliases: ['欲饮水'] },
  { id: 'thirst_cold', label: '口渴喜冷饮', cat: 'digestion' },
  { id: 'thirst_no_drink', label: '口渴但不欲饮', cat: 'digestion', aliases: ['但欲漱水不欲咽'] },
  { id: 'nausea', label: '恶心', cat: 'digestion', aliases: ['泛恶'] },
  { id: 'vomiting', label: '呕吐', cat: 'digestion', aliases: ['呕'] },
  { id: 'dry_heave', label: '干呕', cat: 'digestion' },
  { id: 'belching', label: '嗳气（打嗝）', cat: 'digestion', aliases: ['噫气', '打嗝'] },
  { id: 'poor_appetite', label: '食欲差', cat: 'digestion', aliases: ['纳差', '不欲食', '默默不欲饮食', '食欲不振', '食欲减退', '不思饮食', '纳呆', '食少'] },
  { id: 'acid_reflux', label: '反酸烧心', cat: 'digestion', aliases: ['吞酸', '烧心'] },
  { id: 'no_taste', label: '口淡无味', cat: 'digestion' },
  { id: 'borborygmus', label: '肠鸣漉漉', cat: 'digestion', aliases: ['肠鸣', '腹中雷鸣'] },
  { id: 'saliva', label: '吐涎沫/口水多', cat: 'digestion', aliases: ['吐涎沫', '多涎唾', '涎沫'] },
  { id: 'hiccup', label: '呃逆（哕）', cat: 'digestion', aliases: ['哕逆', '打呃', '哕'] },

  // 二便
  { id: 'constipation', label: '便秘', cat: 'stool_urine', aliases: ['大便不通'] },
  { id: 'hard_stool', label: '大便干硬', cat: 'stool_urine', aliases: ['大便硬', '燥屎'] },
  { id: 'diarrhea', label: '腹泻', cat: 'stool_urine', aliases: ['下利', '泄泻'] },
  { id: 'loose_stool', label: '大便溏薄', cat: 'stool_urine', aliases: ['便溏'] },
  { id: 'mucus_stool', label: '大便黏液/脓血', cat: 'stool_urine', aliases: ['下重', '里急后重', '脓血'] },
  { id: 'dark_urine', label: '小便黄少', cat: 'stool_urine', aliases: ['尿黄'] },
  { id: 'clear_urine', label: '小便清长', cat: 'stool_urine', aliases: ['尿清'] },
  { id: 'frequent_urine', label: '尿频', cat: 'stool_urine' },
  { id: 'difficult_urine', label: '小便不利', cat: 'stool_urine', aliases: ['排尿不畅', '尿少'] },

  // 睡眠情志
  { id: 'insomnia', label: '失眠', cat: 'sleep_mind', aliases: ['不得眠', '不寐', '不得卧', '入睡难', '睡眠差', '难眠'] },
  { id: 'dreamy_sleep', label: '多梦', cat: 'sleep_mind' },
  { id: 'irritability', label: '心烦易怒', cat: 'sleep_mind', aliases: ['心烦', '易怒'] },
  { id: 'restlessness', label: '烦躁不安', cat: 'sleep_mind', aliases: ['烦躁'] },
  { id: 'depression', label: '情绪低落', cat: 'sleep_mind', aliases: ['喜悲伤欲哭', '脏躁'] },
  { id: 'anxiety', label: '焦虑紧张', cat: 'sleep_mind', aliases: ['焦虑', '紧张', '恐惧', '易惊', '担忧', '心神不宁'] },
  { id: 'forgetfulness', label: '健忘', cat: 'sleep_mind' },
  { id: 'lethargy', label: '嗜睡但欲寐', cat: 'sleep_mind', aliases: ['但欲寐', '嗜睡'] },
  { id: 'delirium', label: '神昏谵语', cat: 'sleep_mind', aliases: ['谵语', '神昏'] },

  // 咳喘咽喉
  { id: 'cough', label: '咳嗽', cat: 'respiratory', aliases: ['咳'] },
  { id: 'wheezing', label: '喘息', cat: 'respiratory', aliases: ['喘', '气喘'] },
  { id: 'white_sputum', label: '痰白清稀', cat: 'respiratory', aliases: ['痰稀', '清痰'] },
  { id: 'yellow_sputum', label: '痰黄黏稠', cat: 'respiratory', aliases: ['黄痰', '痰稠'] },
  { id: 'sore_throat', label: '咽痛', cat: 'respiratory' },
  { id: 'nasal', label: '鼻塞流涕', cat: 'respiratory', aliases: ['鼻鸣'] },
  { id: 'throat_globus', label: '咽中异物感（梅核气）', cat: 'respiratory', aliases: ['咽中如有炙脔', '梅核气'] },
  { id: 'short_breath', label: '短气（气不够用）', cat: 'respiratory', aliases: ['短气', '气短'] },
  { id: 'orthopnea', label: '喘不得平卧', cat: 'respiratory', aliases: ['喘不得卧', '不得平卧', '不能平卧', '倚息不得卧'] },

  // 其他
  { id: 'fatigue', label: '疲乏无力', cat: 'other', aliases: ['乏力', '少气', '神疲', '倦怠', '没力气'] },
  { id: 'weight_loss', label: '消瘦', cat: 'other', aliases: ['虚羸'] },
  { id: 'jaundice', label: '身目发黄', cat: 'other', aliases: ['黄疸', '身黄'] },
  { id: 'bleeding', label: '出血（衄血/便血/崩漏）', cat: 'other', aliases: ['衄血', '便血', '崩漏'] },
  { id: 'menstrual', label: '月经不调', cat: 'other', aliases: ['经期紊乱'] },
  { id: 'dysmenorrhea', label: '痛经', cat: 'other' },
  { id: 'leukorrhea', label: '带下量多', cat: 'other', aliases: ['带下'] },
  { id: 'numbness', label: '肢体麻木', cat: 'other' },
  { id: 'itching', label: '皮肤瘙痒', cat: 'other', aliases: ['瘙痒', '身痒', '皮肤痒', '疥癣'] },
  { id: 'spasm', label: '筋脉拘挛', cat: 'other', aliases: ['脚挛急', '抽筋', '抽动', '抽搐', '痉挛', '面肌痉挛', '小腿抽筋'] },
  { id: 'sore_limbs', label: '四肢酸疼', cat: 'other', aliases: ['肢节烦疼'] },
  { id: 'muscle_twitch', label: '肌肉跳动/筋惕肉瞤', cat: 'other', aliases: ['筋惕肉瞤', '肌肉跳动', '聂聂动'] },
  { id: 'spermatorrhea', label: '遗精/滑精', cat: 'other', aliases: ['失精', '梦交', '滑精', '遗精'] }
]

/** 舌象（多选）。 */
export const TONGUE = [
  { id: 'tongue_pink', label: '舌淡红' },
  { id: 'tongue_pale', label: '舌淡白' },
  { id: 'tongue_red', label: '舌红' },
  { id: 'tongue_crimson', label: '舌绛红' },
  { id: 'tongue_purple', label: '舌暗紫' },
  { id: 'tongue_swollen', label: '舌体胖大' },
  { id: 'tongue_teeth', label: '舌边齿痕' },
  { id: 'coat_thin_white', label: '苔薄白' },
  { id: 'coat_white_greasy', label: '苔白腻' },
  { id: 'coat_yellow', label: '苔黄' },
  { id: 'coat_yellow_greasy', label: '苔黄腻' },
  { id: 'coat_none', label: '少苔/无苔' }
]

/** 脉象（多选）。 */
export const PULSE = [
  { id: 'pulse_float', label: '浮' },
  { id: 'pulse_deep', label: '沉' },
  { id: 'pulse_slow', label: '迟' },
  { id: 'pulse_rapid', label: '数' },
  { id: 'pulse_wiry', label: '弦' },
  { id: 'pulse_slippery', label: '滑' },
  { id: 'pulse_thin', label: '细' },
  { id: 'pulse_rough', label: '涩' },
  { id: 'pulse_tight', label: '紧' },
  { id: 'pulse_weak', label: '微/弱' },
  { id: 'pulse_deficient', label: '虚' },
  { id: 'pulse_surging', label: '洪大' },
  { id: 'pulse_knotted', label: '结代' }
]

/** 全部可选条目（主症 + 舌 + 脉）。 */
export const ALL_ITEMS = [...SYMPTOMS, ...TONGUE, ...PULSE]

const BY_ID = new Map(ALL_ITEMS.map((item) => [item.id, item]))

/** 同义说法 → id（含 label 自身）。 */
const BY_ALIAS = new Map()
for (const item of ALL_ITEMS) {
  BY_ALIAS.set(item.label, item.id)
  // 「咽中异物感（梅核气）」这类带括注的标签，去掉括注也能命中
  const bare = item.label.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim()
  if (bare !== '') BY_ALIAS.set(bare, item.id)
  for (const alias of item.aliases ?? []) BY_ALIAS.set(alias, item.id)
}

/** 取条目。 */
export function item(id) {
  return BY_ID.get(id)
}

/** 取展示文案；未知 id 原样返回。 */
export function labelOf(id) {
  return BY_ID.get(id)?.label ?? id
}

/**
 * 把用户/模型给的标签或 id 统一成 id。
 * 容忍去掉括注、空白与全半角差异；无法识别时返回 undefined。
 */
export function resolveId(raw) {
  if (typeof raw !== 'string') return undefined
  const text = raw.trim()
  if (text === '') return undefined
  if (BY_ID.has(text)) return text
  const bare = text.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim()
  if (BY_ID.has(bare)) return bare
  if (BY_ALIAS.has(bare)) return BY_ALIAS.get(bare)
  if (BY_ALIAS.has(text)) return BY_ALIAS.get(text)
  // 「脉弦」「舌淡红」这类带前缀的写法
  if (bare.startsWith('脉') && BY_ALIAS.has(bare.slice(1))) return BY_ALIAS.get(bare.slice(1))
  if (bare.startsWith('舌') && BY_ALIAS.has(bare.slice(1))) return BY_ALIAS.get(bare.slice(1))
  return undefined
}

/** 一组原始标签 → 去重后的 id 列表（无法识别的丢弃）。 */
export function resolveIds(list) {
  const out = []
  for (const raw of list ?? []) {
    const id = resolveId(raw)
    if (id !== undefined && !out.includes(id)) out.push(id)
  }
  return out
}

/**
 * 从一整段自由文本里识别症状（子串匹配，用于患者原话/补充说明）。
 * 只匹配长度 ≥2 的别名，避免「咳」「呕」这类单字造成噪声。
 * @param {string} text
 * @returns {string[]} 症状 id
 */
export function resolveIdsInText(text) {
  if (typeof text !== 'string' || text === '') return []
  const out = []
  for (const [alias, id] of BY_ALIAS) {
    if (alias.length < 2) continue
    if (text.includes(alias) && !out.includes(id)) out.push(id)
  }
  return out
}

/** 分类下的主症条目。 */
export function byCategory(cat) {
  return SYMPTOMS.filter((s) => s.cat === cat)
}
