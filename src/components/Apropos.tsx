import youssraHeadshot from '../assets/Youssra.jpg';
import youssraAssise from '../assets/youssraAssise.jpg';
import cabinet from '../assets/cabinet.jpg';

const Apropos = () => {
  return (
    <div className="flex flex-col m-2 md:w-1/2 md:m-auto">
      <div className="font-lora text-xl text-stone-800 text-justify my-8">
        <img
          src={youssraHeadshot}
          alt="photo youssra"
          className="w-80 m-auto rounded-t-full shadow-xl"
        />
        <p className="mt-8">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je suis Youssra, thérapeute
          psychopraticienne spécialisée dans la gestion des traumatismes. Mes
          domaines d'expertise incluent les phobies, les TOC, les troubles du
          comportement alimentaires et sexuels, les traumatismes, les blessures
          émotionnelles, la dépression, l'anxiété, le deuil et l'estime de soi.
        </p>
        <p>
          Mon approche thérapeutique repose sur la thérapie
          cognitive-comportementale (TCC) ainsi que sur des outils de
          neurothérapie. J'aborde les aspects spirituels, mentaux, émotionnels,
          physiques et psychosomatiques des blessures de mes clients. Il est
          important de noter que je ne suis pas psychiatre, et mon travail se
          limite aux troubles qui relèvent de la psychologie.
        </p>
        <p>
          Je serais ravie de t'accompagner sur le chemin de la guérison.
          N'hésite pas à me poser des questions ou à partager tes
          préoccupations.
        </p>
      </div>
      <div className="md:flex lg:flex-row flex flex-col gap-4 md:justify-center items-center px-6">
        <img src={youssraAssise} alt="Youssra" className="w-80 shadow-2xl" />
        <img src={cabinet} alt="cabinet " className="w-80 shadow-2xl" />
      </div>
    </div>
  );
};

export default Apropos;
