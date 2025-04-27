
const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Register Your Farm",
      description: "Create your profile, add your location, and list the products you offer to get started."
    },
    {
      number: 2,
      title: "Connect with Customers",
      description: "Accept orders, arrange deliveries, and build your customer base through our platform."
    },
    {
      number: 3,
      title: "Participate in Recycling",
      description: "Register your agricultural waste for collection and earn credits for sustainable practices."
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 px-[5%]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="!text-4xl font-bold text-[#3b7d4a] relative inline-block">
            How It Works
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-[3px] bg-[#f7b733]"></span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-[#3b7d4a] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#3b7d4a] mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
