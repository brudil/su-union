import React from 'react';
import { Page, StreamFieldData } from '../types';
import StreamField from '../../content/StreamField';

interface IBasicContentPage extends Page {
  content: StreamFieldData;
}

interface BasicContentPageProps {
  page: IBasicContentPage;
}

export const BasicContentPage: React.FC<BasicContentPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <h1>{page.title}</h1>
    <div style={{ maxWidth: '660px' }} className="type-body-copy">
      <StreamField page={page} items={page.content} />
    </div>
  </div>
);