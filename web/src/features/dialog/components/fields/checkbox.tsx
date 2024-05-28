import { Checkbox } from '@mantine/core';
import { ICheckbox } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const CheckboxField: React.FC<Props> = (props) => {
  return (
    <Checkbox
      {...props.register}
      sx={{ display: 'flex' }}
      required={props.row.required}
      label={props.row.label}
      defaultChecked={props.row.checked}
      disabled={props.row.disabled}
      styles={{
        label: {
          color: '#e6e6e6',
          textShadow: '0px 0px 2px rgba(0,0,0,0.2)',
        },
        description: { 
          color: 'rgba(192, 192, 192, 1)',
        },
        input: {
          background: 'transparent',
          border: `2px solid rgba(152, 156, 161, 0.5)`,
          color: '#e6e6e6',

          '&:checked': {
            background: 'rgba(0, 255, 255, 1)',
            border: 0,
            boxShadow: 'inset 0px 0px 15px rgba(0, 0, 0, 0.4)',
          }
        },
      }}
    />
  );
};

export default CheckboxField;
