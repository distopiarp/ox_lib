import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ContextMenuProps } from '../../../typings';
import ContextButton from './components/ContextButton';
import { fetchNui } from '../../../utils/fetchNui';
import ReactMarkdown from 'react-markdown';
import HeaderButton from './components/HeaderButton';
import ScaleFade from '../../../transitions/ScaleFade';
import MarkdownComponents from '../../../config/MarkdownComponents';
import SlideTransition from '../../../transitions/SlideTransition';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    background: 'linear-gradient(to right, rgba(133,133,133,0) 10%, rgba(133, 133, 133, 0) 30%, rgb(43, 44, 54) 100%)',
    height: '100vh',
  },
  container: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: 320,
    fontSize: 20,
    fontWeight: 400,
    height: 580,
  },
  header: {
    justifyContent: 'left',
    alignItems: 'left',
    marginBottom: 5,
    gap: 6,
    borderWidth: '3px',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 255, 255, 0.6), rgba(0, 0, 0, 0)) 0 0 100%'
  },
  titleText: {
    color: '#e6e6e6',
    padding: 6,
    textAlign: 'center',
  },
  buttonsContainer: {
    background: 'none',
    height: 560,
    overflowY: 'scroll',
  },
  buttonsFlexWrapper: {
    gap: 3,
  },
  titleContainer: {
    flex: '1 85%',
    color: '#e6e6e6',
    fontWeight: 400,
    textShadow: '1px 1px 3px rgba(60, 60, 60, 0.2)',
    fontSize: '16px'
  },
}));

const ContextMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    title: '',
    backgroundColor: '',
    background: false,
    options: { '': { description: '', metadata: [] } },
  });

  const closeContext = () => {
    if (contextMenu.canClose === false) return;
    setVisible(false);
    fetchNui('closeContext');
  };

  // Hides the context menu on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeContext();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  useNuiEvent('hideContext', () => setVisible(false));

  useNuiEvent<ContextMenuProps>('showContext', async (data) => {
    if (visible) {
      setVisible(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setContextMenu(data);
    setVisible(true);
  });

  return (
    <>
      <SlideTransition visible={visible}>
        <Box
          className={classes.background}
        />
      </SlideTransition>
      <Box className={classes.container}>
        <ScaleFade visible={visible}>
          <Flex className={classes.header}>
            {contextMenu.menu && (
              <HeaderButton icon="chevron-left" iconSize={16} handleClick={() => openMenu(contextMenu.menu)} />
            )}
            <Box className={classes.titleContainer}>
              <Text className={classes.titleText}>
                <ReactMarkdown components={MarkdownComponents}>{contextMenu.title}</ReactMarkdown>
              </Text>
            </Box>
            <HeaderButton icon="xmark" canClose={contextMenu.canClose} iconSize={18} handleClick={closeContext} />
          </Flex>
          <Box className={classes.buttonsContainer}>
            <Stack className={classes.buttonsFlexWrapper}>
              {Object.entries(contextMenu.options).map((option, index) => (
                <ContextButton option={option} key={`context-item-${index}`} />
              ))}
            </Stack>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default ContextMenu;
