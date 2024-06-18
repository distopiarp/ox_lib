import { createStyles, PasswordInput, TextInput } from '@mantine/core';
import React from 'react';
import { IInput } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: IInput;
  index: number;
}

const useStyles = createStyles((theme) => ({
  eyeIcon: {
    color: theme.colors.dark[2],
  },
}));

const InputField: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <>
      {!props.row.password ? (
        <TextInput
          {...props.register}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          styles={{
            label: {
              color: '#e6e6e6',
              textShadow: '0px 0px 2px rgba(0,0,0,0.2)',
            },
            description: { 
              color: 'rgba(192, 192, 192, 1)',
            },
            input: {
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 20%, rgba(77,79,87,0.15) 100%)',
              border: `2px solid rgba(152, 156, 161, 0.5)`,
              color: '#e6e6e6',
              '&:focus': {
                border: `2px solid rgba(0, 255, 255, 0.5)`,
              },
              '&:active': {
                border: `2px solid rgba(0, 255, 255, 0.5)`,
              }
            },
          }}
        />
      ) : (
        <PasswordInput
          {...props.register}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          styles={{
            label: {
              color: '#e6e6e6',
              textShadow: '0px 0px 2px rgba(0,0,0,0.2)',
            },
            description: { 
              color: 'rgba(192, 192, 192, 1)',
            },
            icon: {
              color: 'rgba(192, 192, 192, 0.8)'
            },
            input: {
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 20%, rgba(77,79,87,0.15) 100%)',
              border: `2px solid rgba(152, 156, 161, 0.5)`,
              color: '#e6e6e6',
            },
          }}
          visibilityToggleIcon={({ reveal, size }) => (
            <LibIcon
              icon={reveal ? 'eye-slash' : 'eye'}
              fontSize={size}
              style={{ color: '#e6e6e6' }}
              cursor="pointer"
              className={classes.eyeIcon}
              fixedWidth
            />
          )}
        />
      )}
    </>
  );
};

export default InputField;
