const LoadingSpinner = () => {  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-8 h-8 border-4 border-dashed rounded-full loading-spinner animate-spin border-primary"></div>
    </div>
  )
}

export default LoadingSpinner;