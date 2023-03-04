import React, { ReactNode } from 'react';
import "@/styles/glasscard.css"

interface GlassCardProps
{
    style?: Object;
    children?: ReactNode;
    className?: string;
}

export default function GlassCard({
    style,
    children,
    className
}:GlassCardProps){

    return (
        <div style={style} className={`glassCard ${className ? className : ""}`}>
            {children}
        </div>
    )

}