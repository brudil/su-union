import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import { HighlightTextBox } from '~components/Bento/treatments/HighlightTextBox';

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row Trail__row--21 Bento__main-row">
      <HighlightTextBox
        link="/elections/"
        imageUrl="original_images/139bfa28e2bd466ba9a92f18f1ee0e4c"
        heading="Stand for election "
      />
      <HighlightTextBox
        link="/news/article/ussu/make-a-difference-in-2018/"
        imageUrl="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
        heading="Submit an idea for referendum"
      />
    </div>
    <div className="Trail__row Trail__row--111">
      <BentoBoxImpulse link="/whats-on" color="blue">
        See what's on
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/sport-societies-media/discover" color="green">
        Discover student groups
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/outlets" color="yellow">
        Explore our shops and bars
      </BentoBoxImpulse>
    </div>
  </div>
);

export { Bento };
