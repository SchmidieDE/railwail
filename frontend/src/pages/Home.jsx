import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"





function Home() {
    // State für ausgewählte Kategorien
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    // State für die Besucherzahlen
    const [visitCounts, setVisitCounts] = useState({});
    // State für ausgewählte Tags
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        //getNotes();
        const savedCounts = localStorage.getItem('visitCounts');
        if (savedCounts) {
            setVisitCounts(JSON.parse(savedCounts));
        }
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    // Funktion zum Umschalten der Kategorie-Auswahl
    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    // Füge diese Modell-Daten am Anfang der Komponente hinzu
    const models = [
        {
            id: 'chatgpt',
            title: "ChatGPT 4",
            description: "Advanced language model for natural conversations",
            image: "/images/chatgpt.jpg",
            link: "https://chat.openai.com"
        },
        {
            id: 'stable-diffusion',
            title: "Stable Diffusion",
            description: "AI image generation model",
            image: "/images/chatgpt.jpg",
            link: "https://stability.ai"
        },
        {
            id: 'dall-e-3',
            title: "DALL-E 3",
            description: "Create realistic images from text",
            image: "/images/chatgpt.jpg",
            link: "https://openai.com/dall-e-3"
        }
    ];

    // Funktion zur Formatierung der Besucherzahlen
    const formatVisits = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M runs`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K runs`;
        }
        return `${count} runs`;
    };

    // Funktion zum Aktualisieren der Besucherzahl
    const handleVisit = (modelId) => {
        setVisitCounts(prev => {
            const newCounts = {
                ...prev,
                [modelId]: (prev[modelId] || 0) + 1
            };
            // Speichern in localStorage
            localStorage.setItem('visitCounts', JSON.stringify(newCounts));
            return newCounts;
        });
    };

    // Funktion zum Umschalten der Tag-Auswahl
    const toggleTag = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="px-4 md:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold my-6 text-gray-800">
                    Run AI instantly
                </h2>
                <div className="text-sm md:text-base text-gray-500 mb-6">
                Train, customize, and scale models with a single command.
                </div>
            </div>

            {/* Container für beide Cards */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center mb-8">
                {/* Hauptcard - volle Breite auf Mobile */}
                <Card className="w-full lg:w-[70%] mb-8">
                    <CardHeader>
                        <CardTitle>Notes</CardTitle>
                        <CardDescription className="text-sm md:text-base">
                            Write your text here.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Kategorie-Buttons Container */}
                        <div 
                            className="cursor-grab active:cursor-grabbing"
                            onMouseDown={(e) => {
                                const ele = e.currentTarget;
                                const pos = {
                                    left: ele.scrollLeft,
                                    x: e.clientX,
                                };

                                const mouseMoveHandler = (e) => {
                                    const dx = e.clientX - pos.x;
                                    ele.scrollLeft = pos.left - dx;
                                };

                                const mouseUpHandler = () => {
                                    document.removeEventListener('mousemove', mouseMoveHandler);
                                    document.removeEventListener('mouseup', mouseUpHandler);
                                };

                                document.addEventListener('mousemove', mouseMoveHandler);
                                document.addEventListener('mouseup', mouseUpHandler);
                            }}
                            style={{ 
                                overflowX: 'scroll',
                                width: '100%',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            <div className="flex gap-2 py-2 min-w-max px-2">
                                {["Generate images", "Generate text", "Caption images", "Edit images", "Restore images"].map((category) => (
                                    <Button
                                        key={category}
                                        variant="outline"
                                        className={`
                                            transition-colors
                                            w-[120px]
                                            ${selectedCategory === category 
                                                ? 'bg-primary text-white' 
                                                : 'text-gray-800 hover:bg-primary/90 hover:text-white'
                                            }
                                        `}
                                        onClick={() => selectCategory(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Modell-Karten Container */}
                        <div 
                            className="cursor-grab active:cursor-grabbing"
                            onMouseDown={(e) => {
                                const ele = e.currentTarget;
                                const pos = {
                                    left: ele.scrollLeft,
                                    x: e.clientX,
                                };

                                const mouseMoveHandler = (e) => {
                                    const dx = e.clientX - pos.x;
                                    ele.scrollLeft = pos.left - dx;
                                };

                                const mouseUpHandler = () => {
                                    document.removeEventListener('mousemove', mouseMoveHandler);
                                    document.removeEventListener('mouseup', mouseUpHandler);
                                };

                                document.addEventListener('mousemove', mouseMoveHandler);
                                document.addEventListener('mouseup', mouseUpHandler);
                            }}
                            style={{ 
                                overflowX: 'scroll',
                                width: '100%',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            <div className="flex gap-4 py-4 px-2 min-w-max">
                                {models.map((model) => (
                                    <a 
                                        key={model.id}
                                        href={model.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleVisit(model.id)}
                                        className="flex-none w-[280px] m-2 border rounded-lg shadow-sm 
                                            hover:shadow-lg hover:scale-105 
                                            transition-all duration-300 ease-in-out 
                                            cursor-pointer bg-white"
                                    >
                                        <div className="flex h-32">
                                            {/* Bild-Container */}
                                            <div className="w-32 flex-shrink-0 overflow-hidden">
                                                <img 
                                                    src={model.image} 
                                                    alt={model.title}
                                                    className="w-full h-full object-cover rounded-l-lg
                                                        transition-all duration-300
                                                        hover:scale-110
                                                        filter saturate-75 hover:saturate-100"
                                                />
                                            </div>
                                            
                                            {/* Text-Container */}
                                            <div className="flex-1 p-4">
                                                <div className="flex flex-col justify-between h-full">
                                                    <div>
                                                        <h3 className="text-lg font-medium truncate mb-2">
                                                            {model.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {model.description}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {formatVisits(visitCounts[model.id] || 0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rechte Card für Tags - versteckt auf kleinen Bildschirmen */}
                <Card className="hidden lg:block w-[300px] h-fit mb-8">
                    <div className="flex h-full border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 bg-black">
                        <div className="flex-1 p-4">
                            <div className="flex flex-col h-full">
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Popular Tags
                                    </h3>
                                    <div className="flex flex-col space-y-2">
                                        {[
                                            "Image Generation",
                                            "Text to Image",
                                            "Style Transfer",
                                            "Photo Editing",
                                            "Face Generation",
                                            "Background Removal",
                                            "Art Style",
                                            "Realistic",
                                            "Cartoon",
                                            "Portrait",
                                            "Landscape",
                                            "Animation",
                                            "3D",
                                            "Sketch",
                                            "Color",
                                        ].map((tag) => (
                                            <label
                                                key={tag}
                                                className="flex items-center space-x-3 cursor-pointer group"
                                            >
                                                <div className="relative w-4 h-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTags.includes(tag)}
                                                        onChange={() => toggleTag(tag)}
                                                        className="absolute w-4 h-4 opacity-0 cursor-pointer"
                                                    />
                                                    <div className={`
                                                        w-4 h-4 border rounded
                                                        transition-colors duration-200
                                                        ${selectedTags.includes(tag) 
                                                            ? 'bg-primary border-primary' 
                                                            : 'border-white'
                                                        }
                                                    `}>
                                                        {selectedTags.includes(tag) && (
                                                            <svg 
                                                                className="w-4 h-4 text-white" 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    strokeWidth="2" 
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`
                                                    text-sm text-white
                                                    transition-all duration-200
                                                    hover:scale-105 hover:font-medium
                                                    ${selectedTags.includes(tag) ? 'font-medium scale-105' : ''}
                                                `}>
                                                    {tag}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {selectedTags.length > 0 && (
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-sm text-white">
                                            {selectedTags.length} tags selected
                                        </span>
                                        <button
                                            onClick={() => setSelectedTags([])}
                                            className="text-sm text-white hover:text-gray-200"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Home;
