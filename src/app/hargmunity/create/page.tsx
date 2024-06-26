"use client"

import { Button } from "@/components/ui/Button"
import { Input }  from "@/components/ui/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateSubhargthreadPayload } from "@/lib/validators/subhargthread"
import { toast } from "@/hooks/use-toast"
import { useCustomToast } from "@/hooks/use-custom-toast"

const page = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter();
  const { loginToast } = useCustomToast();
  
  const {mutate: createHargmunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubhargthreadPayload = {
        name: input,
      }

      const { data } = await axios.post('/api/subhargthread', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'hargthread already exists',
            description: 'Please try another name',
            variant: 'destructive'
          })
        }
      }

      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid hargthread name",
            description: "Please try another name between 3 and 21 characters",
            variant: "destructive",
          });
        }
      }

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      toast({
        title: 'There was an error',
        description: 'Could not create hargthread',
        variant: 'destructive'
      })
    },
    onSuccess: (data) => {
      router.push(`/hargmunity/${data}`)
    }
  })

  return <div className="container flex items-center h-full max-w-3xl mx-auto">
    <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Create a Hargmunity</h1>
      </div>

      <hr className="bg-zinc-500 h-px" />
      
      <div>
        <p className="text-lg font-medium">
          Name
        </p>
        <p className="text-xs pb-2">Community names cannot be changed.</p>
        <div className="relative">
          <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400 pl-2">
            {' '}hargmunity/
          </p>
          <Input value={input} onChange={(e) => setInput(e.target.value)} className="pl-[85px]" />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button
          variant='subtle'
          onClick={() => router.back()}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          disabled={input.length === 0}
          onClick={() => createHargmunity()}
          className="w-full"
        >
          Create
        </Button>
      </div>
    </div>
  </div>
}

export default page