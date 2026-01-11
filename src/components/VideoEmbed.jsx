const VideoEmbed = ({ url, platform }) => {
  let embedUrl = url;

  if (platform === 'youtube' || (url && url.includes('youtu'))) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      embedUrl = `https://www.youtube.com/embed/${match[2]}`;
    }
  } else if (platform === 'google_drive' && url && url.includes('drive.google.com')) {
      // Convert view links to preview links
      embedUrl = url.replace(/\/view.*$/, '/preview');
  }

  return (
    <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden bg-black shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
