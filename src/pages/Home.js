import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/common/SearchBar";
import axios from "axios";
import FormDialog from "../components/common/AddMusicDialogue";
import MediaCardSkeleton from "../components/common/MediaCardSkeleton";
import AudioCard from "../components/core/home/AudioCard";
const Home = () => {
  // states
  const [albumData, setAlbumData] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  // helper func
  const apiHandler = async () => {
    try {
      let res = await axios.get(`https://maocmusic.netlify.app/api/chart`);
      if (res.status == 200) {
        console.log(res, "i am response");
        setAlbumData(res.data);
      } else {
      }
    } catch (err) {}
  };

  useEffect(() => {
    apiHandler();
  }, []);

  return (
    <div className="home__container">
      {/* <div className="sidebar">
        <Box display="flex" flexDirection="column" gap="2rem">
          {" "}
          <Typography
            variant="h4"
            className="white__color__typo__500 cursor__pointer"
          >
            Home
          </Typography>
          <Typography
            variant="h4"
            className="white__color__typo__500 cursor__pointer"
          >
            Discover
          </Typography>
          <Typography
            variant="h4"
            className="white__color__typo__500 cursor__pointer"
          >
            Radio
          </Typography>
          <Typography
            variant="h4"
            className="white__color__typo__500 cursor__pointer"
          >
            For you
          </Typography>
        </Box>
      </div> */}
      <section className="hero__section flex__column gap__20px">
        <Box sx={{ width: "250px" }}>
          {" "}
          <SearchBar />
        </Box>
        <Typography
          variant="h2"
          className="white__color__typo__500"
          sx={{ fontWeight: "600" }}
        >
          Trending Album
        </Typography>
        <div className="card__container">
          {albumData?.albums?.data?.length > 0 ? (
            <>
              {albumData?.albums?.data?.slice(0, 6).map((data, index) => (
                <div className="music__card" key={index}>
                  <img
                    src={data?.cover_big}
                    alt="albumImg"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <Typography
                    className="white__color__typo__500 truncate"
                    variant="h6"
                  >
                    {data?.title}
                  </Typography>
                </div>
              ))}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6]?.map((a, i) => (
                <MediaCardSkeleton />
              ))}
            </>
          )}
        </div>
        <Typography
          variant="h2"
          className="white__color__typo__500"
          sx={{ fontWeight: "600" }}
        >
          Featured Artists
        </Typography>

        <div className="card__container">
          {albumData?.artists?.data?.length > 0 ? (
            <>
              {albumData?.artists?.data?.map((data, index) => (
                <div className="music__card" key={index}>
                  <img
                    src={data?.picture_big}
                    alt="albumImg"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <Typography
                    className="white__color__typo__500 truncate"
                    variant="h6"
                  >
                    {data?.name}
                  </Typography>
                </div>
              ))}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6]?.map((a, i) => (
                <MediaCardSkeleton />
              ))}
            </>
          )}
        </div>
        <Typography
          variant="h2"
          className="white__color__typo__500"
          sx={{ fontWeight: "600" }}
        >
          Upload Your Own Music
        </Typography>
        <Box
        className='card__container'
         
        >
          <FormDialog setMediaData={setMediaData} />
          <AudioCard mediaData={mediaData} setMediaData={setMediaData} />
        </Box>
      </section>
    </div>
  );
};

export default Home;
