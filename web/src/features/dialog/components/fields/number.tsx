import { NumberInput } from '@mantine/core';
import { INumber } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: INumber;
  index: number;
  control: Control<FormValues>;
}

const NumberField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default,
    rules: { required: props.row.required, min: props.row.min, max: props.row.max },
  });

  return (
    <NumberInput
      value={controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={controller.field.onChange}
      label={props.row.label}
      description={props.row.description}
      defaultValue={props.row.default}
      min={props.row.min}
      max={props.row.max}
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
      step={props.row.step}
      precision={props.row.precision}
      disabled={props.row.disabled}
      icon={props.row.icon && <LibIcon style={{ color: '#e6e6e6' }} icon={props.row.icon} fixedWidth />}
      withAsterisk={props.row.required}
    />
  );
};

export default NumberField;
