// Centralized design system for InventoryFlow
// Centralized design system for InventoryFlow
export const COLORS = {
  boxGradient: 'linear-gradient(135deg, #e6ffe6 0%, #ffffff 100%)', // Light green to white
  primary: '#2B6CB0', // Professional blue
  success: '#48BB78', // In Stock
  warning: '#ED8936', // Low Stock
  danger: '#F56565', // Out of Stock
  info: '#4299E1', // Info/Neutral
  background: '#F7FAFC', // Off-white
  gradient: 'linear-gradient(135deg, #e3f0ff 0%, #ffffff 100%)', // Light blue to white
  surface: '#FFFFFF', // Card backgrounds
  text: '#2D3748', // Dark gray
  muted: '#718096', // Muted text
  border: '#E2E8F0', // Light border
};

export const FONT = {
  family: 'Poppins, Inter, Arial, sans-serif',
  size: '16px',
  weight: '400',
};

export const SHADOW = '0 6px 24px rgba(44,62,80,0.12)';
export const BORDER_RADIUS = '10px';

export const LAYOUT = {
  page: {
    background: COLORS.gradient,
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    fontFamily: FONT.family,
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 32px',
    background: COLORS.surface,
    boxShadow: SHADOW,
    fontFamily: FONT.family,
  },
  nav: {
    display: 'flex',
    gap: 24,
  },
  kpiBox: {
    background: COLORS.boxGradient,
    boxShadow: SHADOW,
    borderRadius: BORDER_RADIUS,
    padding: 24,
    flex: 1,
    margin: 4,
  },
  kpiTitle: {
    color: '#212121',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 4,
  },
  kpiValue: {
    fontWeight: 700,
    fontSize: 28,
    marginLeft: 4,
    marginBottom: 8,
  },
  table: {
    width: '100%',
    background: COLORS.boxGradient,
    boxShadow: SHADOW,
    borderRadius: BORDER_RADIUS,
    margin: 4,
  },
  section: {
    padding: '32px',
    marginTop: 24,
  },
};


// Utility for category badge text color
export function getBadgeTextColor(bgColor) {
  // Use white for dark backgrounds, dark for light backgrounds
  // Simple luminance check
  if (!bgColor) return COLORS.text;
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
  return luminance < 0.5 ? '#FFF' : COLORS.text;
}
