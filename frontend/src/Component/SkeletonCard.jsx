import React from 'react'

const shimmerStyle = {
    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px',
}

// Inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('skeleton-style')) {
    const style = document.createElement('style')
    style.id = 'skeleton-style'
    style.textContent = `
    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `
    document.head.appendChild(style)
}

function SkeletonCard() {
    return (
        <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg'>

            {/* Image placeholder */}
            <div
                className='w-full rounded-lg'
                style={{ ...shimmerStyle, height: '67%', width: '100%' }}
            />

            {/* Text placeholders */}
            <div className='w-full py-[20px] flex flex-col gap-[10px]'>
                {/* Location + rating row */}
                <div className='flex items-center justify-between'>
                    <div style={{ ...shimmerStyle, height: '18px', width: '65%' }} />
                    <div style={{ ...shimmerStyle, height: '18px', width: '20%' }} />
                </div>
                {/* Title */}
                <div style={{ ...shimmerStyle, height: '15px', width: '80%' }} />
                {/* Price */}
                <div style={{ ...shimmerStyle, height: '16px', width: '40%' }} />
            </div>

        </div>
    )
}

export default SkeletonCard
