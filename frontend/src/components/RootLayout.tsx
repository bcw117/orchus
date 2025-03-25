import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#1f1f1f]">
        <BackgroundGradientAnimation />
      </div>
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default RootLayout;
