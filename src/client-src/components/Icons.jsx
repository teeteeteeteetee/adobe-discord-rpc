/*
 * File: Icons.jsx
 * Project: discord-rpc
 * File Created: Thursday, 23rd November 2023 11:19:04 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Thursday, 23rd November 2023 2:51:18 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Demon Cat
 */

import React from "react";
import { getApplicationID } from "..";
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
import IDSN from "../../assets/IDSN.png"
import IDSN1 from "../../assets/IDSN1.png"
import ILST from "../../assets/ILST.png"
import ILST1 from "../../assets/ILST1.png"
import MEDIA_ENCODER from "../../assets/MEDIA_ENCODER.png";
import MEDIA_ENCODER1 from "../../assets/MEDIA_ENCODER1.png";
import PHXS from "../../assets/PHXS.png";
import PHXS1 from "../../assets/PHXS1.png";
import PPRO from "../../assets/PPRO.png";
import PPRO1 from "../../assets/PPRO1.png";
import PRLD from "../../assets/PRLD.png";
import RUSH from "../../assets/RUSH.png"
import RUSH1 from "../../assets/RUSH1.png"

const icons = {
  AEFT: [AEFT, AEFT1],
  AICY: [AICY, AICY1],
  AUDT: [AUDT, AUDT1],
  DRWV: [DRWV, DRWV1],
  FLPR: [FLPR, FLPR1],
  IDSN: [IDSN, IDSN1],
  ILST: [ILST, ILST1],
  MEDIA_ENCODER: [MEDIA_ENCODER, MEDIA_ENCODER1],
  PHXS: [PHXS, PHXS1],
  PHSP: [PHXS, PHXS1],
  PPRO: [PPRO, PPRO1],
  PRLD: [PRLD],
  RUSH: [RUSH, RUSH1],
}

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
  IDSN,
  IDSN1,
  ILST,
  ILST1,
  MEDIA_ENCODER,
  MEDIA_ENCODER1,
  PHXS,
  PHXS1,
  PPRO,
  PPRO1,
  PRLD,
  RUSH,
  RUSH1
};

export function setCustom({url}){

}

export default function getIcon ({ className, version }) {
  // <img className="rounded-sm w-[60px] h-[60px]" src="../../assets/AEFT.png" />  
  

  return <img className={className} src={icons[getApplicationID()][version]} />
}