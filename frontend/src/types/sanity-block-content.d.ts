// This is a declaration file for the @sanity/block-content-to-react package.
// It adds type definitions for the BlockContent component.

declare module '@sanity/block-content-to-react' {
  import { ReactElement } from 'react';
  
  interface BlockContentProps {
    blocks: unknown[];
    [key: string]: unknown;
  }

  export default function BlockContent(props: BlockContentProps): ReactElement;
}
