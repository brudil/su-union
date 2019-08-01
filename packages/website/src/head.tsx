import React from 'react';
import MSLTag from './components/MSLTag';

export const branding = `<link rel="apple-touch-icon" sizes="180x180" href="https://du9l8eemj97rm.cloudfront.net/branding-s18/apple-touch-icon.png">
<link rel="icon" type="image/png" href="https://du9l8eemj97rm.cloudfront.net/branding-s18/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="https://du9l8eemj97rm.cloudfront.net/branding-s18/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="https://du9l8eemj97rm.cloudfront.net/branding-s18/manifest.json">
<link rel="mask-icon" href="https://du9l8eemj97rm.cloudfront.net/branding-s18/safari-pinned-tab.svg" color="#1db8a4">
<link rel="shortcut icon" href="https://du9l8eemj97rm.cloudfront.net/branding-s18/favicon.ico">
<meta name="apple-mobile-web-app-title" content="Students' Union">
<meta name="msapplication-TileColor" content="#2b5797">
<meta name="application-name" content="Students' Union">
<meta name="theme-color" content="#ffffff">`;

export const Branding = () => (
  <React.Fragment>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://du9l8eemj97rm.cloudfront.net/branding-s18/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://du9l8eemj97rm.cloudfront.net/branding-s18/favicon-32x32.png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://du9l8eemj97rm.cloudfront.net/branding-s18/favicon-16x16.png"
      sizes="16x16"
    />
    <link
      rel="manifest"
      href="https://du9l8eemj97rm.cloudfront.net/branding-s18/manifest.json"
    />
    <link
      rel="mask-icon"
      href="https://du9l8eemj97rm.cloudfront.net/branding-s18/safari-pinned-tab.svg"
      color="#1db8a4"
    />
    <link
      rel="shortcut icon"
      href="https://du9l8eemj97rm.cloudfront.net/branding-s18/favicon.ico"
    />
    <meta name="apple-mobile-web-app-title" content="Students' Union" />
    <meta name="msapplication-TileColor" content="#2b5797" />
    <meta name="application-name" content="Students' Union" />
    <meta name="theme-color" content="#ffffff" />
  </React.Fragment>
);

export function manifestHandler(assets: any) {
  if (Object.hasOwnProperty.call(assets, 'manifest')) {
    return `
      window['chunkManifest'] = ${JSON.stringify(assets.manifest)};
    `;
  }

  // For development, simple chunk naming proxy
  return '';
}

export const headContent = (assets: any, ...more: any[]) => `
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<link rel="dns-prefetch" href="//falmer.sussexstudent.com">
<meta name="viewport" content="width=device-width, initial-scale=1">
${
  assets.manifest
    ? `<link href="${assets.map.main.css}" rel="stylesheet" />`
    : ''
}
${branding}
${more.join('')}
${MSLTag('JsonUserInfo', {
  DataParameters: 'COURSE_NAME,DEPARTMENT,STATUS,EXP_END_DATE',
  GenerateJwt: 'true',
  JwtSecret: process.env.MSL_JWT_SECRET,
})}
{head_content}
<script>
  ${manifestHandler(assets)}
  window.releaseMetadata = {gitRev: "${assets.gitRev || 'dev'}"};
  try {
    if (JSON.parse(localStorage.getItem('blocking')).enabled) {
      var css = '.AdvertBar { display: none; }';
      var style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      document.head.appendChild(style);
    }
  } catch (e) {}
  </script>
`;

const legacyScripts = `
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/twitter-bootstrap/2.0.4/js/bootstrap.min.js"></script>
`;

export const headContentLegacy = (assets: any) =>
  headContent(assets, legacyScripts);
