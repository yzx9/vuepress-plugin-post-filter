import type { Page, Plugin } from "@vuepress/core"
import { DraftFilterOptions } from "./type"

const name = "vuepress-plugin-draft-filter"

export const draftFilter: Plugin = (options: DraftFilterOptions) => {
  const {
    frontmatter = { draft: true, published: false },
    productionOnly = true,
  } = options

  return productionOnly && process.env.NODE_ENV !== "production"
    ? { name }
    : {
        name,
        onInitialized(app) {
          const frontmatterFilter = (page: Page) =>
            Object.keys(frontmatter)
              .map((key) => (a: Page) =>
                a.frontmatter[key] !== frontmatter[key]
              )
              .every((fn) => fn(page))

          app.pages = app.pages.filter(frontmatterFilter)
        },
      }
}

export default draftFilter
