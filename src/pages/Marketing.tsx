import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { colors } from "../data/colors/theme";

const LazyImage = lazy(() => import("../components/LazyImage.tsx"));

const MarketingPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900"></div>}>
      <div className="bg-white">

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <LazyImage
              src="https://via.placeholder.com/1920x1080?text=Film+Festival+Audience"
              alt="Film Festival Audience"
              placeholder="https://via.placeholder.com/1920x1080?text=Loading..."
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-3xl px-4"
          >
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}
            >
              Promote Your Film Festival
            </h1>
            <p
              className="text-lg md:text-xl text-white font-light"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
            >
              Boost visibility and drive more submissions with our platform
            </p>
          </motion.div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "3M+", label: "Members Worldwide" },
              { number: "921K", label: "Visitors Per Month" },
              { number: "1M+", label: "Campaign Views" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h2
                  className="text-4xl font-bold"
                  style={{ color: colors.primaryColor1 }}
                >
                  {stat.number}
                </h2>
                <p
                  className="text-gray-600 mt-2 text-lg"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We connect filmmakers and festivals from all around the globe. Our
              platform offers powerful promotional tools, a streamlined submission
              process, and unmatched global reach. Whether you're a small indie
              festival or a large international event, we help you attract the right
              audience and submissions.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "https://i.pinimg.com/474x/f6/a6/da/f6a6daa1e6755ff8625812bce51e64e3.jpg",
              "https://i.pinimg.com/736x/fb/ee/12/fbee1263642c75a9830b4618e04d4f1b.jpg",
              "https://i.pinimg.com/736x/4d/f6/ce/4df6cecb08ae5c9a0485f92dd683ed12.jpg",
             
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <LazyImage
                  src={url}
                  alt={`Festival Image ${i + 1}`}
                  placeholder="https://i.pinimg.com/736x/59/56/94/59569416c483c046403e750c45e40f1d.jpg"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", text: "An incredible platform that connected us with filmmakers from all over the world." },
                { name: "Maria Lopez", text: "Easy to use, visually appealing, and effective in boosting submissions." },
                { name: "David Kim", text: "Our festival saw a 40% increase in entries within two months!" },
              ].map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <p className="text-gray-600 italic">"{t.text}"</p>
                  <p className="mt-4 font-bold text-gray-800">- {t.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-white text-center" style={{ backgroundColor: colors.primaryColor1 }}>
          <h2 className="text-4xl font-bold mb-6">Ready to Promote Your Festival?</h2>
          <p className="mb-8 text-lg">
            Join thousands of festivals already using our platform to boost visibility and attract top talent.
          </p>
          <button className="bg-white text-primary font-semibold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition"
            style={{ color: colors.primaryColor1 }}>
            Get Started
          </button>
        </section>

      </div>
    </Suspense>
  );
};

export default MarketingPage;
