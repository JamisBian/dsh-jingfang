// 方族鉴别：同一类方（如四逆汤类）症状高度重叠，靠权重分不开，
// 必须在辨证阶段直接问「家族鉴别点」，再把答案折算成症状与加权。
//
// 写法约定（重要）：
//   · 选项文案一律用**患者能读懂的口语**，术语放在 description 里
//   · 每题都要有「说不清 / 都不像」出口，选了不加权、不补症状，家族鉴别就此退出
//   · 只问患者能自己观察或感觉到的（面色、寒热、大便、白天烦还是夜里烦）；
//     脉象、腹诊这类需要医师的，只作近似参考，不单凭它定方
//
// 每个选项可以：
//   add    —— 补充症状（患者原话里没提，但这个问题问出来后能确定）
//   boost  —— 给指定方加权重
//   demote —— 给同族其他方减权重（家族内部互斥，选中一个就该压低其余）

const UNSURE = { label: '说不清 / 都不像' }

export const FAMILIES = [
  {
    id: 'sini',
    name: '四逆汤类',
    /** 成员：只要有两首同时进前五，就触发家族鉴别 */
    // 注意：由脚本生成的补遗方用中文 id（<方名>_sh），手工补录的用拼音
    members: [
      'sini_tang',
      '通脉四逆汤_sh',
      '白通汤_sh',
      '白通加猪胆汁汤_sh',
      '干姜附子汤_sh',
      '茯苓四逆汤_sh',
      '四逆加人参汤_sh',
      '通脉四逆加猪胆汁汤_sh'
    ],
    questions: [
      {
        id: 'family_sini_daiyang',
        header: '看一眼脸色',
        question: '照镜子或请家人看一眼：您的脸色更接近哪一种？',
        options: [
          {
            label: '脸色发白、没血色',
            description: '整张脸偏苍白，嘴唇也淡',
            boost: { sini_tang: 0.14 },
            demote: { 白通汤_sh: 0.06, 通脉四逆汤_sh: 0.06 }
          },
          {
            label: '脸发红（两颧像抹了胭脂），但身上并不怕冷',
            description: '红只限两颧，身上反而是热的、不想盖被子',
            add: ['face_red'],
            boost: { 通脉四逆汤_sh: 0.22 },
            demote: { 白通汤_sh: 0.12, 白通加猪胆汁汤_sh: 0.12, sini_tang: 0.08 }
          },
          {
            label: '脸发红，人没精神、总想睡，还拉肚子',
            description: '脸红同时精神萎靡，叫他反应也慢',
            add: ['face_red', 'lethargy'],
            boost: { 白通汤_sh: 0.22 },
            demote: { 通脉四逆汤_sh: 0.12, 白通加猪胆汁汤_sh: 0.08, sini_tang: 0.08 }
          },
          {
            label: '脸发红，心里烦、干呕，脉搏几乎摸不到',
            description: '烦躁不安、恶心得干呕，手腕上几乎摸不到脉',
            add: ['face_red', 'dry_heave'],
            boost: { 白通加猪胆汁汤_sh: 0.22 },
            demote: { 白通汤_sh: 0.1, 通脉四逆汤_sh: 0.12 }
          },
          UNSURE
        ]
      },
      {
        id: 'family_sini_pattern',
        header: '再说说这几点',
        question: '下面这些情况，哪些符合？（可多选，不确定就不选）',
        multi_select: true,
        options: [
          {
            label: '拉的大便里有没消化的食物',
            description: '中医叫「下利清谷」，吃进去什么样拉出来什么样',
            add: ['diarrhea'],
            boost: { sini_tang: 0.1, 通脉四逆汤_sh: 0.06 }
          },
          {
            label: '白天烦躁坐不住，到了晚上反而安静',
            description: '昼日烦躁、夜而安静，是干姜附子汤的关键',
            add: ['restlessness'],
            boost: { 干姜附子汤_sh: 0.14 }
          },
          {
            label: '心里烦，同时心慌、小便不畅',
            description: '烦躁兼心悸、小便不利',
            add: ['palpitation', 'difficult_urine'],
            boost: { 茯苓四逆汤_sh: 0.14 }
          },
          {
            label: '拉肚子已经停了，但还是怕冷、脉很弱、人很虚',
            description: '腹泻止而气血未复，偏四逆加人参汤',
            boost: { 四逆加人参汤_sh: 0.14 }
          },
          {
            label: '又吐又出汗，手脚抽筋，脉几乎摸不到',
            description: '呕吐、汗出而四肢拘急、脉微欲绝',
            add: ['vomiting', 'spasm'],
            boost: { 通脉四逆加猪胆汁汤_sh: 0.12 }
          },
          UNSURE
        ]
      }
    ]
  },
  {
    id: 'chengqi',
    name: '承气汤类',
    members: ['da_chengqi_tang', 'xiao_chengqi_tang', 'tiaowei_chengqi_tang', 'maziren_wan'],
    questions: [
      {
        id: 'family_chengqi',
        header: '摸摸肚子',
        question: '平躺放松，用手轻轻按一按肚子，哪种感觉最接近？',
        options: [
          {
            label: '肚子硬邦邦的，一按就疼，还不让按',
            description: '中医叫「痞满燥实」，多伴潮热、说胡话',
            add: ['rigidity', 'delirium', 'tidal_fever'],
            boost: { da_chengqi_tang: 0.16 }
          },
          {
            label: '肚子胀得厉害、大便解不出，但按下去不算硬',
            description: '胀满为主、燥实次之',
            add: ['abdominal_fullness', 'hard_stool'],
            boost: { xiao_chengqi_tang: 0.16 }
          },
          {
            label: '身上一阵一阵发热、心里烦，大便不通但肚子不胀',
            description: '蒸蒸发热、心烦，偏调胃承气汤',
            add: ['tidal_fever', 'restlessness'],
            boost: { tiaowei_chengqi_tang: 0.16 }
          },
          {
            label: '大便干得像栗子，小便次数多、老觉得口干',
            description: '脾约证，偏麻子仁丸（润下，不峻攻）',
            add: ['hard_stool', 'frequent_urine'],
            boost: { maziren_wan: 0.16 }
          },
          UNSURE
        ]
      }
    ]
  },
  {
    id: 'xiexin',
    name: '泻心汤类',
    members: ['banxia_xiexin_tang', 'shengjiang_xiexin_tang_sh', 'gancao_xiexin_tang', 'huanglian_tang', 'xuanfu_daizhe_tang'],
    questions: [
      {
        id: 'family_xiexin',
        header: '胃里那团不舒服',
        question: '胃脘（心口窝）堵得慌，同时最突出的是哪一项？',
        options: [
          {
            label: '恶心想吐，肚子咕咕响，还拉肚子',
            description: '呕、肠鸣、下利并见，偏半夏泻心汤',
            add: ['vomiting', 'borborygmus', 'diarrhea'],
            boost: { banxia_xiexin_tang: 0.16 }
          },
          {
            label: '打嗝带着食物的馊味，肚子咕咕响、拉肚子',
            description: '干噫食臭、腹中雷鸣下利，偏生姜泻心汤',
            add: ['belching', 'borborygmus', 'diarrhea'],
            boost: { shengjiang_xiexin_tang_sh: 0.18 }
          },
          {
            label: '嘴里或外阴反复溃烂，说话声音沙哑',
            description: '狐惑病表现，偏甘草泻心汤',
            add: ['sore_throat'],
            boost: { gancao_xiexin_tang: 0.18 }
          },
          {
            label: '胸口觉得热，肚子却痛、想吐',
            description: '上热下寒，偏黄连汤',
            add: ['epigastric_pain', 'vomiting'],
            boost: { huanglian_tang: 0.16 }
          },
          {
            label: '一个劲儿打嗝、嗳气，胃脘痞硬',
            description: '噫气不除，偏旋覆代赭汤',
            add: ['belching'],
            boost: { xuanfu_daizhe_tang: 0.16 }
          },
          UNSURE
        ]
      }
    ]
  }
]

const BY_MEMBER = new Map()
for (const family of FAMILIES) {
  for (const id of family.members) BY_MEMBER.set(id, family)
}

/** 某方属于哪个方族。 */
export function familyOf(formulaId) {
  return BY_MEMBER.get(formulaId)
}

/**
 * 判断是否需要触发家族鉴别：前五名里同一方族出现 ≥2 首。
 * @param {Array<{formula:{id:string}}>} ranking
 * @returns {{family:object, members:object[]}|undefined}
 */
export function familyInPlay(ranking) {
  const counts = new Map()
  for (const entry of ranking) {
    const family = BY_MEMBER.get(entry.formula.id)
    if (family === undefined) continue
    const list = counts.get(family.id) ?? { family, members: [] }
    list.members.push(entry)
    counts.set(family.id, list)
  }
  for (const value of counts.values()) {
    if (value.members.length >= 2) return value
  }
  return undefined
}

/**
 * 把家族鉴别的作答折算成「补充症状 + 各方加权」。
 * 「说不清」选项不带 add/boost，自然什么都不加，家族鉴别就此退出。
 * @param {object} family
 * @param {Array<{id:string, selected:string[]}>} answers
 * @returns {{symptoms:string[], boosts:Record<string,number>, undecided:boolean}}
 */
export function applyFamilyAnswers(family, answers) {
  const symptoms = []
  const boosts = {}
  let undecided = false
  for (const question of family.questions) {
    const answer = answers.find((a) => a.id === question.id)
    if (answer === undefined) continue
    const picked = (answer.selected ?? []).filter((label) => label !== '')
    if (picked.length === 0) undecided = true
    for (const label of picked) {
      const option = question.options.find((o) => o.label === label)
      if (option === undefined) continue
      if ((option.add ?? []).length === 0 && option.boost === undefined) undecided = true
      for (const id of option.add ?? []) if (!symptoms.includes(id)) symptoms.push(id)
      for (const [formulaId, weight] of Object.entries(option.boost ?? {})) {
        boosts[formulaId] = Math.min(0.3, (boosts[formulaId] ?? 0) + weight)
      }
      for (const [formulaId, weight] of Object.entries(option.demote ?? {})) {
        boosts[formulaId] = Math.max(-0.3, (boosts[formulaId] ?? 0) - weight)
      }
    }
  }
  return { symptoms, boosts, undecided }
}
