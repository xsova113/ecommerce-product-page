import { AiFillGoogleCircle } from "react-icons/ai";

const SocialButtons = () => {
  return (
    <button
      className="flex gap-1 w-full justify-between bg-blue-500 hover:bg-blue-500/80 transition rounded-lg py-2 px-3 text-white"
      onClick={() => {}}
    >
      <AiFillGoogleCircle className="self-center" size={25} />
      <span className="w-full">Continue with Google</span>
    </button>
  );
};

export default SocialButtons;
