'use client'

import { CircleCheckBig, CircleAlert } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      className="toaster group"
      closeButton
      icons={{
        success: <CircleCheckBig className="h-5 w-5 !text-[#22C55E]" />,
        error: <CircleAlert className="h-5 w-5 !text-[#E45736]" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'w-full flex items-center justify-between gap-3 rounded-[12px] px-5 py-4 shadow-sm border text-sm font-medium [&>button]:!static [&>button]:!transform-none [&>button]:!order-last [&>button]:shrink-0 [&>button]:!border-none [&>button]:!bg-transparent [&>button]:!shadow-none [&>button]:!p-0 [&>button]:cursor-pointer [&>button]:!opacity-100 [&>button]:!h-5 [&>button]:!w-5 [&>button>svg]:!h-5 [&>button>svg]:!w-5',
          success:
            'bg-[#ECFDF5] border-[#A7F3D0] text-[#166534] [&>button]:!text-[#166534] [&>button>svg]:!text-[#166534]',
          error:
            'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B] [&>button]:!text-[#991B1B] [&>button>svg]:!text-[#991B1B]',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
