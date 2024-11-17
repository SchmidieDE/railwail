interface MostViewedModelsProps {
    models: Array<{ title: string; runs: number }>;
}

function MostViewedModels({ models }: MostViewedModelsProps) {
    return (
        <div className="bg-[#1f1f38] rounded-xl p-6
            
            border-[1px] border-white
            shadow-[0_0_20px_rgba(168,85,247,0.3)]
            shadow-primary/50
            relative
            before:absolute before:inset-0
            before:rounded-xl
            before:shadow-[0_0_30px_rgba(168,85,247,0.4)]
            before:-z-10
            after:absolute after:inset-0
            after:rounded-xl
            after:shadow-[0_0_40px_rgba(168,85,247,0.2)]
            after:-z-20">
            <h2 className="text-white text-xl mb-4 text-center underline">Most Used Models</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 cursor-pointer">
                    {models.slice(0, 4).map((model, index) => (
                        <div key={index} className="flex justify-between items-center text-white hover:bg-[#2c2c6c] p-2 rounded-lg transition-colors">
                            <span>{model.title}</span>
                            <span className="text-gray-400">{model.runs}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-4 cursor-pointer">
                    {models.slice(4, 8).map((model, index) => (
                        <div key={index} className="flex justify-between items-center text-white hover:bg-[#2c2c6c] p-2 rounded-lg transition-colors">
                            <span>{model.title}</span>
                            <span className="text-gray-400">{model.runs}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MostViewedModels;
