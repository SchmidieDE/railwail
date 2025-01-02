import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import api from "../../lib/api"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "../../hooks/use-toast"
import { useState } from "react"
const PasswortReset = () => {
  
  const [sendEmail, setSendEmail] = useState(false)


  const { toast } = useToast()

  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await api.post('/password-reset/', values)
    
    if (response.ok) {
      toast({
        title: "Success",
        description: "If an account exists with this email, you will receive the password reset link.",
        variant: "default",
      })
      setSendEmail(true)
    } else {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-2 border-purple-500 
                    hover:border-purple-400 transition-all duration-300 
                    shadow-lg shadow-purple-500/20 rounded-xl">
        {sendEmail ? (
          <>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white mb-2">
              Password Reset Link Sent
            </CardTitle>
            <p className="text-zinc-400 text-sm text-center">
              If an account exists with this email, you will receive the password reset link.
            </p>
          </CardHeader>
          <CardContent> 
            <div className="text-center">
              <Link 
                to="/login" 
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
          </>
        ) : (
          <>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white mb-2">
            Reset Password
          </CardTitle>
          <p className="text-zinc-400 text-sm text-center">
            Enter your email address and we'll send you the password reset link. 
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="bg-gray-900 border-gray-800 text-white 
                          focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white
                  font-semibold py-2 transition-colors duration-200 rounded-xl"
              >
                Send Reset Link
              </Button>
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
          </CardContent>
        </>
        )}
      </Card>
    </div>
  )
}

export default PasswortReset  