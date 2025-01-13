import React from "react";

interface MarkdownComponentProps {
  markdown: string; // The Markdown content to render
  className?: string; // Optional CSS class
}

const MarkdownComponent: React.FC<MarkdownComponentProps> = ({ markdown, className }) => {

  return (
    <p
      className={`${className} whitespace-pre-wrap`}
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></p>
  );
};

export default MarkdownComponent;