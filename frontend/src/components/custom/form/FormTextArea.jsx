import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import React from "react"
import ErrorMessage from "../ErrorMessage"

export default function FormTextArea({
  id,
  registerName,
  label,
  placeholder,
  register,
  validation = {},
  errors,
  ...restProps
}) {
  return (
    <div className="space-y-2 mb-7">
      <Label
        htmlFor={id}
        className={`${errors[registerName] && "text-red-700"}`}
      >
        {label}
      </Label>
      <Textarea
        id={id}
        {...register(registerName, {
          ...validation,
        })}
        placeholder={placeholder}
        {...restProps}
      />
      {errors[registerName] && (
        <ErrorMessage message={errors[registerName].message} />
      )}
    </div>
  )
}
