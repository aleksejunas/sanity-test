import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTitleInput from '../CustomTitleInput';

describe('CustomTitleInput', () => {
  const mockBlocks = [
    {
      _type: 'block',
      _key: '123',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: '456',
          text: 'Test Title',
          marks: [],
        },
      ],
    },
  ];

  it('renders loading state', () => {
    render(<CustomTitleInput isLoading={true} />);
    expect(screen.getByText('Loading title content...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = new Error('Test error message');
    render(<CustomTitleInput error={error} />);
    expect(screen.getByText(/Test error message/)).toBeInTheDocument();
  });

  it('renders empty state when no blocks provided', () => {
    render(<CustomTitleInput />);
    expect(screen.getByText('No title content available')).toBeInTheDocument();
  });

  it('renders empty state when blocks array is empty', () => {
    render(<CustomTitleInput blocks={[]} />);
    expect(screen.getByText('No title content available')).toBeInTheDocument();
  });

  it('renders content when blocks are provided', () => {
    render(<CustomTitleInput blocks={mockBlocks} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders different heading styles correctly', () => {
    const blocksWithHeadings = [
      {
        _type: 'block',
        _key: '123',
        style: 'h1',
        children: [
          {
            _type: 'span',
            _key: '456',
            text: 'Heading 1',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: '789',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: '012',
            text: 'Heading 2',
            marks: [],
          },
        ],
      },
    ];

    render(<CustomTitleInput blocks={blocksWithHeadings} />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent('Heading 1');
    expect(h2).toHaveTextContent('Heading 2');
  });

  it('renders blockquote correctly', () => {
    const blockWithQuote = [
      {
        _type: 'block',
        _key: '123',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            _key: '456',
            text: 'Quote text',
            marks: [],
          },
        ],
      },
    ];

    render(<CustomTitleInput blocks={blockWithQuote} />);
    expect(screen.getByText('Quote text')).toBeInTheDocument();
  });

  it('renders strong and em marks correctly', () => {
    const blocksWithMarks = [
      {
        _type: 'block',
        _key: '123',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: '456',
            text: 'Bold text',
            marks: ['strong'],
          },
          {
            _type: 'span',
            _key: '789',
            text: 'Italic text',
            marks: ['em'],
          },
        ],
      },
    ];

    render(<CustomTitleInput blocks={blocksWithMarks} />);
    
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('Italic text')).toBeInTheDocument();
  });
});
