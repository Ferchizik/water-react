// FormComponent.tsx
import React, { ChangeEvent, FormEvent } from 'react';

interface FormField {
  id: string;
  label: string;
  type: string;
  value: string | number;
  placeholder?: string;
  required?: boolean;
  step?: string;
}

interface FormComponentProps {
  formId: string;
  title: string;
  fields: FormField[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  responseMessage: string | null;
}

const FormComponent: React.FC<FormComponentProps> = ({ formId, title, fields, onSubmit, onChange, responseMessage }) => {
  return (
    <div id={formId} style={{ display: "block" }}>
      <h3>{title}</h3>
      <form id={formId + '-form'} onSubmit={onSubmit}>
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}:</label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={field.value}
              onChange={onChange}
              placeholder={field.placeholder}
              required={field.required}
              step={field.step}
            />
          </div>
        ))}
        <br />
        <button id={formId + '-button'} type="submit">Добавить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default FormComponent;
