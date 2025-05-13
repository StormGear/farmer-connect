
const Features = () => {
  const features = [
    {
      icon: "fa-hand-holding-usd",
      title: "Higher Profits for Farmers",
      description: "Sell directly to consumers without middlemen, increasing your profit margins by up to 40%."
    },
    {
      icon: "fa-recycle",
      title: "Integrated Recycling",
      description: "Turn agricultural waste into valuable resources through our innovative recycling program."
    },
    {
      icon: "fa-users",
      title: "Community Building",
      description: "Connect with local consumers and build lasting relationships while supporting rural development."
    }
  ];

  return (
    <section id="features" className="py-20 px-[5%] max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="!text-4xl font-bold text-[#3b7d4a] relative inline-block">
          Why Choose FarmConnect
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-[3px] bg-[#f7b733]"></span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white !rounded-lg !shadow-lg p-8 text-center transform hover:!-translate-y-2 transition-transform duration-300">
            <div className="text-5xl text-[#72b01d] mb-4">
              <i className={`fas ${feature.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold text-[#3b7d4a] mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
