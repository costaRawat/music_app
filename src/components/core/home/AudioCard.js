import React, { useEffect, useRef, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
// temp
// temp
const AudioCard = ({ mediaData, setMediaData }) => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const audioRefs = useRef({});
  const deleteHandler = (id) => {
    let temp = mediaData.filter((a) => a.id !== id);
    setMediaData(temp);
  };
  const playAudio = (audioUrl) => {
    if (playingAudio) {
      playingAudio.pause();
    }
    const audio = audioRefs.current[audioUrl];
    if (audio) {
      audio.play();
      setPlayingAudio(audio);
    }
  };
  const pauseAudio = () => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
  };
  // temp

  // Make sure to import the necessary functions from the 'firebase/firestore' module.

  const usersCollectionRef = collection(db, "audio");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data, "i am data");
    };
    getUsers();
  }, []);

  return (
    <>
      {" "}
      {mediaData?.map((data) => (
        <div
          key={data.id}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <div>
            <img
              src={data.imgFile}
              alt="albumImg"
              style={{ borderRadius: "8px", width: "100%" }}
            />
          </div>
          <Typography className="white__color__typo__500 truncate" variant="h6">
            {data.name}
          </Typography>
          <Box display="flex" justifyContent="center">
            {playingAudio === audioRefs.current[data.audio] ? (
              <PauseCircleIcon
                className="cursor__pointer"
                sx={{ color: "white", fontSize: "2rem" }}
                onClick={pauseAudio}
              />
            ) : (
              <PlayCircleIcon
                className="cursor__pointer"
                sx={{ color: "white", fontSize: "2rem" }}
                onClick={() => playAudio(data.audio)}
              />
            )}
            <audio
              ref={(ref) => (audioRefs.current[data.audio] = ref)}
              src={data.audio}
            />
          </Box>
          <DeleteIcon
            className="cursor__pointer"
            onClick={() => deleteHandler(data.id)}
            sx={{
              position: "absolute",
              color: "red",
              fontSize: "2rem",
              top: "5px",
              right: "3px",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default AudioCard;
