export const formatPhoneNumber = (phone: string, countryCode: string): string => {
  return `${countryCode} ${phone}`;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateOfBirth = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const capitalize = (value?: string): string => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};
