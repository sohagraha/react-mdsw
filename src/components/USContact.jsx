import axios from "axios";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import DetailsContact from "./DetailsContact";

const AllContacts = () => {
  const [next, setNext] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isEven, setIsEven] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleEvenOdd = () => {
    if (isEven) {
      setFilteredData(data.filter((item) => item.id % 2 === 0));
    } else {
      setFilteredData(data);
    }
  };

  const updateURL = () => {
    let url = `https://contact.mediusware.com/api/country-contacts/United States/?page=${page}`;
    if (searchText) {
      url = `https://contact.mediusware.com/api/country-contacts/United States/?search=${searchText}&page=${page}`;
    }
    return url;
  };

  const fetchData = (e) => {
    let url = updateURL();
    axios.get(url).then((res) => {
      if (page === 1) {
        setData(res?.data?.results);
        setFilteredData(res?.data?.results);
        setNext(res?.data?.next);
      } else {
        setData((prev) => [...prev, ...res?.data?.results]);
        setFilteredData((prev) => [...prev, ...res?.data?.results]);
        setNext(res?.data?.next);
      }
    });
  };

  const modalClose = () => {
    setIsEven(false);
    navigate("/problem-2");
  };

  const debouncedSearch = debounce((searchQuery) => {
    setSearchText(searchQuery);
    setPage(1);
  }, 500);

  useEffect(() => {
    fetchData(searchText);
  }, [searchText, page]);

  useEffect(() => {
    handleEvenOdd();
  }, [isEven, data]);

  return (
    <div>
      <Modal show={true} onHide={() => modalClose()} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body id="scrollableDiv">
          {/* search box  */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => {
                debouncedSearch(e.target.value);
              }}
            />
          </div>
          <InfiniteScroll
            dataLength={filteredData.length}
            next={() => {
              setPage(page + 1);
            }}
            hasMore={next ? true : false}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Country</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.id}</td>
                      <td>{item?.country?.name}</td>
                      <td>{item?.phone}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShow(true);
                            setRowData(item);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {next === null && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No more data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          {/* checkbox  */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isEven}
              onChange={(e) => {
                setIsEven(!isEven);
              }}
            />
            <label className="form-check-label">Only Even</label>
          </div>
          <button className="btn btn-danger" onClick={() => modalClose()}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <DetailsContact data={rowData} show={show} setShow={setShow} />
    </div>
  );
};

export default AllContacts;
