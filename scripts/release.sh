#!/usr/bin/env bash
# 在本仓库内完成「自检 → 提交 → 推送」。
#
# 用法：
#   ./scripts/release.sh                  # 跑测试 + 包检查，通过后提交并推送
#   ./scripts/release.sh -m "改了什么"      # 指定提交说明
#   ./scripts/release.sh --no-test        # 跳过测试（不推荐）
#   ./scripts/release.sh --no-push        # 只提交，不推送
#
# 退出码：0 成功或无变更；1 环境错误；2 自检失败；3 提交/推送失败。

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MESSAGE=""
RUN_TESTS=1
DO_PUSH=1

step() { printf '\n\033[1m▶ %s\033[0m\n' "$*"; }
die()  { printf '\033[31m✗ %s\033[0m\n' "$*" >&2; exit "${2:-1}"; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--message) MESSAGE="${2:?缺少提交说明}"; shift 2 ;;
    --no-test) RUN_TESTS=0; shift ;;
    --no-push) DO_PUSH=0; shift ;;
    -h|--help) sed -n '2,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "未知参数：$1" >&2; exit 1 ;;
  esac
done

[[ -d .git ]] || die "不在 git 仓库根目录：$ROOT"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
REMOTE="$(git remote | head -1 || true)"

step "自检"
if [[ $RUN_TESTS -eq 1 ]]; then
  node --test test/*.test.mjs || die "测试未通过，已中止提交" 2
  node scripts/check.mjs || die "包结构检查未通过，已中止提交" 2
else
  echo "已跳过测试"
fi

step "提交"
git add -A
if git diff --cached --quiet; then
  echo "没有需要提交的改动。"
  exit 0
fi
git diff --cached --stat | tail -12
[[ -n "$MESSAGE" ]] || MESSAGE="chore: 同步改动（$(date '+%Y-%m-%d %H:%M')）"
git commit -q -F - <<<"$MESSAGE" || die "提交失败" 3
echo "已提交 $(git rev-parse --short HEAD)"

if [[ $DO_PUSH -eq 1 && -n "$REMOTE" ]]; then
  step "推送到 $REMOTE/$BRANCH"
  git push "$REMOTE" "$BRANCH" || die "推送失败（提交已在本地）" 3
elif [[ $DO_PUSH -eq 1 ]]; then
  echo "没有远程，跳过推送"
else
  echo "已按 --no-push 跳过推送"
fi

step "完成"
