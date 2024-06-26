import  { createElement } from 'react';
import { twMerge } from 'tailwind-merge'

const baseStyle = {
  parent:'heading flex flex-wrap',
  heading: 'heading__title text-sm',
  divider:'heading__divider bg-cyan-400',
  paragraph: 'heading__caption md:text-4xl sm:text-3xl text-2xl ont-bold font-display uppercase tracking-[.1em]',
};

// Tailwind は明示的にクラス名を書く必要がある
// https://tailwindcss.com/docs/content-configuration#dynamic-class-names

const variantStyles = {
  default: {
    parent:'flex-row items-center justify-start gap-x-4',
    heading: '',
    divider:'w-1 h-8 -order-none',
    paragraph: '',
  },
  'md:default': {
    parent:'md:flex-row md:items-center md:justify-start md:gap-x-4',
    heading: '',
    divider:'md:w-1 md:h-8 md:-order-none',
    paragraph: '',
  },
  left: {
    parent:' relative pb-4 flex-col gap-2',
    heading: '',
    divider:'order-1 h-1 w-8',
    paragraph: '',
  },
  center: {
    parent:'relative pb-4 flex-col gap-2 justify-center items-center',
    heading: '',
    divider:'order-1 h-1 w-8',
    paragraph: '',
  },
  'md:center': {
    parent:'md:relative md:pb-4 md:flex-col md:gap-2 md:justify-center md:items-center',
    heading: '',
    divider:'md:order-1 md:h-1 md:w-8',
    paragraph: '',
  },
}

const styles = (variant) => {
  const style = variantStyles[variant] ? variantStyles[variant] : variantStyles.default;
  const mergedStyles = {};

  Object.keys(baseStyle).forEach(key => {
    mergedStyles[key] = twMerge(baseStyle[key], style[key]);
  });

  return mergedStyles
}

const Component = ({ title, caption = '', tag = 'h2', variant = 'default', className = {}}) => {
  const variants = variant.split(' ');
  const currentStyle = styles(variant)
  const mergedStyles = {};

  variants.forEach(variant => {
    const style = variantStyles[variant] ? variantStyles[variant] : variantStyles.default;
    Object.keys(style).forEach(key => {
      currentStyle[key] = twMerge(currentStyle[key], style[key]);
    });
  })

  Object.keys(baseStyle).forEach(key => {
    mergedStyles[key] = twMerge(currentStyle[key], className[key]);
  });

  const paragraphElement = caption ? createElement('p', { className: mergedStyles.paragraph, lang: 'en' }, caption) : null;
  const dividerElement =  createElement('span', { className: mergedStyles.divider } ) ;
  const headingElement  = title ? createElement(tag, { className: mergedStyles.heading }, title) : null;

  return createElement(
    'hgroup',
    { className: mergedStyles.parent },
    paragraphElement,
    dividerElement,
    headingElement
  );

};

export default Component;
