
export const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(["en-NL"], options);
  };
  
  export const formatTimeRange = (startTime, endTime) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return (
      `${new Date(startTime).toLocaleTimeString([], options)} - ` +
      `${new Date(endTime).toLocaleTimeString([], options)}`
    );
  };
  