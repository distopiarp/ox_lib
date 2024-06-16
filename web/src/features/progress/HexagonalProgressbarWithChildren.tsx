import * as React from 'react';

import HexagonalProgressbar, { HexagonalProgressbarProps } from './HexagonalProgressbar';

type HexagonalProgressbarWithChildrenProps = HexagonalProgressbarProps & {
  children?: React.ReactNode;
};

function HexagonalProgressbarWithChildren(props: HexagonalProgressbarWithChildrenProps) {
  const { children, ...hexagonalProgressbarProps } = props;

  return (
    <div data-test-id="HexagonalProgressbarWithChildren">
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <HexagonalProgressbar {...hexagonalProgressbarProps} />
        {props.children ? (
          <div
            data-test-id="HexagonalProgressbarWithChildren__children"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {props.children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HexagonalProgressbarWithChildren;
