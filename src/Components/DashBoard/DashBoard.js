import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import Video from "../Video/Video.js";
import getServerURL from "../../ServerURL.js";
import "./styles.css";

function DashBoard() {
  const [videos, setVideos] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [btn, setBtn] = useState({
    prev: true,
    next: true,
  });
  const [query, setQuery] = useState({
    title: "",
    description: "",
  });

  const getVideos = async () => {
    try {
      const response = await axios.post(getServerURL() + "search", {
        title: query.title.trim(),
        description: query.description.trim()==''?null:query.description.trim(),
        page,
      });
      console.log(response);
      setVideos(response.data.videos);
      setTotal(response.data.totalPages);
    } catch (error) {
      console.log(Error);
      alert("Error");
    }
  };

  useEffect(() => {
    getVideos();
  }, [page]);

  useEffect(() => {
    setBtn({
      prev: true,
      next: true,
    });
    if (page >= total - 1)
      setBtn({
        ...btn,
        next: false,
      });
    if (page == 0)
      setBtn({
        ...btn,
        prev: false,
      });
  }, [page, total]);

  return videos ? (
    <div className="outer-dashboard">
      <TextField
        label="Video Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={query.title}
        onChange={(e) => setQuery({ ...query, title: e.target.value })}
      />
      <TextField
        label="Video Description"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={query.description}
        onChange={(e) => setQuery({ ...query, description: e.target.value })}
      />
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setPage(0);
          getVideos();
        }}
      >
        Search
      </Button>
      <Video />
      {videos.map((video) => {
        if (video) return <Video key={video.videoId} details={video} />;
      })}
      <div className="navigation">
        <Button
          variant="contained"
          sx={{}}
          disabled={!btn.prev}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </Button>
        <div>Page : {page}</div>
        <Button
          variant="contained"
          sx={{}}
          disabled={!btn.next}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default DashBoard;
