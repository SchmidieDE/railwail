import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Link, useNavigate, useParams } from "react-router-dom"
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

const PasswordResetToken = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { token } = useParams()

  const formSchema = z.object({
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await api.post('/password-reset/confirm/', {
      token: token,
      password: values.password
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
        variant: "default",
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
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
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white mb-2">
            Reset Password
          </CardTitle>
          <p className="text-zinc-400 text-sm text-center">
            Enter your new password
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                        className="bg-gray-900 border-gray-800 text-white 
                          focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
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
                Reset Password
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
      </Card>
    </div>
  )
}

export default PasswordResetToken  