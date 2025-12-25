'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface ImageWithSkeletonProps extends ImageProps {
    containerClassName?: string;
}

export default function ImageWithSkeleton({
    src,
    alt,
    className,
    containerClassName,
    onLoad,
    ...props
}: ImageWithSkeletonProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn('relative overflow-hidden', containerClassName)}>
            {isLoading && (
                <Skeleton className={cn("absolute inset-0 z-10 h-full w-full", className)} />
            )}
            <Image
                src={src}
                alt={alt}
                className={cn(
                    'transition-opacity duration-500',
                    isLoading ? 'opacity-0' : 'opacity-100',
                    className
                )}
                onLoad={(e) => {
                    setIsLoading(false);
                    if (onLoad) onLoad(e);
                }}
                {...props}
            />
        </div>
    );
}
