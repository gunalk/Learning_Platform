import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export const FormControls = ({formControls=[], formData, setFormData }) => {
  const renderComponentByType = (getControlItem) => {
   
    const value=formData[getControlItem.name] || ""

    switch (getControlItem.componentType) {
      case "input":
        return(
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(
              e
            )=>{
              setFormData((prev)=>({
                ...prev,
              [getControlItem.name]:e.target.value
              }))
            }}
          />
        );
     
      case "select":
        return (
          <Select 
          onValueChange={(value)=>{
            setFormData((prev)=>({
              ...prev,
              [getControlItem.name]:value
              
            }))
            value={value}
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        
      case "textarea":
        return(
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={(
              e
            )=>{
              setFormData((prev)=>({
                ...prev,
              [getControlItem.name]:e.target.value
              }))
            }}
          />
        );
     

      default:
        return (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(
              e
            )=>{
              setFormData((prev)=>({
                ...prev,
              [getControlItem.name]:e.target.value
              }))
            }}
          />
        );
      
    }

  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label htmlFor={controlItem?.name}>{controlItem.label}</Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
};
