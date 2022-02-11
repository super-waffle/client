import axios from 'axios';
import React, { useEffect, useState } from "react";

function Notice() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);

  const [meventSource, msetEventSource] = useState(undefined);

  let eventSource = undefined;

  useEffect(() => {
    console.log("매번 실행되는지");
    console.log("listening", listening);

    if (!listening) {
      eventSource = new EventSource("http://localhost:8080/sse/sub/29"); //구독

      //msetEventSource(new EventSource("http://localhost:8088/sse"));

      msetEventSource(eventSource);

      //Custom listener
      // eventSource.addEventListener("Progress", (event) => {
      //   const result = JSON.parse(event.data);
      //   console.log("received:", result);
      //   setData(result)
      // });

      console.log("eventSource", eventSource);

      eventSource.onopen = event => {
        console.log("connection opened");
      };

      eventSource.onmessage = event => {
        console.log("result", event.data);
        setData(old => [...old, event.data]);
        setValue(event.data);
      };

      eventSource.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      eventSource.addEventListener("connect", function (event) {
        // console.log(event.data)

        setData(old => [...old, event.data]);
        // const ddd = event.data;
        // setData(() => ({ddd}));
        // setData(event.data)
      });

      eventSource.addEventListener("MeetingVacancy", function (event) {
        // console.log(event.data)

        setData(old => [...old, event.data]);
        console.log("미팅" + event.data + " " + event.id + " " + event.name);
        // const ddd = event.data;
        // setData(() => ({ddd}));
        // setData(event.data)
      });

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  const TOKEN = localStorage.getItem('accessToken');
  const checkData = () => {
    axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            '/meetings/sse/1',
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
  };


  return (
    <div className="App">
      <button onClick={checkData}>확인</button>
      <header className="App-header">
        <div style={{ backgroundColor: "white" }}>
          Received Data
          {data.map((d, index) => (
            <span key={index}>{d}</span>
          ))}
        </div>
      </header>
      <div>value: {value}</div>
    </div>
  );
}

export default Notice;