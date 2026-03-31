import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Snapshot Tests', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
