import { render, screen, fireEvent } from '@testing-library/react'
import { CharacterCard } from '../character-card'
import { FavoritesProvider } from '@/context/favorites-context'

const mockCharacter = {
  id: '1',
  name: 'Harry Potter',
  hogwartsStudent: true,
  hogwartsStaff: false,
  house: 'Gryffindor',
  image: 'harry.jpg',
  actor: 'Daniel Radcliffe',
  dateOfBirth: '1980-07-31',
  patronus: 'Stag',
  wand: {
    wood: 'Holly',
    core: 'Phoenix feather',
    length: 11,
  },
}

describe('CharacterCard', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>)
  }

  it('renders character information correctly', () => {
    renderWithProvider(<CharacterCard character={mockCharacter} />)
    
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Gryffindor')).toBeInTheDocument()
    expect(screen.getByText('Student')).toBeInTheDocument()
  })

  it('displays character image with alt text', () => {
    renderWithProvider(<CharacterCard character={mockCharacter} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'harry.jpg')
    expect(image).toHaveAttribute('alt', 'Harry Potter')
  })

  it('shows detailed information when expanded', () => {
    renderWithProvider(<CharacterCard character={mockCharacter} />)
    
    // Click to expand
    fireEvent.click(screen.getByRole('button'))
    
    // Check for detailed information
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument()
    expect(screen.getByText('Holly')).toBeInTheDocument()
    expect(screen.getByText('Phoenix feather')).toBeInTheDocument()
    expect(screen.getByText('Stag')).toBeInTheDocument()
  })

  it('toggles favorite status when clicked', () => {
    renderWithProvider(<CharacterCard character={mockCharacter} />)
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })
    fireEvent.click(favoriteButton)
    
    // Check if the favorite status changed
    // This would need to be expanded based on your favorites implementation
  })
}) 