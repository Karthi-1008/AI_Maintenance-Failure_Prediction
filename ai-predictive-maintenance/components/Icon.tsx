import React from 'react';

interface IconProps {
    children: React.ReactNode;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ children, className }) => {
    // This component wraps a single SVG child and applies sizing via className.
    const iconElement = React.Children.only(children);

    // FIX: Use a type guard with React.isValidElement to correctly type the cloned element's props.
    // This resolves the error where 'className' was not recognized on the props object.
    if (!React.isValidElement<{ className?: string }>(iconElement)) {
        return null; // Or handle the error appropriately
    }

    // Clone the SVG element to inject classes that force it to scale.
    // `w-full h-full` makes the SVG fill its parent wrapper, overriding fixed width/height attributes.
    const iconWithClassName = React.cloneElement(
        iconElement,
        { className: `w-full h-full ${iconElement.props.className || ''}` }
    );

    // The wrapper div gets the sizing classes from the `className` prop.
    // A default size is provided but can be overridden by classes in the `className` prop.
    return (
      <div className={`inline-flex items-center justify-center w-6 h-6 ${className}`}>
        {iconWithClassName}
      </div>
    );
};

export default Icon;
