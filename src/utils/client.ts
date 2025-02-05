export const scrollToElement = (elementId: string) => {
  if (typeof window !== 'undefined') {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}; 