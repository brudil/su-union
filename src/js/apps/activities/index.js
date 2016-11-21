import React from 'react';
import ReactDOM from 'react-dom';
import Fuse from 'fuse.js';
import { forceCheck } from 'react-lazyload';
import ActivitiesParser from './parse';
import OrgansiationGrid from '../../components/OrgansiationGrid';

const acitvitiesParser = new ActivitiesParser(document.querySelector('.msl_organisation_list'));
const organsiationMap = acitvitiesParser.getOrgMap();
const listOfOrgIds = acitvitiesParser.getAllOrgIds();
const listOfOrgs = acitvitiesParser.getAllOrgs();

const fuse = new Fuse(listOfOrgs, { keys: ['name'], id: 'id' });

class ActivitiesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null,
      searchValue: '',
      displayIds: listOfOrgIds,
    };

    this.onSearchUpdate = this.onSearchUpdate.bind(this);
  }

  onSearchUpdate(e) {
    const searchValue = e.target.value;
    this.setState({ searchValue, displayIds: searchValue ? fuse.search(searchValue) : listOfOrgIds }, () => {
      forceCheck();
    });
  }

  render() {
    const map = this.props.organsiationMap;

    const { searchValue, displayIds } = this.state;
    return (
      <div className="ActivitiesApp__">
        <div className="ActivitiesApp__header">
          <h1>Find sports and societies</h1>
          <input
            className="ActivitiesApp__searchInput"
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={this.onSearchUpdate}
          />
          <div className="ActivitiesApp__filterStat">Displaying {displayIds.length} clubs & societies</div>
        </div>
        <div className="ActivitiesApp__main">
          <aside className="ActivitiesApp__sidebar">
            <ul>
              <li />
            </ul>
          </aside>
          <div className="ActivitiesApp__grid">
            <OrgansiationGrid organsiations={displayIds.map(id => map[id])} />
          </div>
        </div>
      </div>
    );
  }
}

ActivitiesApp.propTypes = {
  organsiationMap: React.PropTypes.shape({}),
};

ReactDOM.render(<ActivitiesApp organsiationMap={organsiationMap} />, document.querySelector('.app__activities'));
