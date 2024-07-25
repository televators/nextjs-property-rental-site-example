'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

// TODO: Figure out best way to programmatically get each image's aspect ratio and full size, make the lightbox responsive. Or use a different lightbox plugin that is responsive out of the box.
const PropertyAllImages = ({ images }) => {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          {images.length === 1 ? (
            <Item original={images[0]} thumbnail={images[0]} width='1000' height='600'>
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  alt=''
                  className='object-cover h-[400px] mx-auto rounded-xl'
                  width={1800}
                  height={400}
                  priority={true}
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-2 gap-6'>
              {images.map((image, index) => (
                <div key={index} className={`${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'}`}>
                  <Item original={image} thumbnail={image} width='1000' height='560'>
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=''
                        className='object-cover h-[400px] w-full rounded-xl'
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};
export default PropertyAllImages;
