import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ErrorMessage from "../ErrorMessage"

export default function FormInput({
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
      <Input
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
