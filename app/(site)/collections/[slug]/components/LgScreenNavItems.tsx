import Link from "next/link";

const LgScreenNavItems = ({ navItems }: { navItems: string[] }) => {
  return (
    <div className="hidden lg:flex ml-32 gap-7">
      {navItems.map((item, index) => (
        <div key={index}>
          <Link
            href={`/${item.toLowerCase()}`}
            className="text-black/60 hover:text-black cursor-pointer border-b-4 border-transparent hover:border-red-500 pb-8 transition"
          >
            {item}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LgScreenNavItems;
