
const Footer = () => {
  return (
    <footer className="bg-[#333] text-white py-12 px-[5%]">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-[#f7b733] mb-4">FarmConnect</h3>
          <p className="mb-6">Connecting farmers directly with consumers while promoting sustainable practices through innovative recycling solutions.</p>
          <div className="flex gap-4">
            {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((social, index) => (
              <a key={index} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f7b733] transition-colors">
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        {[
          {
            title: "For Farmers",
            links: ["How It Works", "Pricing", "Success Stories", "Resources"]
          },
          {
            title: "For Consumers",
            links: ["Find Local Farms", "Seasonal Products", "Recycling Program", "Rewards"]
          },
          {
            title: "Contact Us",
            links: ["Support", "Partnerships", "Careers", "Press"]
          }
        ].map((column, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold text-[#f7b733] mb-4">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href="#" className="text-gray-300 hover:text-[#f7b733] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-400 mt-12 pt-8 border-t border-white/10">
        <p>&copy; 2025 FarmConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
