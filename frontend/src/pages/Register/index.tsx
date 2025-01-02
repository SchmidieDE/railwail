
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
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





const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const Register = () => {


  const navigate = useNavigate()
  const { toast } = useToast()
  //Form Control via Zod 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await api.post('/register/', values)
    // If error on Server Side
    if (response.ok) {
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
        variant: "default",
      })
      navigate('/dashboard')
    } else {
      toast({
        title: "Error - Account not created",
        description: "Something went wrong on the registration process",
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
            Create Account
          </CardTitle>
          <p className="text-zinc-400 text-sm text-center">
            Enter your details to create your account
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
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
                  font-semibold py-2 transition-colors duration-200
                  shadow-lg shadow-purple-500/20 rounded-xl"
              >
                Register
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            <p className="text-center text-sm text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" 
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register