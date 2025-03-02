import classnames from 'classnames';
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';

const headerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      delay: 0.5,
      ease: "easeOut"
    }
  }
}

const imageVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
}

export default function Header() {
  return (
    <motion.section
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={classnames(
        'pt-24 pb-12 text-white w-full bg-cover bg-center bg-no-repeat relative font-serif',
        'sm:h-[750px] h-[500px]'
      )}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key="desktop-banner"
          variants={imageVariants}
          className="hidden sm:block"
        >
          <Image
            src="/assets/img/BannerBarberia.png"
            alt="Banner Image"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          key="mobile-banner"
          variants={imageVariants}
          className="block sm:hidden"
        >
          <Image
            src="/assets/img/BanerBarberiaMobile.png"
            alt="Banner Image"
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}