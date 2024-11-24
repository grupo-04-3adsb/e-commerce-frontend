import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Switch,
  Slider,
  Button,
} from "@nextui-org/react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import style from "./Form.module.css";
import { BiUpload } from "react-icons/bi";
import { PatternFormat } from "react-number-format";

const GenericForm = ({
  title,
  fields,
  setObject,
  error,
  defaultValues,
  clear,
  onReset
}) => {
  const [formData, setFormData] = useState(defaultValues || {}); 
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [iconSelection, setIconSelection] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    setObject(formData);
  }, [formData, setObject]);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (clear) {
      setFormData({});
      setImagePreviews({});
      onReset(); 
    }
  }, [clear, onReset]); 

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const handleIconSelection = (fieldName, index) => {
    setIconSelection((prevState) => ({
      ...prevState,
      [fieldName]: index + 1,
    }));
    handleChange(fieldName, index + 1);
  };

  const handleImageUpload = (fieldName, event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevState) => ({
      ...prevState,
      [fieldName]: previews,
    }));
    handleChange(fieldName, files);
  };

  const handleRemoveImage = (fieldName) => {
    setImagePreviews((prevState) => ({
      ...prevState,
      [fieldName]: [],
    }));
    handleChange(fieldName, null);

    document.getElementById(`inp_img_${fieldName}`).value = null;
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form>
          <h1>{title}</h1>
          {fields.map((fieldRow, rowIndex) => (
            <div key={rowIndex} className={style.row}>
              {fieldRow.map((field, index) => {
                switch (field.type) {
                  case "input":
                    return (
                      <div key={index} className={style.inputField}>
                        <Input
                          size="sm"
                          type={field.inputType || "text"}
                          variant="bordered"
                          label={field.label}
                          maxLength={field?.maxLength || 100}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          isRequired={field.isRequired}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                          description={field?.description}
                        />
                      </div>
                    );

                  case "maskedInput":
                    return (
                      <div key={index} className={style.inputField}>
                        <PatternFormat
                          key={index}
                          format={field?.mask?.format}
                          mask={field?.mask?.mask}
                          placeholder={field?.mask?.format.replaceAll("#", "0")}
                          value={
                            formData[field.name] || defaultValues[field.name]
                          }
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
                          description={field?.description}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                        />
                      </div>
                    );

                  case "textarea":
                    return (
                      <div key={index} className={style.inputField}>
                        <Textarea
                          label={field.label}
                          name={field.name}
                          value={formData[field.name] || ""}
                          maxLength={field?.maxLength || 200}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          variant="bordered"
                          isRequired={field.isRequired}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                          description={field?.description}
                        />
                      </div>
                    );

                  case "select":
                    return (
                      <div key={index} className={style.inputField}>
                        <Select
                          size="lg"
                          placeholder={field.label}
                          variant="bordered"
                          isRequired={field.isRequired}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
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
                      </div>
                    );

                  case "switch":
                    return (
                      <div key={index} className="flex items-center">
                        <Switch
                          checked={formData[field.name] || false}
                          onChange={(e) =>
                            handleChange(field.name, e.target.checked)
                          }
                        />
                        <label className="ml-2">{field.label}</label>
                      </div>
                    );

                  case "checkbox":
                    return (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData[field.name] || false}
                          onChange={(e) =>
                            handleChange(field.name, e.target.checked)
                          }
                        />
                        <label className="ml-2">{field.label}</label>
                      </div>
                    );

                  case "range":
                    return (
                      <div key={index} className={style.inputField}>
                        <label>{field.label}</label>
                        <Slider
                          value={
                            field.showSingleThumb
                              ? formData[field.name] || field.min
                              : formData[field.name] || [field.min, field.max]
                          }
                          onChange={(value) => handleChange(field.name, value)}
                          step={field.step || 1}
                          minValue={field.min}
                          maxValue={field.max}
                          showTooltip
                          startContent={<span>{field.min}</span>}
                          endContent={<span>{field.max}</span>}
                          color="primary"
                        />
                        <div className={style.rangeValue}>
                          {field.showSingleThumb ? (
                            <span>
                              {field.valueLabel}:{" "}
                              {formData[field.name] || field.min}
                            </span>
                          ) : (
                            <span>
                              {field.valueLabel}:{" "}
                              {formData[field.name]
                                ? `${formData[field.name][0]} - ${
                                    formData[field.name][1]
                                  }`
                                : `${field.min} - ${field.max}`}
                            </span>
                          )}
                        </div>
                      </div>
                    );

                  case "password":
                    return (
                      <div key={index} className={style.inputField}>
                        <Input
                          size="sm"
                          type={
                            passwordVisibility[field.name] ? "text" : "password"
                          }
                          variant="bordered"
                          label={field.label}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          isRequired={field.isRequired}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility(field.name)
                              }
                              aria-label="toggle password visibility"
                            >
                              {passwordVisibility[field.name] ? (
                                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                        />
                      </div>
                    );

                  case "date":
                    return (
                      <div key={index} className={style.inputField}>
                        <Input
                          size="sm"
                          type="date"
                          variant="bordered"
                          label={field.label}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          isRequired={field.isRequired}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                        />
                      </div>
                    );

                  case "color":
                    return (
                      <div key={index} className={style.inputField}>
                        <Input
                          size="sm"
                          type="color"
                          variant="bordered"
                          label={field.label}
                          name={field.name}
                          value={formData[field.name] || "#000000"}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          isRequired={field.isRequired}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                        />
                      </div>
                    );
                  case "iconSelection":
                    return (
                      <div key={index} className={style.inputField}>
                        <label>{field.label}</label>
                        <div className={style.iconSelectionContainer}>
                          {Array.from({ length: field.maxIcons }).map(
                            (_, iconIndex) => (
                              <span
                                key={iconIndex}
                                onClick={() =>
                                  handleIconSelection(field.name, iconIndex)
                                }
                                className={
                                  iconSelection[field.name] > iconIndex
                                    ? style.iconSelected
                                    : style.iconUnselected
                                }
                                style={{
                                  cursor: "pointer",
                                  opacity:
                                    iconSelection[field.name] > iconIndex
                                      ? 1
                                      : 0.4,
                                }}
                              >
                                {React.createElement(field.icon || FaStar, {
                                  size: 24,
                                })}
                              </span>
                            )
                          )}
                        </div>
                        {field.selectionLabel && (
                          <div className={style.selectionLabel}>
                            {field.selectionLabel}:{" "}
                            {iconSelection[field.name] || 0}{" "}
                            {field.unitLabel || "selecionados"}
                          </div>
                        )}
                        {error && error[field.name] && (
                          <p className={style.errorMessage}>
                            {error[field.name]._errors[0]}
                          </p>
                        )}
                      </div>
                    );

                  case "imageUpload":
                    return (
                      <div key={index} className={style.inputField}>
                        <label>{field.label}</label>
                        <div className="flex items-end mt-2 justify-between flex-wrap gap-6">
                          {!imagePreviews[field.name] ||
                          imagePreviews[field.name].length === 0 ? (
                            <div className="relative w-52 h-52 border border-dashed border-gray-300 flex items-center justify-center bg-gray-100">
                              <span className="text-gray-500 text-center">
                                Nenhuma imagem selecionada
                              </span>
                            </div>
                          ) : (
                            <div className="relative w-52 h-52 border border-gray-300">
                              <img
                                src={imagePreviews[field.name][0]}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(field.name)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                aria-label="Remover imagem"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          )}
                          <div className=" flex flex-col">
                            <input
                              type="file"
                              accept="image/*"
                              multiple={field.maxImages > 1}
                              onChange={(e) => handleImageUpload(field.name, e)}
                              required={field.isRequired}
                              className="hidden"
                              id={`inp_img_${field.name}`}
                            />
                            <Button
                              startContent={<BiUpload />}
                              onClick={() =>
                                document
                                  .getElementById(`inp_img_${field.name}`)
                                  .click()
                              }
                              variant="solid"
                              color="primary"
                              fullWidth={true}
                            >
                              Fazer Upload da imagem
                            </Button>
                          </div>
                        </div>
                        {error && error[field.name] && (
                          <p className={style.errorMessage}>
                            {error[field.name]._errors[0]}
                          </p>
                        )}
                      </div>
                    );
                  case "number":
                    return (
                      <div key={index} className={style.inputField}>
                        <Input
                          size="sm"
                          type="number"
                          variant="bordered"
                          label={field.label}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          isRequired={field.isRequired}
                          isInvalid={error && error[field.name]}
                          errorMessage={
                            error && error[field.name]
                              ? error[field.name]._errors[0]
                              : null
                          }
                          description={field?.description}
                        />
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default GenericForm;
