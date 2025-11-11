'use client'

import * as React from 'react'
import { CloseIcon } from '@sanity/icons'
import { useCTA } from '@/contexts/CTAContext'
import HubSpotForm from './HubspotForm'

export interface FormModalProps {
  className?: string
  isPopup?: boolean
  onClose?: () => void
  source?: string
  source1?: string
}

export const FormModal: React.FC<FormModalProps> = ({
  className,
  isPopup,
  onClose,
  source,
  source1,
}) => {
  const { cta } = useCTA()
  const formId = cta.formId

  const handleClose = () => {
    onClose?.()
  }

  return (
    <div
    className={`relative z-[999] `}
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
   
    <div
      className="fixed inset-0 bg-gray-950 bg-opacity-60 transition-opacity"
      aria-hidden="true"
    ></div>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto max-h-[67vh] md:max-h-none  h-full top-1/2 md:top-auto -translate-y-1/2  md:translate-y-0">
      <div
        className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
       
        <div
          className="relative transform overflow-hidden rounded-lg min-h-[706px]
          bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              
              <div
                className="mt-3 px-4 sm:mt-0 sm:text-left w-full flex flex-col gap-8"
              >
                <div className="flex mt-4 justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-2xl font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Request an Integration
                    </h3>

                    <p className="text-gray-500">
                      Start integrating Zynva with your existing EMR. <br/>
                    </p>
                  </div>

                  <button type="button" className="w-16 h-16 flex justify-end items-start cursor-pointer hover:text-gray-950 text-gray-600" 
                    onClick={handleClose} >
                    <div className="w-5">
                      <CloseIcon width={24} height={24}></CloseIcon>
                    </div>
                  </button>
                </div>
                <div className="mt-2 w-full mb-8">
                  <HubSpotForm formId={formId} source={source} source1={source1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

