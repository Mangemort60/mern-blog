const Offre = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:w-4/6 m-4 md:mx-auto mt-8 h-auto md:h-[400px]">
      <div className="bg-[#2babc8] text-white border shadow-sm rounded-sm p-6  flex flex-col justify-between transform transition-transform hover:scale-105  ">
        <h2 className="text-xl font-nunito ">Première séance</h2>
        <div>
          <p className=" text-sm mb-4">
            <span className="text-3xl">35€</span> la séance
          </p>
        </div>
      </div>
      <div className="bg-[#e5bce1] border shadow-sm rounded-sm p-6  flex flex-col justify-between transform transition-transform hover:scale-105">
        <h2 className="text-xl font-nunito">Séance unique</h2>
        <div>
          <p className="text-gray-600 text-sm mb-4">
            <span className="text-3xl">50€</span> la séance
          </p>
        </div>
      </div>
      <div className="bg-[#e8e9c9] border shadow-sm rounded-sm p-6 pb-2  flex flex-col justify-between transform transition-transform hover:scale-105">
        <div>
          <h2 className="text-xl font-nunito ">Forfait 5 séances</h2>
          <p>
            <span className="line-through mr-2">250€</span>225€
          </p>
        </div>
        <div className="text-green-500 text-lg font-nunito ">
          <p className="text-gray-600 text-sm ">
            <span className="text-3xl">45€</span> la séance
          </p>
          <span>Économisez 25€</span>
        </div>
      </div>
      <div className="bg-[#edede0] border shadow-sm rounded-sm p-6 pb-2  flex flex-col justify-between transform transition-transform hover:scale-105">
        <div>
          <h2 className="text-xl font-nunito">Forfait 10 séances</h2>
          <p>
            <span className="line-through mr-2">500€</span>400€
          </p>
        </div>
        <div className="text-green-500 text-lg font-nunito">
          <p className="text-gray-600 text-sm">
            <span className="text-3xl">40€</span> la séance
          </p>
          <span>Meilleure offre !</span>
        </div>
      </div>
    </div>
  );
};

export default Offre;
