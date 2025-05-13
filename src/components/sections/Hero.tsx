import ConnectWalletButton from "../web3/ConnectWalletButton";
import bgimage from "@/assets/market.jpeg"; // Ensure you have the correct path to your image

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative z-20 max-w-[800px] px-5 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Creating Value in the Agricultural Supply Chain</h1>
        <p className="text-xl !mb-8">A revolutionary platform that empowers farmers, supports local businesses by connecting farmers with consumers and promotes environmental sustainability through innovative recycling integration.</p>
        <div className="!flex !flex-col md:!flex-row !gap-4 justify-center">
          <button className="!bg-[#3b7d4a] text-white !px-8 !py-3 rounded-md font-semibold hover:bg-[#72b01d] transition-colors">Join as a Farmer</button>
          <button className="bg-white !text-[#3b7d4a] !px-8 !py-3 rounded-md font-semibold hover:bg-[#72b01d] hover:text-white transition-colors">Shop Local Produce</button>
          <ConnectWalletButton />
        </div>
      </div>
    </section>
  );
};

export default Hero;
