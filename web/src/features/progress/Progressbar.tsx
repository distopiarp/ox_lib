import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 350,
    height: 45,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  labels: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.9rem',
    lineHeight: '4vh',
    position: 'relative',
    color: '#ffffff',
    zIndex: 10,
    fontWeight: 550,
    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))', /* Adiciona um efeito de brilho */
    bottom: '-1.2vh'
  },
  percentage: {
    fontSize: '0.8rem',
    lineHeight: '4vh',
    position: 'relative',
    color: '#ffffff',
    zIndex: 10,
    fontWeight: 550,
    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))', /* Adiciona um efeito de brilho */
    bottom: '-1.2vh'
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
              <Box className={classes.labels}>
                <Text className={classes.label}>{label}</Text>
                <Text className={classes.percentage}>{duration}</Text>
              </Box>
          </Box>
          <Box
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
              }}
            ></Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
