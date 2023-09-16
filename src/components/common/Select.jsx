import { Input } from "@nextui-org/react";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const Select = (props) => {
  const { selectOptions, name, getValue, dropdownAction } = props;

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [filteredSelectOptions, setFilteredSelectOptions] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const handleKeyup = (e) => {};

  const handleFocus = (e) => {
    e.target.select();
    setIsFocus(true);
    setSelectedValue("");
  };

  const handleAction = () => {
    dropdownAction();
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    const filteredOptions = selectOptions.filter((item) =>
      item.text.toLowerCase().includes(query)
    );
    setFilteredSelectOptions(filteredOptions);
    setSelectedText(query);
  };

  useEffect(() => setFilteredSelectOptions(selectOptions));

  useEffect(() => {
    getValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    // handle clicks outside the select box
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsFocus(false);
        if (selectedValue == "") setSelectedText("");
      }
    };

    // Add the event listener when the dropdown is open
    if (isFocus) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocus]);
  return (
    <div className="relative">
      <input type="hidden" name={name} value={selectedValue} />
      <Input
        ref={searchRef}
        onFocus={handleFocus}
        className={`input-select ${isFocus ? "input-select-focus" : ""}`}
        type="text"
        value={selectedText}
        onChange={(e) => {
          handleSearch(e);
        }}
      />
      {isFocus && (
        <div
          ref={dropdownRef}
          className="mt-3 border-slate-200 border rounded-xl shadow-xl pt-3"
        >
          <ul className="divide-y divide-solid h-[250px] overflow-y-scroll">
              {filteredSelectOptions &&
                filteredSelectOptions.map((option) => (
                  <li
                    className="block hover:bg-slate-100 first:rounded-t-lg"
                    key={option.value}
                  >
                    <label className="block leading-7 cursor-pointer px-4 py-2 w-full">
                      <input
                        type="radio"
                        onChange={() => {
                          setSelectedValue(option.value);
                          setSelectedText(option.text);
                          setIsFocus(false);
                        }}
                        name={name}
                        className="hidden"
                        value={option.value}
                      />
                      {option.text}
                    </label>
                  </li>
                ))}
          </ul>

          <button
            className="w-full flex justify-center gap-3 px-4 py-3 border-t border-t-solid"
            onClick={handleAction}
          >
            <span className="pt-1">
              <FaPlusCircle />
            </span>
            <span className="font-bold"> Add New</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Select;
