"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      {/* @ts-ignore */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          {/* @ts-ignore */}
          <Image src={selectedTemplate?.icon || ''} width={40} height={40} alt="icon" />
        </div>
        <div>
          <h2 className="font-bold text-xl text-gray-900">
            {selectedTemplate?.name}
          </h2>
          <p className="text-gray-600 text-sm">{selectedTemplate?.desc}</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {item.label}
              {item?.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {item.field == "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                placeholder={item?.placeholder}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            ) : item.field == "textarea" ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                placeholder={item?.placeholder}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              />
            ) : item.field == "select" ? (
              <select
                name={item.name}
                required={item?.required}
                onChange={(e) => handleSelectChange(item.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an option...</option>
                {item?.options?.map((option: string, optIndex: number) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <Button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate Content"
          )}
        </Button>
      </form>
    </div>
  );
}

export default FormSection;
