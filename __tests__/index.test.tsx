import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders the home page', () => {
    render(<Home />)

    expect(screen.getByText('UseWallet Demo')).toBeInTheDocument()
  })
})
