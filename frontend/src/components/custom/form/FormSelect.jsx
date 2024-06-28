import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FormSelect({
  registerName,
  label,
  placeholder,
  errors,
  selectValues,
  onChange,
  registerRest,
  getValues,
}) {
  return (
    <div className="space-y-2 mb-7">
      <Label className={`${errors[registerName] && "text-red-700"}`}>
        {label}
      </Label>
      <Select
        defaultValue={getValues(registerName)}
        onValueChange={(value) => {
          onChange({ target: { name: registerName, value } })
        }}
        {...registerRest}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{placeholder}</SelectLabel>
            {selectValues.map((selectValue, index) => (
              <SelectItem key={index} value={selectValue.value}>
                {selectValue.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
