'use client'
import React from 'react'

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-white/20 animate-pulse rounded-md ${className}`} />
)

const ColumnSkeleton = ({ color }: { color: string }) => {
  return (
    <div
      className="flex flex-col gap-2 p-2 h-full rounded-md"
      style={{ backgroundColor: color }}
    >
      {/* BigBox */}
      <div className="flex flex-col justify-between p-4 h-[58%] bg-white/10 rounded-md">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      {/* MiddleBoxes */}
      <div className="grid grid-cols-2 gap-2 h-[41.5%]">
        <div className="p-3 bg-white/10 rounded-md flex flex-col gap-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <div className="p-3 bg-white/10 rounded-md flex flex-col gap-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="grid grid-cols-2 px-2 min-h-[calc(100vh-82px)] animate__animated animate__fadeIn">
      <ColumnSkeleton color="#1a9cd9" />
      <ColumnSkeleton color="#f9b233" />
    </div>
  )
}

export default Loading