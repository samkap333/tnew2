import { useState } from "react";
import { Play } from "lucide-react";
import QualificationModal from "@/components/QualificationModal";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-black text-2xl font-bold tracking-wide fade-in-up">
            Attention Coaches, Consultants & Service Providers
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black hero-title mb-8 leading-tight tracking-tight slide-in-left delay-200">
                Boost Your One-On-One Sales Conversions With Psychology Backed Strategies
              </h2>
              <p className="text-lg md:text-xl text-black/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium slide-in-left delay-400">
                In the one-on-one clarity call, I'll share my tried-and-tested sales strategies to help you close more sales in a simple and fun way—no pressure, just easy conversations that turn into happy clients!
              </p>
              <button
                onClick={openModal}
                className="premium-button text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 scale-in delay-600"
              >
                Book Your Clarity Call Now
              </button>
            </div>
            <div className="text-center">
              <div className="premium-card w-72 md:w-80 lg:w-96 h-80 md:h-96 lg:h-[500px] mx-auto overflow-hidden floating-animation slide-in-right delay-300">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800"
                  alt="Professional business coach Taiba Mahmood"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="premium-card p-12 max-w-6xl mx-auto fade-in-up delay-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              <div className="scale-in delay-300">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-bright-pink mb-3">11K+</div>
                <div className="text-black font-bold text-lg md:text-xl">LinkedIn Community</div>
              </div>
              <div className="scale-in delay-400">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-bright-pink mb-3">4+</div>
                <div className="text-black font-bold text-lg md:text-xl">Years Of Experience</div>
              </div>
              <div className="scale-in delay-500">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-bright-pink mb-3">100+</div>
                <div className="text-black font-bold text-lg md:text-xl">Happy Clients</div>
              </div>
              <div className="scale-in delay-600">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-bright-pink mb-3">240</div>
                <div className="text-black font-bold text-lg md:text-xl">Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black text-center mb-16 tracking-tight fade-in-up delay-100">
            Highlights of the clarity call
          </h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left side highlights */}
              <div className="space-y-8">
                <div className="premium-card p-6 md:p-8 lg:p-10 text-center slide-in-left delay-200">
                  <h3 className="font-black text-bright-pink text-lg md:text-xl lg:text-2xl">Develop Sales Mindset</h3>
                </div>
                <div className="premium-card p-6 md:p-8 lg:p-10 text-center lg:ml-12 slide-in-left delay-400">
                  <h3 className="font-black text-bright-pink text-lg md:text-xl lg:text-2xl">Hit Your Sales Goals Every Month</h3>
                </div>
              </div>

              {/* Center circular diagram */}
              <div className="flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <div className="relative w-48 md:w-56 lg:w-60 h-48 md:h-56 lg:h-60 scale-in delay-300">
                  <div className="w-full h-full rounded-full border-4 md:border-6 lg:border-8 border-bright-pink relative overflow-hidden shadow-pink floating-animation">
                    <div className="absolute inset-0 rounded-full bg-button-gradient"></div>
                    <div className="absolute inset-4 bg-blanco rounded-full flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-2 md:gap-3 text-2xl md:text-3xl lg:text-4xl">
                        <div className="text-bright-pink">🧠</div>
                        <div className="text-deep-pink">👥</div>
                        <div className="text-bright-pink">💰</div>
                        <div className="text-deep-pink">📈</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side highlights */}
              <div className="space-y-8">
                <div className="premium-card p-6 md:p-8 lg:p-10 text-center slide-in-right delay-500">
                  <h3 className="font-black text-bright-pink text-lg md:text-xl lg:text-2xl">Understand Buyer Psychology</h3>
                </div>
                <div className="premium-card p-6 md:p-8 lg:p-10 text-center lg:mr-12 slide-in-right delay-700">
                  <h3 className="font-black text-bright-pink text-lg md:text-xl lg:text-2xl">Unlock Secrets To Closing One-On-One Sales</h3>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={openModal}
                className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Your Clarity Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-16">
            This call is for you if...
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl p-8 border-2 border-dashed border-white/40">
              <p className="text-dark text-center leading-relaxed">
                Struggling with fear of rejection and low confidence when selling? We train you to overcome fears and limiting beliefs so that you confidently close one-on-one sales.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 border-2 border-dashed border-white/40">
              <p className="text-dark text-center leading-relaxed">
                Struggling to justify your prices to clients? We help you show your true value with confidence.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 border-2 border-dashed border-white/40">
              <p className="text-dark text-center leading-relaxed">
                Struggling to handle objections effectively? We help you turn objections into opportunities to close sales calls.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 border-2 border-dashed border-white/40">
              <p className="text-dark text-center leading-relaxed">
                Struggling with low sales conversions? We help boost your conversion rates by 10-20% in your coaching or consulting business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button
              onClick={openModal}
              className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-12"
            >
              Book Your Clarity Call Now
            </Button>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-16">Bonuses</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-navy mb-6 text-center">Pre-Qualifying System</h3>
              <div className="flex justify-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                  alt="Business checklist and qualification system"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-navy mb-6 text-center">High Converting Sales Script</h3>
              <div className="flex justify-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                  alt="Sales script and documentation"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-navy mb-6 text-center">Energy Boosting Routine Guide</h3>
              <div className="flex justify-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
                  alt="Energy and motivation guide"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Button
              onClick={openModal}
              className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Your Clarity Call Now
            </Button>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-navy text-center mb-16">Testimonials</h2>

          {/* Text Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
                  alt="Client testimonial photo"
                  className="w-16 h-16 rounded-full object-cover mb-6"
                />
                <p className="text-navy text-lg mb-6 leading-relaxed max-w-2xl">
                  "Hi Taiba, One more sales closed today! Thank you so much and lots of gratitude to you. Your inputs have really helped me. I am much more confident in pitching and closing sales on a daily basis."
                </p>
                <p className="font-semibold text-navy">Deepak Jaswani</p>
              </div>
            </div>
          </div>

          {/* Video Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
                  alt="Video testimonial thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="text-white text-xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/70 px-2 py-1 rounded">
                  Here is what Aanandika Sood says ab...
                </div>
              </div>
            </div>

            <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
                  alt="Video testimonial thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="text-white text-xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/70 px-2 py-1 rounded">
                  Here is What Vidhya Chitta Says about...
                </div>
              </div>
            </div>

            <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
                  alt="Video testimonial thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="text-white text-xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/70 px-2 py-1 rounded">
                  Here is what Khushboo Says about ou...
                </div>
              </div>
            </div>

            <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
                  alt="Video testimonial thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="text-white text-xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/70 px-2 py-1 rounded">
                  Here is what Deepak says about our s...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Button
              onClick={openModal}
              className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Your Clarity Call Now
            </Button>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-navy text-center mb-16">About The Coach</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Hi, I'm Taiba Mahmood!</h3>
              <p className="text-navy leading-relaxed text-lg">
                For the past 4 years, I've helped coaches like you close more sales by using my Psychology-backed strategies. I believe selling is serving, and it should feel natural and fun. My mission is to make sales effortless by teaching simple principles of human psychology. With my strategies, you'll overcome limiting beliefs related to sales, and gain the step-by-step skillset to close sales calls confidently. Ready to boost your sales conversions? Let's make sales simple, easy and fun for you!
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600"
                alt="Professional business coach Taiba Mahmood portrait"
                className="rounded-2xl shadow-2xl w-80 h-96 object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-12">
            <Button
              onClick={openModal}
              className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Your Clarity Call Now
            </Button>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-6">Still wondering if the call is for you?</h2>
          <p className="text-lg text-navy/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            If you want to close more sales in your coaching or consulting business, mastering one-on-one sales is the best path forward. We've crafted comprehensive sales strategies to help you close more sales consistently within 90 days.
          </p>

          <Button
            onClick={openModal}
            className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-16"
          >
            Book Your Clarity Call Now
          </Button>

          <div className="max-w-2xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-italic text-navy mb-4">
              "The secret of selling is to stop selling and start helping."
            </blockquote>
            <cite className="text-navy/70 font-medium">- Zig Ziglar</cite>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy text-center mb-16">FAQs</h2>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion />

            <div className="text-center mt-12">
              <Button
                onClick={openModal}
                className="bg-white text-navy font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Your Clarity Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Modal */}
      <QualificationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
