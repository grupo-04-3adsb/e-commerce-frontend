import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import style from "./Form.module.css";
import { CgClose } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  isSocialLogin = true,
  defaultValues = {},
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState("success");
  const [formData, setFormData] = useState(defaultValues);
  const [passwordVisibility, setPasswordVisibility] = useState({});
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

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const convertDateToInputFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);

    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return formattedDate;
  };

  return (
    isVisible && (
      <>
        {(apiMessage.error || apiMessage.success) && (
          <MessageGeneric
            type={messageType}
            message={apiMessage.error || apiMessage.success}
            onClose={handleClose}
            isVisible={messageVisible}
          />
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: title ? "10%" : "0%",
          }}
        >
          {title && <h1>{title}</h1>}
          {fields.map((fieldRow, rowIndex) => (
            <div key={rowIndex} className={style.row}>
              {fieldRow.map((field, index) =>
                field.type === "checkbox" ? (
                  <Checkbox
                    color="primary"
                    radius="md"
                    size="md"
                    name={field.name}
                    isSelected={
                      formData[field.name] || defaultValues[field.name]
                    }
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                  >
                    <h6 className="text-xs">{field?.label}</h6>
                  </Checkbox>
                ) : field.type === "select" ? (
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
                    selectedKeys={[formData[field.name] || defaultValues[field.name] || ""]}
                  >
                    {field.options.map((option) => (
                      <SelectItem key={option.key} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                ) : field.type === "textarea" ? (
                  <Textarea
                    key={index}
                    size="sm"
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
                    rows={field.rows || 20}
                  />
                ) : !field.mask ? (
                  field.type === "password" ? (
                    <div key={index} className={style.passwordContainer}>
                      <Input
                        size="sm"
                        type={
                          passwordVisibility[field.name] ? "text" : "password"
                        }
                        variant="bordered"
                        label={field.label}
                        name={field.name}
                        value={
                          formData[field.name] || defaultValues[field.name]
                        }
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        fullWidth={field.fullWidth}
                        isRequired={field.isRequired}
                        isInvalid={error && error[field.name]}
                        description={field.infoMessage}
                        errorMessage={
                          error && error[field.name]
                            ? error[field.name]._errors[0]
                            : null
                        }
                        className="max-w-xs"
                        endContent={
                          <button
                            className={style.eyeBtn}
                            type="button"
                            onClick={() => togglePasswordVisibility(field.name)}
                            aria-label="toggle password visibility"
                          >
                            {passwordVisibility[field.name] ? (
                              <FaEyeSlash className="text-1xl text-default-400" />
                            ) : (
                              <FaEye className="text-1xl text-default-400" />
                            )}
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <Input
                      key={index}
                      size="sm"
                      type={field.type}
                      variant="bordered"
                      label={field.label}
                      name={field.name}
                      value={
                        field.type === "date"
                          ? convertDateToInputFormat(
                              formData[field.name] || defaultValues[field.name]
                            )
                          : formData[field.name] || defaultValues[field.name]
                      }
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      fullWidth={field.fullWidth}
                      isRequired={field.isRequired}
                      isInvalid={error && error[field.name]}
                      description={field.infoMessage}
                      errorMessage={
                        error && error[field.name]
                          ? error[field.name]._errors[0]
                          : null
                      }
                    />
                  )
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
          {submitLabel && (
            <Button
              fullWidth
              variant="flat"
              type="submit"
              className={style.btnAction}
            >
              {submitLabel}
            </Button>
          )}
          {isSocialLogin && <div id="buttonDiv"></div>}
        </form>
      </>
    )
  );
};

export default FormComponent;
