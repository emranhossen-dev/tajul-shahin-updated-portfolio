import React from 'react';

/**
 * Universal Sleek Dark-Themed Section Skeleton with Subtle Shimmer
 */
export function SectionSkeleton({
  title = 'Loading section...',
  height = 'h-80',
}: {
  title?: string;
  height?: string;
}) {
  return (
    <div className={`w-full ${height} max-w-[1380px] mx-auto px-6 md:px-12 py-12 flex flex-col justify-center`}>
      <div className="w-full h-full rounded-3xl bg-[#0c152c]/50 border border-white/10 p-8 flex flex-col justify-between animate-pulse">
        {/* Header Placeholder */}
        <div className="space-y-3 max-w-sm mx-auto text-center flex flex-col items-center">
          <div className="w-24 h-4 rounded-full bg-white/10" />
          <div className="w-48 h-8 rounded-xl bg-white/10" />
          <div className="w-36 h-3 rounded-full bg-white/5" />
        </div>

        {/* Content Placeholder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="h-36 rounded-2xl bg-white/[0.04] border border-white/5" />
          <div className="h-36 rounded-2xl bg-white/[0.04] border border-white/5 hidden md:block" />
          <div className="h-36 rounded-2xl bg-white/[0.04] border border-white/5 hidden md:block" />
        </div>

        <div className="text-center pt-2">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{title}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Projects Grid Specific Skeleton matching 3-card layout
 */
export function ProjectsSkeleton() {
  return (
    <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-16">
      {/* Header Skeleton */}
      <div className="text-center max-w-md mx-auto mb-12 space-y-3 flex flex-col items-center">
        <div className="w-24 h-5 rounded-full bg-indigo-500/20 animate-pulse" />
        <div className="w-56 h-9 rounded-xl bg-white/10 animate-pulse" />
        <div className="w-72 h-4 rounded-full bg-white/5 animate-pulse" />
      </div>

      {/* 3 Project Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl overflow-hidden bg-[#0c152c]/60 border border-white/10 flex flex-col h-[440px] animate-pulse"
          >
            {/* Image area skeleton */}
            <div className="w-full h-[220px] bg-white/[0.05]" />

            {/* Content area skeleton */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-20 h-4 rounded-md bg-cyan-500/20" />
                <div className="w-3/4 h-6 rounded-lg bg-white/10" />
                <div className="w-full h-3.5 rounded bg-white/5" />
                <div className="w-5/6 h-3.5 rounded bg-white/5" />
              </div>

              {/* Action buttons skeleton */}
              <div className="flex gap-2.5 pt-3 border-t border-white/[0.06]">
                <div className="flex-1 h-10 rounded-xl bg-indigo-600/30" />
                <div className="flex-1 h-10 rounded-xl bg-white/[0.05]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * GitHub Stats Component Skeleton
 */
export function GitHubStatsSkeleton() {
  return (
    <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-16">
      <div className="rounded-3xl bg-[#0c152c]/60 border border-white/10 p-8 space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-48 h-7 rounded-lg bg-white/10" />
          <div className="w-24 h-5 rounded-full bg-white/5" />
        </div>
        <div className="w-full h-40 rounded-2xl bg-white/[0.03]" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-16 rounded-xl bg-white/[0.04]" />
          <div className="h-16 rounded-xl bg-white/[0.04]" />
          <div className="h-16 rounded-xl bg-white/[0.04]" />
          <div className="h-16 rounded-xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Contact Component Skeleton
 */
export function ContactSkeleton() {
  return (
    <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-pulse">
        <div className="lg:col-span-5 space-y-6">
          <div className="w-64 h-8 rounded-xl bg-white/10" />
          <div className="w-full h-4 rounded bg-white/5" />
          <div className="space-y-4 pt-4">
            <div className="h-20 rounded-2xl bg-white/[0.04] border border-white/5" />
            <div className="h-20 rounded-2xl bg-white/[0.04] border border-white/5" />
            <div className="h-20 rounded-2xl bg-white/[0.04] border border-white/5" />
          </div>
        </div>
        <div className="lg:col-span-7 h-[420px] rounded-3xl bg-[#0c152c]/60 border border-white/10 p-8" />
      </div>
    </div>
  );
}

// Default export for backward compatibility
export default SectionSkeleton;
