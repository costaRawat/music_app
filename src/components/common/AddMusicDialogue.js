import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { v4 as uuidv4 } from "uuid";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function FormDialog({ setMediaData }) {
  // states
  const [open, setOpen] = React.useState(false);
  const [imgFile, setImg] = React.useState(null);
  const [name, setName] = React.useState("");
  const [audioFile, setAudioFile] = React.useState(null);
  // helper func
  const resetDataHandler = () => {
    setImg(null);
    setName("");
    setAudioFile("");
  };

  const handleFileUploader = (data, type) => {
    if (type == "image") {
      setImg(URL.createObjectURL(data?.target?.files?.[0]));
    } else {
      setAudioFile(URL.createObjectURL(data?.target?.files?.[0]));
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    resetDataHandler();
    setOpen(false);
  };
  const mediaFormHandler = (e) => {
    e.preventDefault();

    let newMedia = {
      id: uuidv4(),
      name: name,
      imgFile: imgFile,
      audio: audioFile,
    };
    setMediaData((pre) => [newMedia, ...pre]);
    handleClose();
  };
  const [disable, setDisable] = React.useState(true);
  React.useEffect(() => {
    if (name.trim().length == 0 || !imgFile || !audioFile) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [name, imgFile, audioFile]);
  return (
    <div>
      <Grid
        item
        className="add__card cursor__pointer"
        onClick={handleClickOpen}
      >
        <Grid
          container
          sx={{ height: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <AddCircleOutlineIcon sx={{ color: "white", fontSize: "30px" }} />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} className="addMusicDialogue">
        <DialogTitle
          variant="h3"
          sx={{ fontWeight: 600 }}
          className="white__color__typo__500 fs20px"
        >
          Add Music
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => mediaFormHandler(e)}>
            <Grid container gap="1rem">
              <Grid container item flexDirection="column" gap=".5rem">
                <label
                  htmlFor="Name"
                  className="white__color__typo__500 fs20px"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  className="inp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid container item flexDirection="column" gap=".5rem">
                <label
                  htmlFor="media"
                  className="white__color__typo__500 fs20px"
                >
                  Media File
                </label>
                <input
                  type="file"
                  id="media"
                  accept="audio/mp3"
                  className="inp"
                  onChange={(e) => handleFileUploader(e, "audio")}
                />
              </Grid>
              <Grid container item flexDirection="column" gap=".5rem">
                <label
                  htmlFor="file"
                  className="white__color__typo__500 fs20px"
                >
                  Media Cover
                </label>
                <Box
                  className="img__upload__container"
                  sx={{ position: "relative" }}
                >
                  {imgFile ? (
                    <>
                      {" "}
                      <img
                        src={imgFile}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                        }}
                        alt="cover"
                      />
                      <CloseIcon
                        sx={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          fontSize: "2.5rem",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => setImg(null)}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <input
                        type="file"
                        id="file"
                        accept=".png, .jpg, .jfif"
                        className="inp img__upload"
                        style={{ zIndex: 1000 }}
                        onChange={(e) => handleFileUploader(e, "image")}
                      />
                      <AddCircleOutlineIcon
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          fontSize: "3rem",
                        }}
                      />
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" gap="1rem">
              {" "}
              <Button className="premiun__btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className={disable ? "disable__btn" : "premiun__btn"}
                type="submit"
                disabled={disable}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
