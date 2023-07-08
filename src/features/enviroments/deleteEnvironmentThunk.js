import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";
import { deleteEnvironmentLocally } from "./environmentsSlice";

export const deleteEnvironment = createAsyncThunk('environments/delete',async (data, { dispatch }) => {
    try {
      await axios.delete(`${BASE_URL_PROD}/environments/delete/${data}`);
      dispatch(deleteEnvironmentLocally(data));
    } catch (error) {
      throw new Error('Failed to delete environment');
    }
  }
);