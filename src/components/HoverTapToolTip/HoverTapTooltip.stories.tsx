import React from 'react';
import { storiesOf } from '@storybook/react';
import {HoverTapTooltip} from "~components/HoverTapToolTip/index";

storiesOf('HoverTapTooltip', module).add('default', () => (
  <div>
    <h1>Tooltip demo</h1>

    <HoverTapTooltip content={() => <span>This is a tooltip</span>}>
      {({ handleOpen, handleClose }) => <button className="Button" onMouseLeave={handleClose} onMouseEnter={handleOpen}>An amazing button</button>}
    </HoverTapTooltip>
  </div>
));