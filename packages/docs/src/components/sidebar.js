import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ExternalLink } from 'react-feather';
import Link from './link';
import './styles.css';
import config from '../../config';

const forcedNavOrder = config.sidebar.forcedNavOrder;

const Sidebar = styled('aside')`
  width: 100%;
  /* background-color: rgb(245, 247, 249); */
  /* border-right: 1px solid #ede7f3; */
  height: 100vh;
  overflow: auto;
  position: fixed;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #132676;
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #132676;
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    position: relative;
    height: auto;
  }
`;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  if (level === 0) {
    return (
      <li className={className}>
        <Link {...props} />
      </li>
    );
  } else if (level === 1) {
    const customClass = active ? 'active' : '';
    return (
      <li className={'subLevel ' + customClass}>
        <Link {...props} />
      </li>
    );
  } else {
    return (
      <li className={className}>
        <Link {...props} />
      </li>
    );
  }
})`
  list-style: none;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${(props) => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      background-color: #2c4387;
      color: #fff;
    }

    ${(props) =>
      props.active &&
      `
      color: #2c4387;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      const navItems = allMdx.edges
        .map(({ node }) => node.fields.slug)
        .filter((slug) => slug !== '/')
        .sort()
        .reduce(
          (acc, cur) => {
            if (forcedNavOrder.find((url) => url === cur)) {
              return { ...acc, [cur]: [cur] };
            }

            const prefix = cur.split('/')[1];

            if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
              return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
            } else {
              return { ...acc, items: [...acc.items, cur] };
            }
          },
          { items: [] },
        );

      const nav = forcedNavOrder
        .reduce((acc, cur) => {
          return acc.concat(navItems[cur]);
        }, [])
        .concat(navItems.items)
        .map((slug) => {
          const { node } = allMdx.edges.find(
            ({ node }) => node.fields.slug === slug,
          );

          let isActive = false;
          if (
            location &&
            (location.pathname === node.fields.slug ||
              location.pathname === config.gatsby.pathPrefix + node.fields.slug)
          ) {
            isActive = true;
          }

          return (
            <ListItem
              key={node.fields.slug}
              to={`${node.fields.slug}`}
              level={node.fields.slug.split('/').length - 2}
              active={isActive}
            >
              {node.fields.title}
            </ListItem>
          );
        });

      return (
        <Sidebar>
          <ul className={'sideBarUL'}>
            {nav}
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                );
              }
            })}
          </ul>
        </Sidebar>
      );
    }}
  />
);

export default SidebarLayout;
