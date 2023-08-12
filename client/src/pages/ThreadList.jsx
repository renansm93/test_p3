import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [topicName, setTopicName] = useState('');

  const { topicId } = useParams(); // Capture the dynamic segment of the URL
  
  useEffect(() => {
    const fetchThreadsAndTopic = async () => {
      try {
        const threadsResponse = await axios.get(`http://localhost:3000/api/threads/topic/${topicId}`);
        setThreads(threadsResponse.data);
        
        const topicResponse = await axios.get(`http://localhost:3000/topics/${topicId}`);
        setTopicName(topicResponse.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchThreadsAndTopic();
  }, [topicId]);


  const handleAddThread = (event) => {
    event.preventDefault();

    const newThread = {
        title: title,
        userId: userId,
        topic: topicId
    };

    // Use axios to post the newThread to your server
    axios.post(`http://localhost:3000/api/threads/create`, newThread)
        .then(response => {
            // If you receive the newly created thread with an ID or additional data from the server, you can update the local state with that data here
            console.log("Thread successfully added!");
            setThreads(prevThreads => [...prevThreads, response.data.thread]);
            setTitle('');  
            setUserId(''); 
        })
        .catch(error => {
            console.error("Error adding thread:", error);
            alert("There was an error adding the thread. Please try again.");
        });
};

return (
  <div>
      
    <h2>Threads for {topicName}</h2>
      

    <form onSubmit={handleAddThread}>
      <div>
        <label>Title: </label>
          <input
            type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
      </div>
        
      <div>
        <label>User ID: </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            />
      </div>

      <div>
        <button type="submit">Add Thread</button>
      </div>       

    </form> 


    {threads.map((thread, index) => (
      <div style={{display:"inline-block"}} key={index}>
        
      
        <div><Link to={`/threads/${thread._id}`}>{thread.title}</Link></div>
        <div>Created by: {thread.userId}</div>

      </div>
      ))}              
           
  </div>

  );
};

export default ThreadList;
