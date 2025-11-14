import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';

function ProblemChild() {
  throw new Error('Test error!');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI on error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong.')).toBeTruthy();
    expect(getByText('Test error!')).toBeTruthy();
    expect(getByText('Please try again or contact support.')).toBeTruthy();
  });
});
