import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./message.module.css";
import markdownStyles from "./markdown.module.css";

interface CodeBlockProps {
  language?: string;
  value: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={anOldHope}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function Message({ bot, msg }: { bot: boolean; msg: string }) {
  return (
    <div className={bot ? styles.botMessage : styles.userMessage}>
      <ReactMarkdown
        className={markdownStyles.md}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {msg}
      </ReactMarkdown>
    </div>
  );
}
