import * as React from "react"
import { XIcon } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

/* Root */
export function Sheet(props: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root {...props} />
}

/* Trigger */
export function SheetTrigger(
  props: React.ComponentProps<typeof Dialog.Trigger>
) {
  return <Dialog.Trigger {...props} />
}

/* Close */
export function SheetClose(
  props: React.ComponentProps<typeof Dialog.Close>
) {
  return <Dialog.Close {...props} />
}

/* Portal */
function SheetPortal(props: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal {...props} />
}

/* Overlay */
export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-fade-in",
        "data-[state=closed]:animate-fade-out",
        className
      )}
      {...props}
    />
  )
}

/* Content */
export function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />

      <Dialog.Content
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-xl",
          "transition-transform",

          /* RIGHT */
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm \
             data-[state=open]:animate-slide-in-from-right \
             data-[state=closed]:animate-slide-out-to-right",

          /* LEFT */
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm \
             data-[state=open]:animate-slide-in-from-left \
             data-[state=closed]:animate-slide-out-to-left",

          /* TOP */
          side === "top" &&
            "inset-x-0 top-0 border-b \
             data-[state=open]:animate-slide-in-from-top \
             data-[state=closed]:animate-slide-out-to-top",

          /* BOTTOM */
          side === "bottom" &&
            "inset-x-0 bottom-0 border-t \
             data-[state=open]:animate-slide-in-from-bottom \
             data-[state=closed]:animate-slide-out-to-bottom",

          className
        )}
        {...props}
      >
        {children}

        {showCloseButton && (
          <Dialog.Close
            className="absolute top-4 right-4 p-2 rounded-md opacity-70 hover:opacity-100 transition focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <XIcon className="w-4 h-4" />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </SheetPortal>
  )
}

/* Header */
export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />
  )
}

/* Footer */
export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
  )
}

/* Title */
export function SheetTitle(
  props: React.ComponentProps<typeof Dialog.Title>
) {
  return (
    <Dialog.Title
      className="text-lg font-semibold text-foreground"
      {...props}
    />
  )
}

/* Description */
export function SheetDescription(
  props: React.ComponentProps<typeof Dialog.Description>
) {
  return (
    <Dialog.Description
      className="text-sm text-muted-foreground"
      {...props}
    />
  )
}