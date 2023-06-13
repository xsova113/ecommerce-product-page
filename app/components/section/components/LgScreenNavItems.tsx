const LgScreenNavItems = ({ navItems }: { navItems: string[] }) => {
  return (
    <div className="hidden lg:flex ml-20 gap-7">
      {navItems.map((item, index) => (
        <div key={index}>
          <span className="text-black/60 hover:text-black cursor-pointer border-b-4 border-transparent hover:border-[#FF7D1A] pb-11 transition">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LgScreenNavItems;
