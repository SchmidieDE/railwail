import { useState, useEffect, useRef, } from "react";
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
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    const containerRef = useRef(null);

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
        },
        {
            id: 'midjourney',
            title: "Midjourney",
            description: "Advanced AI image generation with artistic flair and high-quality outputs",
            image: "/images/chatgpt.jpg",
            link: "https://www.midjourney.com",
            rating: 4.7
        },
        {
            id: 'claude',
            title: "Claude AI",
            description: "Anthropic's advanced language model for analysis and content generation",
            image: "/images/chatgpt.jpg",
            link: "https://www.anthropic.com/claude",
            rating: 4.6
        },
        {
            id: 'gemini',
            title: "Google Gemini",
            description: "Google's multimodal AI model for text, code, and image understanding",
            image: "/images/chatgpt.jpg",
            link: "https://gemini.google.com",
            rating: 4.8
        },
        {
            id: 'leonardo',
            title: "Leonardo AI",
            description: "AI-powered creative suite for generating and editing images",
            image: "/images/chatgpt.jpg",
            link: "https://leonardo.ai",
            rating: 4.4
        },
        {
            id: 'runway',
            title: "Runway ML",
            description: "Creative suite for video editing and generation with AI",
            image: "/images/chatgpt.jpg",
            link: "https://runway.ml",
            rating: 4.5
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

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setDragDistance(0);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX); // Bewegung weniger empfindlich
        setDragDistance(Math.abs(walk)); // Speichere die Drag-Distanz
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleCardClick = (e, link) => {
        e.preventDefault(); // Verhindere sofortiges Klicken
        // Öffne Link nur wenn die Drag-Distanz minimal war (weniger als 5px)
        if (dragDistance < 5) {
            window.open(link, '_blank');
        }
    };

    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="px-4 md:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold my-6 text-purple-900">
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
                                {["All", "Generate images", "Generate text", "Caption images", "Edit images", "Restore images"].map((category) => (
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
                            ref={containerRef}
                            className="cursor-grab active:cursor-grabbing overflow-x-auto"
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            style={{ 
                                overflowX: 'scroll',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            <div className="flex gap-4 py-4 px-4 min-w-max">
                                {models.map((model) => (
                                    <div 
                                        key={model.id}
                                        onClick={(e) => handleCardClick(e, model.link)}
                                        className="flex-none w-[280px] md:w-[400px] border rounded-lg shadow-sm 
                                            hover:shadow-lg hover:scale-105 
                                            transition-all duration-300 ease-in-out 
                                            cursor-grab active:cursor-grabbing bg-white
                                            select-none"
                                    >
                                        <div className="flex h-24 md:h-32">
                                            {/* Bild-Container */}
                                            <div className="w-24 md:w-32 flex-shrink-0 overflow-hidden select-none">
                                                <img 
                                                    src={model.image} 
                                                    alt={model.title}
                                                    className="w-full h-full object-cover rounded-l-lg
                                                        transition-all duration-300
                                                        hover:scale-110
                                                        filter saturate-75 hover:saturate-100"
                                                    draggable="false"
                                                    onDragStart={(e) => e.preventDefault()}
                                                />
                                            </div>
                                            
                                            {/* Text-Container */}
                                            <div className="flex-1 p-3 md:p-4">
                                                <div className="flex flex-col justify-between h-full">
                                                    <div>
                                                        <h3 className="text-sm md:text-lg font-medium truncate mb-1 md:mb-2 text-gray-800">
                                                            {model.title}
                                                        </h3>
                                                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                                                            {model.description}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs md:text-sm text-gray-500">
                                                        {formatVisits(visitCounts[model.id] || 0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

            {/* Statistik-Banner */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-500 to-purple-500 border border-purple-500/20 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-900">100K+</div>
                        <div className="text-zinc-300">Active Users</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-900">50M+</div>
                        <div className="text-zinc-300">API Calls Daily</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-900">99.9%</div>
                        <div className="text-zinc-300">Uptime</div>
                    </div>
                </div>
            </div>

            {/* Feature Showcase */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-black border-2 border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
                    </div>
                    <p className="text-zinc-400">Response times under 100ms. Built for scale and performance.</p>
                </div>

                <div className="p-6 bg-black border-2 border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
                    </div>
                    <p className="text-zinc-400">Bank-grade encryption and security protocols.</p>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="mt-16 text-center p-8 bg-gradient-to-b from-purple-500/10 to-transparent rounded-xl">
                <h2 className="text-3xl font-bold text-purple-900 mb-4">Ready to Get Started?</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                    Join thousands of developers already using our API platform.
                    Get 10,000 free API calls when you sign up today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                        Start Free Trial
                    </button>
                    <button className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all">
                        View Documentation
                    </button>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16">
                <p className="text-center text-zinc-500 mb-6">Trusted by leading companies worldwide</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                    {/* Ersetzen Sie dies durch echte Logos */}
                    <div className="h-8">Company Logo 1</div>
                    <div className="h-8">Company Logo 2</div>
                    <div className="h-8">Company Logo 3</div>
                    <div className="h-8">Company Logo 4</div>
                </div>
            </div>

            {/* Quick Navigation Guide */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-black border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-4">For Developers</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>
                            <a href="/docs" className="hover:text-purple-400 transition-colors">→ API Documentation</a>
                        </li>
                        <li>
                            <a href="/examples" className="hover:text-purple-400 transition-colors">→ Code Examples</a>
                        </li>
                        <li>
                            <a href="/sdk" className="hover:text-purple-400 transition-colors">→ SDKs & Libraries</a>
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-black border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>
                            <a href="/blog" className="hover:text-purple-400 transition-colors">→ Blog & Updates</a>
                        </li>
                        <li>
                            <a href="/tutorials" className="hover:text-purple-400 transition-colors">→ Tutorials</a>
                        </li>
                        <li>
                            <a href="/community" className="hover:text-purple-400 transition-colors">→ Community</a>
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-black border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>
                            <a href="/help" className="hover:text-purple-400 transition-colors">→ Help Center</a>
                        </li>
                        <li>
                            <a href="/status" className="hover:text-purple-400 transition-colors">→ System Status</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-purple-400 transition-colors">→ Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
