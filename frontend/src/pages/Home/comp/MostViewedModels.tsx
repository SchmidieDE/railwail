interface MostViewedModelsProps {
    title: string;
    runs: number;
}

const MostViewedModels = ({ models }: { models: MostViewedModelsProps[] }) => {
    const handleModelClick = (modelTitle: string) => {
        // Hier können Sie die API-Logik implementieren
        console.log(`Opening API for ${modelTitle}`);
    };

    return (
        <div className="p-6 bg-black rounded-lg shadow-lg min-h-[200px] max-h-[500px] w-[300px] ml-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Most Used Models</h2>
            <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2
                          scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300
                          hover:scrollbar-thumb-gray-500">
                {models.map((model, index) => (
                    <div key={index} 
                         className="flex items-center gap-2 py-2 cursor-pointer hover:bg-zinc-800 rounded px-2 transition-colors"
                         onClick={() => handleModelClick(model.title)}>
                        <span className="text-white hover:text-purple-400">{model.title}</span>
                        <span className="text-xs text-gray-400 ml-auto">
                            {model.runs >= 1000000 
                                ? `${(model.runs / 1000000).toFixed(1)}M` 
                                : model.runs >= 1000 
                                    ? `${(model.runs / 1000).toFixed(1)}K` 
                                    : model.runs}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostViewedModels;
