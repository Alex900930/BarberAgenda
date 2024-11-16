import classnames from 'classnames';

import Image from 'next/image';

export default function Header() {
    return (
        <section
        className={classnames(
          'pt-24 pb-12 text-white w-full',
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
          layout="fill"
          objectFit="cover"
          className="sm:block hidden"
        />
        <Image
          src="/assets/img/BanerBarberiaMobile.png"
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="sm:hidden block"
        />
      </section>
    );
  }