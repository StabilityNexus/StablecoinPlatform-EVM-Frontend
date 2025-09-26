"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

interface CreationStepProps {
  stepNumber: number
  title: string
  description: string
  isActive: boolean
  isCompleted: boolean
  children: React.ReactNode
  onClick: () => void
}

export function CreationStep({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted,
  children,
  onClick,
}: CreationStepProps) {
  return (
    <div className="space-y-4">
      <div
        className="flex items-center space-x-4 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors"
        onClick={onClick}
      >
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-colors",
            isCompleted
              ? "bg-green-600 text-white"
              : isActive
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground",
          )}
        >
          {isCompleted ? "✓" : stepNumber}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="text-muted-foreground">
          {isActive ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      </div>

      {isActive && (
        <Card className="ml-16 animate-in slide-in-from-top-2 duration-200">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      )}
    </div>
  )
}
