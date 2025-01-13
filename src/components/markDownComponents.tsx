import React from "react";

interface MarkdownComponentProps {
  markdown: string; // The Markdown content to render
  className?: string; // Optional CSS class
}

const MarkdownComponent: React.FC<MarkdownComponentProps> = ({
  markdown,
  className,
}) => {
  return (
    <div
      className={`${className} whitespace-pre-wrap`}
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  );
};

export default MarkdownComponent;
