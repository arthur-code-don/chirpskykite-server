// server/utils/videoUtils.js
import ffmpeg from 'fluent-ffmpeg';

export const getVideoDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const durationInSeconds = metadata.format.duration;
        resolve(durationInSeconds);
      }
    });
  });
};

export const handleRejectedFiles = async (rejectedFiles) => {
  rejectedFiles.forEach(async (file) => {
    try {
      if (file.size > MAX_FILE_SIZE) {
        setVideoErrorMessage("File size exceeds the maximum limit (70MB).");
      } else {
        const durationInSeconds = await getVideoDuration(file);
        if (durationInSeconds > MAX_VIDEO_DURATION) {
          setVideoErrorMessage("Video duration exceeds the maximum limit (4:20).");
        } else {
          setVideoErrorMessage("Invalid file type.");
        }
      }
    } catch (error) {
      console.error(error);
      setVideoErrorMessage("Error while processing the video file.");
    }
  });
};
