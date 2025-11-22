import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { countryCodeToCallingCode } from '@utils/formatters';

export interface UseCountryDetectionResult {
  callingCode: string | null;
  countryCode: string | null;
  isLoading: boolean;
  error: string | null;
  detectCountry: () => Promise<void>;
}

/**
 * Hook to automatically detect user's country based on device location.
 * Handles permissions gracefully and doesn't block the registration flow.
 *
 * Usage:
 * - Call detectCountry() when you want to trigger detection
 * - The hook will request permission if needed
 * - If permission is denied or detection fails, it fails silently
 * - Users can still manually change the country
 */
export const useCountryDetection = (): UseCountryDetectionResult => {
  const [callingCode, setCallingCode] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isDetectingRef = useRef<boolean>(false);

  const detectCountry = async () => {
    // Prevent concurrent detection attempts
    if (isDetectingRef.current) {
      return;
    }

    isDetectingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // Check if location services are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        // Location services are disabled, fail silently
        setIsLoading(false);
        isDetectingRef.current = false;
        return;
      }

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        // Permission denied - fail silently, don't block user
        setIsLoading(false);
        isDetectingRef.current = false;
        return;
      }

      // Get current position with a timeout
      const location = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // Balanced accuracy for faster response
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Location timeout')), 10000)
        ),
      ]);

      // Reverse geocode to get country
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const country = reverseGeocode[0].isoCountryCode;

        if (country) {
          const callingCode = countryCodeToCallingCode(country);
          setCountryCode(country);
          setCallingCode(callingCode);
        }
      }
    } catch (err: any) {
      // Fail silently - don't show errors to user, just don't set country
      // This ensures the registration flow is never blocked
      console.log('Country detection failed:', err?.message || 'Unknown error');
    } finally {
      setIsLoading(false);
      isDetectingRef.current = false;
    }
  };

  return {
    callingCode,
    countryCode,
    isLoading,
    error,
    detectCountry,
  };
};
