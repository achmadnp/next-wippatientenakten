/* eslint-disable @next/next/no-img-element */

export const Image = (props) => {};

export const ImageLink = (props) => {};

export const Avatar = ({ imgSrc, imgWidth }) => {
  if (imgWidth) {
    return (
      <img
        src={imgSrc}
        className={`m-2 rounded-full w-${imgWidth}}`}
        alt="Avatar"
      />
    );
  }
  return <img src={imgSrc} className={`m-2 rounded-full w-14`} alt="Avatar" />;
};
