import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        text: 'Access locker inventory',
        position: 'bottom-center',
        icon: 'door-open',
        letter: 'E'
      },
    },
  ]);
};
