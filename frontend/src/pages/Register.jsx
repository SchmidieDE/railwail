import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link } from 'react-router-dom'

function Register() {
    const handleRegister = async() => {
        console.log("registering")
        // Hier kommt Ihre Register-Logik hin
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black border-2 border-purple-500 
                           hover:border-purple-400 transition-all duration-300 
                           shadow-lg shadow-purple-500/20">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-white mb-2">
                        Create Account
                    </CardTitle>
                    <p className="text-zinc-400 text-sm text-center">
                        Enter your details to create your account
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Choose a username"
                            className="bg-gray-900 border-gray-800 text-white 
                                     focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="bg-gray-900 border-gray-800 text-white 
                                     focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="bg-gray-900 border-gray-800 text-white 
                                     focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="bg-gray-900 border-gray-800 text-white 
                                     focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    <Button 
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white
                                 font-semibold py-2 transition-colors duration-200
                                 shadow-lg shadow-purple-500/20"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>

                    <p className="text-center text-sm text-zinc-400">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register