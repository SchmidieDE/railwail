import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { 
    Check, 
    X, 
    Clock, 
    Box, 
    Mail, 
    Shield, 
    Zap, 
    Users, 
    Award,
    FileCode,
    Headphones,
    BadgeCheck 
} from "lucide-react"; // Importiere Icons


const Pricing = () => {
    // Stripe Checkout URLs - Diese URLs musst du in deinem Stripe Dashboard erstellen
    const STRIPE_BASIC_URL = "https://buy.stripe.com/test_yourBasicPlanLink";
    const STRIPE_PRO_URL = "https://buy.stripe.com/test_yourProPlanLink";

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-black">Choose Your Plan</h1>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
                {/* Basic Plan */}
                <Card className="w-full md:w-[300px] flex flex-col rounded-xl transform transition-all duration-300 hover:scale-105 mb-5">
                    <CardHeader className="text-center">
                        <CardTitle>Basic</CardTitle>
                        <div className="mt-2">
                            <span className=" line-through text-lg">€14.99</span>
                            <p className="text-3xl font-bold">
                                €9.99<span className="text-sm font-normal">/month</span>
                            </p>
                            <span className=" text-sm font-medium">Save 33%</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="space-y-4 flex-grow">
                            <div className="space-y-2">
                                <h3 className="font-semibold mb-2">Includes:</h3>
                                <div className="flex items-center gap-2">
                                    <Clock className=" w-5 h-5" />
                                    <span>5 API calls per minute</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Box className=" w-5 h-5" />
                                    <span>Basic model access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className=" w-5 h-5" />
                                    <span>Email support</span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="font-semibold">Limitations:</h3>
                                <div className="flex items-center gap-2">
                                    <Shield className=" w-5 h-5" />
                                    <span>No priority access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Box className=" w-5 h-5" />
                                    <span>Limited model selection</span>
                                </div>
                            </div>
                        </div>
                        <Button 
                            className="w-full mt-4 bg-primary hover:bg-primary/90 rounded-xl"
                            onClick={() => window.location.href = STRIPE_BASIC_URL}
                        >
                            Get Started
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="w-full md:w-[300px] flex flex-col rounded-xl transform transition-all duration-300 hover:scale-105 mb-5">
                    <CardHeader className="text-center">
                        <CardTitle>Pro</CardTitle>
                        <div className="mt-2">
                            <span className="line-through text-lg">€49.99</span>
                            <p className="text-3xl font-bold">
                                €29.99<span className="text-sm font-normal">/month</span>
                            </p>
                            <span className="text-sm font-medium">Save 40%</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="space-y-4 flex-grow">
                            <div className="space-y-2">
                                <h3 className="font-semibold mb-2">Includes:</h3>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    <span>20 API calls per minute</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileCode className="w-5 h-5" />
                                    <span>Advanced model access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Headphones className="w-5 h-5" />
                                    <span>Priority email support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BadgeCheck className="w-5 h-5" />
                                    <span>Custom API integration</span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="font-semiboid">Limitations:</h3>
                                <div className="flex items-center gap-2">
                                    <X className=" w-5 h-5" />
                                    <span>No 24/7 support</span>
                                </div>
                            </div>
                        </div>
                        <Button 
                             className="w-full mt-4 bg-primary hover:bg-primary/90 rounded-xl"
                            onClick={() => window.location.href = STRIPE_PRO_URL}
                        >
                            Upgrade to Pro
                        </Button>
                    </CardContent>
                </Card>

                {/* Enterprise Plan - Highlighted */}
                <Card className="w-full md:w-[300px] flex flex-col rounded-xl transform transition-all duration-300 hover:scale-105 mb-5">
                    <CardHeader className="text-center">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span className=" text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md bg-primary">
                                Premium
                            </span>
                        </div>
                        <CardTitle className="text-white text-2xl font-bold">Enterprise</CardTitle>
                        <div className="mt-2">
                            <span className=" line-through text-lg">€199.99</span>
                            <p className="text-3xl font-bold text-white">
                                €99.99<span className="text-sm font-normal">/month</span>
                            </p>
                            <span className="text-sm font-medium">Save 50%</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="space-y-4 flex-grow">
                            <div className="space-y-2">
                                <h3 className="font-semibold mb-2">All Pro features plus:</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5" />
                                        <span className="text-white">Unlimited API calls</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Headphones className="w-5 h-5" />
                                        <span className="text-white">24/7 Premium support</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileCode className=" w-5 h-5" />
                                        <span className="text-white">Custom model training</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className=" w-5 h-5" />
                                        <span className="text-white">Dedicated account manager</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className=" w-5 h-5" />
                                        <span className="text-white">SLA guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button 
                             className="w-full mt-4 bg-primary hover:bg-primary/90 rounded-xl"
                            onClick={() => window.location.href = STRIPE_PRO_URL}
                        >
                            Contact Sales
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Nach den drei Preiskarten fügen Sie diesen Abschnitt hinzu */}
            <div className="mt-16 max-w-6xl mx-auto">
                {/* Hauptvorteil-Banner */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-3">Why Choose Our API Service?</h2>
                    <p className="text-gray-600">Market leading performance at the most competitive prices</p>
                </div>

                {/* Vorteilskarten */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-primary text-xl mb-3">💰</div>
                        <h3 className="font-bold mb-2">Up to 50% Cost Savings</h3>
                        <p className="text-gray-600 text-sm">
                            Our optimized infrastructure allows us to offer premium services at half the market price
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-primary text-xl mb-3">⚡</div>
                        <h3 className="font-bold mb-2">Superior Performance</h3>
                        <p className="text-gray-600 text-sm">
                            99.9% uptime guarantee with response times under 100ms
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-primary text-xl mb-3">🛡️</div>
                        <h3 className="font-bold mb-2">Risk-Free Trial</h3>
                        <p className="text-gray-600 text-sm">
                            Test our premium features free for 30 days with full support
                        </p>
                    </div>
                </div>

                {/* Vertrauensleiste */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl text-primary">50K+</span>
                            <span>Active Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl text-primary">1B+</span>
                            <span>API Calls Daily</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl text-primary">4.9/5</span>
                            <span>User Rating</span>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12 text-center">
                    <h3 className="text-lg font-semibold mb-4">Still have questions?</h3>
                    <button className="text-amber-700 hover:text-amber-800 font-medium">
                        Contact our sales team →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pricing;