import { render, screen, waitFor, act } from '@testing-library/react'
import Home from '../page'
import { HouseProvider } from '@/context/house-context'
import { FavoritesProvider } from '@/context/favorites-context'

// Mock the API call
const mockFetchCharacters = jest.fn()

jest.mock('@/lib/api', () => ({
  fetchCharacters: () => mockFetchCharacters(),
}))

const mockCharacters = [
  {
    id: '1',
    name: 'Harry Potter',
    hogwartsStudent: true,
    hogwartsStaff: false,
    house: 'Gryffindor',
    image: 'https://example.com/harry.jpg',
  },
  {
    id: '2',
    name: 'Albus Dumbledore',
    hogwartsStudent: false,
    hogwartsStaff: true,
    house: 'Gryffindor',
    image: 'https://example.com/dumbledore.jpg',
  },
]

describe('Home Page', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <HouseProvider>
        <FavoritesProvider>{ui}</FavoritesProvider>
      </HouseProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the main title', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Mischief Managed')).toBeInTheDocument()
  })

  it('shows loading state initially', async () => {
    mockFetchCharacters.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    await act(async () => {
      renderWithProviders(<Home />)
    })
    
    expect(screen.getByRole('status', { name: 'Loading characters' })).toBeInTheDocument()
  })

  it('displays character cards after loading', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters)
    
    await act(async () => {
      renderWithProviders(<Home />)
    })
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Check if character cards are rendered
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Albus Dumbledore')).toBeInTheDocument()
  })

  it('displays correct tab counts', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters)
    
    await act(async () => {
      renderWithProviders(<Home />)
    })
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    expect(screen.getByText('All (2)')).toBeInTheDocument()
    expect(screen.getByText('Students (1)')).toBeInTheDocument()
    expect(screen.getByText('Staff (1)')).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockFetchCharacters.mockRejectedValue(new Error('Failed to fetch'))
    
    await act(async () => {
      renderWithProviders(<Home />)
    })
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Verify that the error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch characters:',
      expect.any(Error)
    )
    
    consoleErrorSpy.mockRestore()
  })

  it('filters characters by house when selected', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters)
    
    await act(async () => {
      renderWithProviders(<Home />)
    })
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // This test would need to be expanded based on your HouseSelector implementation
    // You might need to mock the house context or add more specific tests
  })
}) 