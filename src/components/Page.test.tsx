import { render, screen } from '@testing-library/react'
import Page from '@/components/Page'

describe('Home', () => {
  it('renders the home page', () => {
    render(<Page />)

    expect(screen.getByText('UseWallet Demo')).toBeInTheDocument()
  })
})
