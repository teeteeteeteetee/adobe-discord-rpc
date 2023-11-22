import AEFT from "../../assets/AEFT.png";
import AEFT1 from "../../assets/AEFT1.png";
import AICY from "../../assets/AICY.png";
import AICY1 from "../../assets/AICY1.png";
import AUDT from "../../assets/AUDT.png";
import AUDT1 from "../../assets/AUDT1.png";
import DRWV from "../../assets/DRWV.png";
import DRWV1 from "../../assets/DRWV1.png";
import FLPR from "../../assets/FLPR.png";
import FLPR1 from "../../assets/FLPR1.png";
import MEDIA_ENCODER from "../../assets/MEDIA_ENCODER.png";
import MEDIA_ENCODER1 from "../../assets/MEDIA_ENCODER1.png";
import PHXS from "../../assets/PHXS.png";
import PHXS1 from "../../assets/PHXS1.png";
import PPRO from "../../assets/PPRO.png";
import PPRO1 from "../../assets/PPRO1.png";
import PRLD from "../../assets/PRLD.png";

export {
  AEFT,
  AEFT1,
  AICY,
  AICY1,
  AUDT,
  AUDT1,
  DRWV,
  DRWV1,
  FLPR,
  FLPR1,
  MEDIA_ENCODER,
  MEDIA_ENCODER1,
  PHXS,
  PHXS1,
  PPRO,
  PPRO1,
  PRLD,
};

export function setCustom({url}){

}

export function getIcon({ appId, className }) {
  // <img className="rounded-sm w-[60px] h-[60px]" src="../../assets/AEFT.png" />

  return <img className={className}></img>;
}
