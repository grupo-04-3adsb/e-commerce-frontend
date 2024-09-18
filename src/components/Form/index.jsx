import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import style from "./Form.module.css";
import { CgClose } from "react-icons/cg";
import useGenericForm from "./hook/useGenericForm";
import { useEffect, useState } from "react";

const FormComponent = ({
  visible,
  onClose,
  title,
  fields,
  submitLabel,
  onSubmit,
  isSocialLogin,
  error,
  register,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const { formData, handleInputChange, handleSubmit } = useGenericForm(
    {},
    onSubmit
  );

  return (
    isVisible && (
      <div className={style.container}>
        <div className={style.content}>
          <Button
            className={style.btnIcon}
            size="sm"
            color="white"
            variant="bordered"
            isIconOnly
            endContent={<CgClose />}
            onPress={() => {
              setIsVisible(false);
              onClose();
            }}
          />
          <form onSubmit={handleSubmit}>
            <h1>{title}</h1>
            {fields.map((fieldRow, rowIndex) => (
              <div key={rowIndex} className={style.row}>
                {fieldRow.map((field, index) =>
                  field.type === "select" ? (
                    <Select
                      key={index}
                      size="lg"
                      placeholder={field.label}
                      fullWidth={field.fullWidth}
                      variant="bordered"
                      isRequired={field.isRequired}
                      {...register(field.name)}
                      onSelect={handleInputChange}
                      isInvalid={error && error[field.name]}
                      errorMessage={
                        error && error[field.name]
                          ? error[field.name].message
                          : null
                      }
                    >
                      {field.options.map((option) => (
                        <SelectItem key={option.key} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      key={index}
                      size="sm"
                      type={field.type}
                      variant="bordered"
                      label={field.label}
                      name={field.name}
                      {...register(field.name)}
                      onChange={handleInputChange}
                      fullWidth={field.fullWidth}
                      isRequired={field.isRequired}
                      isInvalid={error && error[field.name]}
                      errorMessage={
                        error && error[field.name]
                          ? error[field.name].message
                          : null
                      }
                    />
                  )
                )}
              </div>
            ))}
            <Button
              fullWidth
              variant="flat"
              type="submit"
              className={style.btnAction}
            >
              {submitLabel}
            </Button>
          </form>
        </div>
      </div>
    )
  );
};

export default FormComponent;
