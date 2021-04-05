import { useState } from "react";
import { Form, ListGroup, Accordion, Card, Button } from "react-bootstrap";
import Downshift from "downshift";
import debounce from "debounce";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function Search({ setLocation }) {
  const [autoCompleteList, setAutoCompleteList] = useState(null);
  const [cityInput, setCityInput] = useState(null);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")));
  const fetchAutoComplete = value => {
    if (value) {
      fetch(`/api/autocomplete/${value}`)
        .then(response => response.json())
        .then(cityData => {
          if (cityData) setAutoCompleteList(cityData);
        });
    }
  };
  const debouncedFetchAutoComlete = debounce(fetchAutoComplete, 400);
  const onChange = ({ target: { value } }) => {
    setCityInput(value);
    debouncedFetchAutoComlete(value);
  };
  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Downshift
        onChange={selection => {
          const historyStackSet = history ? [...new Set([selection, ...history])] : [...new Set([selection])];

          localStorage.setItem("location", JSON.stringify(selection));
          localStorage.setItem("history", JSON.stringify(historyStackSet));
          setLocation(selection);
          setHistory(historyStackSet);
          fetchAutoComplete(selection);
        }}
        itemToString={item => (item ? `${item.city}, ${item.state_name}` : "")}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
          selectedItem,
          getRootProps
        }) => (
          <div>
            <div style={{ display: "inline-block" }} {...getRootProps({}, { suppressRefError: true })}>
              <Form>
                <Form.Group>
                  <Form.Label {...getLabelProps()}>City</Form.Label>
                  <Form.Control
                    {...getInputProps({
                      onChange,
                      onKeyDown: event => {
                        if (event.code === "Enter") event.preventDefault();
                      },
                      input: cityInput,
                      placeholder: "Enter city"
                    })}
                  />
                </Form.Group>
              </Form>
            </div>
            <ListGroup {...getMenuProps()}>
              {isOpen && autoCompleteList
                ? autoCompleteList.map((item, index) => (
                    <ListGroup.Item
                      {...getItemProps({
                        key: String(index),
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}>
                      {`${item.city}, ${item.state_name}`}
                    </ListGroup.Item>
                  ))
                : null}
            </ListGroup>
          </div>
        )}
      </Downshift>
      {history && (
        <Accordion style={{ maxWidth: 500, margin: "0 auto", boxShadow: "5px 5px 15px 5px #000000", marginBottom: 20 }}>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                onClick={toggleOpen}
                style={{ textDecoration: "none" }}>
                {open ? <FaMinusCircle size={30} color="black" /> : <FaPlusCircle size={30} color="black" />}
                {" Recent Searches"}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {history.map((cityData, index) => (
                  <p key={String(index)} style={{ cursor: "pointer" }} onClick={() => setLocation(cityData)}>
                    {`${cityData.city}, ${cityData.state_name}`}
                  </p>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
    </>
  );
}
