import { describe, it, expect, vi } from 'vitest';
import { playSound } from '../utils/audioUtils';

// Mock AudioContext since it's not available in test environment
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    frequency: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    start: vi.fn(),
    stop: vi.fn(),
  }),
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  }),
  destination: {},
  currentTime: 0,
}));

describe('Audio Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('playSound', () => {
    it('should call AudioContext when playing cardDeal sound', () => {
      playSound('cardDeal');
      expect(AudioContext).toHaveBeenCalled();
    });

    it('should call AudioContext when playing success sound', () => {
      playSound('success');
      expect(AudioContext).toHaveBeenCalled();
    });

    it('should call AudioContext when playing error sound', () => {
      playSound('error');
      expect(AudioContext).toHaveBeenCalled();
    });

    it('should not throw error with invalid sound type', () => {
      expect(() => playSound('invalid' as any)).not.toThrow();
    });
  });
});