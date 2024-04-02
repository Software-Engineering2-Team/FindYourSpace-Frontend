import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MarketingComponent from '../components/marketingComponent/MarketingComponent';

test('renders marketing component', () => {
    render(
      <MemoryRouter>
        <MarketingComponent/>
      </MemoryRouter>
    );
    const marketingComponent = screen.getByTestId('marketingComponent-1');
    expect(marketingComponent).toBeInTheDocument();
  });