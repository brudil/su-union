import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import StreamField from '~website/containers/content/StreamField';
import {getHeadingsFromStreamField} from "~website/containers/content/utils";
import ContentNavigation from "~components/ContentNavigation";
import slugify from "~libs/slugify";
import {RelatedContent} from "~website/components/RelatedContent";
import {StaffOwners} from "~website/components/StaffOwners";

interface IProps {
  page: Page<{ content: StreamFieldData, relatedLinks: StreamFieldData, staffOwners: StreamFieldData }>; // todo
}

class ReferencePage extends React.Component<IProps> {
  render() {
    const {
      page: {
        data: { content, relatedLinks, staffOwners },
      },
      page,
    } = this.props;

    const headings = getHeadingsFromStreamField(content);

    return (
      <div className="LokiContainer">
        <h1 className="type-trafalgar">{page.title}</h1>
        <div className="LayoutContent">
          <div className="LayoutContent__toc">
            <ContentNavigation title="Sections" items={headings.map(heading => ({ name: heading, anchor: slugify(heading), children: [] }))} />
          </div>
          <div className="LayoutContent__main">
            <StreamField items={content} page={page} />
          </div>

          <aside className="LayoutContent__aside ContentSidebar">
            <div>
              <RelatedContent relatedContent={relatedLinks} />
            </div>

            <div>
              <StaffOwners staff={staffOwners} />
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default ReferencePage;
