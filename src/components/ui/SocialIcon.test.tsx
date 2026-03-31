import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SocialIconType } from '@/types';
import SocialIcon from './SocialIcon';

describe('SocialIcon', () => {
  // Test all supported social icon types
  const iconTypes: SocialIconType[] = [
    'twitter',
    'facebook',
    'instagram',
    'linkedin',
    'github',
    'youtube',
    'discord',
    'telegram',
    'whatsapp',
  ];

  iconTypes.forEach(type => {
    it(`renders ${type} icon correctly`, () => {
      const { container } = render(<SocialIcon type={type} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
      expect(svg?.getAttribute('fill')).toBe('currentColor');
    });
  });

  it('renders with default className', () => {
    const { container } = render(<SocialIcon type="twitter" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toBe('w-5 h-5');
  });

  it('renders with custom className', () => {
    const { container } = render(<SocialIcon type="twitter" className="w-10 h-10 text-blue-500" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toBe('w-10 h-10 text-blue-500');
  });

  it('renders with empty className', () => {
    const { container } = render(<SocialIcon type="github" className="" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toBe('');
  });

  it('has aria-hidden attribute for accessibility', () => {
    const { container } = render(<SocialIcon type="linkedin" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders Twitter icon with correct path', () => {
    const { container } = render(<SocialIcon type="twitter" />);
    const svg = container.querySelector('svg');
    const path = svg?.querySelector('path');
    // Twitter/X icon path should contain the characteristic pattern
    expect(path?.getAttribute('d')).toContain('M18.244');
  });

  it('renders Facebook icon with correct path', () => {
    const { container } = render(<SocialIcon type="facebook" />);
    const svg = container.querySelector('svg');
    const path = svg?.querySelector('path');
    // Facebook icon path should start with the characteristic pattern
    expect(path?.getAttribute('d')).toContain('M24');
  });

  it('renders Instagram icon with correct path', () => {
    const { container } = render(<SocialIcon type="instagram" />);
    const svg = container.querySelector('svg');
    const path = svg?.querySelector('path');
    // Instagram icon path
    expect(path?.getAttribute('d')).toContain('M12');
  });

  it('renders multiple icons with same type', () => {
    const { container: container1 } = render(<SocialIcon type="twitter" />);
    const { container: container2 } = render(<SocialIcon type="twitter" />);

    const svg1 = container1.querySelector('svg');
    const svg2 = container2.querySelector('svg');

    expect(svg1?.getAttribute('d')).toBe(svg2?.getAttribute('d'));
  });

  it('renders WhatsApp icon', () => {
    const { container } = render(<SocialIcon type="whatsapp" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Telegram icon', () => {
    const { container } = render(<SocialIcon type="telegram" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Discord icon', () => {
    const { container } = render(<SocialIcon type="discord" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders YouTube icon', () => {
    const { container } = render(<SocialIcon type="youtube" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders GitHub icon', () => {
    const { container } = render(<SocialIcon type="github" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
