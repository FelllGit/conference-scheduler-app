import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import UsersAutocomplete from "@/pages/SharedLayout/UsersAutocomplete.tsx";
import SheduleMeetDialog from "@/components/calendar/sheduleMeetDialog.tsx";
import AuthDialog from "@/components/auth/authDialog.tsx";
import { useDispatch } from "react-redux";
import { User } from "@/interfaces/meetings.ts";
import { setUserFilter } from "@/redux/slices/userFilterSlice.ts";

interface CalendarHeaderProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = memo(
  ({ onPrev, onNext, onToday }) => {
    const dispatch = useDispatch();

    const isLoggedIn = () => {
      const jwt = localStorage.getItem("jwt");
      return !!jwt;
    };

    const handleUserSelect = (selectedUser: User | null) => {
      dispatch(setUserFilter(selectedUser));
    };

    return (
      <div className="calendar-header flex flex-row justify-between">
        <UsersAutocomplete onUserSelect={handleUserSelect} />
        <div className="flex flex-row gap-2">
          <Button
            onClick={onPrev}
            className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
          >
            Prev
          </Button>
          <Button
            onClick={onNext}
            className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
          >
            Next
          </Button>
          <Button
            onClick={onToday}
            className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
          >
            Today
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          {isLoggedIn() ? (
            <>
              <SheduleMeetDialog />
              <Button
                className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
                onClick={() => {
                  localStorage.removeItem("jwt");
                  window.location.reload();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <AuthDialog />
          )}
        </div>
      </div>
    );
  }
);

export default CalendarHeader;
