import type { Page, Plugin } from "@vuepress/core"
import { PostFilterOptions } from "./type"

const name = "vuepress-plugin-post-filter"

export const postFilter: Plugin = (options: PostFilterOptions) => {
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

export default postFilter
