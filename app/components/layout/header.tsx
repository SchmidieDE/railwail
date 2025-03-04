import { Button } from "../ui/button";



const Header = () => {
  return (
    <header>
      <div className="bg-purple-400 w-full h-30 flex items-center justify-between">
     
     <div className=" ">
      <h1 className="text-4xl font-bold pl-5 text-gray-800">RailWail</h1>
      </div>

      <div className="flex justify-end">
      <Button className="text-lg mr-5 cursor-pointer bg-block hover:bg-block">Dashboard</Button>
      <Button className="text-lg mr-5 cursor-pointer bg-block hover:bg-block">Pricing</Button>
      <Button className="text-lg mr-5 cursor-pointer bg-gray-800 hover:bg-gray-600">Login</Button>
      </div>
      
      </div>
    </header>
  );
};
export default Header;