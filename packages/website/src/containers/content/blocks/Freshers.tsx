import React from 'react';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';
import { css } from '@emotion/core';
import slugify from '@ussu/common/src/libs/slugify';
import convert from 'htmr';
import StreamField from '../StreamField';
import socialSquiggle from '../../../img/socialSquiggle.svg';
import { MQ } from '@ussu/common/src/libs/style';
import { TextBlockData } from './TextBlock';
import { ExternalLinkBlockData, InternalLinkBlockData } from './Links';
import { AspectRatio, OneImage } from '../../../components/OneImage';
import { ImageBlockData } from './Image';

const Slice: React.FC<{ id: string; color: string }> = ({
  children,
  id,
  color,
}) => (
  <div css={{ background: color, padding: '1rem 0' }} id={slugify(id)}>
    <div className="LokiContainer">{children}</div>
  </div>
);

const headingStyle = css({
  textAlign: 'center',
});

const subheadingStyle = css({
  textAlign: 'center',
});

const descStyle = css({
  textAlign: 'center',
  width: '50%',
  margin: '30px auto',
});

export type ProfileSliceData = StreamFieldBlockData<
  'profile_slice_component',
  {
    backgroundColor: string;
    description: string;
    menuName: string;
    title: string;
    image: ImageBlockData['value'];
    body: TextBlockData[];
  }
>;

export type TwoColSliceData = StreamFieldBlockData<
  'two_slice_component',
  {
    backgroundColor: string;
    description: string;
    menuName: string;
    title: string;
    body: TextBlockData['value'];
    colOneTitle: string;
    colTwoTitle: string;
    colOneContent: (
      | TextBlockData
      | ExternalLinkBlockData
      | InternalLinkBlockData)[];
    colTwoContent: (
      | TextBlockData
      | ExternalLinkBlockData
      | InternalLinkBlockData)[];
  }
>;

export const ProfileSlice: StreamFieldBlock<ProfileSliceData> = ({
  page,
  block: { title, backgroundColor, menuName, description, body, image },
}) => {
  return (
    <Slice id={menuName} color={backgroundColor}>
      <React.Fragment>
        <h1 css={headingStyle}>{title}</h1>
        <div css={descStyle}>{convert(description)}</div>
        <div
          css={{
            [MQ.Medium]: { display: 'flex', justifyContent: 'space-evenly' },
          }}
        >
          <div
            css={{
              width: '40%',
              maxWidth: 240,
              textAlign: 'center',
              [MQ.Medium]: { paddingRight: 30 },
              '& img': { borderRadius: '50%' },
            }}
          >
            <OneImage
              alt={image.alternativeTitle}
              src={image.image.resource}
              aspectRatio={AspectRatio.r1by1}
            />
            <span>{image.caption}</span>
          </div>
          <div>
            <StreamField page={page} items={body} />
          </div>
        </div>
      </React.Fragment>
    </Slice>
  );
};

export const SocialSlice: React.FC = () => (
  <div
    css={{
      backgroundImage: `url(${socialSquiggle})`,
      backgroundColor: '#fff',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: '650px',
      padding: '1rem 0 3rem 0',
    }}
  >
    <div className="LokiContainer">
      <h1>Connect with us</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scrupulum,
        inquam, abeunti; Quod si ita est, sequitur id ipsum, quod te velle
        video, omnes semper beatos esse sapientes. Duo Reges: constructio
        interrete. Eadem nunc mea adversum te oratio est. Nec vero alia sunt
        quaerenda contra Carneadeam illam sententiam. Ut id aliis narrare
        gestiant? Non est enim vitium in oratione solum, sed etiam in moribus.
        Quorum altera prosunt, nocent altera.
      </p>
    </div>
  </div>
);

export const TwoColSlice: StreamFieldBlock<TwoColSliceData> = ({
  page,
  block: {
    title,
    backgroundColor,
    menuName,
    description,
    colOneTitle,
    colOneContent,
    colTwoTitle,
  },
}) => {
  return (
    <Slice id={menuName} color={backgroundColor}>
      <React.Fragment>
        <h1 css={headingStyle}>{title}</h1>
        <div css={descStyle}>{convert(description)}</div>
        <div
          css={{
            [MQ.Medium]: {
              display: 'flex',
              justifyContent: 'space-evenly',
            },
          }}
        >
          <div>
            <h2 css={subheadingStyle}>{colOneTitle}</h2>
            <div css={{ padding: '20px 10%' }}>
              <StreamField page={page} items={colOneContent} />
            </div>
          </div>
          <div>
            <h2 css={subheadingStyle}>{colTwoTitle}</h2>
            <div css={{ padding: '20px 10%' }}>
              <StreamField
                page={page}
                items={colOneContent}
                components={{
                  x: history,
                }}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Slice>
  );
};