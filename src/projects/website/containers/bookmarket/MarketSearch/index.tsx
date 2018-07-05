import React from 'react';
import qs from 'query-string';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link, RouteComponentProps } from 'react-router-dom';
import GET_SEARCH_QUERY from './GetSearch.graphql';
import { MarketListing } from '~types/market';
import { ListingList } from '~website/containers/bookmarket/ListingList';
import { Field, Form } from 'react-final-form';
import Helmet from 'react-helmet';
import { HandledQuery } from '~components/HandledQuery';

interface OwnProps extends RouteComponentProps<{ sectionSlug?: string }> {}

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[];
  };
}

type IProps = OwnProps & { data: Result };

class MarketSearchQuery extends HandledQuery<Result, {}> {}

const MarketSearchComponent: React.SFC<IProps> = (props: IProps) => {
  function renderList() {
    if (
      !props.data ||
      !props.data.allMarketListings ||
      !props.data.allMarketListings.edges
    ) {
      return <h1>Error</h1>;
    }

    const edges = props.data.allMarketListings.edges;

    return <ListingList items={edges.map((edge) => edge.node)} />;
  }

  const onSearchSubmit = (data: any) =>
    (props as any).history.push(
      `/book-market/search?${qs.stringify({ q: data.query })}`,
    );

  return (
    <div>
      <Helmet title="Search" />

      <BreadcrumbBar>
        <Link to="/book-market/">Book Market</Link>
        <Link to="/book-market/search">Search</Link>
      </BreadcrumbBar>
      <div className="Layout Layout--sidebar-right">
        <div>
          <Form
            onSubmit={onSearchSubmit}
            initialValues={{ query: qs.parse(props.location.search).q }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <Field
                  name="query"
                  className="HeaderSearch"
                  component="input"
                  type="search"
                  placeholder="Search by author or title"
                />
              </form>
            )}
          />
          {renderList()}
        </div>
      </div>
    </div>
  );
};

function MarketSearch(props: OwnProps) {
  return (
    <MarketSearchQuery
      query={GET_SEARCH_QUERY}
      variables={{
        filters: {
          q: qs.parse(props.location.search).q,
        },
      }}
    >
      {({ data }) => {
        if (!data) {
          return;
        }

        return <MarketSearchComponent {...props} data={data} />;
      }}
    </MarketSearchQuery>
  );
}

export { MarketSearch };