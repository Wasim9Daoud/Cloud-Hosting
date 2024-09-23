import { TiTick } from "react-icons/ti";
import Image from "next/image";
import style from "./hero.module.css";

const Hero = () => {
  return (
    <div className={style.hero}>
      <div className={style.heroLeft}>
        <h1 className={style.title}> Cloud Hosting</h1>
        <p className={style.desc}>
          The best web hosting for your online success
        </p>
        <div className={style.services}>
          <div className={style.serviceItem}>
            <TiTick /> Eazy To Control Panel
          </div>
          <div className={style.serviceItem}>
            <TiTick /> Secure Hosting
          </div>
          <div className={style.serviceItem}>
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image src='https://cdn3d.iconscout.com/3d/premium/thumb/cloud-server-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--database-storage-backup-data-center-internet-marketing-pack-business-illustrations-3718821.png' alt="Cloud" width={500} height={500} />
      </div>
    </div>
  );
};

export default Hero;
