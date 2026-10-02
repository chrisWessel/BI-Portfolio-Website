import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean;
}

export const Section = ({ className, container = true, children, ...props }: SectionProps) => {
    return (
        <section className={`py-16 md:py-24 ${className || ''}`} {...props}>
            {container ? (
                <div className="container mx-auto px-4 md:px-6">
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
};
