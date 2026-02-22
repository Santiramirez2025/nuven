export function SectionSkeleton({ height = 400 }: { height?: number }) {
    return (
      <div
        style={{
          height,
          background: '#080c0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(76,186,122,0.03) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'skeletonShimmer 1.8s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes skeletonShimmer {
            0%   { background-position: -200% 0; }
            100% { background-position:  200% 0; }
          }
        `}</style>
      </div>
    )
  }