// @ts-nocheck
"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export type LogsType = {
  id: string
  virus: string
  status: string
}

export const logColumns: ColumnDef<LogsType>[] = [
  {
    accessorKey: "virus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Virus
        </Button>
      )
    },
    cell: (row) => {
      const virusname = row.getValue("virus")
      return <div className="min-w-[5rem] md:px-4">{virusname}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      )
    },
    cell: (row) => {
      const statusname = row.getValue("status")
      return (
<div className="min-w-[5rem] md:px-4">{statusname}</div>

      )
    }
  },
]