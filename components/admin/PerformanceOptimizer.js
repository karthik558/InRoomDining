'use client'

// This script contains performance optimizations for the admin dashboard
// and applies them on all admin pages

// Debounce function to limit how often a function is called
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply passive event listeners to improve scrolling performance
function applyPassiveEventListeners() {
  window.addEventListener('scroll', () => {}, { passive: true });
  window.addEventListener('touchstart', () => {}, { passive: true });
  window.addEventListener('touchmove', () => {}, { passive: true });
}

// Reduce layout thrashing by batching DOM reads and writes
function optimizeDOMOperations() {
  // Find elements that might cause layout thrashing
  const elements = {
    tables: document.querySelectorAll('.admin-table'),
    cards: document.querySelectorAll('.stats-card, .admin-card'),
    forms: document.querySelectorAll('form'),
  };

  // Apply contain property for better rendering performance
  elements.tables.forEach(table => {
    table.style.contain = 'content';
  });

  elements.cards.forEach(card => {
    card.style.transform = 'translateZ(0)'; // Hardware acceleration
  });
}

// Reduce paint complexity by removing expensive visual effects
function simplifyRenderingEffects() {
  // Remove expensive background effects
  document.querySelectorAll('[class*="gradient"]').forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    const background = computedStyle.getPropertyValue('background');
    
    // If it's a complex gradient, simplify it
    if (background.includes('gradient') && background.split(',').length > 3) {
      el.style.background = el.dataset.simpleBg || '#782671';
    }
  });
  
  // Remove complex shadows and add simple ones
  document.querySelectorAll('[style*="box-shadow"]').forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    const shadow = computedStyle.getPropertyValue('box-shadow');
    
    // If it's a complex shadow (multiple layers)
    if (shadow.split(',').length > 1) {
      el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }
  });
  
  // Remove animations that might cause jank
  document.querySelectorAll('[style*="animation"]').forEach(el => {
    el.style.animation = 'none';
  });
}

// Main function to apply all performance optimizations
export function applyPerformanceOptimizations() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Apply optimizations after DOM is loaded
  const applyOptimizations = () => {
    applyPassiveEventListeners();
    
    // Use requestAnimationFrame for DOM manipulations
    requestAnimationFrame(() => {
      optimizeDOMOperations();
      simplifyRenderingEffects();
    });
    
    // Add will-change hint to elements that will be animated
    document.querySelectorAll('.sidebar-item, .stats-card').forEach(el => {
      el.style.willChange = 'transform';
    });
    
    // Optimize scrolling containers
    document.querySelectorAll('.admin-body, .admin-content').forEach(el => {
      el.style.willChange = 'scroll-position';
      el.style.overscrollBehavior = 'contain'; // Prevent scroll chaining
    });
  };
  
  // Apply optimizations on load and resize (debounced)
  window.addEventListener('load', applyOptimizations);
  window.addEventListener('resize', debounce(applyOptimizations, 250));
  
  // Clean up function for React useEffect
  return () => {
    window.removeEventListener('load', applyOptimizations);
    window.removeEventListener('resize', debounce(applyOptimizations, 250));
  };
}

// Export a React hook for use in components
export default function usePerformanceOptimizations() {
  const React = require('react');
  
  React.useEffect(() => {
    return applyPerformanceOptimizations();
  }, []);
}
