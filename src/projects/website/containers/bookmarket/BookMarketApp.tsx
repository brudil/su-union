import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { LoadableLoading } from '~components/LoadableLoading';
import Loadable from 'react-loadable';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar';
import { InternalAppLink } from '~components/InternalAppLink';

const LoadableMarketHome = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketHome" */ './MarketHome').then(
      (m) => m.MarketHome as any,
    ),
});

const LoadableMarketMyListings = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(
      /* webpackChunkName: "MarketMyListings" */ './MarketMyListings'
    ).then((m) => m.MarketMyListings as any),
});

const LoadableMarketSearch = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketSearch" */ './MarketSearch').then(
      (m) => m.MarketSearch as any,
    ),
});

const LoadableMarketSection = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketSection" */ './MarketSection').then(
      (m) => m.MarketSection as any,
    ),
});

const LoadableMarketBookDetail = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketBookDetail" */ './BookDetail').then(
      (m) => m.BookDetail as any,
    ),
});

const LoadableMarketCreateListing = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(
      /* webpackChunkName: "MarketCreateListing" */ './CreateListing'
    ).then((m) => m.CreateListing as any),
});

const BookMarketApplication: React.FC<{}> = () => (
  <Route
    path={`/book-market/`}
    component={() => (
      <React.Fragment>
        <Sectionbar title="Book Market">
          <SectionbarItem>
            <InternalAppLink to="/book-market">Home</InternalAppLink>
            {/*<HoverTapTooltip content={"Log in to list books"}>*/}
            {/*{({ ref, handleOpen, handleClose }) => (*/}
            {/*<InternalAppLink to="/book-market/my-listings/" onMouseOver={handleOpen} onMouseLeave={handleClose} innerRef={ref}>Your listings</InternalAppLink>*/}
            {/*)}*/}
            {/*</HoverTapTooltip>*/}
          </SectionbarItem>
        </Sectionbar>
        <div className="LokiContainer">
          <Helmet
            titleTemplate="%s | Book Market | Sussex Students' Union"
            defaultTitle="Book Market | Sussex Students' Union"
          />
          <Switch>
            <Route
              path={`/book-market/`}
              component={LoadableMarketHome}
              exact
            />
            <Route
              path={`/book-market/my-listings`}
              component={LoadableMarketMyListings as any}
            />
            <Route
              path={`/book-market/search`}
              component={LoadableMarketSearch as any}
            />
            <Route
              path={`/book-market/section/:sectionSlug`}
              component={LoadableMarketSection}
            />
            <Route
              path={`/book-market/listing/:listingId`}
              component={LoadableMarketBookDetail}
            />
            <Route
              path={`/book-market/list`}
              component={LoadableMarketCreateListing}
            />
          </Switch>
        </div>
      </React.Fragment>
    )}
  />
);

export default BookMarketApplication;
