"use client"

import * as React from "react"
import {ChevronDownIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Label} from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function ShadcnDatePicker({label = "Fecha", value, onChange}) {
    const [open, setOpen] = React.useState(false)
    const initialDate = React.useMemo(() => {
        if (!value) return undefined

        if (typeof value === "string") {
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
            if (match) {
                const [, year, month, day] = match
                return new Date(Number(year), Number(month) - 1, Number(day))
            }
        }

        const parsed = new Date(value)
        return Number.isNaN(parsed.getTime()) ? undefined : parsed
    }, [value])
    const [date, setDate] = React.useState(initialDate)

    React.useEffect(() => {
        setDate(initialDate)
    }, [initialDate])

    function formatDate(d) {
        if (!d) return ""
        return d.toLocaleDateString()
    }

    function formatLocalDate(dateValue) {
        const year = dateValue.getFullYear()
        const month = String(dateValue.getMonth() + 1).padStart(2, "0")
        const day = String(dateValue.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {date ? formatDate(date) : "Select date"}
                        <ChevronDownIcon/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                            setDate(selectedDate)
                            setOpen(false)
                            if (onChange && selectedDate) {
                                onChange(formatLocalDate(selectedDate))
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
