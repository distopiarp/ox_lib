import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Group, Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems:
      params.position === 'top-center' ? 'baseline' :
        params.position === 'bottom-center' ? 'flex-end' : 'center',
    justifyContent:
      params.position === 'right-center' ? 'flex-end' :
        params.position === 'left-center' ? 'flex-start' : 'center',
  },
  container: {
    fontSize: 16,
    padding: 12,
    margin: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.4)',
    color: '#e6e6e6',
    fontFamily: 'Poppins',
    position: 'relative',
    borderRadius: theme.radius.sm,
    '&::before': {
      content: '" "',
      width: 5,
      height: 5,
      top: 4,
      left: 4,
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.9,
      backgroundColor: 'rgba(0, 255, 255, 1)',
      boxShadow: '0px 0px 6px rgba(0, 255, 255, 1)'
    }
  },
  letterContainer: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.4)',
    color: '#e6e6e6',
    fontFamily: 'Poppins',
    position: 'relative',
    borderRadius: theme.radius.sm,
  },
  letterBox: {
    fontSize: 18,
    color: '#e6e6e6',
    fontWeight: 800,
    width: 40,
    height: 40,
    padding: 0,
    textAlign: 'center',
    lineHeight: '36px',
    margin: 4,
    borderRadius: theme.radius.sm,
    opacity: 0.9,
    border: '1px solid rgba(0, 255, 255, 0.6)',
    background: 'radial-gradient(31.98% 56.85% at 50% 50%, rgba(12, 13, 18, 0.8) 0%, rgba(14, 15, 19, 0.96) 100%)',
    boxShadow: 'inset 0px 0px 25px rgba(0, 255, 255, 0.4)',
  }
}));

const TextUI: React.FC = () => {
  const [data, setData] = React.useState<TextUiProps>({
    text: '',
    letter: '',
    position: 'right-center',
  });
  const [visible, setVisible] = React.useState(false);
  const { classes } = useStyles({ position: data.position });

  useNuiEvent<TextUiProps>('textUi', (data) => {
    if (!data.position) data.position = 'bottom-center'; // Default right position

    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  let letter = <></>;
  if (data.letter) {
    letter = (<Box style={data.style} mr="xs" className={classes.letterContainer}>
      <Text className={classes.letterBox}>
        {data.letter}
      </Text>
    </Box>);
  }

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Group spacing={0}>
            {letter}
            <Box style={data.style} className={classes.container}>
              <Text >
                {data.text}
              </Text>
            </Box>
          </Group>
        </ScaleFade>
      </Box>
    </>
  );
};

export default TextUI;
