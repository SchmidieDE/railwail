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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  // TODO: Zod for form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await api.post('/login/', values)
    
    if (response.ok) {
      toast({
        title: "Success",
        description: "You have been successfully logged in",
        variant: "default",
      })

      // Get token from response and store in local storage! 
      const {token} = await response.json() 
      localStorage.setItem('token', token)
      
      
      navigate('/dashboard')
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
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
            Welcome Back
          </CardTitle>
          <p className="text-zinc-400 text-sm text-center">
            Please enter your credentials to access your account
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
                        placeholder="Enter your password"
                        {...field}
                        className="bg-gray-900 border-gray-800 text-white 
                          focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button 
                  variant="link" 
                  className="text-sm text-purple-400 hover:text-purple-300 p-0"
                  onClick={() => {/* Hier Logik für Passwort vergessen */}}
                >
                  Forgot password?
                </Button>
              </div>
              <Button 
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white
                  font-semibold py-2 transition-colors duration-200 rounded-xl"
              >
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            <p className="text-center text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login