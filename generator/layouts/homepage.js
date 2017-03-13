import React from 'react';
import FigureCollection from '../components/FigureCollection';
import FigureCollectionFigure from '../components/FigureCollectionFigure';
import HomepageEventsList from '../components/HomepageEventsList';

const Homepage = () => (
  <div>
    <div className="Trail">
      <div className="Trail__row">
        <a className="FlexibleHero FlexibleHero--oww FlexibleHero--link" style={{ backgroundColor: '#120e1c' }} href="/oww">
          <div className="FlexibleHero__content">
            <h1 className="FlexibleHero__title">One World Week 2017</h1>
            <h2 className="FlexibleHero__sub">13th - 17th March</h2>
          </div>
          <div className="FlexibleHero__bgImage-container">
            <div style={{ backgroundImage: 'url(/pageassets/oww-center.jpg)' }} />
          </div>
        </a>
      </div>
      <div className="Trail__row Trail__row--211">
        <div className="ContentBlock">
          <div className="ContentBlock__heading">News</div>
          <div className="u-h">
            {'{unionnewslist}'}
          </div>
          <div className="app__news" />
          <a className="NewsViewMore" href="/news">Read more news stories</a>
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">{'What\'s on'}</div>
          <HomepageEventsList />
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">Twitter</div>
          <div className="app__tweets" />
        </div>
      </div>

      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your officers</div>
        <FigureCollection>
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Adele(1).jpg"
            title="Adèle Duvillier"
            sub="Activities Officer"
            link="/about-us/full-time-elected-officers/activities"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Sarah-bw.jpg"
            title="Sarah Gibbons"
            sub="Society and Citizenship Officer"
            link="/about-us/full-time-elected-officers/society-citizenship"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg"
            title="Savannah Sevenzo"
            sub="Undergraduate Education Officer"
            link="/about-us/full-time-elected-officers/undergraduate-education"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Rose-bw.jpg"
            title="Rose Taylor"
            sub="Postgraduate Education Officer"
            link="/about-us/full-time-elected-officers/postgraduate-education"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Annie-bw.jpg"
            title="Annie Pickering"
            sub="President"
            link="/about-us/full-time-elected-officers/president"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/on-white.jpg"
            title="Grainne Gahan"
            sub="Welfare Officer"
            link="/about-us/full-time-elected-officers/welfare"
          />
        </FigureCollection>
      </div>
    </div>
  </div>
);

export default Homepage;
