import Form from "../components/Form"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"

function Login() {
    const handleFetch = async() => {
        console.log("fetching")
        const response = await fetch("http://localhost:8000/api/test/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                username: "test",
                password: "test"
            })
        })
        const obj = await response.json()
        console.log(response, "RESPONSE ", await obj)
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black border-2 border-purple-500 
                           hover:border-purple-400 transition-all duration-300 
                           shadow-lg shadow-purple-500/20">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-white mb-2">
                        Welcome Back
                    </CardTitle>
                    <p className="text-zinc-400 text-sm text-center">
                        Please enter your credentials to access your account
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
                            placeholder="Enter your username"
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
                            placeholder="Enter your password"
                            className="bg-gray-900 border-gray-800 text-white 
                                     focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="remember"
                                className="border-purple-500 data-[state=checked]:bg-purple-500"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-zinc-400 cursor-pointer"
                            >
                                Remember me
                            </label>
                        </div>
                        
                        <Button 
                            variant="link" 
                            className="text-sm text-purple-400 hover:text-purple-300 p-0"
                            onClick={() => {/* Hier Logik für Passwort vergessen */}}
                        >
                            Forgot password?
                        </Button>
                    </div>

                    <Button 
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white
                                 font-semibold py-2 transition-colors duration-200"
                        onClick={handleFetch}
                    >
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-zinc-400">
                        Don't have an account?{' '}
                        <a href="/register" className="text-purple-400 hover:text-purple-300">
                            Sign up
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login