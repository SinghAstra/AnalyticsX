import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";

export async function getMdxSource(content: string) {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
            keepBackground: false,
          } as PrettyCodeOptions,
        ],
      ],
    },
    parseFrontmatter: true,
  });
}
