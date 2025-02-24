import classnames from 'classnames';
import * as motion from "motion/react-client"

import Image from 'next/image';

export default function Header() {
    return (
      <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
        <section
        className={classnames(
          'pt-24 pb-12 text-white w-full bg-cover bg-center bg-no-repeat relative font-serif',
          {
            'sm:h-[750px] h-[500px]': true,
          }
        )}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Image
          src="/assets/img/BannerBarberia.png"
          alt="Banner Image"
          fill
          className="hidden object-cover sm:block"
        />
        <Image
          src="/assets/img/BanerBarberiaMobile.png"
          alt="Banner Image"
          fill
          className="block object-cover sm:hidden"
        />
      </section>
      </motion.div>
    );
  }