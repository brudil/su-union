import React from 'react';
import { Page } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import { Link } from 'react-router-dom';
import { Sectionbar, SectionbarItem } from '../../../components/Sectionbar';
import { OneImage, AspectRatio } from '../../../components/OneImage';
import convert from 'htmr';
import { SocialArray } from '../../../components/SocialArray';

interface IOfficersIndex extends Page<Page[]> {}

interface OfficerPagePreview extends Page {
  officerImage: FalmerImage;
  role: string;
  roleDescription: string;
  firstName: string;
  lastName: string;
  twitterUsername: string;
  facebookUrl: string;
  instagramUrl: string;
}

interface OfficersIndex extends Page<OfficerPagePreview[]> {
  section: IOfficersIndex;
}

interface OfficerIndexProps {
  page: OfficersIndex;
}

interface NetworkInfo {
  link: string;
  name?: string;
}

interface NetworkItem {
  facebook?: NetworkInfo;
  twitter?: NetworkInfo;
  instagram?: NetworkInfo;
  snapchat?: NetworkInfo;
}

const socialLinks = (pageObj: OfficerPagePreview): NetworkItem => {
  let links: NetworkItem | undefined;
  if (links === undefined) {
    links = {};
  }

  if (pageObj.twitterUsername) {
    links.twitter = {
      name: pageObj.twitterUsername,
      link: `http://twitter.com/${pageObj.twitterUsername}`,
    };
  }

  if (pageObj.facebookUrl) {
    links.facebook = { link: pageObj.facebookUrl };
  }

  if (pageObj.instagramUrl) {
    links.instagram = { link: pageObj.instagramUrl };
  }

  return links;
};

export const OfficersIndex: React.FC<OfficerIndexProps> = ({ page }) => (
  <React.Fragment>
    <Sectionbar title={page.section.title} titleLink={page.section.path}>
      {page.section.subPages.map((page) => (
        <SectionbarItem key={page.path}>
          <Link to={page.path}>{page.title}</Link>
        </SectionbarItem>
      ))}
    </Sectionbar>
    <div className="LokiContainer">
      {page.subPages.map((page) => (
        <div className="Trail Trail__row--12">
          <div
            css={{
              marginBottom: '2rem',
            }}
            key={page.path}
          >
            <OneImage
              aspectRatio={AspectRatio.r1by1}
              src={page.officerImage.resource}
              alt={page.title}
            />
          </div>
          <div>
            <h1>
              {page.firstName} {page.lastName}
            </h1>
            <h2>{page.role}</h2>
            <div className="type-body-copy">
              {convert(page.roleDescription)}
            </div>

            <SocialArray
              networks={socialLinks(page)}
              css={{
                marginBottom: '2rem',
              }}
            />

            <Link className="Button" to={page.path}>
              More about {page.firstName}
            </Link>
          </div>
        </div>
      ))}
    </div>
  </React.Fragment>
);