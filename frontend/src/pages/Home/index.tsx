import SelectModel from "./comp/SelectModel";




const Home = () => {
  



 
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      <div className="px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold my-6 text-black">
          Run every AI-Model instantly
        </h1>
        <h2>
          
        </h2>
      </div>
      <SelectModel />
      <div className="mt-16 text-center p-8 pb-12 bg-gradient-to-b from-purple-500/10 to-transparent rounded-xl">
        <div className="relative pb-4">  
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-center"
            style={{
                background: 'linear-gradient(90deg, rgb(157, 0, 255) 0%, rgb(77, 148, 255) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0.1em',  
                lineHeight: '1.2',       
                display: 'inline-block'  
            }}
          >
            Ready to Get Started?
          </h2>
        </div>
      </div>
      <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
        Join thousands of developers already using our API platform.
        Get 10,000 free API calls when you sign up today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
          Start Free Trial
        </button>  
        <button className="px-8 py-3 border border-purple-500 text-purple-400 rounded-xl hover:bg-purple-500/10 transition-all">
          View Documentation
        </button>
      </div>
    </div>);   
}

export default Home;
