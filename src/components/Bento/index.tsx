import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import { NominateBox } from '~components/Bento/treatments/NominateBox';

const Bento: React.FC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row">
      <NominateBox />
    </div>
    <div className="Trail__row Trail__row--111">
      <BentoBoxImpulse link="/sport-societies-media/discover" color="blue">
        Discover student groups
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/whats-on" color="green">
        See what's on
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/book-market" color="yellow">
        Buy and sell books in the Book Market
      </BentoBoxImpulse>
    </div>
  </div>
);

export { Bento };
