'use client'

// File: hooks/use-salary-calculator.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'

interface JobDetails {
  jobTitle: string
  company: string
  jobDescription: string
  location: string
  northstarCompanies: string
  unusualRequirements: string
}

interface EmployeeDetails {
  experience: string
  sector: string
  management: string
}

interface SalaryCalculatorContextType {
  jobDetails: JobDetails
  setJobDetails: React.Dispatch<React.SetStateAction<JobDetails>>
  employeeDetails: EmployeeDetails
  setEmployeeDetails: React.Dispatch<React.SetStateAction<EmployeeDetails>>
}

const SalaryCalculatorContext = createContext<
  SalaryCalculatorContextType | undefined
>(undefined)

export function SalaryCalculatorProvider({
  children
}: {
  children: ReactNode
}) {
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    jobTitle: '',
    company: '',
    jobDescription: '',
    location: '',
    northstarCompanies: '',
    unusualRequirements: ''
  })

  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails>({
    experience: '',
    sector: '',
    management: ''
  })

  return (
    <SalaryCalculatorContext.Provider
      value={{ jobDetails, setJobDetails, employeeDetails, setEmployeeDetails }}
    >
      {children}
    </SalaryCalculatorContext.Provider>
  )
}

export function useSalaryCalculator() {
  const context = useContext(SalaryCalculatorContext)
  if (context === undefined) {
    throw new Error(
      'useSalaryCalculator must be used within a SalaryCalculatorProvider'
    )
  }
  return context
}
