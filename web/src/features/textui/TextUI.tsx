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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#e6e6e6',
    fontFamily: 'Roboto',
    borderRadius: theme.radius.sm,
  },
  letterBox: {
    fontSize: 18,
    color: '#e6e6e6',
    fontWeight: 800,
    padding: '10px 20px 10px 20px',
    margin: 8,
    borderRadius: theme.radius.sm,
    border: '1px solid rgba(0, 255, 255, 0.6)',
    background: 'radial-gradient(31.98% 56.85% at 50% 50%, rgba(12, 13, 18, 0.96) 0%, rgba(14, 15, 19, 0.96) 100%)',
    boxShadow: 'inset 0px 0px 25px rgba(0, 255, 255, 0.4), 0px 0px 5px rgba(0, 255, 255, 0.6)',
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
    if (!data.position) data.position = 'right-center'; // Default right position
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Group spacing={0}>
            <Box style={data.style} mr="xs" className={classes.letterBox}>
              <Text>
                {data.letter}
              </Text>
            </Box>
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
