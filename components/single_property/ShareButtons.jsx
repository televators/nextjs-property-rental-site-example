'use client';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ property, PUBLIC_DOMAIN }) => {
  const shareURL = `${PUBLIC_DOMAIN}/properties/${property._id}`;
  const propertyType = property.type.replace(/\s/g, '');

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>Share this property:</h3>
      <div className='flex gap-3 justify-center pb-4'>
        <FacebookShareButton url={shareURL} quote={property.name} hashtag={`#${propertyType}ForRent`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton url={shareURL} title={property.name} hashtags={[`#${propertyType}ForRent`]}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton url={shareURL} title={property.name} separator=':: '>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareURL}
          subject={property.name}
          body='Check out this property listing on PropertyPulse'>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButtons;
