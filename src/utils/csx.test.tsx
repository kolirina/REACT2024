import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadCSV } from './csx';
import { Animal } from '../types';

const mockAnchorElement = {
  setAttribute: vi.fn(),
  click: vi.fn(),
  remove: vi.fn(),
};

const mockCreateElement = vi.fn(
  () => mockAnchorElement as unknown as HTMLAnchorElement,
);
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();

globalThis.document = {
  createElement: mockCreateElement,
  body: {
    appendChild: mockAppendChild,
    removeChild: mockRemoveChild,
  } as unknown as HTMLBodyElement,
} as unknown as Document;

globalThis.encodeURI = vi.fn((content) => content);

describe('downloadCSV', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a download link and trigger a click event', () => {
    const mockItems: Animal[] = [
      {
        uid: '1',
        name: 'Lion',
        descriptions: ['Big cat'],
      },
      {
        uid: '2',
        name: 'Eagle',
        descriptions: ['Bird of prey'],
      },
    ];

    downloadCSV(mockItems);

    expect(mockCreateElement).toHaveBeenCalledWith('a');

    const linkElement = mockCreateElement.mock.results[0]
      .value as HTMLAnchorElement;

    expect(linkElement.setAttribute).toHaveBeenCalledWith(
      'href',
      expect.stringContaining('data:text/csv;charset=utf-8'),
    );
    expect(linkElement.setAttribute).toHaveBeenCalledWith(
      'download',
      '2_animals.csv',
    );

    expect(linkElement.click).toHaveBeenCalled();

    expect(mockRemoveChild).toHaveBeenCalledWith(linkElement);
  });
});
