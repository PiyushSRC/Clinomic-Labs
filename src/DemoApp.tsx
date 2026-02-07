import React, { useState, useEffect } from 'react';
import DemoPageContent from '../components/DemoPageContent';
import Footer from '../components/Footer';
import '../index.css';

const DemoApp: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        labName: '',
        address: '',
        city: '',
        contact: ''
    });
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Generate 30-min time slots from 09:00 to 17:00
    // Custom 45-min time slots with a break
    useEffect(() => {
        const slots = [
            "09:00 AM - 09:45 AM",
            "09:45 AM - 10:30 AM",
            "10:30 AM - 11:15 AM",
            "11:15 AM - 12:00 PM",
            "12:00 PM - 12:45 PM",
            "12:45 PM - 01:30 PM",
            "02:45 PM - 03:30 PM",
            "03:30 PM - 04:15 PM",
            "04:15 PM - 05:00 PM",
            "05:00 PM - 05:45 PM",
            "05:45 PM - 06:30 PM",
            "06:30 PM - 07:15 PM"
        ];
        setTimeSlots(slots);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Strict numeric validation for contact number
        if (name === 'contact') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot) {
            alert('Please select a time slot.');
            return;
        }
        if (formData.contact.length !== 10) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        try {
            const response = await fetch('/api/request-demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, selectedSlot }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Demo Request Submitted:', data);
                setSubmitted(true);
            } else {
                console.error('Failed to submit demo request:', data.error);
                alert('Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 font-sans pb-12 md:pb-24">
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }}></div>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] bg-blue-900/5 blur-[180px] rounded-full"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[220px] rounded-full"></div>
            </div>

            <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 z-50 pointer-events-none">
                <button
                    onClick={() => window.location.href = '/'}
                    className="pointer-events-auto w-[50px] h-[50px] rounded-full border border-white/10 flex items-center justify-center bg-white/5 cursor-pointer transition-colors duration-300 hover:border-white/40 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.5)] active:scale-95 group/logo"
                    aria-label="Back to Home"
                >
                    <img src="/logo.png" alt="Arogya BioX" className="w-full h-full object-contain transition-all duration-300 group-hover/logo:brightness-[100] group-hover/logo:drop-shadow-[0_0_15px_rgba(255,255,255,1)] group-hover/logo:scale-110" />
                </button>
            </nav>

            <main className="relative z-10 min-h-screen flex items-center py-24 px-4 md:px-8 lg:px-12">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* Left Side: Info Section */}
                    <div className="h-full flex flex-col justify-center items-center text-center pr-8 md:pr-0">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black mb-8 text-white leading-none tracking-tight">
                                <span className="block animate-fade-in-up" style={{ animationDelay: '100ms' }}>Clinical Intelligence</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-fade-in-up pb-2" style={{ animationDelay: '300ms' }}>at Population Scale</span>
                            </h1>
                            <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg mb-8 mx-auto">
                                Arogya BioX builds software-driven screening and clinical intelligence platforms that extract actionable insights from routine diagnostic data enabling earlier risk identification without adding operational complexity.
                            </p>
                        </div>
                    </div>



                    {/* Right Side: Request Form */}
                    <div className="glass-effect p-8 md:p-10 rounded-[40px] border border-white/20 relative overflow-hidden h-full flex flex-col justify-center animate-fade-in-up delay-100">
                        {/* Decorative blob inside form */}
                        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div>
                                    <h2 className="text-2xl font-light mb-1">Request a <span className="font-bold">Live Demo</span></h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1">Full Name</label>
                                        <input
                                            required
                                            name="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
                                            placeholder="Dr. Start K."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1">Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
                                            placeholder="name@lab.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1">HOSPITAL/Laboratory Name</label>
                                        <input
                                            required
                                            name="labName"
                                            type="text"
                                            value={formData.labName}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
                                            placeholder="City Diagnostics"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1">Address</label>
                                        <input
                                            required
                                            name="address"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
                                            placeholder="123 Health Street"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1">City</label>
                                        <input
                                            required
                                            name="city"
                                            type="text"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1">Contact Number</label>
                                        <input
                                            required
                                            name="contact"
                                            type="tel"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
                                            placeholder="9999999999"
                                            maxLength={10}
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-blue-300 ml-1 block">Select Session (IST)</label>
                                    <p className="text-sm text-white/60 mb-2 ml-1">Select a time and we'll send you an invite.</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {timeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`text-xs py-2 px-2 rounded-full border transition-all duration-300 ${selectedSlot === slot
                                                    ? 'bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 mt-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
                                >
                                    Confirm Demo Request
                                </button>
                            </form>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                                <p className="text-white/60 text-sm max-w-xs leading-relaxed mb-8">
                                    We have logged your request for <span className="text-blue-300 font-medium">{selectedSlot}</span>. Our team will contact you at {formData.email} shortly.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
                                >
                                    Return to Home
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </main>

            <DemoPageContent />
            <Footer />
        </div>
    );
};

export default DemoApp;
