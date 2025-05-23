import type { MarkdownTransformContext } from '@slidev/types'
import { normalizeRangeStr } from './utils'

// eslint-disable-next-line regexp/no-super-linear-backtracking
export const reCodeBlock = /^```([\w'-]+)?\s*(?:\[(.*?)\])?\s*(?:\{([\w*,|-]+)\}\s*?(\{[^}]*\})?([^\r\n]*))?\r?\n([ \t]*\S[\s\S]*?)^```$/gm

/**
 * Transform code block with wrapper
 */
export function transformCodeWrapper(ctx: MarkdownTransformContext) {
  ctx.s.replace(
    reCodeBlock,
    (full, lang = '', title = '', rangeStr: string = '', options = '', attrs = '', code: string) => {
      const ranges = normalizeRangeStr(rangeStr)
      code = code.trimEnd()
      options = options.trim() || '{}'
      return `\n<CodeBlockWrapper v-bind="${options}" :title='${JSON.stringify(title)}' :ranges='${JSON.stringify(ranges)}'>\n\n\`\`\`${lang}${title ? ` [${title}]` : ''}${attrs}\n${code}\n\`\`\`\n\n</CodeBlockWrapper>`
    },
  )
}
