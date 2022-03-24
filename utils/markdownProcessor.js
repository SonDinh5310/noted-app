import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const markdownProcessor = (data) => {
    const result = unified()
        .use(remarkGfm)
        .use(remarkParse)
        .use(remarkHtml)
        .processSync(
            "# Hi\n\n## Table of contents\n\n## Hello\n\n**Some** ~more~ _things_.\n ```js\nconsole.log('hello world')\n```"
        );
    // .use(data)
    // console.log(result.value);
    return result.value;
};

export default markdownProcessor;
