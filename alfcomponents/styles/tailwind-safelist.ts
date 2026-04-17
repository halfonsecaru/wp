/**
 * TAILWIND SAFELIST TRIGGER
 * This file is purely for Tailwind's scanner to detect possible dynamic classes.
 * It is NOT meant to be imported or used at runtime.
 */

const safelist = [
    // Colors
    'bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-light', 'bg-dark',
    'text-primary', 'text-secondary', 'text-success', 'text-danger', 'text-warning', 'text-info', 'text-light', 'text-dark',
    'border-primary', 'border-secondary', 'border-success', 'border-danger', 'border-warning', 'border-info', 'border-light', 'border-dark',
    
    // Hover Variants
    'hover:bg-primary', 'hover:bg-secondary', 'hover:bg-success', 'hover:bg-danger', 'hover:bg-warning', 'hover:bg-info', 
    'hover:bg-primary-hover', 'hover:bg-black/10', 'hover:bg-[#00000014]',
    
    // States
    'disabled:opacity-50', 'disabled:cursor-not-allowed', 'focus:ring-2', 'focus:ring-offset-2',
    'active:scale-95',
    
    // Transitions & Common utilities
    'transition-all', 'duration-200', 'ease-in-out',
    'inline-flex', 'items-center', 'justify-center', 'relative', 'overflow-hidden',
    
    // Padding & Margins (Common ones for buttons)
    'p-2', 'p-4', 'p-6', 'px-4', 'px-6', 'py-2', 'py-3', 'pt-[10px]', 'pb-[10px]', 'pl-[24px]', 'pr-[24px]',
    
    // Radius & Shadows
    'rounded-md', 'rounded-lg', 'rounded-full', 'rounded-[0.375rem]',
    'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-none',
];
