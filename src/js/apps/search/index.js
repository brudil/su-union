import 'es6-shim';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';

import SearchResult from '../../components/SearchResult';
import FeedbackButton from '../../components/FeedbackButton';
import PaginationNavigation from '../../components/PaginationNavigation';

/* eslint-disable */

const SEARCH_AREAS = {
  EVERYTHING: 'a',
  SOCSPORT: 's',
  EVENTS: 'e',
};

const fields = 'items(cacheId,image,kind,labels,link,mime,pagemap,snippet,title),spelling,url,searchInformation';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    this.handleAreaUpdate = this.handleAreaUpdate.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleNotFoundDesiredPage = this.handleNotFoundDesiredPage.bind(this);

    this.state = {
      query: qs.parse(location.search).q || '',
      page: parseInt(qs.parse(location.search).page, 10) || 1,
      searchArea: SEARCH_AREAS.EVERYTHING,
      results: null,
      isLoading: null,
    };
  }

  componentWillMount() {
    if (this.state.query) {
      this.loadQueryResults();
    }
  }

  onEmptyResults() {
    // eslint-disable-next-line no-undef
    ga('send', 'event', 'Search', 'emptyresults', this.state.query);
  }

  loadQueryResults() {
    const { query, page } = this.state;
    this.setState({ isLoading: true })
    window
      .fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&num=10&start=${((page - 1) * 10) + 1}&cx=012345016055136658152%3Aaszn2y43suc&key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&fields=${fields}`)
      .then(res => res.json())
      .then(payload => {
        if (query === this.state.query) {
          this.setState({ results: payload, isLoading: false })
          console.log(this.state);
        }
      });
  }

  handleNotFoundDesiredPage() {
    // eslint-disable-next-line no-undef
    ga('send', 'event', 'Search', 'nothappy', this.state.query);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ page: 1 }, () => this.handleUpdate());
  }

  handleUpdate() {
    this.loadQueryResults();
    const search = qs.parse(location.search);
    search.q = this.state.query;
    search.page = this.state.page;
    window.history.replaceState({}, '', `${location.pathname}?${qs.stringify(search)}`);
    // eslint-disable-next-line no-undef
    ga('set', 'page', location.pathname + location.search);
    // eslint-disable-next-line no-undef
    ga('send', 'pageview');
  }

  handleQueryUpdate(e) {
    this.setState({ query: e.target.value });
  }

  handleAreaUpdate(e) {
    this.setState({ searchArea: e.target.value });
  }

  handlePageChange(nextNumber) {
    this.setState({ page: nextNumber }, () => this.handleUpdate());
    this.containerRef.scrollIntoView(true);
  }

  handleMoveToContainerTop() {
    this.containerRef.scrollIntoView(true);
  }

  renderResults() {
    const { results, isLoading, query, searchArea, page } = this.state;

    const loadingElement = (
      <div className={`${styles.resultsMessage} ${isLoading ? styles.resultsMessage_visible : null}`}>
        Loading…
      </div>
    );

    if (!results) {
      return (
        <div className={containerclassNamees}>
          {loadingElement}
        </div>
      );
    }

    const { items} = results;

    const containerclassNamees = `${isLoading === true ? styles.container_loading : styles.container}`;

    return (
      <div className={containerclassNamees}>
        {loadingElement}
        <ul className={styles.resultsList}>
          {items && items.map(item => ((
            <SearchResult key={item.cacheId} item={item} />
          )))}
          {!items ? (<li>No results found.</li>) : null}
        </ul>
        {results.searchInformation && <PaginationNavigation
          currentPage={page}
          totalPages={Math.ceil(results.searchInformation.totalResults / 10)}
          onPageChange={this.handlePageChange}
        />}
        <FeedbackButton
          buttonText="Haven't found what you were looking for?"
          givenText="Sorry you couldn't find what you were looking for. Thank you for the feedback, we are alway wanting to improve our site."
          feedbackKey={`${query}:${searchArea}`}
          onFeedback={this.handleNotFoundDesiredPage}
        />
      </div>
    );
  }

  render() {
    const { query, searchArea } = this.state;

    return (
      <div ref={(ref) => { this.containerRef = ref; }}>
        <form onSubmit={this.handleSearch}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Search</h1>

            <input
              className={styles.searchInput}
              type="search"
              name="q"
              value={this.state.query}
              onChange={this.handleQueryUpdate}
              placeholder="badminton, refreshers, etc"
              autoFocus
            />
          </div>
        </form>
        <div>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

export default (element) => {
  ReactDOM.render(<SearchPage />, element);
};

/*            <span className={styles.for}>for</span>
            <fieldset className={styles.fieldset}>
              <label className={styles.radioItem} htmlFor="everythingOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="everythingOption" name="searchArea" value={SEARCH_AREAS.EVERYTHING} checked={searchArea == SEARCH_AREAS.EVERYTHING} />
                everything
              </label>

              <label className={styles.radioItem} htmlFor="socsportsOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="socsportsOption" name="searchArea" value={SEARCH_AREAS.SOCSPORT} checked={searchArea == SEARCH_AREAS.SOCSPORT} />
                societies & sports
              </label>
              <label className={styles.radioItem} htmlFor="eventsOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="eventsOption" name="searchArea" value={SEARCH_AREAS.EVENTS} checked={searchArea == SEARCH_AREAS.EVENTS} />
                events
              </label>
            </fieldset>
*/
