import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import style from "./Form.module.css";
import { CgClose } from "react-icons/cg";
import MessageGeneric from "../Message";
import useGoogle from "../../hooks/useGoogle";
import { PatternFormat } from "react-number-format";

const FormComponent = ({
  visible,
  onClose,
  title,
  fields,
  submitLabel,
  onSubmit,
  error,
  apiMessage,
  defaultValues = {},
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState("success");
  const [formData, setFormData] = useState(defaultValues);
  const { googleError, googleData } = useGoogle();

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      const intervalId = setInterval(() => {
        const buttonDiv = document.getElementById("buttonDiv");
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            type: "standard",
            shape: "rectangular",
            theme: "filled_black",
            text: "continue_with",
            size: "large",
            locale: "pt-BR",
            logo_alignment: "left",
          });
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [visible]);

  useEffect(() => {
    const isFormDataDifferent = Object.keys(defaultValues).some(
      (key) => formData[key] !== defaultValues[key]
    );

    if (isFormDataDifferent) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (apiMessage?.error || apiMessage?.success) {
      setMessageVisible(true);
      setMessageType(apiMessage.error ? "error" : "success");
    } else {
      setMessageVisible(false);
    }
  }, [apiMessage]);

  const handleClose = () => {
    setMessageVisible(false);
  };

  const handleChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
          {(apiMessage.error || apiMessage.success) && (
            <MessageGeneric
              type={messageType}
              message={apiMessage.error || apiMessage.success}
              onClose={handleClose}
              isVisible={messageVisible}
            />
          )}
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
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      isInvalid={error && error[field.name]}
                      errorMessage={
                        error && error[field.name]
                          ? error[field.name]._errors[0]
                          : null
                      }
                    >
                      {field.options.map((option) => (
                        <SelectItem key={option.key} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : !field.mask ? (
                    <Input
                      key={index}
                      size="sm"
                      type={field.type}
                      variant="bordered"
                      label={field.label}
                      name={field.name}
                      value={formData[field.name] || defaultValues[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      fullWidth={field.fullWidth}
                      isRequired={field.isRequired}
                      isInvalid={error && error[field.name]}
                      errorMessage={
                        error && error[field.name]
                          ? error[field.name]._errors[0]
                          : null
                      }
                    />
                  ) : (
                    <PatternFormat
                      key={index}
                      format={field.mask}
                      placeholder={field.mask.replaceAll("#", "0")}
                      value={formData[field.name] || defaultValues[field.name]}
                      onValueChange={({ value }) =>
                        handleChange(field.name, value)
                      }
                      customInput={Input}
                      size="sm"
                      type={field.type}
                      variant="bordered"
                      label={field.label}
                      fullWidth={field.fullWidth}
                      isRequired={field.isRequired}
                      isInvalid={error && error[field.name]}
                      errorMessage={
                        error && error[field.name]
                          ? error[field.name]._errors[0]
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
            <div id="buttonDiv"></div>
          </form>
        </div>
      </div>
    )
  );
};

export default FormComponent;
