import { useState, useEffect, useRef, } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { 
    ImageIcon,  // für "Generate images"
    Type,       // für "Generate text"
    FileImage,  // für "Caption images"
    Pencil,     // für "Edit images"
    RefreshCw,  // für "Restore images"
    LayoutGrid  // für "All"
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";





function Home() {
    // State für ausgewählte Kategorien
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    // State für die Besucherzahlen
    const [visitCounts, setVisitCounts] = useState({});
    // State für ausgewählte Tags
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    const containerRef = useRef(null);

    // Separate States für Kategorie-Scroll
    const [isScrollingCategories, setIsScrollingCategories] = useState(false);
    const [startXCategories, setStartXCategories] = useState(0);
    const [scrollLeftCategories, setScrollLeftCategories] = useState(0);
    const categoriesRef = useRef(null);

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
        // Generate images
        {
            id: 1,
            title: "Stable Diffusion",
            description: "Generate high-quality images from text descriptions with advanced AI model",
            image: "/images/chatgpt.jpg",
            category: "Generate images",
            link: "https://api.stability.ai"
        },
        {
            id: 2,
            title: "DALL-E 2",
            description: "Create realistic images and art from natural language descriptions",
            image: "/images/chatgpt.jpg",
            category: "Generate images",
            link: "https://openai.com/dall-e-2"
        },
        {
            id: 3,
            title: "Midjourney",
            description: "Generate artistic images with unique style and high creativity",
            image: "/images/chatgpt.jpg",
            category: "Generate images",
            link: "https://www.midjourney.com"
        },

        // Generate text
        {
            id: 4,
            title: "GPT-4",
            description: "Advanced language model for text generation and understanding",
            image: "/images/chatgpt.jpg",
            category: "Generate text",
            link: "https://openai.com/gpt-4"
        },
        {
            id: 5,
            title: "Claude 2",
            description: "Anthropic's AI for sophisticated text generation and analysis",
            image: "/images/chatgpt.jpg",
            category: "Generate text",
            link: "https://www.anthropic.com/claude"
        },
        {
            id: 6,
            title: "PaLM API",
            description: "Google's powerful language model for text generation",
            image: "/images/chatgpt.jpg",
            category: "Generate text",
            link: "https://developers.generativeai.google/products/palm"
        },

        // Caption images
        {
            id: 7,
            title: "Azure Vision",
            description: "Microsoft's AI for accurate image captioning and analysis",
            image: "/images/chatgpt.jpg",
            category: "Caption images",
            link: "https://azure.microsoft.com/services/cognitive-services/computer-vision"
        },
        {
            id: 8,
            title: "Google Cloud Vision",
            description: "Detect objects and text in images with high accuracy",
            image: "/images/chatgpt.jpg",
            category: "Caption images",
            link: "https://cloud.google.com/vision"
        },

        // Edit images
        {
            id: 9,
            title: "Adobe Firefly",
            description: "AI-powered creative image editing and generation",
            image: "/images/chatgpt.jpg",
            category: "Edit images",
            link: "https://www.adobe.com/products/firefly"
        },
        {
            id: 10,
            title: "Runway ML",
            description: "Professional AI tools for video and image editing",
            image: "/images/chatgpt.jpg",
            category: "Edit images",
            link: "https://runway.ml"
        },
        {
            id: 11,
            title: "Remove.bg API",
            description: "Automatically remove image backgrounds with AI",
            image: "/images/chatgpt.jpg",
            category: "Edit images",
            link: "https://www.remove.bg/api"
        },

        // Restore images
        {
            id: 12,
            title: "Replicate",
            description: "Run various image restoration models via API",
            image: "/images/chatgpt.jpg",
            category: "Restore images",
            link: "https://replicate.com"
        },
        {
            id: 13,
            title: "Deep Image Prior",
            description: "Advanced AI for image restoration and enhancement",
            image: "/images/chatgpt.jpg",
            category: "Restore images",
            link: "https://dmitryulyanov.github.io/deep_image_prior"
        },
        {
            id: 14,
            title: "Tencent ARC",
            description: "AI-powered image restoration and enhancement",
            image: "/images/chatgpt.jpg",
            category: "Restore images",
            link: "https://arc.tencent.com/en/ai-demos/faceRestoration"
        }
    ];

    // Sortierte Models basierend auf Besucherzahlen
    const sortedModels = [...models].sort((a, b) => {
        const visitsA = visitCounts[a.id] || 0;
        const visitsB = visitCounts[b.id] || 0;
        return visitsB - visitsA; // Absteigend sortieren (meist bis wenigst besucht)
    });

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

    // Separate Handler für Kategorie-Scroll
    const handleCategoryMouseDown = (e) => {
        setIsScrollingCategories(true);
        const slider = categoriesRef.current;
        setStartXCategories(e.pageX - slider.offsetLeft);
        setScrollLeftCategories(slider.scrollLeft);
        e.stopPropagation(); // Verhindert Bubble-up zum API-Container
    };

    const handleCategoryMouseUp = (e) => {
        setIsScrollingCategories(false);
        e.stopPropagation();
    };

    const handleCategoryMouseMove = (e) => {
        if (!isScrollingCategories) return;
        e.preventDefault();
        e.stopPropagation();
        
        const slider = categoriesRef.current;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startXCategories) * 2;
        slider.scrollLeft = scrollLeftCategories - walk;
    };

    // Filtere die Models basierend auf der ausgewählten Kategorie
    const filteredModels = models.filter(model => {
        if (selectedCategory === "All") return true;
        return model.category === selectedCategory;
    });

    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="px-4 md:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold my-6 text-black">
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
                            ref={categoriesRef}
                            className="mb-6 cursor-grab active:cursor-grabbing overflow-x-auto select-none"
                            onMouseDown={handleCategoryMouseDown}
                            onMouseLeave={handleCategoryMouseUp}
                            onMouseUp={handleCategoryMouseUp}
                            onMouseMove={handleCategoryMouseMove}
                            onClick={(e) => e.stopPropagation()}
                            style={{ 
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            <div className="flex gap-2 py-2 min-w-max px-2">
                                {[
                                    { name: "All", icon: <LayoutGrid className="w-4 h-4" /> },
                                    { name: "Generate images", icon: <ImageIcon className="w-4 h-4" /> },
                                    { name: "Generate text", icon: <Type className="w-4 h-4" /> },
                                    { name: "Caption images", icon: <FileImage className="w-4 h-4" /> },
                                    { name: "Edit images", icon: <Pencil className="w-4 h-4" /> },
                                    { name: "Restore images", icon: <RefreshCw className="w-4 h-4" /> }
                                ].map((category) => (
                                    <Button
                                        key={category.name}
                                        variant="outline"
                                        className={`
                                            transition-colors
                                            whitespace-nowrap
                                            px-4 py-2
                                            text-sm md:text-base
                                            flex items-center gap-2
                                            select-none
                                            ${selectedCategory === category.name 
                                                ? 'bg-primary text-white' 
                                                : 'text-gray-800 hover:bg-primary/90 hover:text-white'
                                            }
                                        `}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            selectCategory(category.name);
                                        }}
                                    >
                                        {category.icon}
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Modell-Karten Container */}
                        <div 
                            ref={containerRef}
                            className="flex-1 cursor-grab active:cursor-grabbing overflow-x-auto"
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            style={{ 
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                '::-webkit-scrollbar': { display: 'none' }
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={selectedCategory}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className="flex gap-4 py-4 px-4 min-w-max"
                                >
                                    {filteredModels.map((model) => (
                                        <motion.div
                                            key={model.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.22 }}
                                            className="flex-none w-[280px] md:w-[400px] h-[160px] md:h-[180px] 
                                                border rounded-lg shadow-sm hover:shadow-lg 
                                                transition-all duration-300 ease-in-out 
                                                bg-white select-none overflow-hidden"
                                        >
                                            <div className="flex h-full">
                                                {/* Bild-Container - Feste Breite */}
                                                <div className="w-24 md:w-32 flex-shrink-0 overflow-hidden">
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
                                                
                                                {/* Content Container - Flex mit fester Struktur */}
                                                <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
                                                    {/* Text Content */}
                                                    <div>
                                                        <h3 className="text-sm md:text-lg font-medium mb-2 text-gray-800">
                                                            {model.title}
                                                        </h3>
                                                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                                                            {model.description}
                                                        </p>
                                                    </div>

                                                    {/* Footer mit Stats und Button - Immer am unteren Rand */}
                                                    <div className="mt-auto pt-2 flex items-center justify-between">
                                                        <span className="text-xs md:text-sm text-gray-500">
                                                            {formatVisits(visitCounts[model.id] || 0)}
                                                        </span>
                                                        <Button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(model.link, '_blank');
                                                                handleVisit(model.id);
                                                            }}
                                                            className="bg-primary hover:bg-primary/90 text-white text-xs 
                                                                md:text-sm px-3 py-1 min-w-[80px] md:min-w-[90px]"
                                                        >
                                                            Open →
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>

                {/* Tag Card - jetzt auch auf Mobile sichtbar */}
                <Card className="w-full lg:w-[300px] h-fit mb-8">
                    <div className="flex h-full border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 bg-black">
                        <div className="flex-1 p-4">
                            <div className="flex flex-col h-full">
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Most Used Models
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>Stable Diffusion</span>
                                            <span className="text-xs text-gray-400 ml-auto">2.5M</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>DALL-E 2</span>
                                            <span className="text-xs text-gray-400 ml-auto">1.8M</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>Midjourney</span>
                                            <span className="text-xs text-gray-400 ml-auto">1.2M</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>GPT-4</span>
                                            <span className="text-xs text-gray-400 ml-auto">950K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>Claude 2</span>
                                            <span className="text-xs text-gray-400 ml-auto">780K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>Adobe Firefly</span>
                                            <span className="text-xs text-gray-400 ml-auto">650K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>Google Vision</span>
                                            <span className="text-xs text-gray-400 ml-auto">520K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded accent-purple-600 bg-purple-600"
                                            />
                                            <span>Runway ML</span>
                                            <span className="text-xs text-gray-400 ml-auto">480K</span>
                                        </div>
                                    </div>
                                </div>
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
