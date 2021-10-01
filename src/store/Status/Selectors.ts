import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

const selectSelf = (state: RootState) => state;

export const FullStatusSelector = (type: string) =>
  createDraftSafeSelector(selectSelf, (state) => {
    return state.status[type];
  });

export const StatusSelector = (type: string) =>
  createDraftSafeSelector(selectSelf, (state) => {
    return {
      pending: state.status[type] === "pending",
      error: state.status[type] === "rejected",
      completed: state.status[type] === "fulfilled",
    };
  });

export const IsCompletedStatusSelector = (type: string) =>
  createDraftSafeSelector(selectSelf, (state) => {
    return (
      state.status[type] === "fulfilled" || state.status[type] === "rejected"
    );
  });
