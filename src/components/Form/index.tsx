import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEventHandler, FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: FormEventHandler<HTMLFormElement>;
  schema: any;
  defaultValues?: object;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  schema,
  defaultValues = {},
  children,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {},
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
