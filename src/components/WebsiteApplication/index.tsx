import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import { History, Location } from 'history';
import BookMarketApp from "~components/bookmarket/BookMarketApp";
import EventsApplication from '~components/EventsApplication';
import * as routerActions from "../../projects/website/ducks/router";
import {connect} from 'react-redux';
import {ContentPage} from "~components/content/ContentPage";
import KnowledgeBaseApp from "~components/kb/KnowledgeBaseApplication";
import StudentGroupsDiscovery from '~components/StudentGroupsDiscovery';
import SearchApp from "~components/SearchApp";

interface WebsiteApplicationProps {
  setRouter: typeof routerActions.setRouter;
  history: History;
  location: Location;
}

const ContentAPI = (props: any) => <ContentPage path={props.location.pathname} />;


class WebsiteApplication extends React.Component<WebsiteApplicationProps> {
  componentDidMount() {
    this.props.setRouter(this.props.history, this.props.location);
  }

  componentDidUpdate() {
    this.props.setRouter(this.props.history, this.props.location);
  }

  render() {
    return (
      <Switch>
        <Route path="/book-market" component={BookMarketApp} />
        <Route path="/whats-on" component={EventsApplication as any} />
        <Route path="/kb" component={KnowledgeBaseApp} />
        <Route path="/search" component={SearchApp} />
        <Route path="/sport-societies-media/discover" component={StudentGroupsDiscovery} />
        <Route path="/freshers" component={ContentAPI} />
        <Route path="/get-involved" component={ContentAPI} exact />
        <Route path="/support" component={ContentAPI} exact />
      </Switch>
    );
  }
}


export default withRouter<any>(connect(null, {
  setRouter: routerActions.setRouter,
})(WebsiteApplication));
