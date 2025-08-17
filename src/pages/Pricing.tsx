import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";


const Pricing = () => {
  const colors = {
    primary: "#356AFF",
    background: "#0F102A", // Dark background similar to Film Fest
    text: "white",
    border: "#356AFF",
    buttonHover: "#2A4FD7",
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 25,
      credits: 50,
      url: "/pricing/basic",
      features: [
        "Standard film submissions",
        "Basic festival access",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: 50,
      credits: 100,
      url: "/pricing/pro",
      features: [
        "Premium film submissions",
        "Extended festival access",
        "Networking events",
      ],
    },
    {
      id: "enterprise",
      name: "VIP",
      price: 100,
      credits: 250,
      url: "/pricing/enterprise",
      features: [
        "All-access festival pass",
        "VIP networking events",
        "Exclusive screenings",
        "Meet the filmmakers",
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 text-white">
        <div className="text-2xl font-bold">FILM FEST</div>
        <div className="flex space-x-6">
          <a href="/explore" className="hover:text-blue-400">Explore</a>
          <a href="/pricing" className="hover:text-blue-400">Pricing</a>
          <a href="/about" className="hover:text-blue-400">About Us</a>
          <a href="/login" className="hover:text-blue-400">Login</a>
          <a href="/signup" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Sign Up</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-white mb-4">FILM FEST</h1>
          <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
            Join the premier film festival experience with packages for every filmmaker and enthusiast.
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative border rounded-xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2"
              style={{
                background: "rgba(15, 16, 42, 0.8)",
                backdropFilter: "blur(10px)",
                borderColor: colors.primary,
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-3">{plan.name}</h3>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
              </div>

              <p className="text-lg font-medium text-gray-300 mb-6">Credits: {plan.credits}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <FiCheck className="mr-2 flex-shrink-0 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full text-lg px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all"
                style={{ background: colors.primary, color: colors.text }}
                onClick={() => window.location.href = plan.url}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;