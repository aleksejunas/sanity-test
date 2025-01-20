// components/CustomTitleInput.tsx
import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import styles from "./CustomTitleInput.module.css";

interface Block {
  _type: string;
  _key: string;
  children?: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: string;
}

interface BlockSerializerProps {
  node: {
    style?: string;
    children?: React.ReactNode;
  };
}

interface CustomTitleInputProps {
  blocks?: Block[];
  isLoading?: boolean;
  error?: Error | null;
}

const serializers = {
  types: {
    block: (props: BlockSerializerProps) => {
      const { style = 'normal' } = props.node;
      
      switch (style) {
        case 'h1':
          return <h1>{props.node.children}</h1>;
        case 'h2':
          return <h2>{props.node.children}</h2>;
        case 'blockquote':
          return <blockquote>{props.node.children}</blockquote>;
        default:
          return <p>{props.node.children}</p>;
      }
    },
  },
  marks: {
    link: ({ mark, children }: { mark: { href: string }, children: React.ReactNode }) => {
      return <a href={mark.href}>{children}</a>;
    },
    strong: ({ children }: { children: React.ReactNode }) => <strong>{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
  },
};

const CustomTitleInput: React.FC<CustomTitleInputProps> = ({ 
  blocks, 
  isLoading = false, 
  error = null 
}) => {
  if (isLoading) {
    return <div className={styles.loading}>Loading title content...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error loading title content: {error.message}
      </div>
    );
  }

  if (!blocks || blocks.length === 0) {
    return <div className={styles.empty}>No title content available</div>;
  }

  return (
    <div className={styles.titleContent}>
      <BlockContent
        blocks={blocks}
        serializers={serializers}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      />
    </div>
  );
};

export default CustomTitleInput;
