import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import React from "react";
import "./SearchForm.css";

const SearchForm = () => {
  const [search, setSearch] = useSearchParams();

  const onSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = e.target.value;

    if (text.length === 0) {
      search.delete("q");
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set("q", text);
      setSearch(search, {
        replace: true,
      });
    }
  };
  return (
    <Form className="searchbar">
      <Form.Control
        type="search"
        placeholder="Search your product here"
        aria-label="Search"
        onChange={(e) => onSearchChange(e)}
        className="searchbar-form"
      />
    </Form>
  );
};

export default SearchForm;
