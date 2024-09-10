import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useStore from "../store/useStore"

const Chat = ({recipientName}) => {
  const { counsellorData, studentData } = useStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [registered, setRegistered] = useState(false);
  const name = studentData.did
  

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("register", name);
      setRegistered(true);
    }
  }, [socket, name]);

  const handleSendMessage = () => {
    if (message.trim() && recipientName) {
      const msg = {
        sender: name,
        content: message,
        timestamp: new Date(),
      };

      // Update the local messages state
      setMessages((prevMessages) => [...prevMessages, msg]);

      // Emit the message to the server
      socket.emit("chat message", { recipientName, message: msg });
      setMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket]);


  return (
    <div className="flex flex-col items-center p-6 bg-transparent min-h-screen text-black">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 ">
        <h2 className="text-xl font-semibold text-center">Student Chat</h2>
        <h3 className="overflow-auto">{studentData.did}</h3>

          <div>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Recipient's name"
              className="p-2 border border-gray-300 rounded-lg mt-2"
            />
            <div className="mt-4 bg-gray-50 p-3 rounded-lg h-64 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg ${msg.sender === name
                      ? "bg-green-100 text-green-900 text-right"
                      : "bg-blue-100 text-blue-900 self-end text-left"
                    }`}
                >
                  <strong>{msg.sender}</strong>: {msg.content}
                  <br />
                  <small className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="mt-4 flex"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-300 rounded-l-lg"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Chat;