import React, { useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'email' | 'password';
  register: UseFormRegister<T>;
  errors: FieldError | undefined;
  options?: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  showPasswordToggle?: boolean;
  disabled?: boolean;
}

export const FormField = <T extends FieldValues>({
  id,
  label,
  placeholder,
  type = 'text',
  register,
  errors,
  options,
  defaultValue,
  onChange,
  showPasswordToggle = false,
  disabled = false,
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <FormControl id={id as string} sx={{ mb: 'sm' }} isInvalid={!!errors}>
      <FormLabel>{label}</FormLabel>
      {options ? (
        <Select
          {...register(id)}
          defaultValue={defaultValue}
          onChange={handleChange}
          placeholder={placeholder}
          isDisabled={disabled}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      ) : type === 'password' && showPasswordToggle ? (
        <InputGroup>
          <Input
            {...register(id)}
            type={showPassword ? 'text' : 'password'}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={handleChange}
            isDisabled={disabled}
          />
          <InputRightElement
            sx={{
              mr: '3xs',
            }}
          >
            <IconButton
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={togglePasswordVisibility}
              sx={{ ml: 'xs' }}
              variant="unstyled"
              isDisabled={disabled}
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          {...register(id)}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          isDisabled={disabled}
        />
      )}
      <FormErrorMessage>{errors ? errors.message : null}</FormErrorMessage>
    </FormControl>
  );
};
