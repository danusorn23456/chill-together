export interface LeaveRoomButtonProps {}

function LeaveRoomButton({ ...rest }: LeaveRoomButtonProps) {
  return (
    <button className="button bg-red-500" {...rest}>
      leave room
    </button>
  );
}

export { LeaveRoomButton };
