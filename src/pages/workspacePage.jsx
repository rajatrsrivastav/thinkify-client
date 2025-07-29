import { BookOpen, Code, Eye, Lightbulb, Play, Send, ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const mockProblemData = {
  "problem-1": {
    title: "Find the Largest Number in an Array",
    course: "CS101 - Intro to Programming",
    topic: "Arrays and Loops",
    description: "Write a function called findMaximum that takes a vector of integers as input and returns the maximum value in the array.",
    requirements: [
      "Handle empty arrays gracefully",
      "Use efficient O(n) time complexity",
      "Do not use built-in max functions",
    ],
    example: {
      input: "[3, 7, 2, 9, 1, 5]",
      output: "9",
    },
    initialCode: `// Your code here`,
  },
};

const Card = ({ children, className }) => <div className={`bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-4 border-b border-white/10 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>;
const CardContent = ({ children, className }) => <div className={`p-4 ${className}`}>{children}</div>;
const Avatar = ({ children, className }) => <div className={`w-8 h-8 rounded-full flex items-center justify-center ${className}`}>{children}</div>;
const AvatarFallback = ({ children, className }) => <div className={`w-full h-full rounded-full flex items-center justify-center ${className}`}>{children}</div>;
const ScrollArea = ({ children, className }) => <div className={`overflow-y-auto ${className}`}>{children}</div>;
const Input = (props) => <input {...props} className={`w-full bg-white/5 p-3 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 border border-transparent ${props.className}`} />;
const Button = ({ children, className, ...props }) => <button {...props} className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${className}`}>{children}</button>;


const Workspace = () => {
    const { problemId = 'problem-1' } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [code, setCode] = useState("");

    const currentProblem = mockProblemData[problemId];

    useEffect(() => {
        if (currentProblem) {
            setCode(currentProblem.initialCode);
            setMessages([
                {
                    id: "1",
                    content: `Hello! I'm here to help you work through this problem. Let's start by understanding what the problem is asking. Can you tell me in your own words what you think this function should do?`,
                    sender: "ai",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [currentProblem]);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                content: inputValue,
                sender: "student",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newMessage]);
            setInputValue("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!currentProblem) {
        return (
            <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
                    <Link to="/" className="text-teal-400 hover:text-teal-300">
                        ← Back to subjects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-900 flex text-white relative p-4 gap-4">
            <div className="absolute inset-0 bg-grid-white/5 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 z-0"></div>

            <div className="relative z-10 w-96 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col">
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-white">Thinkify</h1>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{currentProblem.course}</span>
                    </div>
                    <span className="inline-block bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">
                        Topic: {currentProblem.topic}
                    </span>
                </div>
                <div className="p-4 overflow-y-auto">
                    <Card className="bg-transparent border-none shadow-none">
                        <CardHeader className="p-0 pb-3">
                            <CardTitle>Problem Statement</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {currentProblem.description}
                            </p>
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-gray-200">Requirements:</p>
                                <ul className="text-xs text-gray-300 space-y-1 ml-4 list-disc">
                                    {currentProblem.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                </ul>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs font-medium text-gray-200 mb-2">Example:</p>
                                <div className="bg-black/30 p-2 rounded text-xs font-mono">
                                    Input: {currentProblem.example.input}
                                    <br />
                                    Output: {currentProblem.example.output}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback className="bg-teal-500/20 text-teal-300">
                                <Lightbulb className="w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-medium text-white">AI Tutor</h2>
                            <p className="text-xs text-gray-400">Here to guide your learning</p>
                        </div>
                    </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex gap-3 ${message.sender === "student" ? "flex-row-reverse" : ""}`}>
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className={message.sender === "ai" ? "bg-teal-500/20 text-teal-300" : "bg-blue-500/20 text-blue-300"}>
                                        {message.sender === "ai" ? <Lightbulb className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`max-w-md ${message.sender === "student" ? "text-right" : ""}`}>
                                    <div className={`p-3 rounded-lg ${message.sender === "ai" ? "bg-white/10 text-gray-200" : "bg-teal-500 text-white"}`}>
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2 max-w-4xl mx-auto">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask a question or share your thoughts..."
                            className="bg-white/5 border-white/10 focus:border-teal-400 text-white"
                        />
                        <Button onClick={handleSendMessage} size="icon" className="bg-teal-500 hover:bg-teal-600 text-white">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-96 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col">
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-white">main.cpp</span>
                    </div>
                    <p className="text-xs text-gray-400">Write your solution below</p>
                </div>
                <div className="flex-1 relative">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full p-4 font-mono text-sm resize-none border-none outline-none bg-black/20 text-gray-200"
                        placeholder="// Write your code here..."
                    />
                </div>
                <div className="p-4 border-t border-white/10 space-y-3">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Check My Work
                    </Button>
                    <Button variant="outline" className="w-full text-gray-300 border-white/20 bg-transparent hover:bg-white/10">
                        <Eye className="w-4 h-4 mr-2" />
                        Reveal Solution
                    </Button>
                     <div className="w-full border-t border-white/20 my-2"></div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400 mb-2">Was this guidance helpful?</p>
                        <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-full">
                                <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full">
                                <ThumbsDown className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workspace;
