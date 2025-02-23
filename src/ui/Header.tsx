import classnames from 'classnames';

import Image from 'next/image';

export default function Header() {
    return (
        <section
        className={classnames(
          'pt-24 pb-12 text-white w-full bg-cover bg-center bg-no-repeat relative',
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
    );
  }