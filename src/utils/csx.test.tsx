import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadCSV } from './csx';
import { Animal } from '../types';
class MockBlob {
  size: number;
  type: string;
  constructor(blobParts: BlobPart[], options?: BlobPropertyBag) {
    this.size = blobParts.join('').length;
    this.type = options?.type || '';
  }
  arrayBuffer() {
    return Promise.resolve(new ArrayBuffer(this.size));
  }
  slice() {
    return new MockBlob([], { type: this.type });
  }
  stream() {
    return new ReadableStream();
  }
  text() {
    return Promise.resolve('');
  }
}

globalThis.Blob = MockBlob as unknown as typeof Blob;
const mockCreateObjectURL = vi.fn(() => 'mock-url');
const mockRevokeObjectURL = vi.fn();
globalThis.URL.createObjectURL = mockCreateObjectURL;
globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

const mockAnchorElement = {
  href: '',
  download: '',
  click: vi.fn(),
};

const createElementSpy = vi
  .spyOn(document, 'createElement')
  .mockImplementation((tagName) => {
    if (tagName === 'a') {
      return mockAnchorElement as unknown as HTMLAnchorElement;
    }
    return document.createElement(tagName);
  });

describe('downloadCSV', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a Blob with the correct CSV content and trigger a download', () => {
    const mockItems: Animal[] = [
      {
        uid: '1',
        name: 'Lion',
        earthAnimal: true,
        earthInsect: false,
        avian: false,
        canine: false,
        feline: true,
      },
      {
        uid: '2',
        name: 'Eagle',
        earthAnimal: false,
        earthInsect: false,
        avian: true,
        canine: false,
        feline: false,
      },
    ];

    downloadCSV(mockItems);

    expect(createElementSpy).toHaveBeenCalledWith('a');

    const createObjectURLCalls = mockCreateObjectURL.mock.calls;

    expect(createObjectURLCalls.length).toBeGreaterThan(0);

    expect(mockAnchorElement.href).toBe('mock-url');
    expect(mockAnchorElement.download).toBe('2_animals.csv');

    expect(mockAnchorElement.click).toHaveBeenCalled();

    expect(mockRevokeObjectURL).toHaveBeenCalledWith('mock-url');
  });
});
