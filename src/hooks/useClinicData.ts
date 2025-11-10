// Placeholder for custom hook - candidates will implement this
// Should handle:
// - Loading states
// - Error states
// - Caching
// - Refetching
// - Be reusable for different data types

export const useClinicData = () => {
  // Candidates implement this
  return {
    data: [],
    loading: false,
    error: null,
    refetch: () => {},
  };
};

