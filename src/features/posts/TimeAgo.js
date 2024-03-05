import { parseISO, formatDistanceToNow } from "date-fns";

export function TimeAgo({ timeStamp }) {
  let timeAgo = "";
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timeLapsed = formatDistanceToNow(date);
    timeAgo = `${timeLapsed} passado`;
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}
