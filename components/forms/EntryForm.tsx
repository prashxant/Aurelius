// src/components/forms/EntryForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { entrySchema, EntryInput } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface EntryFormProps {
  onSuccess?: (entry: any) => void
}

export function EntryForm({ onSuccess }: EntryFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntryInput>({
    resolver: zodResolver(entrySchema),
  })

  const onSubmit = async (data: EntryInput) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to save entry")

      const entry = await response.json()
      toast({ title: "Entry saved successfully!" })
      reset()
      onSuccess?.(entry)
    } catch (error) {
      toast({ title: "Error saving entry", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          placeholder="Entry title..."
          {...register("title")}
          className="text-xl font-semibold"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Write your thoughts..."
          {...register("content")}
          rows={15}
          className="resize-none"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="How are you feeling? (optional)"
          {...register("mood")}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save Entry"}
      </Button>
    </form>
  )
}
