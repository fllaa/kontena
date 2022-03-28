export const truncate = (str, length = 120, ending = "...") => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

export const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

// function that convert json to query string
export const jsonToQueryString = (json) => {
  return (
    "?" +
    Object.keys(json)
      .map((key) => key + "=" + json[key])
      .join("&")
  );
};
